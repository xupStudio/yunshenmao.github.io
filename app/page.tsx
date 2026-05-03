import Image from "next/image";
import Link from "next/link";
import { cats } from "@/data/cats";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center border-b border-ink/10">
        <div className="container-wide grid gap-8 py-8 md:grid-cols-2 md:items-center md:gap-12 md:py-10">
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              南投 · 鐵皮屋 · 80 多隻貓
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              雲深貓舍
              <span className="block mt-2 text-lg text-ink-soft font-sans">
                一位師父在山上發下的願
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              道願師十幾年前在病床上發了一個願 ——
              若菩薩讓她活下來，餘生用來照顧那些沒有人收的生命。<br />
              她一個人在南投山區的鐵皮屋裡，
              分 14 個房間照顧 80 多隻貓，<br />
              十年累計送養超過 400 隻。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/story/" className="btn-primary">
                讀她的故事
              </Link>
              <Link href="/support/" className="btn-ghost">
                如何幫助
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-[min(100%,_calc((100svh-7rem)*4/5))] max-w-md overflow-hidden rounded-sm shadow-xl shadow-ink/10 md:max-w-none md:ml-auto md:mr-0">
            <Image
              src="/photos/monk/01.jpg"
              alt="道願師在南投山上的貓舍"
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
          <Stat value="400+" label="累計送養" />
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
              <h2 className="mt-2 text-3xl md:text-4xl">代表貓</h2>
              <p className="mt-3 max-w-prose text-ink-soft">
                山上的每一隻都有自己的故事，但先從這六位開始。
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
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/cats/${cat.slug}/`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
                  <Image
                    src={cat.coverImage}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <h3 className="font-serif text-lg">{cat.name}</h3>
                  <span className="text-xs text-ink-faint">{cat.breed}</span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{cat.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help teaser */}
      <section className="bg-warm/10 py-14 md:py-20">
        <div className="container-wide grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/photos/cats/yunduo/02.jpg"
              alt="雲朵"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              分擔一點
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">山上正在用的東西</h2>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              80 多隻貓裡，11 隻有結石、20 多個慢性病要長期投藥。
              皇家 LP34、佳寶肉泥、豆腐砂、一錠除 ——
              這些是師父真的每天在用的耗材。<br />
              我們把師父的採購清單整理出來，
              點任一項可以直接到蝦皮下單寄到山上。
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
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            我們知道山上的環境不完美 — 一個人、80 隻貓、老房子。<br />
            所以每一筆進出的款項，會在每月更新的日誌裡公開。<br />
            送養紀錄、醫療帳單、飼料單據 —
            我們相信，透明是讓善意能走得久的唯一方法。
          </p>
          <div className="mt-8">
            <Link href="/support/" className="btn-ghost">
              了解如何幫助
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
