import Link from "next/link";
import type { Metadata } from "next";
import { journalEntries } from "@/data/journal";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

export const metadata: Metadata = {
  title: "山上日誌 — 物資紀錄、送養紀錄、醫療帳單",
  description:
    "雲深貓園每月會在山上日誌公開物資進出、送養紀錄、醫療帳單。我們相信透明是讓善意能走得久的唯一方法。",
  alternates: { canonical: "/journal/" },
  openGraph: {
    title: "山上日誌 — 雲深貓園的月度紀錄",
    description:
      "每月公開物資、送養、醫療紀錄 —— 讓您看到每一份善意最後變成了什麼。",
    url: "https://yunshenmao.com/journal/",
    type: "article",
  },
};

const fmt = (month: string) => {
  const [y, m] = month.split("-");
  return `${y} 年 ${Number(m)} 月`;
};

export default function JournalPage() {
  const hasEntries = journalEntries.length > 0;

  return (
    <div className="py-16">
      {/* Hero */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Mountain Journal
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">山上日誌</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          一個人、80 隻貓、老房子，需要大家的幫助。
          我們支持以「寄送物資」為主，將需要的物資送達到毛孩身旁，
          讓愛延伸下去。
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          每一筆物資與款項的進出，都會定期更新在這個日誌裡。
          送養紀錄、醫療帳單、飼料單據 ——
          我們相信，透明是讓善意能走得久的唯一方法，也讓您安心。
        </p>
      </header>

      {/* Quick stats / promise */}
      <section className="container-wide mt-14 md:mt-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              每月更新
            </p>
            <h3 className="mt-2 font-serif text-lg text-ink">物資進出紀錄</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              當月收到的飼料、罐頭、貓砂、藥品，每項數量與來源（如支持者願意具名）。
            </p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              定期記錄
            </p>
            <h3 className="mt-2 font-serif text-lg text-ink">送養與醫療</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              當月送出的毛孩、新家近況；重要的醫療事件與帳單。
            </p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-serif text-sm tracking-widest text-ink-faint">
              不公開的事
            </p>
            <h3 className="mt-2 font-serif text-lg text-ink">支持者個資</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              支持者真實姓名、聯絡方式、寄件地址一律不公開。
              若您不希望被提及，請於寄件時備註。
            </p>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="container-wide mt-16 md:mt-20">
        <div className="container-prose">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            Monthly Entries
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">月度紀錄</h2>
        </div>

        {hasEntries ? (
          <ul className="mt-10 space-y-12 md:space-y-16">
            {journalEntries.map((entry) => (
              <li
                key={entry.month}
                className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10"
              >
                <div>
                  <p className="font-serif text-xs tracking-widest text-ink-faint">
                    {entry.month}
                  </p>
                  <p className="mt-1 font-serif text-2xl text-ink">
                    {fmt(entry.month)}
                  </p>
                </div>
                <div className="rounded-sm border border-ink/10 bg-paper p-6 sm:p-8">
                  <h3 className="font-serif text-xl text-ink">{entry.title}</h3>
                  <div className="mt-4 space-y-3 text-ink-soft leading-relaxed">
                    {entry.summary.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {entry.supplies && entry.supplies.length > 0 && (
                    <div className="mt-6">
                      <p className="font-serif text-sm tracking-widest text-ink-faint">
                        收到的物資
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {entry.supplies.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-baseline justify-between gap-3 border-b border-ink/5 py-1.5 text-sm"
                          >
                            <span className="text-ink">{s.item}</span>
                            <span className="text-ink-faint">
                              {[s.qty, s.from].filter(Boolean).join(" · ") || "—"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {entry.adoptions && entry.adoptions.length > 0 && (
                    <div className="mt-6">
                      <p className="font-serif text-sm tracking-widest text-ink-faint">
                        送養紀錄
                      </p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {entry.adoptions.map((a, i) => (
                          <li key={i} className="flex flex-wrap gap-x-3">
                            <span className="text-ink">{a.name}</span>
                            {a.location && (
                              <span className="text-ink-faint">
                                · {a.location}
                              </span>
                            )}
                            {a.note && (
                              <span className="text-ink-soft">— {a.note}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {entry.medical && entry.medical.length > 0 && (
                    <div className="mt-6">
                      <p className="font-serif text-sm tracking-widest text-ink-faint">
                        重要醫療事件
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                        {entry.medical.map((m, i) => (
                          <li key={i}>· {m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 mx-auto max-w-3xl rounded-sm border-2 border-dashed border-ink/20 bg-cream/60 p-10 text-center">
            <p className="font-serif text-xl text-ink">第一則日誌準備中</p>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              在第一則正式紀錄上線前，
              所有物資與送養動態都會即時更新在 FB 粉專。
            </p>
            <div className="mt-6">
              <a
                href={FB_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                追蹤 FB 粉專 ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* FB photo archive bridge */}
      <section className="container-prose mt-16 md:mt-20">
        <div className="rounded-sm border border-ink/15 bg-beige/60 p-6 sm:p-8">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            更完整的影像紀錄
          </p>
          <h2 className="mt-3 font-serif text-2xl">過往照片在 FB 粉專</h2>
          <p className="mt-4 text-sm text-ink-soft leading-relaxed">
            師父每天都會在 FB 粉專更新山上的近況 ——
            收到誰寄來的物資、哪隻貓今天比較皮、誰又被丟在門口。
            這些日常的影像紀錄是日誌之外更完整的時間軸。
          </p>
          <div className="mt-5">
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-ink underline underline-offset-4 hover:text-earth"
            >
              前往 FB 粉專看歷史照片 ↗
            </a>
          </div>
        </div>
      </section>

      {/* How to be listed */}
      <section className="container-prose mt-16 md:mt-20">
        <div className="rounded-sm border-l-4 border-earth bg-warm/10 px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-serif text-ink mb-2">想被列在物資紀錄裡？</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            寄送物資時請於蝦皮備註欄留言「希望以〇〇〇暱稱記錄」。
            未備註者將以匿名形式記錄。
            若您完全不希望被提及，也可以備註「不需記錄」，我們會尊重您的意願。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose mt-16 md:mt-20 text-center">
        <hr className="hair-rule mb-10" />
        <p className="text-ink-soft">看完日誌，想做點什麼？</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/support/" className="btn-primary">
            看物資清單
          </Link>
          <Link href="/adopt/" className="btn-ghost">
            填認養表單
          </Link>
        </div>
      </section>
    </div>
  );
}
