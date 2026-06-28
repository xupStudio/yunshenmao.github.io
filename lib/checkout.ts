import { CHECKOUT_API } from "@/data/support-plans";

/**
 * 把 plan slug 送給後端 Worker，由它建立帶「貓主題」branding 的 Stripe
 * Checkout Session，成功就跳轉過去。失敗則 throw。
 */
export async function startCheckout(plan: string): Promise<void> {
  const r = await fetch(CHECKOUT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const d = await r.json().catch(() => ({}));
  if (d && typeof d.url === "string") {
    window.location.href = d.url;
    return;
  }
  throw new Error((d && d.error) || "checkout failed");
}
