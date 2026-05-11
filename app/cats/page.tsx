import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cats } from "@/data/cats";

export const metadata: Metadata = {
  title: "待認養貓咪 — 雲深貓園",
  description:
    "雲深貓園南投山上 80+ 隻貓全部待認養。包含米米、墨墨、拿鐵、雲朵、花花、奶油、乳牛…等。歡迎填寫認養表單與師父安排上山見面。",
  alternates: { canonical: "/cats/" },
  openGraph: {
    title: "待認養貓咪 — 雲深貓園",
    description: "南投山上 80+ 隻貓全部待認養。",
    url: "https://yunshenmao.com/cats/",
    type: "website",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "雲深貓園待認養貓咪",
  url: "https://yunshenmao.com/cats/",
  description: "南投山上 80+ 隻貓全部待認養。",
  inLanguage: "zh-Hant",
  hasPart: cats.map((c) => ({
    "@type": "CreativeWork",
    name: c.name,
    description: c.appearance,
    url: `https://yunshenmao.com/cats/${c.slug}/`,
    image: `https://yunshenmao.com${c.coverImage}`,
  })),
};

export default function CatsPage() {
  return (
    <div className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Cats Looking for Home
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">待認養貓咪</h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          山上 80+ 隻全部待認養。
          如果您有看到喜愛的毛孩，歡迎填表單來山上的貓園與牠們互動 ——
          牠們都渴望有個家。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/adopt/" className="btn-primary">
            填寫認養表單
          </Link>
          <a
            href="https://www.facebook.com/profile.php?id=61579639902271"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            FB 私訊師父 ↗
          </a>
        </div>
      </header>

      <section className="container-wide mt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/cats/${cat.slug}/`}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
                <Image
                  src={cat.coverImage}
                  alt={`${cat.name}（${cat.appearance}）— 雲深貓園待認養`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs text-ink">
                  待認養
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xs tracking-widest text-ink-faint">
                    No.{cat.no}
                  </span>
                  <h2 className="font-serif text-2xl">{cat.name}</h2>
                </div>
                <p className="mt-1 text-sm text-ink-faint">{cat.appearance}</p>
                {cat.note && (
                  <p className="mt-2 text-ink-soft text-sm">{cat.note}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-prose mt-16 md:mt-24 text-center">
        <hr className="hair-rule mb-8" />
        <p className="text-sm text-ink-faint">
          照片數量會陸續增加。同一隻貓可能會有好幾張不同角度的照片，方便你判斷個性與外觀。
        </p>
      </section>
    </div>
  );
}
