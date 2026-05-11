import Image from "next/image";
import Link from "next/link";
import { cats } from "@/data/cats";

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "雲深貓園 · 南投山上 80+ 隻待認養貓咪",
  url: "https://yunshenmao.com/",
  description:
    "南投山上一位師父照顧的 80+ 隻待認養貓咪。山上的貓園分 14 間房，10 年累計送養超過 500 隻貓狗。",
  inLanguage: "zh-Hant",
  about: {
    "@type": "Thing",
    name: "流浪貓認養",
  },
};

const adoptionListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "雲深貓園待認養貓咪",
  description: "南投山上目前 80+ 隻待認養的米克斯。",
  url: "https://yunshenmao.com/cats/",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: cats.length,
  itemListElement: cats.map((cat, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://yunshenmao.com/cats/${cat.slug}/`,
    name: `${cat.name}（${cat.appearance}）`,
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(adoptionListSchema) }}
      />
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center border-b border-ink/10">
        <div className="container-wide grid gap-8 py-8 md:grid-cols-2 md:items-center md:gap-12 md:py-10">
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              南投 · 貓園 · 80 多隻貓
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              雲深貓園
              <span className="block mt-2 text-lg text-ink-soft font-sans">
                南投山中的浪貓中途 — 一位師父在山上發下的願
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              道願師從小到大身體就不好，十幾年前更生了一場大病。
              她在病床上發下一個願 ——
              若菩薩讓她活下來，餘生用來照顧那些被棄養或流浪的毛孩。
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
              於是她康復了，並開始照顧山上的流浪動物。
              十幾年過去，她獨自搭起一座貓園，
              分 14 個房間照顧 80 多隻貓，累計送養超過 500 隻。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/adopt/" className="btn-primary">
                填寫認養表單
              </Link>
              <Link href="/story/" className="btn-ghost">
                讀她的故事
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-[min(100%,_calc((100svh-7rem)*4/5))] max-w-md overflow-hidden rounded-sm shadow-xl shadow-ink/10 md:max-w-none md:ml-auto md:mr-0">
            <Image
              src="/photos/monk/01.jpg"
              alt="道願師在南投山中的雲深貓園照顧 80 多隻浪貓"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-ink/10 bg-beige/80">
        <div className="container-wide grid grid-cols-2 divide-x divide-ink/10 py-8 text-center sm:grid-cols-4">
          <Stat value="80+" label="現在照顧" />
          <Stat value="500+" label="累計送養" />
          <Stat value="14 間" label="獨立空間" />
          <Stat value="1 人" label="獨力經營" />
        </div>
      </section>

      {/* Featured cats */}
      <section className="border-b border-ink/10 py-14 md:py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-serif text-sm tracking-widest text-ink-faint">
                認識我們
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl">
                認識雲深貓園的毛孩子
              </h2>
              <p className="mt-3 max-w-prose text-ink-soft leading-relaxed">
                山上 80+ 隻全部待認養。如果您有看到喜愛的毛孩，
                歡迎填表單來山上的貓園與牠們互動 —— 牠們都渴望有個家。
              </p>
            </div>
            <Link
              href="/cats/"
              className="hidden sm:inline text-sm text-ink-soft hover:text-ink"
            >
              看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {cats.slice(0, 6).map((cat) => (
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
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-cream/90 px-2 py-0.5 text-[10px] text-ink">
                    待認養
                  </span>
                </div>
                <div className="mt-3">
                  <p className="font-serif text-[10px] tracking-widest text-ink-faint">
                    No.{cat.no}
                  </p>
                  <h3 className="mt-0.5 font-serif text-lg">{cat.name}</h3>
                  <p className="mt-0.5 text-xs text-ink-faint">{cat.appearance}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
            <Link href="/adopt/" className="btn-primary">
              填寫認養表單
            </Link>
            <Link
              href="/cats/"
              className="sm:hidden text-sm text-ink-soft hover:text-ink underline underline-offset-4"
            >
              看全部待認養 →
            </Link>
          </div>
        </div>
      </section>

      {/* Help teaser */}
      <section className="bg-warm/10 py-14 md:py-20">
        <div className="container-wide grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/photos/cats/c11/04.jpg"
              alt="山上需要長期飼料與貓砂的貓咪之一"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              需要您的一點點小心意
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">
              山上貓園短缺的資源
            </h2>
            <p className="mt-4 text-base text-ink-soft leading-relaxed md:text-lg">
              80 多隻貓裡，11 隻有結石、20 多個慢性病要長期投藥。
              皇家 LP34、佳寶肉泥、豆腐砂、一錠除 ——
              這些是師父真的每天在用的耗材。
            </p>
            <p className="mt-4 text-base text-ink-soft leading-relaxed md:text-lg">
              師父變賣家產為了照顧這些小動物，自己卻長期吃粥過生活。
              為了給毛孩最好的醫療跟生活，十幾年過去，師父的資源也已耗盡，
              需要大家一點點的幫忙。<br />
              我們把師父的採購清單整理出來，
              點任一項可以直接到蝦皮下單寄到山上，幫助這些孩子。
            </p>
            <div className="mt-6">
              <Link href="/support/" className="btn-primary">
                看看可以怎麼幫
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency pledge */}
      <section className="py-14 md:py-20">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            我們的承諾
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">透明，因為你值得被信任</h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
            一個人、80 隻貓、老房子，需要大家的幫助。
            我們支持以「寄送物資」為主 ——
            將需要的物資送達到毛孩身旁，讓愛延伸下去。
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
            每一筆物資與款項的進出，都會定期更新在日誌裡。
            送養紀錄、醫療帳單、飼料單據 ——
            我們相信，透明是讓善意能走得久的唯一方法，也讓您安心。
          </p>
          <div className="mt-8">
            <Link href="/journal/" className="btn-ghost">
              了解山上日誌
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4">
      <div className="font-serif text-3xl text-ink md:text-4xl">{value}</div>
      <div className="mt-1 text-xs tracking-widest text-ink-faint">{label}</div>
    </div>
  );
}
