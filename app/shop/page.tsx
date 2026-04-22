import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  creativeProducts,
  suppliesProducts,
  type Product,
} from "@/data/products";

export const metadata: Metadata = {
  title: "山下小舖",
  description:
    "雲深貓舍的山下小舖。每一份商品的收入，扣除必要成本後全數用於山上的飼料、貓砂與醫療。",
};

export default function ShopPage() {
  return (
    <div className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          The Shop
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">山下小舖</h1>
        <p className="mt-6 font-serif text-xl md:text-2xl text-earth-deep tracking-wider">
          帶一份回家　寄一份上山
        </p>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          不論你想把貓咪帶回家陪你、還是直接讓物資上山 —
          每一份消費的收入都會回到山上的日常開銷，每月在日誌裡公開帳目。
        </p>
      </header>

      {/* Coming soon banner */}
      <div className="container-wide mt-12">
        <div className="rounded-sm border border-earth/30 bg-cream p-6 text-center">
          <p className="font-serif text-lg text-earth-deep">即將開張</p>
          <p className="mt-2 text-sm text-ink-soft">
            商品正在準備中，預計於
            <strong className="text-ink">金流審核完成後</strong>（約 2 週內）上線。
            歡迎先逛逛，或是追蹤{" "}
            <a
              href="https://www.facebook.com/profile.php?id=61579639902271"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-earth"
            >
              FB 粉專
            </a>{" "}
            取得開賣通知。
          </p>
        </div>
      </div>

      {/* 山上的物資 — 寄到山上 */}
      <section className="container-wide mt-16 md:mt-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              Ship to the Mountain
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">山上的物資</h2>
            <p className="mt-3 max-w-prose text-ink-soft">
              購買後由我們代為寄到南投山上，
              <strong className="text-ink">直接進到師父手上</strong>。
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {suppliesProducts.map((product) => (
            <SuppliesCard key={product.slug} product={product} />
          ))}
        </div>

        {/* 寄送透明承諾 */}
        <div className="mt-10 rounded-sm border border-sage/30 bg-sage/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="shrink-0">
              <p className="font-serif text-sm tracking-widest text-sage">
                Transparency
              </p>
              <h3 className="mt-2 font-serif text-xl md:text-2xl">
                寄到山上之後會發生的事
              </h3>
            </div>
            <ol className="flex-1 space-y-4 text-ink-soft leading-relaxed">
              <li className="flex gap-3">
                <span className="shrink-0 font-serif text-earth">01</span>
                <span>
                  每一批物資送到山上後，我們會在{" "}
                  <a
                    href="https://www.facebook.com/profile.php?id=61579639902271"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline underline-offset-4 hover:text-earth"
                  >
                    FB 粉專
                  </a>{" "}
                  公開拍照、標註是誰寄的（如果您同意具名）。
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-serif text-earth">02</span>
                <span>
                  結帳完成後，我們會把這筆購買的收據、物資實際送達的照片、加上
                  <strong className="text-ink">一張當日隨機的貓咪近況照片</strong>
                  ，一起寄到您結帳時留下的信箱。
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-serif text-earth">03</span>
                <span>
                  每月底在日誌頁會公開當月所有「寄到山上」的總量與對照 ——
                  讓善意有跡可循。
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 文創小物 — 寄給買家 */}
      <section className="container-wide mt-16 md:mt-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              Keep-at-Home Goods
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">文創小物</h2>
            <p className="mt-3 max-w-prose text-ink-soft">
              寄給你、放在家裡陪你的貓咪小物。帶一隻貓回家。
            </p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {creativeProducts.map((product) => (
            <CreativeCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Why buying helps */}
      <section className="mt-16 md:mt-24 bg-beige/80 py-14 md:py-16">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            為什麼是「買」而不是「捐」
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl">
            因為我們想給的不只是錢，而是一份陪伴
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            當你把一張雲朵的拍立得放在桌上、
            當你翻到日曆上阿虎歪頭的那一個月、
            當你選「寄一箱罐頭上山」讓師父不用再跑一趟倉儲 —
            這些都是一份穩定的、讓山上持續運作的力量。
          </p>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 container-prose text-center">
        <Link href="/support/" className="btn-ghost">
          還有其他支持方式
        </Link>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * 文創小物卡片（單一售價）
 * ───────────────────────────────────────────────────────── */
function CreativeCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.status === "coming-soon" && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] tracking-widest text-cream">
            COMING SOON
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-col grow">
        <h3 className="font-serif text-2xl">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-faint">{product.subtitle}</p>
        <p className="mt-4 text-ink-soft leading-relaxed grow">
          {product.description}
        </p>
        <div className="mt-6 flex items-end justify-between">
          <span className="font-serif text-2xl text-ink">
            NT$ {product.price}
          </span>
          <button
            disabled
            className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink-faint cursor-not-allowed"
          >
            即將開賣
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * 山上物資卡片（三段份量可選）
 * ───────────────────────────────────────────────────────── */
function SuppliesCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col rounded-sm border border-ink/10 bg-cream overflow-hidden">
      <div className="relative aspect-[4/3] bg-beige">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-sage/90 px-3 py-1 text-[10px] tracking-widest text-cream">
          <span aria-hidden>↑</span> 直接寄到山上
        </span>
      </div>
      <div className="flex flex-col grow p-6">
        <h3 className="font-serif text-2xl">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-faint">{product.subtitle}</p>
        <p className="mt-4 text-ink-soft leading-relaxed">
          {product.description}
        </p>

        <ul className="mt-6 divide-y divide-ink/10 rounded-sm border border-ink/10">
          {product.tiers?.map((tier) => (
            <li
              key={tier.slug}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div>
                <div className="font-serif text-base text-ink">{tier.name}</div>
                <div className="text-xs text-ink-faint mt-0.5">
                  {tier.quantity}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-serif text-lg text-ink">
                  NT$ {tier.price}
                </span>
                <button
                  disabled
                  aria-label={`選購 ${tier.name}`}
                  className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink-faint cursor-not-allowed"
                >
                  即將開賣
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-ink-faint leading-relaxed">
          ※ 購買後由雲深貓舍代為寄送至南投山上，不會寄到您的地址。
          結帳完成後，我們會把收據、物資照和一張隨機的貓咪近況寄到您的信箱。
        </p>
      </div>
    </div>
  );
}
