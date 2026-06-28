/**
 * 雲深貓園收款 — Cloudflare Pages Function
 * POST /api/create-session   body: { plan: "monthly-1000" | "once-500" ... }
 *
 * 為什麼:雲深貓園與 tripcairn 共用同一個 XUPLABS LLC Stripe 帳號。
 * Payment Links 只能吃帳號層級品牌(會污染 tripcairn 收據);而 Checkout Session 的
 * branding_settings 可「每筆覆蓋」品牌 → 雲深貓園貓主題,完全不動帳號預設、不影響 tripcairn。
 *
 * 密鑰:env.STRIPE_SECRET_KEY(sk_live_…;用 `wrangler pages secret put` 設定,不進前端/repo)。
 */

const PRICES = {
  "monthly-500": "price_1TnF2SF1rmWXBEY14eLVQpV8",
  "monthly-1000": "price_1TnF2TF1rmWXBEY1BqIWiEQH",
  "monthly-2000": "price_1TnF2VF1rmWXBEY1ciRW1RKc",
  "monthly-3000": "price_1TnF2WF1rmWXBEY12uN4nM9y",
  "monthly-5000": "price_1TnF2YF1rmWXBEY1vbynDfvN",
  "once-500": "price_1TnF2aF1rmWXBEY1Vo3ot2qw",
  "once-1000": "price_1TnF2bF1rmWXBEY1rVBATjRu",
  "once-3000": "price_1TnFJcF1rmWXBEY1HIKwadqz",
};

const LOGO = "https://yunshenmao.com/apple-icon.png";
const RETURN = "https://yunshenmao.com/support/";

const ALLOWED_ORIGINS = new Set([
  "https://yunshenmao.com",
  "https://www.yunshenmao.com",
  "https://yunshenmao.github.io",
  "http://localhost:3000",
]);

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://yunshenmao.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

export function onRequestOptions(context) {
  return new Response(null, {
    headers: corsHeaders(context.request.headers.get("Origin") || ""),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = corsHeaders(request.headers.get("Origin") || "");

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid json" }, 400, cors);
  }

  const plan = String(body.plan || "");
  const price = PRICES[plan];
  if (!price) return json({ error: "unknown plan" }, 400, cors);

  const isSub = plan.startsWith("monthly-");

  const form = new URLSearchParams();
  form.set("mode", isSub ? "subscription" : "payment");
  form.set("line_items[0][price]", price);
  form.set("line_items[0][quantity]", "1");
  form.set("success_url", RETURN + "?ok=1");
  form.set("cancel_url", RETURN);
  form.set("locale", "zh-TW");

  // 每筆覆蓋的貓主題品牌(不動帳號預設,tripcairn 不受影響)
  form.set("branding_settings[logo][type]", "url");
  form.set("branding_settings[logo][url]", LOGO);
  form.set("branding_settings[icon][type]", "url");
  form.set("branding_settings[icon][url]", LOGO);
  form.set("branding_settings[background_color]", "#FAF6F0");
  form.set("branding_settings[button_color]", "#8B6F47");
  form.set("branding_settings[border_style]", "rounded");
  form.set("branding_settings[display_name]", "雲深貓園");

  // 帳單明細 = YUNSHENMAO(訂閱由產品帶;一次性在此覆寫)
  if (!isSub) form.set("payment_intent_data[statement_descriptor]", "YUNSHENMAO");

  form.set("metadata[project]", "yunshenmao");
  form.set("metadata[plan]", plan);

  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + env.STRIPE_SECRET_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": "2025-09-30.clover",
    },
    body: form.toString(),
  });
  const s = await r.json();
  if (!r.ok) return json({ error: s.error?.message || "stripe error" }, 502, cors);
  return json({ url: s.url }, 200, cors);
}
