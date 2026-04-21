export type ProductTier = {
  slug: string;
  name: string;
  quantity: string;
  price: number;
};

export type Product = {
  slug: string;
  category: "creative" | "supplies";
  name: string;
  subtitle: string;
  coverImage: string;
  description: string;
  status: "coming-soon" | "available";
  /** 文創小物的單一售價 */
  price?: number;
  /** 山上物資的三段選項 */
  tiers?: ProductTier[];
  /** 寄送目的地；supplies 一律 mountain */
  destination?: "buyer" | "mountain";
};

/**
 * 商品資料。
 *
 * 目前分兩類：
 * - creative：拍立得、日曆、明信片 — 寄給買家
 * - supplies：罐頭、飼料、貓砂 — 直接寄到山上
 *
 * 所有價格為初估，實際請依師父採購成本 + 運費調整後更新。
 */
export const products: Product[] = [
  // ─── 文創小物 · 寄給買家 ─────────────────────────────
  {
    slug: "polaroid-set",
    category: "creative",
    name: "貓咪拍立得 · 六張組",
    subtitle: "六隻代表貓，一隻一張",
    price: 360,
    coverImage: "/photos/cats/yunduo/02.jpg",
    destination: "buyer",
    description:
      "把雲朵、阿虎、墨墨、小奶、豆花、蛋黃六隻代表貓做成拍立得風格的一套小卡，背面有他們的名字與一句短故事。寄出前，每一張都會經過師父的手。",
    status: "coming-soon",
  },
  {
    slug: "calendar-2026",
    category: "creative",
    name: "2026 雲深貓咪日曆",
    subtitle: "一個月一隻貓，十二個月的陪伴",
    price: 580,
    coverImage: "/photos/cats/danhuang/01.jpg",
    destination: "buyer",
    description:
      "A4 桌曆尺寸，每月一隻貓的主照，搭配一句禪意短語與當月主題。月份下方記錄當月收支摘要（感謝您的透明）。",
    status: "coming-soon",
  },
  {
    slug: "postcard-set",
    category: "creative",
    name: "山上明信片 · 六張組",
    subtitle: "可以親手寄給心底惦記的人",
    price: 180,
    coverImage: "/photos/cats/momo/01.jpg",
    destination: "buyer",
    description:
      "從山上寄出的問候。六張不同代表貓的明信片，背面有日期欄位可以自己填寫、也附上雲深貓舍的地址章。",
    status: "coming-soon",
  },

  // ─── 山上的物資 · 直接寄到山上 ─────────────────────────
  {
    slug: "ship-cans",
    category: "supplies",
    name: "寄到山上的罐頭",
    subtitle: "對年長貓腎臟溫柔的濕食",
    coverImage: "/photos/monk/04.jpg",
    destination: "mountain",
    description:
      "罐頭是山上日常的濕食來源，比乾糧對貓咪的腎臟更溫柔 — 尤其是年紀大、因為過去被餵過廚餘而腎功能不好的孩子。選一個份量，我們代你寄到南投山上。",
    status: "coming-soon",
    tiers: [
      { slug: "small", name: "5 罐組", quantity: "約一頓飯的心意", price: 300 },
      { slug: "mid", name: "12 罐組", quantity: "約一週的濕食", price: 650 },
      { slug: "box", name: "24 罐整箱", quantity: "最受歡迎的份量", price: 1200 },
    ],
  },
  {
    slug: "ship-dry-food",
    category: "supplies",
    name: "寄到山上的飼料",
    subtitle: "80 隻貓每一天的主食",
    coverImage: "/photos/monk/05.jpg",
    destination: "mountain",
    description:
      "乾飼料是山上最大的日常消耗，80 隻貓一個月可以吃掉 100 公斤以上。師父偏好無穀低敏的品牌，但會依當下庫存與價格彈性調整。",
    status: "coming-soon",
    tiers: [
      { slug: "small", name: "3 公斤", quantity: "一小袋", price: 700 },
      { slug: "mid", name: "7 公斤", quantity: "中等份量", price: 1400 },
      { slug: "large", name: "15 公斤", quantity: "大袋，省最多", price: 2800 },
    ],
  },
  {
    slug: "ship-litter",
    category: "supplies",
    name: "寄到山上的貓砂",
    subtitle: "師父最常說「正在缺」的一項",
    coverImage: "/photos/story/env-04.jpg",
    destination: "mountain",
    description:
      "80 隻貓共用的砂盆每週都要更換，貓砂是山上換得最兇的耗材。如果你不知道該送什麼，選這一項準沒錯 — 師父一定收得到、也一定用得到。",
    status: "coming-soon",
    tiers: [
      { slug: "bag", name: "1 包 7L", quantity: "豆腐砂", price: 280 },
      { slug: "double", name: "2 包 14L", quantity: "一週份", price: 520 },
      { slug: "case", name: "6 包 42L", quantity: "一個月份", price: 1480 },
    ],
  },
];

export const creativeProducts = products.filter((p) => p.category === "creative");
export const suppliesProducts = products.filter((p) => p.category === "supplies");

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
