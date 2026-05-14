import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-beige/80">
      <div className="container-wide py-10 text-sm text-ink-soft">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-brush text-xl text-ink mb-2">雲深貓園</div>
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
                <Link href="/adopt/" className="hover:text-ink">
                  填寫認養表單
                </Link>
              </li>
              <li>
                <Link href="/support/" className="hover:text-ink">
                  如何幫助
                </Link>
              </li>
              <li>
                <Link href="/dev/" className="hover:text-ink">
                  關於開發者
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
                  網站使用條款
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
              <p className="mt-1">本站不從事金流交易</p>
            </div>
          </div>
          <div>
            <div className="font-serif text-ink mb-2">我們的承諾</div>
            <p className="leading-relaxed">
              支持以「寄送物資」為主，所有送達山上的物資師父都會在 FB 粉專拍照記錄。
            </p>
          </div>
        </div>
        <hr className="hair-rule my-8" />
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} 雲深貓園 — 道願師
        </p>
      </div>
    </footer>
  );
}
