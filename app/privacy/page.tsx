import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私權政策",
  description:
    "雲深貓舍如何蒐集、利用、保存您的個人資料。依《個人資料保護法》第 8 條告知。",
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
          最後更新：2026 年 4 月
        </p>
      </header>

      <div className="container-prose mt-12 space-y-10 leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">一、蒐集者身份</h2>
          <p className="mt-3">
            本網站（yunshenmao.com，下稱「雲深貓舍」）目前由道願師個人經營，
            <strong className="text-ink">尚未立案為法人協會</strong>。
            所有個人資料由道願師本人負責保管。
          </p>
          <p className="mt-3">
            聯絡窗口：
            <a
              href="https://www.facebook.com/profile.php?id=61579639902271"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              Facebook 粉專私訊
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">二、蒐集目的</h2>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>處理您在「山下小舖」的商品訂購與付款</li>
            <li>將文創商品寄送至您指定的地址</li>
            <li>寄送交易通知、收據、物資送達照片、貓咪近況</li>
            <li>客服聯繫與爭議處理</li>
            <li>依法律規定的帳務保存</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">三、蒐集類別</h2>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>
              <strong className="text-ink">身分識別類</strong>：姓名
            </li>
            <li>
              <strong className="text-ink">聯絡類</strong>：收件地址（僅文創商品需要）、電子信箱
            </li>
            <li>
              <strong className="text-ink">交易類</strong>：訂單內容、金額、付款方式
            </li>
            <li>
              <strong className="text-ink">技術類</strong>：瀏覽器類型、IP 位址（僅網站伺服器一般性紀錄，不做個別分析）
            </li>
          </ul>
          <p className="mt-3">
            付款資料（信用卡號、銀行帳號等）由第三方金流服務商
            <strong className="text-ink">「ezPay 簡單付」（藍新金流旗下品牌）</strong>
            直接蒐集與處理，雲深貓舍不經手、不保存您的完整付款資料。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">四、利用期間、地區、對象、方式</h2>
          <dl className="mt-3 space-y-3">
            <div>
              <dt className="font-serif text-ink">期間</dt>
              <dd className="mt-1">
                自您提供資料起，至下列期間較長者止：
                （一）蒐集目的消失後 1 年；
                （二）依法律規定的帳務保存期限（一般為 5 年）。
              </dd>
            </div>
            <div>
              <dt className="font-serif text-ink">地區</dt>
              <dd className="mt-1">僅在中華民國境內使用。</dd>
            </div>
            <div>
              <dt className="font-serif text-ink">對象</dt>
              <dd className="mt-1">
                雲深貓舍本人、委任之金流服務商（ezPay）、
                物流業者（寄送文創商品用）、
                以及法律規定須揭露之主管機關。
                <strong className="text-ink">不會販售或轉讓您的資料給任何第三方。</strong>
              </dd>
            </div>
            <div>
              <dt className="font-serif text-ink">方式</dt>
              <dd className="mt-1">
                以電子檔形式保存於雲端服務，僅雲深貓舍本人可存取。
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">五、您的權利</h2>
          <p className="mt-3">
            依《個人資料保護法》第 3 條，您對於雲深貓舍保有您的個人資料，可行使下列權利：
          </p>
          <ol className="mt-3 space-y-2 list-decimal pl-6">
            <li>查詢或請求閱覽</li>
            <li>請求製給複本</li>
            <li>請求補充或更正</li>
            <li>請求停止蒐集、處理、利用</li>
            <li>請求刪除</li>
          </ol>
          <p className="mt-3">
            如欲行使上述權利，請透過 FB 粉專私訊雲深貓舍，我們會在收到後 7 日內回覆。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">六、拒絕提供的影響</h2>
          <p className="mt-3">
            您可以選擇不提供個人資料，但這可能會使我們無法完成訂單處理、寄送商品、
            或寄送物資送達照片。部分功能因此無法使用，敬請諒解。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">七、Cookie 使用</h2>
          <p className="mt-3">
            本網站為靜態網頁，
            <strong className="text-ink">不使用 Cookie、不進行使用者追蹤、不放置廣告</strong>。
            僅在購物結帳時，由 ezPay 金流頁面依其政策使用必要的技術 Cookie。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">八、政策更新</h2>
          <p className="mt-3">
            本政策可能因法規變動或業務需要而修訂。
            修訂後版本會公告於本頁，並更新最後更新日期。
            重大變動時會另以信件或 FB 貼文通知既有買家。
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
