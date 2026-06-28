import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { needCategories, supplyLink, type NeedItem } from "@/data/needs";
import {
  subscriptionTiers,
  oneTimeOptions,
  oneTimePerks,
  CURRENCY,
  type SupportTier,
} from "@/data/support-plans";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

const WAYS = [
  { no: "01", href: "#subscribe", label: "月報訂閱", desc: "每月一封山上月報" },
  { no: "02", href: "#supplies", label: "寄送物資", desc: "蝦皮下單寄到山上" },
  { no: "03", href: "#contact", label: "其他方式", desc: "私訊師父" },
];

export const metadata: Metadata = {
  title: "如何幫助 — 月報訂閱、寄送物資、私訊師父",
  description:
    "支持雲深貓園的三種方式:訂閱「山上月報」會員、寄送師父正在用的物資（皇家 LP34、佳寶肉泥、豆腐砂等），或私訊師父討論認養與其他合作。",
  alternates: { canonical: "/support/" },
  openGraph: {
    title: "如何幫助雲深貓園 — 月報訂閱與物資清單",
    description:
      "三種方式陪山上走下去:月報訂閱、寄送物資、私訊師父。",
    url: "https://yunshenmao.com/support/",
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "我可以怎麼幫助雲深貓園？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "三種方式:訂閱「山上月報」會員、從清單挑師父正在用的物資到蝦皮下單寄到山上、或直接私訊師父討論認養與其他支持。寄送地址請先到 FB 粉專私訊取得。",
      },
    },
    {
      "@type": "Question",
      name: "為什麼一定要吃指定的品牌？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "山上很多貓在被收進來之前長期吃廚餘，腎和膀胱多已經有狀況：11 隻泌尿結石、1 隻腎萎縮、20 多隻慢性病。處方飼料和特定品牌的肉泥不能隨便換，換一款可能就會拉肚子。",
      },
    },
    {
      "@type": "Question",
      name: "寄送地址在哪裡？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "為保護師父山上的日常，寄送地址改以私下提供。請先到 Facebook 粉專私訊師父，告知您想寄送的品項與大致份量，師父會回覆詳細地址與注意事項。",
      },
    },
    {
      "@type": "Question",
      name: "可以開立可抵稅的捐款收據嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "雲深貓園目前為個人經營，尚未立案為法人協會，因此無法開立可減稅的捐款收據。月報訂閱屬付費內容訂閱（非捐款），由 XUPLABS LLC 收款並提供交易收據，但同樣不是抵稅捐款收據。",
      },
    },
    {
      "@type": "Question",
      name: "月報訂閱是什麼？可以取消嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "月報訂閱是付費的內容訂閱：每月會收到一封「山上月報」email，記錄山上貓咪的近況、照護日常與未公開的照片。訂閱會依週期自動續扣，可隨時取消，取消後不再扣款；如於訂閱後七日內不滿意，可來信申請退費。",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "雲深貓園物資清單",
  description: "南投山上 80 多隻貓實際每日使用的飼料、罐頭、貓砂與醫療用品。",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: needCategories.flatMap((cat, ci) =>
    cat.items.map((item, ii) => ({
      "@type": "ListItem",
      position: ci * 100 + ii + 1,
      name: `${item.name}${item.variant ? ` (${item.variant})` : ""}`,
      description: item.use,
      url: supplyLink(item.searchQuery),
    }))
  ),
};

