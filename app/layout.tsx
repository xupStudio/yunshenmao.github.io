import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://yunshenmao.com";
const SITE_NAME = "雲深貓舍";
const DESCRIPTION =
  "南投山上一位師父照顧的 80+ 隻待認養貓咪。雲深貓舍介紹每一隻待認養的貓、整理山上實際需要的物資清單，讓想認養或幫忙的人可以直接聯繫師父。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · 南投山上的 80 隻貓`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "雲深貓舍",
    "貓咪認養",
    "南投貓認養",
    "免費認養",
    "待認養貓咪",
    "米克斯認養",
    "浪貓送養",
    "南投貓中途",
    "南投流浪貓",
    "貓中途",
    "道願師",
    "貓物資寄送",
    "處方飼料",
    "結石貓",
    "皇家 LP34",
  ],
  authors: [{ name: "道願師" }],
  creator: "道願師",
  publisher: SITE_NAME,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: "南投山上 80+ 隻待認養貓咪 — 一位師父在山上發下的願",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "雲深貓舍 — 南投山上 80+ 隻待認養貓咪",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "南投山上 80+ 隻待認養貓咪 — 一位師父在山上發下的願",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Animal Welfare",
};

export const viewport: Viewport = {
  themeColor: "#E8DCC0",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Yun Shen Mao",
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description: DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "道願師",
  },
  areaServed: {
    "@type": "Place",
    name: "南投, 台灣",
  },
  sameAs: ["https://www.facebook.com/profile.php?id=61579639902271"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "zh-Hant",
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
