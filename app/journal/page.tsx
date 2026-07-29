import Link from "next/link";
import type { Metadata } from "next";
import journalData from "@/data/journal.json";
import JournalFeed from "@/components/JournalFeed";
import type { JournalPost } from "@/lib/journal";
import { SOCIAL_IMAGE } from "@/lib/social-image";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

const posts = (journalData.posts as JournalPost[]) ?? [];

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
    images: [SOCIAL_IMAGE],
  },
};

export default function JournalPage() {
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
          以下日誌由 FB 粉專同步而來，每日同步更新一次。
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

        <JournalFeed initialPosts={posts} facebookUrl={FB_URL} />
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
