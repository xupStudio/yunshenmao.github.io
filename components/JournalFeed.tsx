"use client";

import { useEffect, useState } from "react";
import JournalPhotoGallery from "@/components/JournalPhotoGallery";
import type { JournalDocument, JournalPost } from "@/lib/journal";

type JournalFeedProps = {
  initialPosts: JournalPost[];
  facebookUrl: string;
};

const fmtDate = (iso: string) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    ymd: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    label: `${year} 年 ${month} 月 ${day} 日`,
  };
};

export default function JournalFeed({
  initialPosts,
  facebookUrl,
}: JournalFeedProps) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const controller = new AbortController();

    const refresh = async () => {
      try {
        const response = await fetch("/api/journal", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const document = (await response.json()) as JournalDocument;
        if (Array.isArray(document.posts)) setPosts(document.posts);
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.warn("無法取得最新山上日誌，暫時顯示上次同步內容。");
        }
      }
    };

    void refresh();
    return () => controller.abort();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="mt-10 mx-auto max-w-3xl rounded-sm border-2 border-dashed border-ink/20 bg-cream/60 p-10 text-center">
        <p className="font-serif text-xl text-ink">第一則日誌準備中</p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          在第一則正式紀錄上線前，
          所有物資與送養動態都會即時更新在 FB 粉專。
        </p>
        <div className="mt-6">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            追蹤 FB 粉專 ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="mt-10 space-y-10 md:space-y-14">
        {posts.map((post) => {
          const { ymd, label } = fmtDate(post.createdAt);
          const photos = post.photos ?? [];
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

                {photos.length > 0 && (
                  <div className={post.message ? "mt-5" : ""}>
                    <JournalPhotoGallery photos={photos} />
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
                    {post.edited || post.rewritten
                      ? "看 FB 完整原文 ↗"
                      : "在 FB 看原貼文 ↗"}
                  </a>
                </p>
              </article>
            </li>
          );
        })}
      </ul>

      <p className="container-prose mt-10 text-center text-sm text-ink-faint">
        想看更早的紀錄，請{" "}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-earth"
        >
          前往 FB 粉專 ↗
        </a>
      </p>
    </>
  );
}
