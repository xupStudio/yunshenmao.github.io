import { describe, expect, it } from "vitest";

import { buildWelcomeEmail } from "../src/email";

describe("buildWelcomeEmail", () => {
  it("explains the monthly report and cancellation path", () => {
    const message = buildWelcomeEmail({
      customerEmail: "subscriber@example.com",
      manageSubscriptionUrl: "https://billing.stripe.com/p/login/example",
      facebookUrl: "https://www.facebook.com/example",
      siteUrl: "https://yunshenmao.com",
    });

    expect(message.subject).toBe("謝謝你訂閱「山上月報」｜雲深貓園");
    expect(message.text).toContain(
      "謝謝你訂閱雲深貓園的「山上月報」",
    );
    expect(message.text).toContain("每月一封「山上月報」email");
    expect(message.text).toContain("管理或取消訂閱");
    expect(message.html).toContain("管理或取消我的訂閱");
    expect(message.html).toContain(
      "https://billing.stripe.com/p/login/example",
    );
    expect(message.html).not.toContain("稍早");
    expect(message.html).not.toContain("貓咪的近況與照片");
    expect(message.html).not.toContain("當月的照護紀錄");
    expect(message.html).not.toContain("再確認一次");
    expect(message.html).not.toContain(
      "如果這正是你想訂閱的，不用做任何事",
    );
    expect(message.html).not.toContain("謝謝你願意陪山上一起走下去");
  });

  it("escapes recipient content in HTML", () => {
    const message = buildWelcomeEmail({
      customerEmail: 'bad"><script>alert(1)</script>@example.com',
      manageSubscriptionUrl: "https://billing.stripe.com/p/login/example",
      facebookUrl: "https://www.facebook.com/example",
      siteUrl: "https://yunshenmao.com",
    });

    expect(message.html).not.toContain("<script>alert(1)</script>");
    expect(message.html).toContain("&lt;script&gt;");
  });
});
