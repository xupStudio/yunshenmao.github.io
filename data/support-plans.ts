/**
 * 認養贊助 / 月報訂閱方案 —— 顯示於 /support。
 *
 * 這些是「有對價的數位內容訂閱」(月報 email),非捐款、非勸募:
 * 訂閱者付費取得每月「山上月報」內容,收款主體為 XUPLABS LLC。
 * 文案請勿使用「捐款 / 募款 / 善款 / 抵稅 / 100%」等字眼。
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

export const subscriptionTiers: SupportTier[] = [
  {
    slug: "member",
    name: "月報會員",
    english: "Monthly Report Member",
    tagline: "每月收到一封山上月報",
    perks: [
      "每月一封「山上月報」email — 未公開照片、貓咪近況、當月照護紀錄",
      "可隨時取消,取消後不再扣款",
    ],
    monthly: { price: 500, url: "https://buy.stripe.com/8x228rgmn2Z3ggj2UA7wA00" },
    yearly: { price: 5000, url: "https://buy.stripe.com/14A5kD5HJ57bggjcva7wA01" },
  },
  {
    slug: "sponsor",
    name: "認養贊助",
    english: "Adoption Sponsor",
    tagline: "月報 + 指定一隻貓的專屬近況",
    perks: [
      "「月報會員」的全部內容",
      "季度高解析攝影集",
      "可指定一隻貓,收到牠的專屬近況(數位認養卡)",
    ],
    monthly: { price: 1000, url: "https://buy.stripe.com/5kQ8wP3zBczDd472UA7wA02" },
    yearly: { price: 10000, url: "https://buy.stripe.com/00w00j9XZ2Z32pt1Qw7wA03" },
    featured: true,
  },
  {
    slug: "guardian",
    name: "山上守護者",
    english: "Mountain Guardian",
    tagline: "更深入地參與山上的日常",
    perks: [
      "「認養贊助」的全部內容",
      "網站「月報會員」頁列名(暱稱,可選)",
      "不定期山上影片",
    ],
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
