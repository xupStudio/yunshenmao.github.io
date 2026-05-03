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
  const title = `${cat.name} — 雲深貓舍代表貓`;
  const url = `https://yunshenmao.com/cats/${cat.slug}/`;
  const image = `https://yunshenmao.com${cat.coverImage}`;
  return {
    title,
    description: `${cat.tagline} ${cat.breed}。${cat.story.slice(0, 80)}`,
    alternates: { canonical: `/cats/${cat.slug}/` },
    openGraph: {
      title,
      description: cat.tagline,
      url,
      type: "article",
      images: [{ url: image, alt: `${cat.name} — ${cat.breed}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.tagline,
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
    headline: `${cat.name} — 雲深貓舍代表貓`,
    description: cat.tagline,
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
    about: { "@type": "Thing", name: cat.breed },
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
          ← 回到貓咪們
        </Link>

        <header className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
            <Image
              src={cat.coverImage}
              alt={`${cat.name} — ${cat.breed}，雲深貓舍代表貓`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              {cat.romaji}
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl">{cat.name}</h1>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1 text-xs text-ink-soft">
              {cat.breed}
            </div>
            <p className="mt-6 font-serif text-xl leading-relaxed text-ink">
              {cat.tagline}
            </p>
            <div className="mt-6 text-lg leading-relaxed text-ink-soft whitespace-pre-line">
              {cat.story}
            </div>
            {cat.placeholder && (
              <p className="mt-8 rounded-sm border border-dashed border-ink/20 bg-cream p-4 text-xs text-ink-faint">
                ※ 這篇介紹是暫用版。真實的故事會在師父方便時更新 —
                包括他的真正名字、來到雲深的時間、以及他讓師父印象最深的那個瞬間。
              </p>
            )}
          </div>
        </header>

        {/* Gallery */}
        {cat.gallery.length > 1 && (
          <section className="mt-14 md:mt-20">
            <h2 className="font-serif text-2xl mb-6">更多{cat.name}</h2>
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
          <h2 className="font-serif text-2xl mb-6">其他代表貓</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/cats/${other.slug}/`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-beige">
                  <Image
                    src={other.coverImage}
                    alt={`${other.name} — ${other.breed}`}
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
