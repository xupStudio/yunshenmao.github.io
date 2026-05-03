import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於開發者 — 從山上帶回三隻貓的人",
  description:
    "雲深貓舍網站的開發者。從道願師那裡領養了三隻貓 — 灰白的布魯、橘的蛋捲、暹羅的焦糖。這個網站是回禮。",
  alternates: { canonical: "/dev/" },
  openGraph: {
    title: "關於開發者 — 從山上帶回三隻貓的人",
    description:
      "雲深貓舍網站是一位認養人下班時間做出來的。這裡是他與三隻貓的近況。",
    url: "https://yunshenmao.com/dev/",
    type: "profile",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "雲深貓舍網站開發者",
  description:
    "從道願師那裡領養了三隻貓的認養人，利用下班時間做了這個網站作為回報。",
  url: "https://yunshenmao.com/dev/",
};

type DevCat = {
  name: string;
  appearance: string;
  cover: string;
  gallery?: string[];
  story: string[];
};

const devCats: DevCat[] = [
  {
    name: "布魯",
    appearance: "灰白雙色、淡黃綠眼",
    cover: "/photos/dev_cats/buru/01.jpg",
    gallery: [
      "/photos/dev_cats/buru/01.jpg",
      "/photos/dev_cats/buru/02.jpg",
      "/photos/dev_cats/buru/03.jpg",
    ],
    story: [
      "布魯是第一個帶回家的。當時去山上是想看看師父，沒打算當天就帶。結果他從籠子裡伸出一隻手勾住我袖子 — 那是我這輩子第一次被一隻貓挑走，而不是我挑他。",
      "他現在最喜歡的事情是趴在我電腦旁邊監督我寫程式。每次跑測試的等待時間，他會用尾巴敲鍵盤一下，好像在說「這支怎麼還沒過」。",
      "名字取自 blue — 灰色看起來有點冷藍，但個性其實是暖的。",
    ],
  },
  {
    name: "蛋捲",
    appearance: "橘虎斑、白胸口白手套",
    cover: "/photos/dev_cats/danjuan/01.jpg",
    story: [
      "蛋捲是第二位。布魯來了三個月，師父傳訊息說「橘的那隻好像在等你」。打開照片是一隻把自己捲成圈的橘貓 — 名字當下就決定了。",
      "他真的是會把自己捲成蛋捲的形狀睡覺，從尾巴到鼻子無縫銜接。我量過一次，直徑大概比一個馬克杯大一點。",
      "個性比布魯活潑，看到逗貓棒會直接從房間另一頭飛奔過來。但晚上一定要鑽進棉被裡才睡。",
    ],
  },
  {
    name: "焦糖",
    appearance: "暹羅、奶油底淺褐紋、藍眼",
    cover: "/photos/dev_cats/jiaotang/01.jpg",
    story: [
      "焦糖是最近的一位。師父說他剛被人從山下丟上來的時候很瘦、眼睛還有點發炎，治療了兩個多月才穩定。",
      "他的耳朵和腳尖是焦糖色，背上有很淡的紋路 — 像是把焦糖醬隨手淋在奶油上。",
      "目前還在跟布魯、蛋捲建立外交關係。會偷吃他們的飼料、被瞪了會委屈地發出像鳥一樣的叫聲。每天都更熟一點。",
    ],
  },
];

export default function DevPage() {
  return (
    <article className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          About the Developer
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">關於開發者</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          這個網站是一位普通上班族在下班時間做的。
          沒有抽成、沒有金流、不是動保專業 ——
          只是因為他先從師父那裡帶回了三隻貓，
          後來才慢慢知道山上還有 80 多隻在等家。
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          這個頁面是他想對師父和讀者交代的事 ——
          帶回家的三隻，現在過得很好。
        </p>
      </header>

      {/* Why this site */}
      <section className="mt-14 md:mt-20 container-prose">
        <div className="rounded-sm border border-ink/10 bg-cream/60 p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            為什麼有這個網站
          </p>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl">
            一份慢慢做的回禮
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>
              我去年從師父那裡領養了第一隻貓 — 布魯。
              帶回家之後才慢慢知道，她照顧的不只我抱回來的這一個 ——
              她一個人在山上養著 80 多隻、十年來陸續送出 400 多隻。
            </p>
            <p>
              我不是動保人、也沒有多餘資源。
              想來想去，至少能做一件事 —— 把師父的故事整理出來，
              讓更多人看見她在山上做的事。
            </p>
            <p>
              這個網站從文案到設計，都是我下班之後一個人慢慢做的。
              中間
              <strong className="text-ink">
                沒有抽成、沒有金流、沒有第三方介入
              </strong>
              。
              希望透過它，能讓師父的環境慢慢被改善 ——
              山上的孩子可以好好過日子，下一個帶他們回家的人能少走一點路。
            </p>
          </div>
        </div>
      </section>

      {/* Three cats hero */}
      <section className="mt-16 md:mt-24">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            從山上帶回家的三隻
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">布魯、蛋捲、焦糖</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            這三位都是從雲深貓舍帶下山的。
            師父當時說：「帶他們走可以，但要記得回來看我。」
            我每隔一陣子會回山上一次 ——
            報告他們的近況，順便載一些飼料、貓砂上去。
          </p>
        </div>

        <div className="container-wide mt-10">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] max-w-3xl mx-auto overflow-hidden rounded-sm bg-beige">
            <Image
              src="/photos/dev_cats/together/01.jpg"
              alt="布魯與蛋捲在家中合照"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <p className="mt-3 text-center text-xs text-ink-faint">
            布魯（後）與蛋捲（前），剛搬來的那一週
          </p>
        </div>
      </section>

      {/* Each cat */}
      <section className="container-wide mt-16 md:mt-24 space-y-20 md:space-y-28">
        {devCats.map((cat, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={cat.name}
              className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-14"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-beige ${
                  reverse ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={cat.cover}
                  alt={`${cat.name} — ${cat.appearance}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <p className="font-serif text-sm tracking-widest text-earth">
                  No. {i + 1}
                </p>
                <h3 className="mt-2 text-4xl md:text-5xl">{cat.name}</h3>
                <p className="mt-3 text-sm text-ink-faint">{cat.appearance}</p>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                  {cat.story.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {cat.gallery && cat.gallery.length > 1 && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {cat.gallery.slice(1).map((img, idx) => (
                      <div
                        key={img}
                        className="relative aspect-square overflow-hidden rounded-sm bg-beige"
                      >
                        <Image
                          src={img}
                          alt={`${cat.name} 的生活照 ${idx + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 30vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="container-prose mt-16 md:mt-24 text-center">
        <hr className="hair-rule mb-10" />
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          如果你也在想
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl">山上還有 80 多隻在等家</h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          帶一隻回家不會解決所有事，
          但對那一隻來說，會解決所有事。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/cats/" className="btn-primary">
            看看待認養
          </Link>
          <Link href="/support/" className="btn-ghost">
            其他幫助方式
          </Link>
        </div>
      </section>
    </article>
  );
}
