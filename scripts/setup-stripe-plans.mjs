#!/usr/bin/env node
/**
 * 一次性設定腳本:在 Stripe 建立雲深貓園的「認養贊助 / 月報訂閱」方案,
 * 並輸出可貼進 data/support-plans.ts 的 Payment Link 公開網址。
 *
 * 重要:
 * - 金鑰從環境變數讀取,本檔不含任何密鑰。
 *   測試:  STRIPE_API_KEY        (sk_test_…)  ← 預設
 *   正式:  STRIPE_API_PROD_KEY   (sk_live_…)  ← 加 --live
 * - XUPLABS LLC 的 Stripe 帳號與 tripcairn 共用,故所有物件:
 *     · statement_descriptor = "YUNSHENMAO"(信用卡帳單那行,Stripe 限拉丁字元)
 *     · metadata.project     = "yunshenmao"(後台/報表與 tripcairn 區隔)
 *     · Product 名稱用中文「雲深貓園 …」(顯示於 Checkout 頁與 email 收據)
 *
 * 執行:
 *   set -a; source /Users/xup/workspace/tripcairn/.env; set +a
 *   node scripts/setup-stripe-plans.mjs            # 測試模式
 *   node scripts/setup-stripe-plans.mjs --live     # 正式模式
 */

const LIVE = process.argv.includes("--live");
const KEY = LIVE ? process.env.STRIPE_API_PROD_KEY : process.env.STRIPE_API_KEY;
const DESCRIPTOR = "YUNSHENMAO"; // 信用卡帳單明細(拉丁限定;中文走商品名/收據)
const PROJECT = "yunshenmao";

if (!KEY) {
  console.error(
    `\n✗ 找不到金鑰環境變數 ${LIVE ? "STRIPE_API_PROD_KEY" : "STRIPE_API_KEY"}。\n` +
      `  請先:  set -a; source /Users/xup/workspace/tripcairn/.env; set +a\n`
  );
  process.exit(1);
}
console.log(`\n▶ Stripe 模式:${LIVE ? "🔴 LIVE(正式)" : "🟢 TEST(測試)"}  descriptor=${DESCRIPTOR}\n`);

// --- Stripe REST 小工具(form-urlencoded + 巢狀 bracket 記法) ---------------
function toForm(obj, prefix, out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item && typeof item === "object") toForm(item, `${key}[${i}]`, out);
        else out.push([`${key}[${i}]`, String(item)]);
      });
    } else if (typeof v === "object") {
      toForm(v, key, out);
    } else {
      out.push([key, String(v)]);
    }
  }
  return out;
}
const encode = (obj) =>
  toForm(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

async function stripe(path, body) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encode(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`${path} → ${res.status}: ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

// TWD 是「2 位小數」幣別(非 zero-decimal),故金額 = NT$ × 100。
const twd = (ntd) => ntd * 100;

// --- 方案定義 ----------------------------------------------------------------
// 每個產品一張卡;月繳/年繳是同一產品的兩個 price;一次性是 payment 模式。
const PRODUCTS = [
  {
    key: "member",
    name: "雲深貓園 月報會員",
    prices: [
      { key: "monthly-500", interval: "month", ntd: 500 },
      { key: "yearly-5000", interval: "year", ntd: 5000 },
    ],
  },
  {
    key: "sponsor",
    name: "雲深貓園 認養贊助",
    prices: [
      { key: "monthly-1000", interval: "month", ntd: 1000 },
      { key: "yearly-10000", interval: "year", ntd: 10000 },
    ],
  },
  {
    key: "guardian",
    name: "雲深貓園 山上守護者",
    prices: [
      { key: "monthly-2000", interval: "month", ntd: 2000 },
      { key: "yearly-20000", interval: "year", ntd: 20000 },
    ],
  },
  {
    key: "onetime",
    name: "雲深貓園 單次贊助",
    prices: [
      { key: "once-500", interval: "once", ntd: 500 },
      { key: "once-1000", interval: "once", ntd: 1000 },
    ],
  },
];

const CONFIRM_MSG =
  "感謝你支持雲深貓園 🐱 收據與後續的山上月報會寄到你結帳時填寫的 email。如需取消訂閱,可回信告知或透過 Stripe 寄給你的管理連結。";

const results = {};

for (const product of PRODUCTS) {
  const p = await stripe("products", {
    name: product.name,
    statement_descriptor: DESCRIPTOR,
    metadata: { project: PROJECT, group: product.key },
  });
  console.log(`✓ Product  ${product.name}  (${p.id})`);

  for (const price of product.prices) {
    const isOnce = price.interval === "once";
    const priceObj = await stripe("prices", {
      product: p.id,
      currency: "twd",
      unit_amount: twd(price.ntd),
      ...(isOnce ? {} : { recurring: { interval: price.interval } }),
      metadata: { project: PROJECT, slug: price.key },
    });

    const linkBody = {
      line_items: [{ price: priceObj.id, quantity: 1 }],
      metadata: { project: PROJECT, slug: price.key },
      after_completion: {
        type: "hosted_confirmation",
        hosted_confirmation: { custom_message: CONFIRM_MSG },
      },
    };
    if (isOnce) {
      linkBody.customer_creation = "always";
      linkBody.payment_intent_data = {
        statement_descriptor: DESCRIPTOR,
        metadata: { project: PROJECT, slug: price.key },
      };
    } else {
      linkBody.subscription_data = { metadata: { project: PROJECT, slug: price.key } };
    }

    const link = await stripe("payment_links", linkBody);
    results[price.key] = link.url;
    console.log(
      `   • ${price.key.padEnd(14)} NT$${String(price.ntd).padStart(6)} ${
        isOnce ? "一次" : price.interval === "year" ? "年繳" : "月繳"
      }  →  ${link.url}`
    );
  }
}

console.log(`\n========== 貼進 data/support-plans.ts 的 stripeUrl ==========\n`);
console.log(JSON.stringify(results, null, 2));
console.log(`\n(${LIVE ? "正式 LIVE" : "測試 TEST"} 連結;測試卡號 4242 4242 4242 4242,任意未來到期日 + 任意 CVC)\n`);
