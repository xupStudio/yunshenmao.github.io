"use client";

import { useState } from "react";
import {
  subscriptionAmounts,
  subscribePerks,
  CURRENCY,
} from "@/data/support-plans";
import { cats } from "@/data/cats";
import { startCheckout } from "@/lib/checkout";

const COLLAGE = cats.slice(0, 6).map((c) => c.coverImage);

/**
 * 月報訂閱選擇器:一個大區塊。
 * 左側放貓照片合輯 + 訂閱內容;右側選金額,按下後由後端 Worker 建立帶貓主題的
 * Checkout Session 再跳轉。各金額內容相同,只有金額不同(只有月繳)。
 */
export default function SubscribePicker() {
  const [amountIdx, setAmountIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const selected = subscriptionAmounts[amountIdx];

  async function go() {
    setLoading(true);
    try {
      await startCheckout(selected.plan);
      // 成功會跳轉到 Stripe
    } catch {
      setLoading(false);
      alert("結帳連結建立失敗，請稍後再試，或改用 FB 私訊師父。");
    }
  }

  return (
    <div className="overflow-hidden rounded-sm border-2 border-earth/40 bg-warm/15">
      <div className="grid md:grid-cols-[1.05fr_1fr]">
        {/* Left — cat photo collage + what's included */}
        <div className="border-b border-earth/20 p-6 sm:p-8 md:border-b-0 md:border-r">
          <div className="grid grid-cols-3 gap-2">
            {COLLAGE.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt="山上的貓"
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))}
          </div>
          <p className="mt-7 font-serif text-sm tracking-[0.2em] text-earth">
            訂閱即包含
          </p>
          <ul className="mt-4 space-y-2.5 leading-relaxed text-ink-soft">
            {subscribePerks.map((perk, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 text-earth">·</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — amount selector */}
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-sm text-ink-soft">
            你的支持，是山上最穩定的後盾。謝謝你願意陪牠們走下去。
          </p>

          {/* amount options */}
          <div className="mt-5 space-y-2.5">
            {subscriptionAmounts.map((a, i) => {
              const active = i === amountIdx;
              return (
                <button
                  key={a.plan}
                  type="button"
                  onClick={() => setAmountIdx(i)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-3 rounded-sm border-2 px-5 py-3 text-left transition ${
                    active
                      ? "border-earth bg-warm/40"
                      : "border-ink/20 bg-paper hover:border-earth/40"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 shrink-0 rounded-full border-2 transition ${
                      active ? "border-earth bg-earth" : "border-ink/30"
                    }`}
                    aria-hidden
                  />
                  <span className="font-serif text-xl text-ink">
                    {CURRENCY}
                    {a.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-ink-faint">/ 月</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={go}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-earth px-6 py-3.5 text-cream transition hover:bg-earth-deep disabled:opacity-70"
          >
            {loading ? (
              "前往結帳…"
            ) : (
              <>
                前往訂閱 {CURRENCY}
                {selected.price.toLocaleString()} / 月 ↗
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-ink-faint">
            結帳由 Stripe 安全處理，完成後每月月報會寄到你的 email。
          </p>
        </div>
      </div>
    </div>
  );
}
