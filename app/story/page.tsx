import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { adopters } from "@/data/adopters";

export const metadata: Metadata = {
  title: "我們的故事 — 道願師與南投山上的雲深貓舍",
  description:
    "道願師九歲被診斷出貝西氏症、十幾歲許下三個願，後來真的進了山，照顧南投鐵皮屋裡 14 間房、80 多隻貓，十年累計送養四百多隻。",
  alternates: { canonical: "/story/" },
  openGraph: {
    title: "我們的故事 — 道願師與南投山上的雲深貓舍",
    description:
      "從病床上的願到南投山上的鐵皮屋 — 一位師父用十年照顧 80 多隻貓、送養 400 多隻的故事。",
    url: "https://yunshenmao.com/story/",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "我們的故事 — 道願師與南投山上的雲深貓舍",
  description:
    "從病床上的願到南投山上的鐵皮屋 — 一位師父用十年照顧 80 多隻貓、送養 400 多隻的故事。",
  image: "https://yunshenmao.com/photos/monk/01.jpg",
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
  mainEntityOfPage: "https://yunshenmao.com/story/",
};

export default function StoryPage() {
  return (
    <article className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          關於 雲深貓舍
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">我們的故事</h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-soft">
          「雲深不知處，只在此山中。」<br />
          這裡沒有精緻的貓旅館、也沒有乾淨明亮的玻璃展示窗。
          只有一位師父，在南投山區一間鐵皮屋裡，
          分成 14 個房間照顧 80 多隻貓。
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
            <h2 className="mt-3 text-3xl md:text-4xl">從一個十歲孩子的願</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                道願師九歲那年被診斷出
                <strong className="text-ink">罕見的貝西氏症</strong>
                {" "}— 一種身體會輪流發炎、潰瘍、發燒的免疫疾病，
                醫學上至今沒有根治的辦法。
              </p>
              <p>
                她是在病痛裡長大的。
                十歲開始念佛，十幾歲時，她在病床上許下一生的三個願：
              </p>
              <ul className="ml-6 list-disc space-y-1 text-ink">
                <li>三十歲要吃素</li>
                <li>餘生要出家獨居山林</li>
                <li>做利益眾生的事</li>
              </ul>
              <p>
                三十歲那年，她真的吃素了。<br />
                更晚一些，她真的進了山。
              </p>
              <p>
                身體的考驗一直沒有停 ——
                燙傷植皮兩次、被毒蛇咬過、被虎頭蜂叮過、
                長期依賴免疫調節劑、脊椎也斷過。
                十幾年前一次嚴重發病，醫生告訴她不是死、就是終生癱瘓 ——
                禮儀社都已經把後事備好了。
              </p>
              <p>
                她在病床上再次發願：
                <strong className="text-ink">
                  若菩薩再給她一段時間，餘生都用來照顧那些沒有人收的生命。
                </strong>
              </p>
              <p>
                病後來奇蹟好轉。<br />
                康復後她把手中三塊山坡地一甲半全部變賣，
                先捐了一百萬給非洲的孤兒、幫過獨居老人，
                然後安靜地走進南投山林，從一隻貓開始 ——
                就這樣養到了現在。
              </p>
              <blockquote className="mt-6 border-l-2 border-earth/60 pl-5 font-serif text-ink">
                「願將生命最後的餘光，照亮有緣眾生。」
              </blockquote>
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
            <h2 className="mt-3 text-3xl md:text-4xl">
              一個人、80 多隻貓、14 間房
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                山上的鐵皮屋分成
                <strong className="text-ink">14 個獨立的空間</strong>{" "}
                — 有一般成貓區、隔離治療間、給剛 TNR 回來的貓休養的小屋。
                每一間餵完都要用肥皂洗手、噴消毒水，再進下一間。
              </p>
              <p>
                80 多隻貓裡，有
                <strong className="text-ink">11 隻泌尿結石</strong>
                、<strong className="text-ink">二十幾個慢性病</strong>
                需要長期投藥，還有 30 多隻是被人惡意丟在門口的口炎貓。
                每天清晨兩、三點才能餵完最後一間，
                六點又要起床倒貓砂。
              </p>
              <p>
                家裡這 80 多隻不是全部 ——
                沿路還有 30、40 隻外面的浪貓固定靠她送飯。
                車子壞掉的時候，她會請計程車繞另一條路上山，
                怕牠們沒東西吃。
              </p>
              <p>
                這不是一個漂亮的空間。
                夏天悶熱、冬天冷風從鐵皮縫裡灌進來、潮濕一年到頭都在。
                但
                <strong className="text-ink">
                  每一隻貓都有名字，每一隻都被記得
                </strong>
                。
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

      {/* Chapter 3 — 看不見的危險 */}
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
              三 · 看不見的危險
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">山上的貓會踩到什麼</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                山區常見的一種陷阱叫
                <strong className="text-ink">「山豬吊」</strong>
                {" "}— 鋼索做的圈套，原本是設來抓山豬的。
                流浪貓狗踩進去就拖著鋼索哀號一兩天，
                等發現的時候，腳常常已經斷了。
                師父這幾年救回來的孩子裡，有好幾位是這樣來的。
              </p>
              <p>
                另一個慢性的危險，是
                <strong className="text-ink">「好意的廚餘」</strong>。
                人的剩飯太鹹太油，貓長期吃下去，
                腎和膀胱會慢慢壞掉。
                等開始尿不出來、不吃飯時帶來醫院，
                往往已經是慢性腎衰竭。
                家裡 11 隻結石貓，許多都是這樣帶上山的。
              </p>
              <p>
                還有一種
                <strong className="text-ink">看得見、卻擋不住</strong>的事 ——
                有人會把不要的貓狗丟在山上，
                有時是一窩剛斷奶的小貓、有時是繁殖場退役的品種貓。
                這幾年家裡甚至多了五十幾隻雞 —— 也都是有人來丟的。
              </p>
              <blockquote className="mt-6 border-l-2 border-earth/60 pl-5 font-serif text-ink">
                「我們的建設，永遠趕不上有人在丟的速度。」
              </blockquote>
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
              一個殘障身體、80 多隻貓、四十年的老鐵皮屋 ——
              這裡的樣子真的就是這樣。
              冰箱用了三十年、洗衣機壞掉好一段時間了、
              山上的水還是從水溝引下來不能喝的。
              我們不打算把這些藏起來。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { type: "placeholder" as const, label: "師父與貓的日常" },
              { type: "photo" as const, src: "/photos/story/env-02.jpg", alt: "山上的老空間" },
              { type: "photo" as const, src: "/photos/story/env-03.jpg", alt: "師父在屋外工作" },
              { type: "placeholder" as const, label: "清掃與照顧的片段" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-sm"
              >
                {img.type === "photo" ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-ink/20 bg-cream/60 text-ink-faint px-2 text-center">
                    <svg
                      width="32"
                      height="32"
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
                    <p className="mt-3 font-serif text-xs">{img.label}</p>
                    <p className="mt-1 text-[10px] leading-tight">照片待師父同意後補上</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="container-prose mt-10 text-center text-sm text-ink-soft">
            我們正在慢慢改善空間 ——
            但比起外觀，師父更優先把每一分錢用在貓咪的身上。
          </p>
        </div>
      </section>

      {/* Chapter 5 — 已送養 400+ */}
      <section className="py-14 md:py-20">
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            五 · 十年的圓滿
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">
            累計送養 400 多隻
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            過去十年，師父陸續送出了超過 400 隻貓狗到新的家庭。
            每一次送出都附帶一份簡單的承諾 ——
            「如果有一天你照顧不了，歡迎送回山上，師父都會收。」
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            這就是為什麼山上的貓越來越多。
            因為她答應了，就要守到最後一隻。
          </p>
        </div>
      </section>

      {/* Chapter 6 — 幾個難忘的孩子 */}
      <section className="mt-4 md:mt-8 bg-sage/10 py-14 md:py-20">
        <div className="container-wide">
          <div className="container-prose text-center mb-12 md:mb-16">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              六 · 幾個難忘的孩子
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">
              師父最常提起的兩個名字
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              80 個名字她記得每一個。
              這兩個是她最常掛在嘴邊的。
            </p>
          </div>

          <div className="container-prose space-y-12">
            <div>
              <p className="font-serif text-sm tracking-widest text-earth">
                牛牛 · NIU NIU
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl">
                兩年多的處方飼料
              </h3>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
                <p>
                  牛牛是一隻很活潑的貓，
                  <strong className="text-ink">腎臟萎縮加上膀胱結石</strong>。
                  他已經吃了兩年多的腎臟處方飼料和慢性藥。
                </p>
                <p>
                  他不知道自己有病，
                  每天都很開心地等開飯、跟其他貓搶位置。
                  也是因為這樣，師父對處方飼料的牌子很挑 ——
                  換一款，可能就會拉肚子，可能就會回不來。
                </p>
              </div>
            </div>

            <hr className="hair-rule" />

            <div>
              <p className="font-serif text-sm tracking-widest text-earth">
                橘橘 · JU JU
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl">
                一個會包尿布的家
              </h3>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
                <p>
                  橘橘三、四年前被車撞，當時才兩個多月大。
                  他的後腿從此不能動。
                </p>
                <p>
                  經由幾位善心人輾轉送到台北開刀治療，
                  最後落腳在一個願意每天為他包尿布的家。
                  那家人原本就有三隻貓，
                  又願意收下後腿不能動的橘橘 ——
                  全家用心照顧到現在。
                </p>
                <blockquote className="border-l-2 border-earth/60 pl-5 font-serif text-ink">
                  「這是我救援十年，最感動的一件事。」
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 7 — Adopter quotes (only shown if real data exists) */}
      {adopters.length > 0 && (
        <section className="mt-16 md:mt-24 bg-warm/10 py-14 md:py-20">
          <div className="container-wide">
            <div className="container-prose text-center mb-10 md:mb-14">
              <p className="font-serif text-sm tracking-widest text-ink-faint">
                七 · 認養人的話
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                400 個故事中的幾個
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                以下是幾位認養人後來捎來的訊息。
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

      {/* 後記 — A note from the site builder */}
      <section className="mt-16 md:mt-24 container-prose">
        <div className="rounded-sm border border-ink/10 bg-cream/60 p-6 sm:p-8 md:p-10">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            後記 · A Note from the Builder
          </p>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl">
            為什麼有這個網站
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>
              我去年從師父那裡領養了一隻貓。
              帶回家之後才慢慢知道，她照顧的不只我帶回家的這一個 ——
              她一個人在山上養著 80 多隻、十年來陸續送出 400 多隻。
            </p>
            <p>
              我只是一個普通上班族，不是動保專業、也沒有多餘資源。
              但想了想，至少可以做一件事 ——
              把師父的故事整理出來，讓更多人看見她在山上做的事。
            </p>
            <p>
              這個網站從文字到設計，都是利用下班時間自己一個人慢慢做的。
              中間
              <strong className="text-ink">
                沒有抽成、沒有金流、沒有第三方介入
              </strong>
              。希望透過它，師父的環境能慢慢被改善、
              物資和醫療能再穩定一些，
              山上的孩子們可以好好過日子。
            </p>
            <p className="text-ink">
              如果你讀到這裡 —— 謝謝你。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose text-center pb-8 mt-16 md:mt-24">
        <hr className="hair-rule mb-10" />
        <p className="text-ink-soft">
          如果這個故事讓你想做點什麼 ——
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/support/" className="btn-primary">
            如何幫助
          </Link>
          <Link href="/cats/" className="btn-ghost">
            先認識貓咪
          </Link>
        </div>
      </section>
    </article>
  );
}
