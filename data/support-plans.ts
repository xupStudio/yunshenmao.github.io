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
 * ⚠️ 目前填入的是 TEST(測試)連結,供驗收用。驗收通過後,
 *    以 `node scripts/setup-stripe-plans.mjs --live` 重新產生並替換為正式連結,
 *    同時把 STRIPE_MODE 改為 "live"。
 */

export const STRIPE_MODE: "test" | "live" = "test";

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
    monthly: { price: 500, url: "https://buy.stripe.com/test_3cI9AUaSu7gO3hMbbr6sw1E" },
    yearly: { price: 5000, url: "https://buy.stripe.com/test_4gMfZi9Oqat005A1AR6sw1F" },
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
    monthly: { price: 1000, url: "https://buy.stripe.com/test_4gM00k6Ceat0f0u0wN6sw1G" },
    yearly: { price: 10000, url: "https://buy.stripe.com/test_9B6aEYaSu6cK5pUdjz6sw1H" },
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
    monthly: { price: 2000, url: "https://buy.stripe.com/test_eVq6oI3q2at005A0wN6sw1I" },
    yearly: { price: 20000, url: "https://buy.stripe.com/test_00w4gA1hU30ybOi0wN6sw1J" },
  },
];

export const oneTimeOptions: OneTimeOption[] = [
  { slug: "once-500", price: 500, url: "https://buy.stripe.com/test_cNidRa2lY8kS4lQfrH6sw1K" },
  { slug: "once-1000", price: 1000, url: "https://buy.stripe.com/test_dRm8wQ4u6cB83hMbbr6sw1L" },
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
