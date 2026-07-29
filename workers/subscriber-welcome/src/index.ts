import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
import Stripe from "stripe";

import { buildWelcomeEmail } from "./email";
import {
  extractWelcomeCandidate,
  type EligibilityResult,
} from "./stripe-logic";
import type { Env, WelcomeWorkflowParams } from "./types";

const MAX_WEBHOOK_BYTES = 1_000_000;
const WEBHOOK_VERIFIER_API_KEY = "sk_test_webhook_verifier_only";

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function makeWebhookVerifier(): Stripe {
  return new Stripe(WEBHOOK_VERIFIER_API_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}

function parseDelayMinutes(value: string): number {
  const delay = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(delay) || delay < 1 || delay > 24 * 60) {
    throw new Error("WELCOME_DELAY_MINUTES must be between 1 and 1440.");
  }
  return delay;
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const declaredLength = Number.parseInt(
    request.headers.get("content-length") ?? "0",
    10,
  );
  if (Number.isFinite(declaredLength) && declaredLength > MAX_WEBHOOK_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return json({ error: "missing_signature" }, 400);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_WEBHOOK_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  let event: Stripe.Event;
  try {
    const stripe = makeWebhookVerifier();
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (error) {
    console.warn("Rejected Stripe webhook with an invalid signature", {
      error: error instanceof Error ? error.message : "unknown_error",
    });
    return json({ error: "invalid_signature" }, 400);
  }

  const candidate = extractWelcomeCandidate(event);
  if (!candidate.accepted) {
    return json({ received: true, scheduled: false, reason: candidate.reason });
  }

  const delayMinutes = parseDelayMinutes(env.WELCOME_DELAY_MINUTES);
  const { eventCreatedEpochSeconds, ...baseParams } = candidate.params;
  const params: WelcomeWorkflowParams = {
    ...baseParams,
    notBeforeEpochMs:
      eventCreatedEpochSeconds * 1_000 + delayMinutes * 60 * 1_000,
  };

  const instances = await env.WELCOME_WORKFLOW.createBatch([
    {
      id: `welcome-${params.subscriptionId}`,
      params,
    },
  ]);

  return json({
    received: true,
    scheduled: instances.length === 1,
    duplicate: instances.length === 0,
  });
}

const ELIGIBILITY_REASONS = new Set<EligibilityResult["reason"]>([
  "eligible",
  "inactive",
  "cancellation_scheduled",
  "cancelled",
  "paused",
  "wrong_project",
  "wrong_plan",
  "customer_mismatch",
]);

async function hmacSignature(
  secret: string,
  timestamp: string,
  body: string,
): Promise<string> {
  if (secret.length < 32) {
    throw new Error("STRIPE_STATUS_PROXY_TOKEN is missing or too short.");
  }
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${timestamp}.${body}`),
  );
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function fetchSubscriptionEligibility(
  env: Env,
  subscriptionId: string,
  customerId: string,
  plan: string,
): Promise<EligibilityResult> {
  const body = JSON.stringify({ subscriptionId, customerId, plan });
  const timestamp = Math.floor(Date.now() / 1_000).toString();
  const signature = await hmacSignature(
    env.STRIPE_STATUS_PROXY_TOKEN,
    timestamp,
    body,
  );
  const response = await fetch(env.STRIPE_STATUS_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Yunshenmao-Timestamp": timestamp,
      "X-Yunshenmao-Signature": signature,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Stripe status proxy returned HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as Partial<EligibilityResult>;
  if (
    typeof payload.eligible !== "boolean" ||
    typeof payload.reason !== "string" ||
    !ELIGIBILITY_REASONS.has(payload.reason as EligibilityResult["reason"])
  ) {
    throw new Error("Stripe status proxy returned an invalid response.");
  }
  return payload as EligibilityResult;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ status: "ok" });
    }

    if (request.method === "POST" && url.pathname === "/stripe/webhook") {
      return handleStripeWebhook(request, env);
    }

    return json({ error: "not_found" }, 404);
  },
} satisfies ExportedHandler<Env>;

export class SubscriberWelcomeWorkflow extends WorkflowEntrypoint<
  Env,
  WelcomeWorkflowParams
> {
  async run(
    event: WorkflowEvent<WelcomeWorkflowParams>,
    step: WorkflowStep,
  ): Promise<
    | { sent: true; messageId: string }
    | { sent: false; reason: string }
  > {
    const params = event.payload;

    if (params.notBeforeEpochMs > Date.now()) {
      await step.sleepUntil(
        "wait until 5 minutes after subscription",
        params.notBeforeEpochMs,
      );
    }

    const eligibility = await step.do(
      "confirm subscription remains active",
      {
        retries: {
          limit: 5,
          delay: "15 seconds",
          backoff: "exponential",
        },
        timeout: "2 minutes",
      },
      async () => {
        return fetchSubscriptionEligibility(
          this.env,
          params.subscriptionId,
          params.customerId,
          params.plan,
        );
      },
    );

    if (!eligibility.eligible) {
      console.info("Welcome email skipped", {
        reason: eligibility.reason,
      });
      return { sent: false, reason: eligibility.reason };
    }

    const result = await step.do(
      "send subscriber welcome email",
      {
        retries: {
          limit: 5,
          delay: "30 seconds",
          backoff: "exponential",
        },
        timeout: "2 minutes",
      },
      async () => {
        const manageSubscriptionUrl =
          this.env.CUSTOMER_PORTAL_URL.trim() || this.env.FACEBOOK_URL;
        const message = buildWelcomeEmail({
          customerEmail: params.customerEmail,
          manageSubscriptionUrl,
          facebookUrl: this.env.FACEBOOK_URL,
          siteUrl: this.env.SITE_URL,
        });

        return this.env.EMAIL.send({
          to: {
            email: params.customerEmail,
            name: params.customerName,
          },
          from: {
            email: this.env.SENDER_EMAIL,
            name: this.env.SENDER_NAME,
          },
          replyTo: this.env.REPLY_TO_EMAIL,
          subject: message.subject,
          html: message.html,
          text: message.text,
        });
      },
    );

    console.info("Welcome email accepted by Email Service");
    return { sent: true, messageId: result.messageId };
  }
}
