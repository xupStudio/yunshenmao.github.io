import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "支持我們",
  description:
    "幾種方式支持雲深貓舍：購買商品、寄送物資、或在粉專留下鼓勵。",
};

export default function SupportPage() {
  return (
    <div className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Ways to Support
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">支持我們</h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          不管是五十塊錢的一包飼料、還是一張寫給朋友的明信片 —
          每一份心意都在讓這座山繼續運作下去。
        </p>
      </header>

      <section className="container-wide mt-16 grid gap-8 md:grid-cols-3">
        <SupportCard
          tag="一"
          title="購買商品"
          body="拍立得、明信片、2026 年貓咪日曆即將上架。每一份收入扣除必要成本後，全數用於飼料、貓砂與醫療。"
          cta={{ href: "/shop/", label: "逛小舖" }}
        />
        <SupportCard
          tag="二"
          title="寄送物資"
          body="山上最需要的是貓飼料、貓砂、罐頭、貓用除蚤藥。因山區環境特殊，寄送地址改為私下提供，請先私訊師父取得。"
          cta={{ href: "#address", label: "如何取得地址 ↓" }}
        />
        <SupportCard
          tag="三"
          title="領養或轉貼"
          body="如果你家有空間再塞一隻毛孩，或是可以幫忙把雲深的故事分享出去 — 這比一百塊捐款更有力量。"
          cta={{
            href: "https://www.facebook.com/profile.php?id=61579639902271",
            label: "看送養資訊 ↗",
            external: true,
          }}
        />
      </section>

      {/* Needs list */}
      <section className="mt-16 md:mt-24 bg-beige/80 py-14 md:py-16">
        <div className="container-wide">
          <div className="container-prose text-center mb-10">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              山上的需求
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">現在最需要什麼</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto md:grid-cols-4">
            <NeedItem name="貓飼料" note="各品牌皆可，成貓用" />
            <NeedItem name="豆腐砂 / 礦砂" note="用量很大，最缺" />
            <NeedItem name="濕食罐頭" note="年長貓咪需要" />
            <NeedItem name="除蚤滴劑" note="山上蟲多" />
            <NeedItem name="醫療費" note="TNR、急症、傷殘照護" />
            <NeedItem name="乾淨毛巾" note="擦拭與保暖" />
            <NeedItem name="貓砂盆" note="替換耗損" />
            <NeedItem name="外出籠" note="送醫運輸用" />
          </div>
        </div>
      </section>

      {/* Shipping address — gated via private contact */}
      <section id="address" className="mt-16 md:mt-24 container-prose scroll-mt-24">
        <div className="rounded-sm border border-ink/15 bg-cream p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint text-center">
            How to Get the Address
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">如何取得寄送地址</h2>
          <p className="mt-6 text-ink-soft leading-relaxed text-center">
            為保護師父的山上日常，寄送地址改以私下提供。
            請先透過 FB 粉專私訊師父，告知您想寄送的物品與大致份量，
            師父會回覆詳細地址與注意事項。
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://www.facebook.com/profile.php?id=61579639902271"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              私訊師父取得地址 ↗
            </a>
          </div>
          <div className="mt-8 rounded-sm bg-beige/60 p-5 text-sm text-ink-soft leading-relaxed">
            <p className="font-serif text-ink mb-2">為什麼要先私訊？</p>
            <ul className="space-y-1.5">
              <li>· 山上有時不方便收件（師父下山、天氣惡劣、急症送醫）</li>
              <li>· 某些物資可能當月已足夠，師父會幫您轉介更需要的項目</li>
              <li>· 大型物品的物流需要事先協調</li>
              <li>· 避免地址被濫用或引來不必要的訪客</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Transparency pledge */}
      <section className="mt-16 container-prose">
        <div className="rounded-sm border border-ink/15 bg-cream p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint text-center">
            我們的承諾
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">透明帳目</h2>
          <ul className="mt-8 space-y-4 leading-relaxed text-ink-soft">
            <li className="flex gap-3">
              <span className="font-serif text-earth">·</span>
              每月公開當月收入、支出明細
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth">·</span>
              醫療帳單與飼料發票保留電子檔
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth">·</span>
              送養紀錄定期更新 —
              十年累計超過 100 隻
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth">·</span>
              商品收入扣除必要成本（印製、包裝、運費、金流手續費）後，全數用於貓咪，無中間抽成
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink-faint text-center">
            ※ 雲深貓舍目前為個人經營，尚未立案為法人協會，
            因此暫時無法開立可減稅的捐款收據。
            所有支持建議以「購買商品」或「物資寄送」方式進行。
          </p>
        </div>
      </section>

      {/* FAQ — 直接匯款的提問 */}
      <section className="mt-10 container-prose">
        <details className="group rounded-sm border border-ink/10 bg-paper p-5 sm:p-6 text-sm leading-relaxed">
          <summary className="cursor-pointer list-none font-serif text-ink flex items-center justify-between gap-4">
            <span>常被問到：可以直接匯款給師父嗎？</span>
            <span aria-hidden className="text-ink-faint transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-5 space-y-3 text-ink-soft">
            <p>
              我們目前尚未立案為協會，
              <strong className="text-ink">網站上不公開帳號</strong>。
              如果您確實希望以這種方式支持，歡迎在 FB 粉專私訊師父，會由師父本人一對一回覆。
            </p>
            <p className="text-ink-faint">
              ※ 此類支持無法開立可抵稅收據，也不會列入網站每月公開的帳目。
              建議優先考慮「購買商品」或「寄送物資」這兩個可追蹤的方式。
            </p>
          </div>
        </details>
      </section>

      {/* Contact */}
      <section className="mt-16 md:mt-24 container-prose text-center">
        <p className="text-ink-soft leading-relaxed">
          有任何想聊的，歡迎在 FB 粉專私訊師父。
        </p>
        <div className="mt-6">
          <a
            href="https://www.facebook.com/profile.php?id=61579639902271"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            前往 FB 粉專 ↗
          </a>
        </div>
      </section>
    </div>
  );
}

function SupportCard({
  tag,
  title,
  body,
  cta,
}: {
  tag: string;
  title: string;
  body: string;
  cta: { href: string; label: string; external?: boolean };
}) {
  return (
    <div className="flex flex-col rounded-sm border border-ink/10 bg-cream p-8">
      <p className="font-serif text-sm tracking-widest text-earth">{tag}</p>
      <h3 className="mt-3 font-serif text-2xl">{title}</h3>
      <p className="mt-4 text-ink-soft leading-relaxed grow">{body}</p>
      <div className="mt-6">
        {cta.external ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink underline underline-offset-4 hover:text-earth"
          >
            {cta.label}
          </a>
        ) : (
          <Link
            href={cta.href}
            className="text-sm text-ink underline underline-offset-4 hover:text-earth"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function NeedItem({ name, note }: { name: string; note: string }) {
  return (
    <div className="rounded-sm border border-ink/10 bg-paper px-4 py-4 text-center">
      <div className="font-serif text-lg">{name}</div>
      <div className="mt-1 text-xs text-ink-faint">{note}</div>
    </div>
  );
}
