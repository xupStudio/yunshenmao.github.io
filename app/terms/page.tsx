import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服務條款與退換貨",
  description:
    "雲深貓舍「山下小舖」的交易條款、七日猶豫期、退款與客訴流程。",
};

export default function TermsPage() {
  return (
    <article className="py-16">
      <header className="container-prose text-center">
        <p className="font-serif text-sm tracking-widest text-ink-faint">
          Terms of Service
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">服務條款與退換貨</h1>
        <p className="mt-6 text-sm text-ink-faint">
          最後更新：2026 年 4 月
        </p>
      </header>

      <div className="container-prose mt-12 space-y-10 leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">一、賣方身份</h2>
          <p className="mt-3">
            本網站（yunshenmao.com，下稱「雲深貓舍」）目前由
            <strong className="text-ink">道願師個人經營</strong>，尚未立案為法人協會。
            所有訂單、出貨、退款皆由其本人負責。
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
          <h2 className="font-serif text-2xl text-ink">二、商品分類</h2>
          <p className="mt-3">本小舖的商品分為兩大類，退換貨規則不同：</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-sm border border-ink/15 bg-cream p-5">
              <h3 className="font-serif text-lg text-ink">A. 文創小物（寄給買家）</h3>
              <p className="mt-2 text-sm">
                拍立得、明信片、年曆等。由雲深貓舍寄送至您提供的地址。
                <br />
                適用下方「三、七日猶豫期」規定。
              </p>
            </div>
            <div className="rounded-sm border border-ink/15 bg-cream p-5">
              <h3 className="font-serif text-lg text-ink">B. 山上的物資（代為寄至山上）</h3>
              <p className="mt-2 text-sm">
                飼料、貓砂、罐頭等。您付款後，由雲深貓舍代為採購並寄送至南投山上，
                <strong className="text-ink">不會寄至您的地址</strong>。
                此類商品性質近於「代購併贈」，一經寄出並送達山上即供貓咪使用，
                <strong className="text-ink">不適用七日猶豫期</strong>
                （依《通訊交易解除權合理例外情事適用準則》第 2 條第 7 款，屬「已拆封無法回復原狀」之商品）。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">三、七日猶豫期（僅適用文創小物）</h2>
          <p className="mt-3">
            依《消費者保護法》第 19 條，您收到文創商品後享有 7 日猶豫期，可無條件退貨。
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-6">
            <li>起算日：商品簽收次日</li>
            <li>
              退貨條件：商品需保持完整包裝、未拆封、未使用、未毀損。
              已拆封的拍立得、明信片因屬已使用之個人化商品，不在猶豫期範圍內
              （依《通訊交易解除權合理例外情事適用準則》第 2 條第 5 款）。
            </li>
            <li>退貨運費：因買家反悔退貨，運費由買家負擔；因商品瑕疵退貨，運費由雲深貓舍負擔。</li>
            <li>退款時程：收到退貨並確認完整後 7 個工作日內，原路退回。</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">四、付款方式</h2>
          <p className="mt-3">
            本網站透過
            <strong className="text-ink">「ezPay 簡單付」（藍新金流旗下品牌）</strong>
            進行付款處理。可使用之付款方式以其平台提供者為準，包括但不限於：
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-6">
            <li>信用卡</li>
            <li>ATM 虛擬帳號轉帳</li>
            <li>超商代碼繳費</li>
            <li>行動支付（Apple Pay、Google Pay、LINE Pay 等）</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">五、運費與出貨時程</h2>
          <dl className="mt-3 space-y-3">
            <div>
              <dt className="font-serif text-ink">文創商品運費</dt>
              <dd className="mt-1">依商品頁面標示計算。</dd>
            </div>
            <div>
              <dt className="font-serif text-ink">山上物資運費</dt>
              <dd className="mt-1">已內含於商品售價，買家不需另付。</dd>
            </div>
            <div>
              <dt className="font-serif text-ink">出貨時程</dt>
              <dd className="mt-1">
                付款完成後 7 個工作日內安排出貨。山上物資採購後集中寄送，時程可能較長，
                以每月出貨紀錄為準。
              </dd>
            </div>
            <div>
              <dt className="font-serif text-ink">偏遠地區</dt>
              <dd className="mt-1">離島、山區若物流業者加收運費，將另行通知。</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">六、發票</h2>
          <p className="mt-3">
            雲深貓舍目前為個人經營，尚未立案為法人、亦未辦理商業登記，
            <strong className="text-ink">暫時無法開立統一發票或可抵稅之捐贈收據</strong>。
            付款完成後，您會收到一封包含訂單明細的電子收據信作為交易憑證。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">七、退款流程</h2>
          <ol className="mt-3 space-y-2 list-decimal pl-6">
            <li>透過 FB 粉專私訊雲深貓舍，告知訂單編號與退款原因。</li>
            <li>若商品已寄出，請於收到後 7 日內以原包裝寄回指定地址。</li>
            <li>雲深貓舍收到退貨並確認完整後，7 個工作日內循原付款管道退款。</li>
            <li>原路退回可能產生金流手續費，將從退款金額中扣抵，退款前會先告知您。</li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">八、不可抗力</h2>
          <p className="mt-3">
            若因天災、疫情、物流中斷、師父健康因素等不可抗力事件導致訂單延遲或無法履行，
            雲深貓舍將主動通知並協助退款，不負其他賠償責任。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">九、客訴與爭議處理</h2>
          <p className="mt-3">
            所有客訴、退換貨、付款爭議，請透過
            <a
              href="https://www.facebook.com/profile.php?id=61579639902271"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4 hover:text-earth"
            >
              FB 粉專私訊
            </a>
            聯繫，我們會在 3 個工作日內回覆。若因師父在山上無訊號或處理貓咪急症致無法即時回覆，敬請諒解。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">十、條款更新</h2>
          <p className="mt-3">
            本條款可能因法規變動或營運需要而修訂。修訂後版本會公告於本頁並更新最後更新日期。
            下單前請再次確認當下版本。已完成之訂單，適用下單時之條款版本。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">十一、準據法與管轄</h2>
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
