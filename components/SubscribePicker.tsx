"use client";

import { useState } from "react";
import {
  subscriptionAmounts,
  subscribePerks,
  CURRENCY,
} from "@/data/support-plans";
import { cats } from "@/data/cats";

const PERIODS = [
  { key: "month", label: "每月", unit: "月" },
  { key: "year", label: "每年", unit: "年" },
] as const;

const COLLAGE = cats.slice(0, 6).map((c) => c.coverImage);

/**
 * 月報訂閱選擇器:一個大區塊。
 * 左側放貓照片合輯 + 訂閱內容;右側選每月/每年 + 金額,再前往 Stripe 結帳。
 * 五個金額內容相同,只有金額不同(無方案名稱)。
 */
export default function SubscribePicker() {
  const [periodIdx, setPeriodIdx] = useState(0);
  const [amountIdx, setAmountIdx] = useState(1);

  const period = PERIODS[periodIdx];
  const plan =
    period.key === "month"
      ? subscriptionAmounts[amountIdx].monthly
      : subscriptionAmounts[amountIdx].yearly;

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

        {/* Right — selector */}
        <div className="p-6 sm:p-8">
          <p className="text-sm text-ink-faint">
            選一個你能負擔的金額,內容都一樣。
          </p>

          {/* period toggle */}
          <div className="mt-4 inline-flex rounded-full border border-earth/30 bg-paper p-1">
            {PERIODS.map((p, i) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPeriodIdx(i)}
                aria-pressed={periodIdx === i}
                className={`rounded-full px-6 py-1.5 text-sm transition ${
                  periodIdx === i
                    ? "bg-earth text-cream"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* amount options */}
          <div className="mt-5 space-y-2.5">
            {subscriptionAmounts.map((a, i) => {
              const price =
                period.key === "month" ? a.monthly.price : a.yearly.price;
              const active = i === amountIdx;
              return (
                <button
                  key={i}
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
                    {price.toLocaleString()}
                  </span>
                  <span className="text-sm text-ink-faint">/ {period.unit}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href={plan.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-earth px-6 py-3.5 text-cream transition hover:bg-earth-deep"
          >
            前往訂閱 {CURRENCY}
            {plan.price.toLocaleString()} / {period.unit} ↗
          </a>
          <p className="mt-3 text-center text-xs text-ink-faint">
            結帳由 Stripe 安全處理,完成後每月月報會寄到你的 email。
          </p>
        </div>
      </div>
    </div>
  );
}
