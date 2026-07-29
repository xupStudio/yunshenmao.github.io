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
    expect(message.text).toContain("每個月我們會寄一封 email");
    expect(message.text).toContain("管理或取消訂閱");
    expect(message.html).toContain("管理或取消我的訂閱");
    expect(message.html).toContain(
      "https://billing.stripe.com/p/login/example",
    );
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
