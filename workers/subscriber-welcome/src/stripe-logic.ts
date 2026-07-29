import type Stripe from "stripe";

import type { WelcomeWorkflowParams } from "./types";

const MONTHLY_PLAN_PATTERN = /^monthly-(500|1000|2000|3000|5000)$/;

export type CandidateResult =
  | {
      accepted: true;
      params: Omit<WelcomeWorkflowParams, "notBeforeEpochMs"> & {
        eventCreatedEpochSeconds: number;
      };
    }
  | {
      accepted: false;
      reason:
        | "wrong_event_type"
        | "test_event"
        | "not_initial_subscription_invoice"
        | "invoice_not_paid"
        | "zero_amount"
        | "missing_subscription"
        | "wrong_project"
        | "wrong_plan"
        | "missing_customer"
        | "missing_email";
    };

export interface EligibilityResult {
  eligible: boolean;
  reason:
    | "eligible"
    | "inactive"
    | "cancellation_scheduled"
    | "cancelled"
    | "paused"
    | "wrong_project"
    | "wrong_plan"
    | "customer_mismatch";
}

export interface SubscriptionSnapshot {
  id: string;
  status: string;
  cancel_at_period_end: boolean;
  cancel_at: number | null;
  canceled_at: number | null;
  ended_at: number | null;
  pause_collection: object | null;
  customer: string | { id: string } | null;
  metadata: {
    project?: string;
    plan?: string;
  };
}

type SubscriptionParent = {
  type?: string | null;
  subscription_details?: {
    subscription?: string | Stripe.Subscription | null;
    metadata?: Stripe.Metadata | null;
  } | null;
};

type InvoiceWithSubscriptionParent = Stripe.Invoice & {
  parent?: SubscriptionParent | null;
};

function referenceId(
  reference:
    | string
    | { id: string }
    | null
    | undefined,
): string | null {
  if (typeof reference === "string") return reference;
  return reference?.id ?? null;
}

function isEmail(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function extractWelcomeCandidate(event: Stripe.Event): CandidateResult {
  if (event.type !== "invoice.paid") {
    return { accepted: false, reason: "wrong_event_type" };
  }

  if (!event.livemode) {
    return { accepted: false, reason: "test_event" };
  }

  const invoice = event.data.object as InvoiceWithSubscriptionParent;
  if (invoice.billing_reason !== "subscription_create") {
    return { accepted: false, reason: "not_initial_subscription_invoice" };
  }

  if (invoice.status !== "paid") {
    return { accepted: false, reason: "invoice_not_paid" };
  }

  if (invoice.amount_paid <= 0) {
    return { accepted: false, reason: "zero_amount" };
  }

  const details =
    invoice.parent?.type === "subscription_details"
      ? invoice.parent.subscription_details
      : null;
  const subscriptionId = referenceId(details?.subscription);
  if (!subscriptionId) {
    return { accepted: false, reason: "missing_subscription" };
  }

  const metadata = details?.metadata;
  if (metadata?.project !== "yunshenmao") {
    return { accepted: false, reason: "wrong_project" };
  }

  const plan = metadata.plan;
  if (typeof plan !== "string" || !MONTHLY_PLAN_PATTERN.test(plan)) {
    return { accepted: false, reason: "wrong_plan" };
  }

  const customerId = referenceId(invoice.customer);
  if (!customerId) {
    return { accepted: false, reason: "missing_customer" };
  }

  if (!isEmail(invoice.customer_email)) {
    return { accepted: false, reason: "missing_email" };
  }

  return {
    accepted: true,
    params: {
      eventId: event.id,
      invoiceId: invoice.id,
      subscriptionId,
      customerId,
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name || undefined,
      plan,
      eventCreatedEpochSeconds: event.created,
    },
  };
}

export function checkSubscriptionEligibility(
  subscription: Stripe.Subscription | SubscriptionSnapshot,
  expected: Pick<WelcomeWorkflowParams, "customerId">,
): EligibilityResult {
  if (subscription.status !== "active" && subscription.status !== "trialing") {
    return { eligible: false, reason: "inactive" };
  }

  if (subscription.cancel_at_period_end || subscription.cancel_at !== null) {
    return { eligible: false, reason: "cancellation_scheduled" };
  }

  if (subscription.canceled_at !== null || subscription.ended_at !== null) {
    return { eligible: false, reason: "cancelled" };
  }

  if (subscription.pause_collection !== null) {
    return { eligible: false, reason: "paused" };
  }

  if (subscription.metadata.project !== "yunshenmao") {
    return { eligible: false, reason: "wrong_project" };
  }

  if (!MONTHLY_PLAN_PATTERN.test(subscription.metadata.plan ?? "")) {
    return { eligible: false, reason: "wrong_plan" };
  }

  if (referenceId(subscription.customer) !== expected.customerId) {
    return { eligible: false, reason: "customer_mismatch" };
  }

  return { eligible: true, reason: "eligible" };
}
