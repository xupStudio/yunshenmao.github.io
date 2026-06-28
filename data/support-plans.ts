/**
 * 認養贊助 / 月報訂閱方案 —— 顯示於 /support。
 *
 * 這些是「有對價的數位內容訂閱」(月報 email),非捐款、非勸募:
 * 訂閱者付費取得每月「山上月報」內容,收款主體為 XUPLABS LLC。
 * 文案請勿使用「捐款 / 募款 / 善款 / 抵稅 / 100%」等字眼。
 *
 * 三個方案「內容相同、金額不同」:訂閱者依自己能負擔的金額選擇,
 * 每個方案拿到的都是同一份每月「山上月報」。
 *
 * stripeUrl 是 Stripe Payment Link 的公開網址(放前端安全,密鑰不在此)。
 * 連結由 `scripts/setup-stripe-plans.mjs` 產生。
 *
 * 目前填入的是 LIVE(正式)連結。如需重新產生:
 *   set -a; source /Users/xup/workspace/tripcairn/.env; set +a
 *   node scripts/setup-stripe-plans.mjs --live
 */

export const STRIPE_MODE: "test" | "live" = "live";

export type SupportTier = {
  slug: string;
  name: string;
  english: string;
  tagline: string;
  perks: string[];
  monthly: { price: number; url: string };
  yearly: { price: number; url: string };
  featured?: boolean;
};

export type OneTimeOption = {
  slug: string;
  price: number;
  url: string;
};

/** 幣別固定台幣;顯示用。 */
export const CURRENCY = "NT$";

/** 三方案共用的內容(對價相同,只有金額不同)。 */
const SHARED_PERKS = [
  "每月一封「山上月報」email — 未公開照片、貓咪近況、當月照護紀錄",
  "可隨時取消,取消後不再扣款",
];
const SHARED_TAGLINE = "每月收到一封山上月報";

export const subscriptionTiers: SupportTier[] = [
  {
    slug: "member",
    name: "月報會員",
    english: "Monthly Report Member",
    tagline: SHARED_TAGLINE,
    perks: SHARED_PERKS,
    monthly: { price: 500, url: "https://buy.stripe.com/8x228rgmn2Z3ggj2UA7wA00" },
    yearly: { price: 5000, url: "https://buy.stripe.com/14A5kD5HJ57bggjcva7wA01" },
  },
  {
    slug: "sponsor",
    name: "認養贊助",
    english: "Adoption Sponsor",
    tagline: SHARED_TAGLINE,
    perks: SHARED_PERKS,
    monthly: { price: 1000, url: "https://buy.stripe.com/5kQ8wP3zBczDd472UA7wA02" },
    yearly: { price: 10000, url: "https://buy.stripe.com/00w00j9XZ2Z32pt1Qw7wA03" },
  },
  {
    slug: "guardian",
    name: "貓園之友",
    english: "Friend of the Sanctuary",
    tagline: SHARED_TAGLINE,
    perks: SHARED_PERKS,
    monthly: { price: 2000, url: "https://buy.stripe.com/4gMbJ1dabdDHggj8eU7wA04" },
    yearly: { price: 20000, url: "https://buy.stripe.com/bJebJ11rtfLPaVZan27wA05" },
  },
];

export const oneTimeOptions: OneTimeOption[] = [
  { slug: "once-500", price: 500, url: "https://buy.stripe.com/14A9AT3zB0QVe8b9iY7wA06" },
  { slug: "once-1000", price: 1000, url: "https://buy.stripe.com/28E00jdab57baVZeDi7wA07" },
];

/** 一次性贊助的回饋(對價)。 */
export const oneTimePerks: string[] = [
  "一封專屬感謝信",
  "當期「山上月報」",
  "數位認養卡(PDF)",
];

export function getTier(slug: string): SupportTier | undefined {
  return subscriptionTiers.find((t) => t.slug === slug);
}
