/**
 * 月報訂閱方案 —— 顯示於 /support。
 *
 * 這些是「有對價的數位內容訂閱」(月報 email),非捐款、非勸募:
 * 訂閱者付費取得每月「山上月報」內容,收款主體為 XUPLABS LLC。
 * 文案請勿使用「捐款 / 募款 / 善款 / 抵稅 / 100%」等字眼。
 *
 * 五個金額「內容相同、只有金額不同」:訂閱者依自己能負擔的金額選擇。
 *
 * stripeUrl 是 Stripe Payment Link 的公開網址(放前端安全,密鑰不在此)。
 * 連結由 `scripts/setup-stripe-plans.mjs` 產生(目前為 LIVE 正式連結)。
 *   set -a; source /Users/xup/workspace/tripcairn/.env; set +a
 *   node scripts/setup-stripe-plans.mjs --live
 */

export const STRIPE_MODE: "test" | "live" = "live";

/** 幣別固定台幣;顯示用。 */
export const CURRENCY = "NT$";

/** 訂閱包含的內容(五個金額共用)。 */
export const subscribePerks: string[] = [
  "每月一封「山上月報」email — 貓咪近況、當月照護紀錄",
  "可隨時取消,取消後不再扣款",
];

export type SubAmount = {
  monthly: { price: number; url: string };
  yearly: { price: number; url: string };
};

export const subscriptionAmounts: SubAmount[] = [
  {
    monthly: { price: 500, url: "https://buy.stripe.com/00w00j0npgPT9RVan27wA08" },
    yearly: { price: 5000, url: "https://buy.stripe.com/fZu9ATfij9nrggj7aQ7wA09" },
  },
  {
    monthly: { price: 1000, url: "https://buy.stripe.com/5kQ28r2vx4378NRfHm7wA0a" },
    yearly: { price: 10000, url: "https://buy.stripe.com/00w7sLc679nr6FJ66M7wA0b" },
  },
  {
    monthly: { price: 2000, url: "https://buy.stripe.com/bJe8wP4DF2Z3fcfan27wA0c" },
    yearly: { price: 20000, url: "https://buy.stripe.com/fZucN58TVfLP9RV1Qw7wA0d" },
  },
  {
    monthly: { price: 3000, url: "https://buy.stripe.com/00w28r4DF4377JNeDi7wA0e" },
    yearly: { price: 30000, url: "https://buy.stripe.com/8x28wP6LN0QV0hleDi7wA0f" },
  },
  {
    monthly: { price: 5000, url: "https://buy.stripe.com/00wfZh4DF57bfcfgLq7wA0g" },
    yearly: { price: 50000, url: "https://buy.stripe.com/14AcN51rtbvz1lpgLq7wA0h" },
  },
];

export type OneTimeOption = {
  price: number;
  url: string;
};

export const oneTimeOptions: OneTimeOption[] = [
  { price: 500, url: "https://buy.stripe.com/14AcN5eefczDfcf8eU7wA0i" },
  { price: 1000, url: "https://buy.stripe.com/dRmaEX3zB57b7JN2UA7wA0j" },
];
