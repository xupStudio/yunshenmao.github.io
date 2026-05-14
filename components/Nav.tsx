"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/story/", label: "我們的故事" },
  { href: "/cats/", label: "貓咪們" },
  { href: "/adopt/", label: "想認養" },
  { href: "/support/", label: "如何幫助", cta: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="container-wide flex items-center justify-between py-3.5 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="回到首頁 · 雲深貓園"
        >
          <img
            src="/icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-md"
          />
          <span className="flex items-baseline gap-2">
            <span className="font-brush text-xl sm:text-2xl text-ink">
              雲深貓園
            </span>
            <span className="hidden md:inline text-xs text-ink-faint">
              Yun Shen Mao · 南投山上的 80 隻貓
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          {links.map((link) =>
            link.cta ? (
              <Link
                key={link.href}
                href={link.href}
                className="ml-2 inline-flex items-center rounded-full bg-earth px-4 py-2 font-serif text-sm text-cream transition hover:bg-earth-deep"
              >
                {link.label} →
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-1 text-ink-soft hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink hover:bg-beige/60 focus:outline-none focus:ring-2 focus:ring-ink/20"
          aria-label={open ? "關閉選單" : "打開選單"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav
        id="mobile-menu"
        className={`sm:hidden overflow-hidden border-t border-ink/10 transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="container-wide divide-y divide-ink/5 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center justify-between py-3.5 text-base hover:text-ink ${
                  link.cta ? "font-serif text-earth" : "text-ink-soft"
                }`}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden
                  className={link.cta ? "text-earth" : "text-ink-faint"}
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
