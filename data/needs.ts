/**
 * 山上的物資清單 — 整理自師父粉專貼文中實際採購紀錄。
 * 每一項都附上蝦皮搜尋連結，方便支持者直接下單寄到山上。
 */

export type NeedItem = {
  slug: string;
  name: string;
  variant?: string;
  use: string;
  searchQuery: string;
  isPrescription?: boolean;
  /** 商品縮圖路徑。沒有時 fallback 為分類 icon。檔名 = `${slug}.jpg`，置於 public/photos/needs/ */
  image?: string;
};

export type NeedCategory = {
  slug: string;
  title: string;
  english: string;
  intro?: string;
  items: NeedItem[];
};

const shopeeSearch = (q: string) =>
  `https://shopee.tw/search?keyword=${encodeURIComponent(q)}`;

export const supplyLink = shopeeSearch;

/**
 * 列出已有實際商品縮圖的 slug。
 * 只有列在這裡的，前端才會渲染圖片；其餘自動 fallback 到 placeholder icon。
 * 商品圖存在 public/photos/needs/<slug>.jpg。
 */
const AVAILABLE_IMAGES = new Set<string>([
  // 處方飼料
  "royal-lp34",
  "farmina-struvite",
  "royal-renal",
  "royal-gim35",
  "royal-gi25",
  // 一般主糧
  "royal-k36",
  "royal-s33",
  "dan-cat",
  "jiahaobao",
  "costco-cat",
  "baobeigou",
  "hills-puppy",
  // 罐頭與肉泥
  "dajin",
  "xiaojin",
  "ciabo-puree",
  "ciao-stick",
  "nayikou-soup",
  "jing-can",
  "cesar-chicken",
  "yibao-pancreas",
  // 飲水
  "water-case",
  // 貓砂
  "tofu-litter",
  "taojin-litter",
  "songmu-litter",
  // 醫療
  "yidingchu",
  "zaoan",
  "xinjieshuang",
]);

const img = (slug: string): string | undefined =>
  AVAILABLE_IMAGES.has(slug) ? `/photos/needs/${slug}.jpg` : undefined;

