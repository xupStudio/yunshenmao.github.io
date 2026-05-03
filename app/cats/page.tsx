import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cats } from "@/data/cats";

export const metadata: Metadata = {
  title: "貓咪們 — 雲深貓舍代表貓介紹",
  description:
    "雲深貓舍的代表貓介紹。每一隻都有自己的故事，每一隻都被師父記在心裡。山上有 80 多隻貓，這六位是各種花色、各種個性的代表。",
  alternates: { canonical: "/cats/" },
  openGraph: {
    title: "貓咪們 — 雲深貓舍代表貓",
    description: "南投山上 80 多隻貓 — 從這六位代表開始認識他們。",
    url: "https://yunshenmao.com/cats/",
    type: "website",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "雲深貓舍代表貓",
  url: "https://yunshenmao.com/cats/",
  description: "南投山上 80 多隻貓中先被介紹的六位代表。",
  inLanguage: "zh-Hant",
  hasPart: cats.map((c) => ({
    "@type": "CreativeWork",
    name: c.name,
    description: c.tagline,
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
          Meet the Cats
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">貓咪們</h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">
          山上有 80 多隻貓，我們先從這六位開始介紹。
          他們是「代表貓」，代表著雲深貓舍裡各種花色、各種個性、各種故事。
          其他貓咪的介紹會陸續上線。
        </p>
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
                  alt={`${cat.name} (${cat.breed}) — 雲深貓舍代表貓`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl">
                    {cat.name}
                    <span className="ml-2 text-sm text-ink-faint font-sans">
                      {cat.romaji}
                    </span>
                  </h2>
                  <span className="text-xs text-ink-faint">{cat.breed}</span>
                </div>
                <p className="mt-2 text-ink-soft">{cat.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-prose mt-16 md:mt-24 text-center">
        <hr className="hair-rule mb-8" />
        <p className="text-sm text-ink-faint">
          其他 70+ 隻貓咪的介紹會在師父方便時陸續更新。
          <br />
          如果你想認養，可以透過{" "}
          <a
            href="https://www.facebook.com/profile.php?id=61579639902271"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline underline-offset-4 hover:text-earth"
          >
            FB 粉專
          </a>{" "}
          私訊師父。
        </p>
      </section>
    </div>
  );
}
