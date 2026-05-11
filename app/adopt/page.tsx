import Link from "next/link";
import type { Metadata } from "next";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

// TODO(填表單後端): 建立 Google 表單後，把下面這兩個 URL 換掉。
// 1. GOOGLE_FORM_EMBED_URL 取自 Google 表單「傳送 → <> (嵌入)」分享面板裡的 src 網址（結尾通常是 ?embedded=true）
// 2. GOOGLE_FORM_OPEN_URL 取自「傳送 → 連結」分享面板，用於新分頁開啟。
//
// 建議在表單後端設定：
//   · 回覆收集到 Google Sheet（責任編輯：師父 + 開發者）
//   · 開啟「將新回覆通知我」email 提醒
//   · 不要勾「收集電子郵件地址（驗證）」以免要求填表人登入 Google
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf8iLhAPpyeiX18mzYKLtqTou3Px-dhUrzyzrNFQgAK3kJYCQ/viewform?embedded=true";
const GOOGLE_FORM_OPEN_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf8iLhAPpyeiX18mzYKLtqTou3Px-dhUrzyzrNFQgAK3kJYCQ/viewform";

export const metadata: Metadata = {
  title: "填寫認養表單 — 雲深貓園",
  description:
    "想認養雲深貓園的毛孩請先填寫認養表單，師父會在收到後私訊您安排上山見面。山上 80+ 隻全部待認養。",
  alternates: { canonical: "/adopt/" },
  openGraph: {
    title: "填寫認養表單 — 雲深貓園",
    description: "想認養山上 80+ 隻毛孩之一？填表單與師父約上山。",
    url: "https://yunshenmao.com/adopt/",
    type: "website",
  },
};

const steps = [
  {
    n: "1",
    title: "填寫認養表單",
    body: "先填好下方表單。我們會詢問您的居住環境、家庭成員、養貓經驗、是否同意絕育與後續追蹤等基本資訊。",
  },
  {
    n: "2",
    title: "師父閱讀與聯繫",
    body: "師父會在 3–5 天內透過您留下的聯絡方式回覆。山上沒有網路訊號的時段，回覆可能比較慢，請見諒。",
  },
  {
    n: "3",
    title: "上山見面",
    body: "若初步條件合適，師父會與您約上山見毛孩。山上交通不便、需自行開車或搭計程車。",
  },
  {
    n: "4",
    title: "簽認養同意書 · 帶回家",
    body: "見面合適後，簽署簡單的認養同意書，附上身分證影本核對。費用：無收費，但建議自備外出籠帶毛孩下山。",
  },
];

const requirements = [
  "年滿 20 歲、能獨立決策",
  "家人同住者已取得全體同意",
  "居住空間有對外窗、紗窗或陽台加防護網",
  "願意做基本絕育與每年健康檢查",
  "願意接受認養後一年內的偶爾追蹤（拍張照即可）",
  "若未來無法繼續照顧，承諾交還師父而非棄養",
];

export default function AdoptPage() {
  return (
    <div className="py-16">
      {/* Hero */}
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Adoption Application
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">填寫認養表單</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          山上 80+ 隻毛孩都在等家。
          填好下方表單，師父會在收到後與您聯繫，
          確認彼此條件合適後再安排上山見面。
        </p>
      </header>

      {/* Steps */}
      <section className="container-wide mt-14 md:mt-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-sm border border-ink/10 bg-paper p-6"
            >
              <p className="font-serif text-3xl text-earth">{s.n}</p>
              <h3 className="mt-2 font-serif text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="container-prose mt-16">
        <div className="rounded-sm border-l-4 border-earth bg-warm/10 px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-serif text-ink mb-3">填表前請先確認</p>
          <ul className="space-y-2 text-ink-soft text-sm leading-relaxed">
            {requirements.map((r) => (
              <li key={r} className="flex gap-3">
                <span aria-hidden className="shrink-0 text-earth">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form embed */}
      <section
        id="form"
        className="container-wide mt-16 md:mt-20 scroll-mt-24"
      >
        <div className="container-prose text-center">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            Application Form
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">認養申請表</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            預估填寫時間 5–8 分鐘。
            送出後資料會直接傳給師父與網站維護者。
          </p>
        </div>

        <div className="mt-10">
          {GOOGLE_FORM_EMBED_URL ? (
            <div className="mx-auto max-w-3xl overflow-hidden rounded-sm border border-ink/10 bg-paper">
              {/* Responsive iframe wrapper — Google 表單行動裝置會自動換行 */}
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                title="雲深貓園認養申請表"
                className="block w-full"
                style={{ height: "1600px", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              >
                載入認養表單中…
              </iframe>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-sm border-2 border-dashed border-ink/20 bg-cream/60 px-6 py-12 text-center">
              <p className="font-serif text-xl text-ink">表單建置中</p>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                認養表單目前還在建置。
                若您已決定要認養，請先透過 FB 粉專私訊師父，
                我們會儘快將表單上線。
              </p>
              <div className="mt-6">
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  先用 FB 私訊師父 ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Fallback / new-tab option */}
        {GOOGLE_FORM_OPEN_URL && (
          <p className="container-prose mt-6 text-center text-sm text-ink-soft">
            無法在頁面內看到表單嗎？
            <a
              href={GOOGLE_FORM_OPEN_URL}
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-ink underline underline-offset-4 hover:text-earth"
            >
              在新分頁開啟表單 ↗
            </a>
          </p>
        )}
      </section>

      {/* Privacy & trust */}
      <section className="container-prose mt-16 md:mt-20">
        <div className="rounded-sm border border-ink/15 bg-paper p-6 sm:p-8">
          <p className="font-serif text-sm tracking-widest text-ink-faint">
            您的資料怎麼處理
          </p>
          <h2 className="mt-3 font-serif text-2xl">隱私與後續使用</h2>
          <ul className="mt-5 space-y-3 text-ink-soft text-sm leading-relaxed">
            <li className="flex gap-3">
              <span aria-hidden className="text-earth shrink-0">·</span>
              <span>
                您填寫的內容會儲存在 Google 表單後台，
                僅師父與網站維護者可閱讀，
                不會公開於網站或社群。
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-earth shrink-0">·</span>
              <span>
                我們只會用您留下的聯絡方式回覆認養事宜，
                不會用於行銷、轉售、或其他用途。
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-earth shrink-0">·</span>
              <span>
                若您之後決定不認養，可隨時透過 FB 粉專私訊師父，
                師父會將您的資料從表單後台刪除。
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-earth shrink-0">·</span>
              <span>
                更多資料處理細節請見{" "}
                <Link
                  href="/privacy/"
                  className="text-ink underline underline-offset-4 hover:text-earth"
                >
                  隱私權政策
                </Link>
                。
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA / cross-links */}
      <section className="container-prose mt-16 md:mt-20 text-center">
        <hr className="hair-rule mb-10" />
        <p className="text-ink-soft">還在猶豫？</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/cats/" className="btn-ghost">
            先看看待認養毛孩
          </Link>
          <Link href="/story/" className="btn-ghost">
            讀師父的故事
          </Link>
        </div>
      </section>
    </div>
  );
}
