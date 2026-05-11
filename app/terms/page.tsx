import type { Metadata } from "next";

const FB_URL = "https://www.facebook.com/profile.php?id=61579639902271";

export const metadata: Metadata = {
  title: "網站使用條款",
  description:
    "雲深貓園是一個資訊性網站，不從事金流交易。本頁說明網站使用、外部連結、物資寄送性質與免責事項。",
  alternates: { canonical: "/terms/" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Terms of Use
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">網站使用條款</h1>
        <p className="mt-6 text-sm text-ink-faint">
          最後更新：2026 年 5 月
        </p>
      </header>

      <div className="container-prose mt-12 space-y-10 leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">一、網站性質</h2>
          <p className="mt-3">
            本網站（yunshenmao.com，下稱「本站」）由
            <strong className="text-ink">道願師個人經營</strong>
            （尚未立案為法人協會），是一個
            <strong className="text-ink">純資訊性的靜態網站</strong>，
            目的在於：
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-6">
            <li>分享道願師於南投山上照顧 80 多隻貓的故事</li>
            <li>整理山上實際需要的物資清單，供有意支持的人參考</li>
            <li>提供前往蝦皮商品搜尋與 FB 粉專的外部連結</li>
          </ul>
          <p className="mt-3">
            本站
            <strong className="text-ink">不販售任何商品、不收取任何費用、不從事金流交易</strong>。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">二、不勸募聲明</h2>
          <p className="mt-3">
            本站經營者尚未取得《公益勸募條例》規定之勸募許可，
            <strong className="text-ink">本站任何內容皆非募款、勸募、或捐款邀約</strong>。
            本站僅提供山上實際使用物資的資訊，
            是否寄送、寄送品項與份量，完全由訪客自行決定。
          </p>
          <p className="mt-3">
            若您希望以其他方式支持，請直接透過{" "}
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              FB 粉專
            </a>
            私訊師父個人，由其本人一對一回覆。
            本站不會在頁面上公開銀行帳號、第三方支付連結或捐款金額。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">三、外部連結</h2>
          <p className="mt-3">
            本站包含前往
            <strong className="text-ink">蝦皮購物（shopee.tw）</strong>
            的搜尋連結，以及
            <strong className="text-ink">Facebook 粉專</strong>
            的外部連結。一旦您點擊離開本站：
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>您與該外部平台之間的所有互動（瀏覽、下單、付款、私訊）皆與本站無關</li>
            <li>商品價格、品質、出貨、退換貨爭議，由蝦皮平台與賣家依其規範處理</li>
            <li>本站不擔保外部連結之內容、可用性、安全性</li>
            <li>本站不與蝦皮或任何賣家有商業合作、不收取任何分潤或佣金</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">四、物資寄送的性質</h2>
          <p className="mt-3">
            您若依本站所列清單於蝦皮自行下單、並將物品寄送至師父地址，
            該行為在法律上屬於
            <strong className="text-ink">您個人對師父的「贈與」</strong>
            （民法第 406 條），是您與師父之間直接的贈與關係，本站不介入。
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>本站不接觸、不經手、不保管任何寄送物資</li>
            <li>物資寄送的運費、品質、損壞、遺失，由您與物流業者及蝦皮賣家依其規範處理</li>
            <li>師父收到物資後會盡可能於 FB 粉專拍照記錄，但不保證每一筆皆會公開</li>
            <li>師父無義務開立任何形式的收據或證明</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">五、免責聲明</h2>
          <p className="mt-3">
            本站所有資訊（包括但不限於物資清單、貓咪數量、師父現況、採購紀錄）
            皆依使用者貼文與師父告知整理，
            <strong className="text-ink">力求正確但不擔保完整、即時或無誤</strong>。
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>清單上的品項可能因師父當月實際需求而調整或暫停</li>
            <li>建議寄送前先透過 FB 粉專私訊確認當月最缺的項目</li>
            <li>本站不對因使用本站資訊而發生的任何直接或間接損失負責</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">六、無發票與收據</h2>
          <p className="mt-3">
            因本站不從事金流交易，且師父為個人身份未立案，
            <strong className="text-ink">本站與師父均無法開立統一發票或可抵稅之捐贈收據</strong>。
            您於蝦皮自行下單之發票，依蝦皮平台與賣家之規範索取。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">七、智慧財產權</h2>
          <p className="mt-3">
            本站之網頁設計、文字內容、貓咪照片、師父照片，
            除另有註明外，著作權皆屬雲深貓園與道願師所有。
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>歡迎將本站連結轉貼分享，協助讓更多人認識山上的貓咪</li>
            <li>如需轉載照片或文字至個人 FB / IG / 部落格等平台，請註明出處並附上本站連結</li>
            <li>未經同意，不得將本站照片、文字用於商業目的或募款用途</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">八、條款更新</h2>
          <p className="mt-3">
            本條款可能因法規變動、網站功能調整而修訂。
            修訂後版本會公告於本頁並更新最後更新日期。
            若未來雲深貓園立案為法人協會、或新增金流相關功能，
            將會大幅修訂本條款並另行公告。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">九、聯絡方式</h2>
          <p className="mt-3">
            任何關於本站內容、物資寄送、合作邀請或其他事宜，
            請透過{" "}
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              FB 粉專私訊
            </a>{" "}
            聯繫師父。
            因師父平日於山上照顧貓咪，回覆可能較慢，敬請見諒。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">十、準據法與管轄</h2>
          <p className="mt-3">
            本條款之解釋與適用，以中華民國法律為準據法。
            如有爭議，雙方合意以
            <strong className="text-ink">臺灣南投地方法院</strong>
            為第一審管轄法院。
          </p>
        </section>
      </div>
    </article>
  );
}
