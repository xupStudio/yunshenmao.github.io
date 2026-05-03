import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cats, getCat } from "@/data/cats";

export function generateStaticParams() {
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCat(slug);
  if (!cat) return {};
  const title = `${cat.name}（${cat.appearance}）— 雲深貓舍待認養`;
  const url = `https://yunshenmao.com/cats/${cat.slug}/`;
  const image = `https://yunshenmao.com${cat.coverImage}`;
  const description = `${cat.name} — ${cat.appearance}。${
    cat.note ?? "雲深貓舍南投山上的待認養貓咪。"
  }`;
  return {
    title,
    description,
    alternates: { canonical: `/cats/${cat.slug}/` },
    openGraph: {
      title,
      description: cat.appearance,
      url,
      type: "article",
      images: [{ url: image, alt: `${cat.name} — ${cat.appearance}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.appearance,
      images: [image],
    },
  };
}

export default async function CatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCat(slug);
  if (!cat) notFound();

  const others = cats.filter((c) => c.slug !== cat.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cat.name} — 雲深貓舍待認養`,
    description: cat.appearance,
    image: cat.gallery.map((g) => `https://yunshenmao.com${g}`),
    author: { "@type": "Person", name: "道願師" },
    publisher: {
      "@type": "Organization",
      name: "雲深貓舍",
      logo: {
        "@type": "ImageObject",
        url: "https://yunshenmao.com/android-chrome-512x512.png",
      },
    },
    inLanguage: "zh-Hant",
    mainEntityOfPage: `https://yunshenmao.com/cats/${cat.slug}/`,
  };

  return (
    <article className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container-wide">
        <Link
          href="/cats/"
          className="text-sm text-ink-faint hover:text-ink"
        >
          ← 回到待認養貓咪
        </Link>

        <header className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
            <Image
              src={cat.coverImage}
              alt={`${cat.name} — ${cat.appearance}，雲深貓舍待認養`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs text-ink">
              待認養
            </span>
          </div>
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              Looking for home
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl">{cat.name}</h1>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1 text-xs text-ink-soft">
              {cat.appearance}
            </div>
            {cat.note && (
              <p className="mt-6 font-serif text-xl leading-relaxed text-ink">
                {cat.note}
              </p>
            )}
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              他還沒有正式名字 — 山上 80+ 隻貓，師父還在一個一個慢慢取。
              如果你想認識他，可以透過{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61579639902271"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 hover:text-earth"
              >
                FB 粉專
              </a>{" "}
              私訊師父安排見面。
            </p>
            <p className="mt-4 text-xs text-ink-faint">
              ※「{cat.name}」是依外觀的暫用代稱，並非真正的名字。
            </p>
          </div>
        </header>

        {/* Gallery */}
        {cat.gallery.length > 1 && (
          <section className="mt-14 md:mt-20">
            <h2 className="font-serif text-2xl mb-6">更多照片</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {cat.gallery.slice(1).map((img, i) => (
                <div
                  key={img}
                  className="relative aspect-square overflow-hidden rounded-sm bg-beige"
                >
                  <Image
                    src={img}
                    alt={`${cat.name} 在雲深貓舍的生活照 ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other cats */}
        <section className="mt-16 md:mt-24">
          <hr className="hair-rule mb-10" />
          <h2 className="font-serif text-2xl mb-6">其他待認養</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {others.slice(0, 10).map((other) => (
              <Link
                key={other.slug}
                href={`/cats/${other.slug}/`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-beige">
                  <Image
                    src={other.coverImage}
                    alt={`${other.name} — ${other.appearance}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
                <p className="mt-2 font-serif text-center">{other.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
