import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-beige/80">
      <div className="container-wide py-10 text-sm text-ink-soft">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-brush text-xl text-ink mb-2">雲深貓舍</div>
            <p className="leading-relaxed">
              南投山上一位師父和 80 多隻貓的家。
              <br />
              「雲深不知處 — 只在此山中。」
            </p>
          </div>
          <div>
            <div className="font-serif text-ink mb-2">認識我們</div>
            <ul className="space-y-1">
              <li>
                <Link href="/story/" className="hover:text-ink">
                  我們的故事
                </Link>
              </li>
              <li>
                <Link href="/cats/" className="hover:text-ink">
                  認識貓咪
                </Link>
              </li>
              <li>
                <Link href="/shop/" className="hover:text-ink">
                  山下小舖
                </Link>
              </li>
              <li>
                <Link href="/support/" className="hover:text-ink">
                  支持我們
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61579639902271"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink"
                >
                  Facebook 粉專 ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-serif text-ink mb-2">條款與政策</div>
            <ul className="space-y-1">
              <li>
                <Link href="/terms/" className="hover:text-ink">
                  服務條款與退換貨
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-ink">
                  隱私權政策
                </Link>
              </li>
            </ul>
            <div className="mt-4 text-xs text-ink-faint leading-relaxed">
              <p>經營者：道願師（個人經營）</p>
              <p className="mt-1">聯絡：FB 粉專私訊</p>
              <p className="mt-1">物資寄送地址請先私訊取得</p>
            </div>
          </div>
          <div>
            <div className="font-serif text-ink mb-2">我們的承諾</div>
            <p className="leading-relaxed">
              所有購物收入，扣除必要成本後全數用於貓咪的飼料、貓砂、醫療與 TNR。
              每月公開帳目。
            </p>
            <p className="mt-3 text-xs text-ink-faint leading-relaxed">
              ※ 目前為個人經營，尚未立案為法人協會，暫時無法開立可抵稅收據。
            </p>
          </div>
        </div>
        <hr className="hair-rule my-8" />
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} 雲深貓舍 — 道願師
        </p>
      </div>
    </footer>
  );
}
