"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { startCheckout } from "@/lib/checkout";

export default function CheckoutButton({
  plan,
  className,
  children,
}: {
  plan: string;
  className?: string;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await startCheckout(plan);
          // 成功會跳轉到 Stripe，不必還原 loading
        } catch {
          setLoading(false);
          alert("結帳連結建立失敗，請稍後再試，或改用 FB 私訊師父。");
        }
      }}
      className={className}
    >
      {loading ? "前往結帳…" : children}
    </button>
  );
}
