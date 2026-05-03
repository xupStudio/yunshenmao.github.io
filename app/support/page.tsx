import Image from "next/image";
import type { Metadata } from "next";
import { needCategories, supplyLink, type NeedItem } from "@/data/needs";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

export const metadata: Metadata = {
  title: "如何幫助",
  description:
    "雲深貓舍目前由師父個人經營。最直接的支持方式是寄送師父正在使用的飼料、貓砂與藥品；想以其他方式支持，歡迎私訊師父粉專。",
};

export default function SupportPage() {
  return (
    <div className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          How to Help
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">如何幫助</h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          山上 80 多隻貓、14 間獨立的房間，
          其中 11 隻泌尿結石、20 多個慢性病要長期投藥 ——
          師父一個人扛了十年。<br />
          下面這份清單，是她真的在買、真的會用到的東西。
        </p>
      </header>

      {/* Two paths overview */}
      <section className="container-wide mt-16 grid gap-6 md:grid-cols-2">
        <div className="group flex flex-col overflow-hidden rounded-sm border-2 border-sage bg-sage/15 transition hover:bg-sage/25">
          <div className="bg-sage px-8 py-3 font-serif text-xs tracking-[0.25em] text-cream">
            最直接 · MOST DIRECT
          </div>
          <div className="flex flex-col grow p-8">
            <h2 className="font-serif text-2xl md:text-3xl text-ink">
              寄送物資
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed grow">
              從下方清單挑師父正在用的飼料、貓砂或藥品，
              到蝦皮下單寄到山上的地址即可。
              這是對山上最直接、也最沒有金流爭議的支持方式。
            </p>
            <a
              href="#supplies"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-sage px-6 py-3 text-sm text-cream transition hover:bg-ink"
            >
              看物資清單 ↓
            </a>
          </div>
        </div>

        <div className="group flex flex-col overflow-hidden rounded-sm border-2 border-earth bg-warm/20 transition hover:bg-warm/30">
          <div className="bg-earth px-8 py-3 font-serif text-xs tracking-[0.25em] text-cream">
            其他方式 · OTHER WAYS
          </div>
          <div className="flex flex-col grow p-8">
            <h2 className="font-serif text-2xl md:text-3xl text-ink">
              私訊師父
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed grow">
              想以其他方式支持？
              <strong className="text-ink">
                請直接到師父的 FB 粉專私訊聯繫。
              </strong>
              因雲深貓舍目前為個人經營，網站上不公開金流方式 —
              想出力、想討論、想了解山上現況的，師父都會親自回覆。
            </p>
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-earth px-6 py-3 text-sm text-cream transition hover:bg-earth-deep"
            >
              前往粉專私訊 ↗
            </a>
          </div>
        </div>
      </section>

      {/* Supplies list — main content */}
      <section id="supplies" className="mt-20 md:mt-28 scroll-mt-24">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            What the Mountain Actually Needs
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">山上正在用的東西</h2>
          <p className="mt-6 text-ink-soft leading-relaxed">
            以下品牌是從師父粉專貼文裡整理出來的「實際採購紀錄」 —
            不是憑空列的願望清單，是真的每天會見底的耗品。
            點任何一項都會帶你到蝦皮搜尋頁，挑信任的賣家下單，
            收件地址請先私訊師父取得。
          </p>
        </div>

        {/* Why specific brands matter */}
        <div className="container-prose mt-10">
          <div className="rounded-sm border-l-4 border-earth bg-warm/10 px-5 py-4 sm:px-6 sm:py-5 leading-relaxed text-ink-soft">
            <p className="font-serif text-ink mb-2">
              為什麼一定要吃這些品牌？
            </p>
            <p className="text-sm">
              山上很多貓在被收進來之前，都在外面吃廚餘吃了好幾年 ——
              太鹹、太油、營養不均。
              到了師父這裡，腎和膀胱大多已經有狀況：
              <strong className="text-ink">
                11 隻泌尿結石、1 隻腎萎縮的牛牛、20 多隻慢性病
              </strong>。
              這就是為什麼處方飼料和特定品牌的肉泥不能隨便換 ——
              換一款，可能就會拉肚子、可能就會回不來。
            </p>
          </div>
        </div>

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
                <p className="mt-4 max-w-prose text-ink-soft leading-relaxed">
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
      </section>

      {/* Other supplies — non-product items */}
      <section className="mt-20 container-wide">
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
      </section>

      {/* How to get the address */}
      <section
        id="address"
        className="mt-20 md:mt-28 container-prose scroll-mt-24"
      >
        <div className="rounded-sm border border-ink/15 bg-cream p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint text-center">
            How to Get the Address
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">
            如何取得寄送地址
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed text-center">
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
          <div className="mt-8 rounded-sm bg-beige/60 p-5 text-sm text-ink-soft leading-relaxed">
            <p className="font-serif text-ink mb-2">為什麼要先私訊？</p>
            <ul className="space-y-1.5">
              <li>· 某些品項當月可能已經足夠，師父會幫您轉介更急的項目</li>
              <li>· 山上有時不方便收件（下山辦事、天氣惡劣、急症送醫）</li>
              <li>· 大型物品的物流需要事先協調</li>
              <li>· 避免地址被濫用或引來不必要的訪客</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Other ways to support — re-emphasize, bold dark treatment */}
      <section className="mt-16 md:mt-20 container-wide">
        <div className="overflow-hidden rounded-sm bg-ink text-cream">
          <div className="grid gap-0 md:grid-cols-[1fr,auto] md:items-center">
            <div className="px-6 py-10 sm:px-10 md:py-12 md:pr-0">
              <p className="font-serif text-xs tracking-[0.25em] text-warm">
                WANT TO HELP IN OTHER WAYS?
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl text-cream">
                想以其他方式支持？
              </h2>
              <p className="mt-5 leading-relaxed text-cream/80">
                因雲深貓舍目前為個人經營、尚未立案為協會，
                <strong className="text-cream">
                  網站上不會公開帳號或金流連結
                </strong>。
                如果您希望以其他方式支持，
                <strong className="text-cream">
                  請直接到師父的 FB 粉專私訊
                </strong>
                — 師父會親自回覆，由她判斷最合適的方式。
              </p>
              <p className="mt-5 text-xs text-cream/60 leading-relaxed">
                ※ 此類支持無法開立可抵稅收據（個人經營未立案），
                也不會列入網站每月公開的物資紀錄。
              </p>
            </div>
            <div className="border-t border-cream/15 px-6 py-8 md:border-l md:border-t-0 md:px-10 md:py-12">
              <a
                href={FB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-warm px-8 py-4 font-serif text-base text-ink transition hover:bg-cream"
              >
                私訊師父 ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency pledge */}
      <section className="mt-16 container-prose">
        <div className="rounded-sm border border-ink/15 bg-paper p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint text-center">
            我們的承諾
          </p>
          <h2 className="mt-3 text-center text-2xl md:text-3xl">
            收到後會做的事
          </h2>
          <ul className="mt-8 space-y-4 leading-relaxed text-ink-soft">
            <li className="flex gap-3">
              <span className="font-serif text-earth shrink-0">·</span>
              每一批物資送達後，師父會在 FB 粉專拍照記錄、標註是誰寄的（如您同意具名）
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth shrink-0">·</span>
              送養紀錄定期更新 — 十年累計超過 100 隻
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth shrink-0">·</span>
              醫療帳單與重要採購收據保留電子檔，可隨時查詢
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-earth shrink-0">·</span>
              我們相信「透明」是讓善意能走得久的唯一方法
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink-faint text-center leading-relaxed">
            ※ 雲深貓舍目前為個人經營，尚未立案為法人協會，
            因此暫時無法開立可減稅的捐款收據。
          </p>
        </div>
      </section>
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
