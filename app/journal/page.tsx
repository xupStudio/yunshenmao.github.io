import Link from "next/link";
import type { Metadata } from "next";
import journalData from "@/data/journal.json";
import JournalPhotoGallery from "@/components/JournalPhotoGallery";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

type Photo = { src: string; width?: number; height?: number };
type Post = {
  id: string;
  createdAt: string;
  message: string;
  permalink: string;
  photos: Photo[];
  edited?: boolean;
  rewritten?: boolean;
};

const posts = (journalData.posts as Post[]) ?? [];

export const metadata: Metadata = {
  title: "山上日誌 — 雲深貓園的日常紀錄",
  description:
    "雲深貓園的日常都會即時公開在山上日誌 —— 收到的物資、送養近況、貓咪日常。透明是讓善意能走得久的唯一方法。",
  alternates: { canonical: "/journal/" },
  openGraph: {
    title: "山上日誌 — 雲深貓園的日常紀錄",
    description:
      "師父每天會更新物資、送養、貓咪日常 —— 讓您看到每一份善意最後變成了什麼。",
    url: "https://yunshenmao.com/journal/",
    type: "article",
  },
};

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return { ymd: `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`, label: `${y} 年 ${m} 月 ${day} 日` };
};

export default function JournalPage() {
  const hasPosts = posts.length > 0;

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
          師父每天會在 FB 粉專更新山上的近況 ——
          收到誰寄來的物資、哪隻貓今天比較皮、誰又被丟在門口。
          以下日誌由 FB 粉專同步而來，每 6 小時更新一次。
        </p>
        <p className="mt-4 text-xs italic text-ink-faint leading-relaxed">
          為適合公開閱讀，同步時部分句子會自動調整或省略；
          每篇貼文皆附 FB 原文連結，以原文為準。
        </p>
      </header>

      {/* Entries */}
      <section className="container-wide mt-14 md:mt-20">
        <div className="container-prose">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            Recent Posts
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">最近的日子</h2>
        </div>

        {hasPosts ? (
          <ul className="mt-10 space-y-10 md:space-y-14">
            {posts.map((post) => {
              const { ymd, label } = fmtDate(post.createdAt);
              return (
                <li
                  key={post.id}
                  className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10"
                >
                  <div>
                    <p className="font-serif text-xs tracking-widest text-ink-faint">
                      {ymd}
                    </p>
                    <p className="mt-1 font-serif text-xl text-ink">{label}</p>
                  </div>

                  <article className="rounded-sm border border-ink/10 bg-paper p-6 sm:p-8">
                    {post.message && (
                      <p className="whitespace-pre-line leading-relaxed text-ink-soft">
                        {post.message}
                      </p>
                    )}

                    {post.photos.length > 0 && (
                      <div className={post.message ? "mt-5" : ""}>
                        <JournalPhotoGallery photos={post.photos} />
                      </div>
                    )}

                    {(post.edited || post.rewritten) && (
                      <p className="mt-4 text-[11px] italic text-ink-faint/70">
                        {post.edited && post.rewritten
                          ? "部分內容已調整或遮蔽"
                          : post.edited
                          ? "部分內容已遮蔽"
                          : "部分句子已調整"}
                      </p>
                    )}
                    <p className="mt-5 text-sm">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink-faint underline underline-offset-4 hover:text-earth"
                      >
                        {post.edited || post.rewritten ? "看 FB 完整原文 ↗" : "在 FB 看原貼文 ↗"}
                      </a>
                    </p>
                  </article>
                </li>
              );
            })}
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

        {hasPosts && (
          <p className="container-prose mt-10 text-center text-sm text-ink-faint">
            想看更早的紀錄，請
            {" "}
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-earth"
            >
              前往 FB 粉專 ↗
            </a>
          </p>
        )}
      </section>

      {/* How to be listed */}
      <section className="container-prose mt-16 md:mt-20">
        <div className="rounded-sm border-l-4 border-earth bg-warm/10 px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-serif text-ink mb-2">想被師父在 FB 上提到？</p>
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