export default function SupportPage() {
  return (
    <div className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ---------- Header ---------- */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          How to Help
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">如何幫助</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          山上 80 多隻貓、14 間獨立的房間，
          其中 11 隻泌尿結石、20 多個慢性病要長期投藥 ——
          師父一個人扛了十年。
          <br />
          你可以用下面三種方式，陪山上一起走下去。
        </p>
      </header>

      {/* ---------- Ways index ---------- */}
      <nav className="container-wide mt-12 grid gap-3 sm:grid-cols-3">
        {WAYS.map((w) => (
          <a
            key={w.href}
            href={w.href}
            className="group flex items-center gap-4 rounded-sm border border-ink/15 bg-paper p-5 transition hover:border-earth/40 hover:bg-cream sm:flex-col sm:gap-2 sm:py-7 sm:text-center"
          >
            <span className="font-serif text-3xl leading-none text-ink/20 transition group-hover:text-earth">
              {w.no}
            </span>
            <span>
              <span className="block font-serif text-lg text-ink">
                {w.label}
              </span>
              <span className="mt-0.5 block text-xs text-ink-faint">
                {w.desc}
              </span>
            </span>
          </a>
        ))}
      </nav>

      {/* ---------- 01 · Monthly report subscription ---------- */}
      <section id="subscribe" className="mt-20 scroll-mt-24 md:mt-28">
        <WayHeader no="01" eyebrow="Monthly Report Membership" title="月報訂閱">
          訂閱雲深貓園的「山上月報」—— 每個月一封 email，記錄山上的貓、照護日常，
          以及不會公開在網站上的照片。這是付費的內容訂閱，三個方案內容相同，
          依你能負擔的金額選擇即可。
        </WayHeader>

        <div className="container-wide mt-12 grid gap-6 md:grid-cols-3">
          {subscriptionTiers.map((tier) => (
            <TierCard key={tier.slug} tier={tier} />
          ))}
        </div>

        <div className="container-prose mt-8 space-y-6">
          {/* One-time */}
          <div className="rounded-sm border border-ink/15 bg-beige/60 p-6 text-center sm:p-8">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              One-time
            </p>
            <h3 className="mt-2 font-serif text-xl md:text-2xl">單次贊助</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              不想固定訂閱，也可以單次贊助。會收到：{oneTimePerks.join("、")}。
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {oneTimeOptions.map((o) => (
                <a
                  key={o.slug}
                  href={o.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  單次 {CURRENCY}
                  {o.price.toLocaleString()} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Compliance / disclosure */}
          <p className="text-center text-xs leading-relaxed text-ink-faint">
            ※ 以上為對{" "}
            <strong className="text-ink-soft">XUPLABS LLC</strong> 的付費內容訂閱
            / 認養贊助，
            <strong className="text-ink-soft">非捐款</strong>，
            無法開立可抵稅收據。訂閱會依週期（每月或每年）自動續扣，直到你取消；
            可隨時於 Stripe 寄給你的 email 點「管理訂閱」取消，取消後不再扣款。
            如於訂閱後七日內不滿意，可來信申請退費。信用卡帳單明細會顯示為{" "}
            <strong className="text-ink-soft">YUNSHENMAO</strong>。詳見{" "}
            <a
              href="/terms/"
              className="underline underline-offset-4 hover:text-earth"
            >
              使用條款
            </a>
            。
          </p>
        </div>
      </section>

      {/* ---------- 02 · Supplies ---------- */}
      <section id="supplies" className="mt-24 scroll-mt-24 md:mt-32">
        <WayHeader no="02" eyebrow="What the Mountain Needs" title="寄送物資">
          以下品牌是從師父粉專貼文整理出來的「實際採購紀錄」—— 不是憑空的願望清單，
          是真的每天會見底的耗品。點任何一項都會帶你到蝦皮搜尋頁，挑信任的賣家下單。
        </WayHeader>

        {/* Why specific brands matter */}
        <div className="container-prose mt-10">
          <div className="rounded-sm border-l-4 border-earth bg-warm/10 px-5 py-4 leading-relaxed text-ink-soft sm:px-6 sm:py-5">
            <p className="mb-2 font-serif text-ink">為什麼一定要吃這些品牌？</p>
            <p className="text-sm">
              山上很多貓在被收進來之前，都在外面吃廚餘吃了好幾年 ——
              太鹹、太油、營養不均。到了師父這裡，腎和膀胱大多已經有狀況：
              <strong className="text-ink">
                11 隻泌尿結石、1 隻腎萎縮的牛牛、20 多隻慢性病
              </strong>
              。這就是為什麼處方飼料和特定品牌的肉泥不能隨便換 ——
              換一款，可能就會拉肚子、可能就會回不來。
            </p>
          </div>
        </div>

        {/* Category grids */}
        <div className="container-wide mt-12 space-y-12">
          {needCategories.map((cat) => (
            <div key={cat.slug}>
              <div className="flex items-baseline gap-4 border-b border-ink/15 pb-3">
                <h3 className="font-serif text-2xl md:text-3xl">{cat.title}</h3>
                <p className="font-serif text-xs tracking-widest text-ink-faint">
                  {cat.english}
                </p>
              </div>
              {cat.intro && (
                <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
                  {cat.intro}
                </p>
              )}
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <NeedRow key={item.slug} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Other useful items */}
        <div className="container-wide mt-12">
          <div className="rounded-sm border border-ink/15 bg-beige/60 p-6 sm:p-8">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              Other Useful Items
            </p>
            <h3 className="mt-2 font-serif text-xl md:text-2xl">
              另外山上也用得到
            </h3>
            <ul className="mt-5 grid gap-2 text-ink-soft sm:grid-cols-2 md:grid-cols-3">
              <li>· 乾淨毛巾（擦拭、保暖）</li>
              <li>· 貓砂盆（耗損替換）</li>
              <li>· 外出籠（送醫運輸）</li>
              <li>· 紙箱、寵物尿布墊</li>
              <li>· 不鏽鋼食盆、水盆</li>
              <li>· 犬貓營養品 / 益生菌</li>
            </ul>
            <p className="mt-4 text-xs text-ink-faint">
              不確定要寄什麼，或想寄大型物品（例如貓籠、層架），
              建議先私訊師父確認當月需求與寄送方式。
            </p>
          </div>
        </div>

        {/* How to get the address — folded into the supplies flow */}
        <div id="address" className="container-prose mt-12 scroll-mt-24">
          <div className="rounded-sm border border-ink/15 bg-cream p-6 sm:p-8 md:p-10">
            <p className="text-center font-serif text-sm tracking-widest text-ink-faint">
              How to Get the Address
            </p>
            <h3 className="mt-3 text-center font-serif text-2xl md:text-3xl">
              如何取得寄送地址
            </h3>
            <p className="mt-6 text-center leading-relaxed text-ink-soft">
              為保護師父的山上日常，寄送地址改以私下提供。
              請先到 FB 粉專私訊師父，告知您想寄送的品項與大致份量，
              師父會回覆詳細地址與注意事項。
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={FB_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                私訊師父取得地址 ↗
              </a>
            </div>
            <div className="mt-8 rounded-sm bg-beige/60 p-5 text-sm leading-relaxed text-ink-soft">
              <p className="mb-2 font-serif text-ink">為什麼要先私訊？</p>
              <ul className="space-y-1.5">
                <li>· 某些品項當月可能已經足夠，師父會幫您轉介更急的項目</li>
                <li>· 山上有時不方便收件（下山辦事、天氣惡劣、急症送醫）</li>
                <li>· 大型物品的物流需要事先協調</li>
                <li>· 避免地址被濫用或引來不必要的訪客</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 03 · Other ways / contact ---------- */}
      <section id="contact" className="mt-24 scroll-mt-24 md:mt-32">
        <WayHeader no="03" eyebrow="Other Ways" title="其他方式">
          想討論認養、提供協助，或有其他不便在線上完成的支持方式？
          歡迎直接到師父的 FB 粉專私訊 —— 師父會親自回覆，由她判斷最合適的方式。
        </WayHeader>
        <div className="container-prose mt-8 flex justify-center">
          <a
            href={FB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            私訊師父 ↗
          </a>
        </div>
        <p className="container-prose mt-6 text-center text-xs leading-relaxed text-ink-faint">
          ※ 雲深貓園目前為個人經營、尚未立案為協會，無法開立可抵稅收據；
          私訊內容不會出現在網站公開的山上日誌中。
        </p>
      </section>

      {/* ---------- Closing · transparency pledge ---------- */}
      <section className="container-prose mt-24 md:mt-32">
        <div className="rounded-sm border border-ink/15 bg-paper p-6 sm:p-8 md:p-10">
          <p className="text-center font-serif text-sm tracking-widest text-ink-faint">
            我們的承諾
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">收到後會做的事</h2>
          <ul className="mt-8 space-y-4 leading-relaxed text-ink-soft">
            <li className="flex gap-3">
              <span className="shrink-0 font-serif text-earth">·</span>
              每一批物資送達後，師父會在 FB 粉專拍照記錄、標註是誰寄的（如您同意具名），並自動同步到網站的山上日誌
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 font-serif text-earth">·</span>
              送養紀錄定期更新 — 十幾年累計超過 500 隻
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 font-serif text-earth">·</span>
              醫療帳單與重要採購收據保留電子檔，可隨時查詢
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 font-serif text-earth">·</span>
              我們相信「透明」是讓善意能走得久的唯一方法
            </li>
          </ul>
          <p className="mt-8 text-center text-sm leading-relaxed text-ink-faint">
            ※ 雲深貓園目前為個人經營，尚未立案為法人協會，
            因此暫時無法開立可減稅的捐款收據。
          </p>
        </div>
      </section>
    </div>
  );
}

function WayHeader({
  no,
  eyebrow,
  title,
  children,
}: {
  no: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="container-prose text-center">
      <p className="font-serif text-5xl leading-none text-ink/15">{no}</p>
      <p className="mt-3 font-serif text-sm tracking-[0.25em] text-ink-faint">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      <p className="mt-6 leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

function TierCard({ tier }: { tier: SupportTier }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm border-2 border-sage bg-sage/10">
      <div className="bg-sage px-6 py-2.5 font-serif text-xs tracking-[0.2em] text-cream">
        {tier.english}
      </div>
      <div className="flex grow flex-col p-6">
        <h3 className="font-serif text-2xl text-ink">{tier.name}</h3>
        <p className="mt-1 text-sm text-ink-faint">{tier.tagline}</p>
        <p className="mt-4">
          <span className="font-serif text-3xl text-ink">
            {CURRENCY}
            {tier.monthly.price.toLocaleString()}
          </span>
          <span className="text-sm text-ink-faint"> / 月</span>
        </p>
        <ul className="mt-4 grow space-y-2 text-sm leading-relaxed text-ink-soft">
          {tier.perks.map((perk, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 text-earth">·</span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
        <a
          href={tier.monthly.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-sage px-6 py-3 text-sm text-cream transition hover:bg-ink"
        >
          每月訂閱 ↗
        </a>
        <a
          href={tier.yearly.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-center text-xs text-ink-faint underline underline-offset-4 hover:text-earth"
        >
          或年繳 {CURRENCY}
          {tier.yearly.price.toLocaleString()}
        </a>
      </div>
    </div>
  );
}

function NeedRow({ item }: { item: NeedItem }) {
  return (
    <li>
      <a
        href={supplyLink(item.searchQuery)}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-paper transition hover:border-earth/40 hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-beige/60">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <NeedPlaceholder name={item.name} />
          )}
          {item.isPrescription && (
            <span className="absolute right-2 top-2 rounded-full bg-earth px-2.5 py-0.5 text-[10px] tracking-widest text-cream">
              處方
            </span>
          )}
        </div>
        <div className="flex grow flex-col px-4 py-4">
          <span className="font-serif text-base text-ink">{item.name}</span>
          {item.variant && (
            <span className="mt-0.5 text-xs text-ink-faint">{item.variant}</span>
          )}
          <span className="mt-2 grow text-xs leading-relaxed text-ink-soft">
            {item.use}
          </span>
          <span className="mt-3 text-xs text-ink-faint group-hover:text-earth">
            搜尋蝦皮 ↗
          </span>
        </div>
      </a>
    </li>
  );
}

function NeedPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center text-ink-faint">
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M18 30 L24 14 L30 28" />
        <path d="M46 30 L40 14 L34 28" />
        <ellipse cx="32" cy="38" rx="16" ry="13" />
        <circle cx="26" cy="36" r="1.2" fill="currentColor" />
        <circle cx="38" cy="36" r="1.2" fill="currentColor" />
      </svg>
      <p className="mt-3 font-serif text-sm text-ink-soft">{name}</p>
      <p className="mt-1 text-[10px] tracking-widest">商品圖待補</p>
    </div>
  );
}
