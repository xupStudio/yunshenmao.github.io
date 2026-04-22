import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "雲深貓舍 · 南投山上的 80 隻貓",
    template: "%s · 雲深貓舍",
  },
  description:
    "南投山上一位師父發願照顧的 80 多隻浪貓。我們敘說她的故事、介紹貓咪、並透過商品分擔她獨力經營的重擔。",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "雲深貓舍",
    description: "南投山上一位師父和 80 多隻貓的家",
    type: "website",
    locale: "zh_TW",
  },
};

export const viewport: Viewport = {
  themeColor: "#E8DCC0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
