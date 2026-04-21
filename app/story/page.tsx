import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { adopters } from "@/data/adopters";

export const metadata: Metadata = {
  title: "我們的故事",
  description:
    "道願師在病床上的發願、山上的日常、100 個送養的圓滿，以及為什麼需要你。",
};

export default function StoryPage() {
  return (
    <article className="py-16">
      {/* Hero */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          關於 雲深貓舍
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">我們的故事</h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-soft">
          「雲深不知處，只在此山中。」<br />
          這裡沒有精緻的貓旅館、也沒有乾淨明亮的玻璃展示窗。
          只有一位師父，在南投山上的一間老房子，和她陪伴了很久的貓。
        </p>
      </header>

      {/* Chapter 1 — 發願 */}
      <section className="mt-14 md:mt-20">
        <div className="container-wide grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm order-2 md:order-1">
            <Image
              src="/photos/monk/02.jpg"
              alt="道願師側影"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              一 · 發願
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">病床上的那一句話</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                十年前，道願師在病床上，身上插著管子。
                醫生沒有給她太樂觀的答案。
              </p>
              <p>
                她閉著眼睛，對菩薩發願
                — 如果讓她好起來，她的餘生就拿來照顧那些沒有地方去的生命。
              </p>
              <p>
                病後來真的好了。 她走到了山上。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2 — 山上的日子 */}
      <section className="mt-16 md:mt-24">
        <div className="container-wide grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              二 · 山上的日子
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">一個人、80 隻貓</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                山上的一天從餵食開始。
                80 多隻貓分在不同的空間，有些怕人、有些剛做完 TNR 回來休養、
                有些是別人棄養到山下被撿回來的。
              </p>
              <p>
                師父一個人做所有的事：清貓砂、送醫、擦拭、巡邏、處理急病。
                她不請志工 —
                她說大部分志工幫不到太忙的時候，但她還是感謝所有願意上山看看的人。
              </p>
              <p>
                這不是一個「美」的空間。 山上潮濕、屋子老舊、籠子堆疊。
                但每一隻貓都有名字，每一隻都被記得。
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/photos/monk/04.jpg"
              alt="師父餵食山上的貓"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Chapter 3 — 看不見的兩件事 */}
      <section className="mt-16 md:mt-24">
        <div className="container-wide grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm order-2 md:order-1">
            <Image
              src="/photos/cats/xiaonai/02.jpg"
              alt="山上照顧中的貓咪"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              三 · 看不見的兩件事
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">山上的危險，大多是看不見的</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                這裡有人靠種作物過日子，有人為了顧田會在田邊放捕獸夾。
                師父這十年救回來的貓，有好幾隻是拖著斷腿、尾巴少一截、
                或是爪子被夾碎，才來到雲深的。
                他們沒有做錯什麼，只是剛好踩到了那個機關。
              </p>
              <p>
                另一個看不見的危險，是「好意的餵食」。
                居民有時會把吃剩的飯菜倒在路邊給流浪貓吃。
                但人的食物太鹹、太油，貓咪長期吃下去，腎臟會一點一點壞掉 —
                等到看見症狀，通常已經太晚了。
              </p>
              <p>
                所以師父的工作不只是餵眼前這 80 隻貓。
                她還常常走進鄰居家，一次一次地說明為什麼不能用廚餘餵食，
                如果真想餵，她會提供乾糧。
                她說：「人家有人家的為難，我只能慢慢講，讓他們懂一點。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 4 — 誠實面對 */}
      <section className="mt-16 md:mt-24 bg-beige/80 py-14 md:py-20">
        <div className="container-wide">
          <div className="container-prose text-center mb-10">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              四 · 誠實的面對
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">我們知道，這裡不完美</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              我們不想把山上修得很光鮮。
              這裡真實的樣子是這樣的 —
              也正因為如此，我們需要你的一份支持。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { src: "/photos/story/env-01.jpg", alt: "籠舍堆疊的現場" },
              { src: "/photos/story/env-02.jpg", alt: "山上的老空間" },
              { src: "/photos/story/env-03.jpg", alt: "師父在屋外工作" },
              { src: "/photos/story/env-04.jpg", alt: "堆放的物資與飼料" },
            ].map((img) => (
              <div
                key={img.src}
                className="relative aspect-square overflow-hidden rounded-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <p className="container-prose mt-10 text-center text-sm text-ink-soft">
            我們正在慢慢改善空間 —
            但比起外觀，師父更優先把每一分錢用在貓咪的健康上。
          </p>
        </div>
      </section>

      {/* Chapter 5 — 100+ 個圓滿 */}
      <section className="py-14 md:py-20">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            五 · 100+ 個圓滿
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">已送養 100 多隻貓</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            過去十年，師父陸續送養了超過 100 隻貓到新的家庭。
            每一次送出都附帶一份承諾書
            — 如果有一天你無法再照顧，歡迎送回山上，師父都會收。
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            這就是為什麼山上的貓這麼多 —
            因為她答應要守到最後一隻。
          </p>
        </div>
      </section>

      {/* Chapter 6 — 認養人的故事 */}
      {adopters.length > 0 && (
        <section className="mt-16 md:mt-24 bg-sage/10 py-14 md:py-20">
          <div className="container-wide">
            <div className="container-prose text-center mb-10 md:mb-14">
              <p className="font-serif text-sm tracking-widest text-ink-faint">
                六 · 他們現在過得很好
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                100 個故事中的一個
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                以下是一位認養人後來捎來的訊息。
                我們希望隨著時間，這一頁能慢慢長出更多這樣的聲音。
              </p>
            </div>

            {adopters.map((adopter) => (
              <div
                key={adopter.slug}
                className="grid gap-8 md:gap-12 md:grid-cols-[1fr_1.2fr] md:items-center max-w-5xl mx-auto"
              >
                {/* Photo or placeholder */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm order-2 md:order-1">
                  {adopter.photo ? (
                    <Image
                      src={adopter.photo}
                      alt={`${adopter.catName} 在新家`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-ink/20 bg-cream/60 text-ink-faint">
                      <svg
                        width="44"
                        height="44"
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
                      <p className="mt-4 font-serif text-sm">照片待更新</p>
                      <p className="mt-1 text-xs">經認養人同意後補上</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="order-1 md:order-2">
                  <blockquote className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-2 -top-6 font-serif text-6xl leading-none text-earth/30 select-none"
                    >
                      “
                    </span>
                    <p className="relative font-serif text-xl md:text-2xl leading-relaxed text-ink">
                      {adopter.quote}
                    </p>
                  </blockquote>

                  <dl className="mt-8 grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 text-sm">
                    <dt className="text-ink-faint">認養人</dt>
                    <dd className="text-ink">{adopter.adopterName}</dd>
                    <dt className="text-ink-faint">貓咪</dt>
                    <dd className="text-ink">{adopter.catName}</dd>
                    <dt className="text-ink-faint">時間</dt>
                    <dd className="text-ink">{adopter.adoptedDate}</dd>
                    {adopter.location && (
                      <>
                        <dt className="text-ink-faint">地點</dt>
                        <dd className="text-ink">{adopter.location}</dd>
                      </>
                    )}
                  </dl>

                  {adopter.body && (
                    <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft">
                      {adopter.body}
                    </p>
                  )}

                  {adopter.placeholder && (
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-ink/20 px-3 py-1 text-xs text-ink-faint">
                      <span aria-hidden>⌛</span>
                      示範版 · 待真實案例更新
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-prose text-center pb-8 mt-16 md:mt-24">
        <hr className="hair-rule mb-10" />
        <p className="text-ink-soft">
          如果這個故事讓你想做點什麼 —
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/support/" className="btn-primary">
            支持我們
          </Link>
          <Link href="/cats/" className="btn-ghost">
            先認識貓咪
          </Link>
        </div>
      </section>
    </article>
  );
}
