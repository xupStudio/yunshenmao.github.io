const SUBJECT = "謝謝你訂閱「山上月報」｜雲深貓園";
const PREHEADER =
  "每月一封，記錄山上的貓與照護日常；若是不小心訂閱，也可以隨時取消。";

export interface WelcomeEmailInput {
  customerEmail: string;
  manageSubscriptionUrl: string;
  facebookUrl: string;
  siteUrl: string;
}

export interface WelcomeEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function buildWelcomeEmail(input: WelcomeEmailInput): WelcomeEmail {
  const customerEmail = escapeHtml(input.customerEmail);
  const manageUrl = escapeHtml(input.manageSubscriptionUrl);
  const facebookUrl = escapeHtml(input.facebookUrl);
  const siteUrl = escapeHtml(trimTrailingSlash(input.siteUrl));

  const text = `你好：

謝謝你在稍早訂閱雲深貓園的「山上月報」。

山上的每一隻貓都有名字，也都被記得。接下來，每個月我們會寄一封 email，和你分享：

・貓咪的近況與照片
・當月的照護紀錄

所有訂閱金額收到的月報內容都相同。訂閱會每月自動續訂，直到你取消為止；Stripe 會另外寄出交易收據。

在月報開始以前，也想再和你確認一次。

如果剛才是不小心按到、選錯金額，或後來改變心意，都沒關係。你可以在這裡管理或取消訂閱：
${input.manageSubscriptionUrl}

取消後不再續扣。若在訂閱後 7 日內提出，也可以透過 FB 粉專私訊，申請取消並退還本期款項：
${input.facebookUrl}

如果這正是你想訂閱的，不用做任何事。
下一封信，就是山上的近況。

謝謝你願意陪山上一起走下去。

雲深貓園
「雲深不知處，只在此山中。」

——
這封信寄到 ${input.customerEmail}，是因為你在 yunshenmao.com 訂閱了「山上月報」。
信用卡帳單明細顯示為 YUNSHENMAO。
使用條款：${trimTrailingSlash(input.siteUrl)}/terms/
隱私權政策：${trimTrailingSlash(input.siteUrl)}/privacy/
聯絡雲深貓園：${input.facebookUrl}`;

  const html = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${SUBJECT}</title>
  </head>
  <body style="margin:0;background:#FAF6F0;color:#2D2520;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans TC',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${PREHEADER}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAF6F0;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#FFFDF9;border:1px solid #E8DED1;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:30px 34px 20px;text-align:center;border-bottom:1px solid #EEE5DA;">
                <img src="${siteUrl}/apple-icon.png" width="52" height="52" alt="雲深貓園" style="display:block;margin:0 auto 14px;border:0;border-radius:14px;">
                <div style="font-size:12px;letter-spacing:0.16em;color:#8B6F47;">南投 · 雲深貓園 · 山上月報</div>
                <h1 style="margin:12px 0 0;font-family:'Noto Serif TC',Georgia,serif;font-size:30px;line-height:1.35;color:#2D2520;">謝謝你願意訂閱</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.85;">謝謝你在稍早訂閱雲深貓園的「山上月報」。山上的每一隻貓都有名字，也都被記得。</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;background:#F5EFE6;border-radius:14px;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <h2 style="margin:0 0 12px;font-family:'Noto Serif TC',Georgia,serif;font-size:21px;color:#5F4931;">接下來，你會收到</h2>
                      <p style="margin:7px 0;font-size:15px;line-height:1.7;">・每月一封「山上月報」email</p>
                      <p style="margin:7px 0;font-size:15px;line-height:1.7;">・貓咪的近況與照片</p>
                      <p style="margin:7px 0;font-size:15px;line-height:1.7;">・當月的照護紀錄</p>
                      <p style="margin:13px 0 0;font-size:13px;line-height:1.7;color:#6F6256;">所有訂閱金額收到的內容都相同；訂閱會每月自動續訂，直到取消為止。Stripe 會另外寄出交易收據。</p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #DCCDBB;border-radius:14px;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <h2 style="margin:0 0 10px;font-family:'Noto Serif TC',Georgia,serif;font-size:21px;color:#5F4931;">再確認一次</h2>
                      <p style="margin:0;font-size:15px;line-height:1.8;">如果剛才是不小心按到、選錯金額，或後來改變心意，都沒關係。你可以隨時管理或取消訂閱；取消後不再續扣。若在訂閱後 7 日內提出，也可以申請取消並退還本期款項。</p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:25px auto 16px;">
                  <tr>
                    <td style="border-radius:999px;background:#8B6F47;">
                      <a href="${manageUrl}" style="display:inline-block;padding:13px 24px;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:700;">管理或取消我的訂閱</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 25px;text-align:center;font-size:14px;"><a href="${facebookUrl}" style="color:#6C5338;">需要協助？私訊雲深貓園</a></p>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.85;">如果這正是你想訂閱的，不用做任何事。<br>下一封信，就是山上的近況。</p>
                <p style="margin:0;font-size:16px;line-height:1.85;">謝謝你願意陪山上一起走下去。<br><strong>雲深貓園</strong><br><span style="color:#8B6F47;">「雲深不知處，只在此山中。」</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px;background:#F1E8DC;color:#71665C;font-size:12px;line-height:1.75;">
                這封信寄到 ${customerEmail}，是因為你在 yunshenmao.com 訂閱了「山上月報」。<br>
                信用卡帳單明細顯示為 YUNSHENMAO。<br>
                <a href="${siteUrl}/terms/" style="color:#6C5338;">使用條款</a>
                · <a href="${siteUrl}/privacy/" style="color:#6C5338;">隱私權政策</a>
                · <a href="${facebookUrl}" style="color:#6C5338;">聯絡雲深貓園</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: SUBJECT, html, text };
}
