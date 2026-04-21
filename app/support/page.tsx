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
          body="拍立得、明信片、2026 年貓咪日曆即將上架。每一份收入 100% 用於飼料、貓砂與醫療。"
          cta={{ href: "/shop/", label: "逛小舖" }}
        />
        <SupportCard
          tag="二"
          title="寄送物資"
          body="山上最需要的是貓飼料、貓砂、罐頭、貓用除蚤藥。你可以直接下單寄到山上，收件人請寫「道願師」。"
          cta={{ href: "#address", label: "查看寄送地址 ↓" }}
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

      {/* Shipping address */}
      <section id="address" className="mt-16 md:mt-24 container-prose scroll-mt-24">
        <div className="rounded-sm border border-ink/15 bg-cream p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint text-center">
            Shipping Address
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">寄送地址</h2>
          <dl className="mt-8 space-y-5">
            <div className="grid grid-cols-[4rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-4 items-baseline">
              <dt className="text-sm text-ink-faint">收件人</dt>
              <dd className="font-serif text-lg text-ink">道願師</dd>
            </div>
            <div className="grid grid-cols-[4rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-4 items-baseline">
              <dt className="text-sm text-ink-faint">地址</dt>
              <dd className="font-serif text-base sm:text-lg text-ink leading-relaxed break-words">
                544 南投縣國姓鄉長豐村東三巷 3-3 號
              </dd>
            </div>
            <div className="grid grid-cols-[4rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-4 items-baseline">
              <dt className="text-sm text-ink-faint">電話</dt>
              <dd className="text-ink">
                <span className="font-serif text-lg" aria-label="電話號碼">
                  0919&#8209;007&#8209;631
                </span>
                <p className="mt-1 text-xs text-ink-faint">
                  非緊急事項建議先透過 FB 粉專私訊師父，避免打擾山上的日常。
                </p>
              </dd>
            </div>
          </dl>
          <div className="mt-8 rounded-sm bg-beige/60 p-5 text-sm text-ink-soft leading-relaxed">
            <p className="font-serif text-ink mb-2">寄送小提醒</p>
            <ul className="space-y-1.5">
              <li>· 飼料、貓砂、罐頭可直接宅配到上述地址</li>
              <li>· 請於包裹上註明收件人「道願師」，超商取貨也可</li>
              <li>· 山區有時投遞不穩，大型物品建議先私訊確認</li>
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
              所有商品收入 100% 用於貓咪，沒有任何中間抽成
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink-faint text-center">
            ※ 雲深貓舍目前為個人經營，尚未立案為法人協會，
            因此暫時無法開立可減稅的捐款收據。
            所有支持建議以「購買商品」或「物資寄送」方式進行。
          </p>
        </div>
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