export const needCategories: NeedCategory[] = [
  {
    slug: "prescription",
    title: "處方飼料",
    english: "Prescription Food",
    intro:
      "山上有 11 隻泌尿結石、1 隻腎萎縮的牛牛（已吃處方飼料超過兩年）、還有胰臟和腸胃敏感的個案。這幾包是真的不能斷的。",
    items: [
      {
        slug: "royal-lp34",
        name: "皇家 LP34",
        use: "泌尿/結石處方 — 11 隻結石貓的主力",
        searchQuery: "皇家 LP34 貓飼料",
        isPrescription: true,
        image: img("royal-lp34"),
      },
      {
        slug: "farmina-struvite",
        name: "法米納 磷酸銨鎂配方",
        use: "泌尿/結石處方 — 有 2 隻偏愛這款",
        searchQuery: "法米納 磷酸銨鎂 貓",
        isPrescription: true,
        image: img("farmina-struvite"),
      },
      {
        slug: "royal-renal",
        name: "皇家 腎臟處方",
        use: "牛牛腎萎縮已吃 2 年多",
        searchQuery: "皇家 腎臟處方 貓飼料",
        isPrescription: true,
        image: img("royal-renal"),
      },
      {
        slug: "royal-gim35",
        name: "皇家 GiM35",
        use: "貓胰臟炎 / 腸胃敏感處方",
        searchQuery: "皇家 GIM35 貓",
        isPrescription: true,
        image: img("royal-gim35"),
      },
      {
        slug: "royal-gi25",
        name: "皇家 Gi25",
        use: "狗腸胃處方 — 給腸胃不好的小黃",
        searchQuery: "皇家 GI25 狗飼料",
        isPrescription: true,
        image: img("royal-gi25"),
      },
    ],
  },
  {
    slug: "dry-food",
    title: "一般主糧",
    english: "Daily Dry Food",
    intro:
      "80 多隻貓 + 山下沿路 30、40 隻外面浪貓每天吃下肚的就是這幾包。皇家 K36 是主力。",
    items: [
      {
        slug: "royal-k36",
        name: "皇家 K36",
        variant: "13 kg 裝",
        use: "一般成貓糧 — 主力，師父固定回購",
        searchQuery: "皇家 K36 13kg",
        image: img("royal-k36"),
      },
      {
        slug: "royal-s33",
        name: "皇家 S33",
        variant: "15 kg 裝",
        use: "一般成貓糧",
        searchQuery: "皇家 S33 15kg",
        image: img("royal-s33"),
      },
      {
        slug: "dan-cat",
        name: "丹 貓糧",
        use: "一般成貓糧 — 第二主力",
        searchQuery: "丹 貓飼料",
        image: img("dan-cat"),
      },
      {
        slug: "jiahaobao",
        name: "加好寶",
        use: "一般成貓糧",
        searchQuery: "加好寶 貓飼料",
        image: img("jiahaobao"),
      },
      {
        slug: "costco-cat",
        name: "好市多 貓糧",
        use: "一般成貓糧",
        searchQuery: "好市多 Kirkland 貓飼料",
        image: img("costco-cat"),
      },
      {
        slug: "baobeigou",
        name: "好市多 / 寶貝狗 狗糧",
        use: "山上同住的狗狗",
        searchQuery: "寶貝狗 狗飼料",
        image: img("baobeigou"),
      },
      {
        slug: "hills-puppy",
        name: "希爾思 小狗飼料",
        use: "小狗成長期",
        searchQuery: "希爾思 幼犬",
        image: img("hills-puppy"),
      },
    ],
  },
  {
    slug: "wet-food",
    title: "罐頭與肉泥",
    english: "Wet Food & Treats",
    intro:
      "年長貓、術後貓、灌食和包藥都靠濕食。佳寶肉泥是包藥指定品 — 換別牌會拉肚子。",
    items: [
      {
        slug: "dajin",
        name: "大金 貓罐",
        use: "主力濕食",
        searchQuery: "大金 貓罐",
        image: img("dajin"),
      },
      {
        slug: "xiaojin",
        name: "小金 貓罐",
        variant: "雞肉口味 / 蝦蟹口味",
        use: "主力濕食 — 師父定期向供應商批貨",
        searchQuery: "小金 貓罐",
        image: img("xiaojin"),
      },
      {
        slug: "ciabo-puree",
        name: "嘉寶 肉泥",
        variant: "24 入",
        use: "灌食 / 包藥指定 — 別牌會拉肚子（師父貼文中的「佳寶」也是同一款）",
        searchQuery: "嘉寶 肉泥 24",
        image: img("ciabo-puree"),
      },
      {
        slug: "ciao-stick",
        name: "Ciao 肉泥條",
        use: "包藥用",
        searchQuery: "Ciao 肉泥條",
        image: img("ciao-stick"),
      },
      {
        slug: "nayikou-soup",
        name: "吶一口 湯罐",
        use: "結石貓喝湯、感冒不吃時灌食",
        searchQuery: "吶一口 湯罐 貓",
        image: img("nayikou-soup"),
      },
      {
        slug: "jing-can",
        name: "靖 貓罐",
        use: "一般濕食",
        searchQuery: "靖 貓罐",
        image: img("jing-can"),
      },
      {
        slug: "cesar-chicken",
        name: "西莎 狗罐",
        variant: "雞肉口味",
        use: "兩隻被棄養的母狗、燙傷貧血的小黃",
        searchQuery: "西莎 狗罐 雞肉",
        image: img("cesar-chicken"),
      },
      {
        slug: "yibao-pancreas",
        name: "胰寶",
        use: "胰臟炎輔助保健",
        searchQuery: "胰寶 貓",
        image: img("yibao-pancreas"),
      },
    ],
  },
  {
    slug: "water",
    title: "飲水",
    english: "Drinking Water",
    intro:
      "山上的水是從水溝引下來的，不能喝。師父和貓都靠瓶裝水。600 cc 小瓶比較不會弄倒 —— 純水或礦泉水都可以，不要鹼性水。",
    items: [
      {
        slug: "water-case",
        name: "瓶裝水 600cc",
        variant: "一箱 24 瓶",
        use: "純水或礦泉水皆可，不要鹼性水",
        searchQuery: "礦泉水 600ml 一箱 24瓶",
        image: img("water-case"),
      },
    ],
  },
  {
    slug: "litter",
    title: "貓砂",
    english: "Litter",
    intro:
      "14 間房、80 多隻貓的用量是天文數字 —— 豆腐砂是主力，師父一個月固定要買十幾包。",
    items: [
      {
        slug: "tofu-litter",
        name: "豆腐砂",
        use: "主力 — 全粉專出現頻率最高",
        searchQuery: "豆腐砂 貓砂",
        image: img("tofu-litter"),
      },
      {
        slug: "taojin-litter",
        name: "掏金砂",
        use: "替換 / 混搭",
        searchQuery: "掏金砂 貓砂",
        image: img("taojin-litter"),
      },
      {
        slug: "songmu-litter",
        name: "松木砂",
        use: "替換 / 混搭",
        searchQuery: "松木砂 貓砂",
        image: img("songmu-litter"),
      },
    ],
  },
  {
    slug: "medical",
    title: "醫療與除蟲",
    english: "Medical & Pest Control",
    intro:
      "鐵皮屋潮濕、山上蟲多，除蚤滴劑是長期消耗品。皮膚病、介癬蟲、毛囊蟲的貓會用一錠除。",
    items: [
      {
        slug: "yidingchu",
        name: "一錠除",
        use: "除蚤 + 疥癬蟲 + 毛囊蟲",
        searchQuery: "一錠除 貓",
        image: img("yidingchu"),
      },
      {
        slug: "zaoan",
        name: "蚤安",
        use: "除蚤滴劑",
        searchQuery: "蚤安 貓",
        image: img("zaoan"),
      },
      {
        slug: "xinjieshuang",
        name: "心疥爽",
        use: "除蚤滴劑",
        searchQuery: "心疥爽 貓",
        image: img("xinjieshuang"),
      },
    ],
  },
];
