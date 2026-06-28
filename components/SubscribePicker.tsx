"use client";

import { useState } from "react";
import { subscriptionTiers, CURRENCY } from "@/data/support-plans";

const PERIODS = [
  { key: "month", label: "每月", unit: "月" },
  { key: "year", label: "每年", unit: "年" },
] as const;

/**
 * 月報訂閱選擇器:一個大區塊,左側列出(共用的)訂閱內容,
 * 右側讓使用者選「每月 / 每年」+ 金額方案,再用一個按鈕前往 Stripe 結帳。
 * 三個方案內容相同,只有金額不同。
 */
export default function SubscribePicker() {
  const [periodIdx, setPeriodIdx] = useState(0);
  const [tierIdx, setTierIdx] = useState(0);

  const period = PERIODS[periodIdx];
  const tier = subscriptionTiers[tierIdx];
  const plan = period.key === "month" ? tier.monthly : tier.yearly;
  const perks = subscriptionTiers[0]?.perks ?? [];

  return (
    <div className="overflow-hidden rounded-sm border-2 border-earth/40 bg-warm/15">
      <div className="grid md:grid-cols-[1.05fr_1fr]">
        {/* Left — what every plan includes */}
        <div className="border-b border-earth/20 p-7 sm:p-9 md:border-b-0 md:border-r">
          <p className="font-serif text-sm tracking-[0.2em] text-earth">
            訂閱即包含
          </p>
          <ul className="mt-5 space-y-3 leading-relaxed text-ink-soft">
            {perks.map((perk, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 text-earth">·</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-faint">
            三個方案內容完全相同,選一個你能負擔的金額就好。
          </p>
        </div>

        {/* Right — selector */}
        <div className="p-7 sm:p-9">
          {/* period toggle */}
          <div className="inline-flex rounded-full border border-earth/30 bg-paper p-1">
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
            {subscriptionTiers.map((t, i) => {
              const price =
                period.key === "month" ? t.monthly.price : t.yearly.price;
              const active = i === tierIdx;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setTierIdx(i)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between rounded-sm border-2 px-5 py-3.5 text-left transition ${
                    active
                      ? "border-earth bg-warm/40"
                      : "border-ink/20 bg-paper hover:border-earth/40"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full border-2 transition ${
                        active ? "border-earth bg-earth" : "border-ink/30"
                      }`}
                      aria-hidden
                    />
                    <span className="font-serif text-lg text-ink">{t.name}</span>
                  </span>
                  <span className="font-serif text-xl text-ink">
                    {CURRENCY}
                    {price.toLocaleString()}
                    <span className="text-sm text-ink-faint">
                      {" "}
                      / {period.unit}
                    </span>
                  </span>
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
