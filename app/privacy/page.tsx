import type { Metadata } from "next";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

export const metadata: Metadata = {
  title: "隱私權政策",
  description:
    "雲深貓園是一個資訊性網站，不收集個人資料、不使用 Cookie 追蹤、不進行金流交易。",
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">隱私權政策</h1>
        <p className="mt-6 text-sm text-ink-faint">
          最後更新：2026 年 5 月
        </p>
      </header>

      <div className="container-prose mt-12 space-y-10 leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">一、本網站的性質</h2>
          <p className="mt-3">
            本網站（yunshenmao.com，下稱「本站」）由
            <strong className="text-ink">道願師個人經營</strong>
            （尚未立案為法人協會），是一個
            <strong className="text-ink">純資訊性的靜態網站</strong>：
            介紹山上 80 多隻貓的故事、整理師父實際採購的物資清單、
            並提供前往蝦皮與 FB 粉專的外部連結。
          </p>
          <p className="mt-3">
            本站
            <strong className="text-ink">沒有會員系統、沒有結帳購物車、沒有金流交易</strong>，
            因此原則上不會在本站上向您蒐集任何個人資料。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">二、本站不蒐集的資料</h2>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>本站不要求您註冊、登入、或填寫任何表單</li>
            <li>本站不向您索取姓名、地址、電話、信箱</li>
            <li>本站不放置 Google Analytics、Facebook Pixel 等追蹤工具</li>
            <li>本站不使用 Cookie 進行廣告追蹤或行為分析</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">三、伺服器自動紀錄</h2>
          <p className="mt-3">
            本站部署於靜態網頁託管平台（GitHub Pages / Cloudflare Pages）。
            這些平台會基於資安、流量統計目的，自動紀錄：
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-6">
            <li>連線 IP 位址</li>
            <li>瀏覽器類型與版本</li>
            <li>瀏覽的頁面與時間</li>
          </ul>
          <p className="mt-3">
            這些紀錄由託管平台保存與管理，本站經營者不會主動下載、分析或對應到個人身份。
            詳細政策請參閱{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              GitHub Privacy Statement
            </a>{" "}
            或{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              Cloudflare Privacy Policy
            </a>
            。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">四、Cookie 使用</h2>
          <p className="mt-3">
            本站
            <strong className="text-ink">不使用 Cookie</strong>，
            也不存放任何 LocalStorage / SessionStorage 資料於您的裝置上。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">五、外部連結</h2>
          <p className="mt-3">
            本站包含前往以下外部網站的連結：
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>
              <strong className="text-ink">蝦皮購物（shopee.tw）</strong> —
              用於物資清單品項的搜尋。一旦您點擊離開本站，
              您的瀏覽行為與購物資料即由蝦皮依其
              <a
                href="https://shopee.tw/legaldoc/policies"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4 hover:text-earth"
              >
                隱私權政策
              </a>
              處理。
            </li>
            <li>
              <strong className="text-ink">Facebook 粉專</strong> —
              用於聯繫師父、寄物資前的詢問。
              您於 Facebook 上的私訊內容、個資、互動行為，
              皆由 Meta 依其隱私權政策處理。
            </li>
          </ul>
          <p className="mt-3">
            本站對外部網站的隱私作為與資料處理不負責任。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">六、物資寄送涉及的個資</h2>
          <p className="mt-3">
            如果您透過 FB 粉專私訊師父、並寄送物資到山上：
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>您與師父之間的訊息對話、提供的姓名、聯絡方式，由 Meta 平台保存</li>
            <li>
              您寄送物資時填寫於物流面單上的姓名與地址，
              <strong className="text-ink">由師父個人保管</strong>，
              本站經營架構並不接觸這些資料
            </li>
            <li>師父不會將您的聯絡資料公開、轉售、或用於其他用途</li>
            <li>如您希望師父刪除您的聯絡紀錄，請於私訊中提出</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">七、您的權利</h2>
          <p className="mt-3">
            依《個人資料保護法》第 3 條，您對於師父保有您的個人資料，
            可行使查詢、更正、停止利用、刪除等權利。
            如欲行使，請透過{" "}
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              FB 粉專私訊
            </a>
            提出，師父會於收到後 7 日內回覆。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">八、政策更新</h2>
          <p className="mt-3">
            本政策可能因法規變動或網站功能調整而修訂。
            修訂後版本會公告於本頁並更新最後更新日期。
            若未來本站新增金流功能或會員系統，將會大幅修訂本政策並另行公告。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">九、準據法與管轄</h2>
          <p className="mt-3">
            本政策之解釋與適用，以中華民國法律為準據法。
            如有爭議，雙方合意以
            <strong className="text-ink">臺灣南投地方法院</strong>
            為第一審管轄法院。
          </p>
        </section>
      </div>
    </article>
  );
}
