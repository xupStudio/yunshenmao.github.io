/**
 * 雲深貓園月報訂閱狀態查詢 — 僅供 Cloudflare Welcome Workflow 呼叫。
 *
 * STRIPE_SECRET_KEY 保留在既有 Checkout Pages 專案；另一個 Worker 只持有
 * STRIPE_STATUS_PROXY_TOKEN，無法直接操作 Stripe 帳號。
 */

const STRIPE_API_VERSION = "2025-09-30.clover";
const MAX_BODY_BYTES = 4_096;
const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function secureEqual(left, right) {
  if (!left || !right) return false;

  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);

  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }
  return difference === 0;
}

async function expectedSignature(secret, timestamp, rawBody) {
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
    encoder.encode(`${timestamp}.${rawBody}`),
  );
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function referenceId(reference) {
  if (typeof reference === "string") return reference;
  return reference?.id || null;
}

export async function onRequestPost({ request, env }) {
  if (
    typeof env.STRIPE_STATUS_PROXY_TOKEN !== "string" ||
    env.STRIPE_STATUS_PROXY_TOKEN.length < 32
  ) {
    console.error("Stripe status proxy secret is missing or too short.");
    return json({ error: "service_unavailable" }, 503);
  }

  const timestampText = request.headers.get("x-yunshenmao-timestamp") || "";
  const timestamp = Number.parseInt(timestampText, 10);
  const now = Math.floor(Date.now() / 1_000);
  if (
    !Number.isSafeInteger(timestamp) ||
    Math.abs(now - timestamp) > SIGNATURE_TOLERANCE_SECONDS
  ) {
    return json({ error: "unauthorized" }, 401);
  }

  const declaredLength = Number.parseInt(
    request.headers.get("content-length") || "0",
    10,
  );
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  const providedSignature =
    request.headers.get("x-yunshenmao-signature") || "";
  const signature = await expectedSignature(
    env.STRIPE_STATUS_PROXY_TOKEN,
    timestampText,
    rawBody,
  );
  if (!(await secureEqual(providedSignature, signature))) {
    return json({ error: "unauthorized" }, 401);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const subscriptionId = String(body.subscriptionId || "");
  const customerId = String(body.customerId || "");
  const plan = String(body.plan || "");
  if (!/^sub_[A-Za-z0-9]+$/.test(subscriptionId)) {
    return json({ error: "invalid_subscription_id" }, 400);
  }
  if (!/^cus_[A-Za-z0-9]+$/.test(customerId)) {
    return json({ error: "invalid_customer_id" }, 400);
  }
  if (!/^monthly-(500|1000|2000|3000|5000)$/.test(plan)) {
    return json({ error: "invalid_plan" }, 400);
  }

  const stripeResponse = await fetch(
    `https://api.stripe.com/v1/subscriptions/${encodeURIComponent(subscriptionId)}`,
    {
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    },
  );

  if (stripeResponse.status === 404) {
    return json({ eligible: false, reason: "inactive" });
  }

  if (!stripeResponse.ok) {
    console.error("Stripe subscription lookup failed", {
      status: stripeResponse.status,
    });
    return json({ error: "stripe_unavailable" }, 502);
  }

  const subscription = await stripeResponse.json();
  if (
    subscription.status !== "active" &&
    subscription.status !== "trialing"
  ) {
    return json({ eligible: false, reason: "inactive" });
  }
  if (subscription.cancel_at_period_end || subscription.cancel_at != null) {
    return json({ eligible: false, reason: "cancellation_scheduled" });
  }
  if (subscription.canceled_at != null || subscription.ended_at != null) {
    return json({ eligible: false, reason: "cancelled" });
  }
  if (subscription.pause_collection != null) {
    return json({ eligible: false, reason: "paused" });
  }
  if (subscription.metadata?.project !== "yunshenmao") {
    return json({ eligible: false, reason: "wrong_project" });
  }
  if (subscription.metadata?.plan !== plan) {
    return json({ eligible: false, reason: "wrong_plan" });
  }
  if (referenceId(subscription.customer) !== customerId) {
    return json({ eligible: false, reason: "customer_mismatch" });
  }
  return json({ eligible: true, reason: "eligible" });
}
