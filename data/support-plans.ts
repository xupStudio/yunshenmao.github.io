/**
 * 月報訂閱方案 —— 顯示於 /support。
 *
 * 這些是「有對價的數位內容訂閱」(月報 email),非捐款、非勸募:
 * 訂閱者付費取得每月「山上月報」內容,收款主體為 XUPLABS LLC。
 * 文案請勿使用「捐款 / 募款 / 善款 / 抵稅 / 100%」等字眼。
 *
 * 多個金額「內容相同、只有金額不同」;只提供月繳。
 *
 * 結帳流程:前端把 plan slug POST 給 CHECKOUT_API(Cloudflare Pages Function),
 * 由它動態建立帶「貓主題 branding_settings」的 Stripe Checkout Session 再跳轉。
 * 這樣品牌是「每筆覆蓋」,不污染同帳號 tripcairn 的收據/結帳頁。
 * 後端程式:worker/functions/api/create-session.js
 */

export const STRIPE_MODE: "test" | "live" = "live";

/** 幣別固定台幣;顯示用。 */
export const CURRENCY = "NT$";

/** 後端建 Checkout Session 的端點。 */
export const CHECKOUT_API =
  "https://yunshenmao-checkout.pages.dev/api/create-session";

/** 訂閱包含的內容(各金額共用)。 */
export const subscribePerks: string[] = [
  "每月一封「山上月報」email — 貓咪近況與圖片、當月照護紀錄",
  "可隨時取消，取消後不再扣款",
];

export type SubAmount = {
  price: number;
  /** 對應 worker PRICES 的 plan slug。 */
  plan: string;
};

/** 月繳金額(由低到高)。 */
export const subscriptionAmounts: SubAmount[] = [
  { price: 500, plan: "monthly-500" },
  { price: 1000, plan: "monthly-1000" },
  { price: 2000, plan: "monthly-2000" },
  { price: 3000, plan: "monthly-3000" },
  { price: 5000, plan: "monthly-5000" },
];

export type OneTimeOption = {
  price: number;
  plan: string;
};

export const oneTimeOptions: OneTimeOption[] = [
  { price: 500, plan: "once-500" },
  { price: 1000, plan: "once-1000" },
  { price: 3000, plan: "once-3000" },
];
