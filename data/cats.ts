export type Cat = {
  slug: string;
  name: string;
  romaji: string;
  breed: string;
  coverImage: string;
  gallery: string[];
  tagline: string;
  story: string;
  placeholder?: boolean;
};

/**
 * 代表貓資料 — 名字與故事為暫用版，待道願師確認後更新。
 */
export const cats: Cat[] = [
  {
    slug: "yunduo",
    name: "雲朵",
    romaji: "Yún duǒ",
    breed: "白灰花紋米克斯",
    coverImage: "/photos/cats/yunduo/01.jpg",
    gallery: [
      "/photos/cats/yunduo/01.jpg",
      "/photos/cats/yunduo/02.jpg",
      "/photos/cats/yunduo/03.jpg",
      "/photos/cats/yunduo/04.jpg",
      "/photos/cats/yunduo/05.jpg",
      "/photos/cats/yunduo/06.jpg",
    ],
    tagline: "雲深貓舍的門面 — 一雙琥珀眼看穿你",
    story:
      "雲朵是第一個在粉紅籠子裡抬頭望向鏡頭的孩子。她的花紋像是山嵐未散，眼睛像琥珀裡封存的日光。師父說她總是安安靜靜坐在角落，但每次有人來就會第一個抬頭看。",
    placeholder: true,
  },
  {
    slug: "ahu",
    name: "阿虎",
    romaji: "Ā hǔ",
    breed: "棕虎斑米克斯",
    coverImage: "/photos/cats/ahu/04.jpg",
    gallery: [
      "/photos/cats/ahu/04.jpg",
      "/photos/cats/ahu/01.jpg",
      "/photos/cats/ahu/02.jpg",
      "/photos/cats/ahu/03.jpg",
      "/photos/cats/ahu/05.jpg",
    ],
    tagline: "歪著頭看世界的小老虎",
    story:
      "阿虎有典型的台灣虎斑貓紋路，但個性卻一點也不兇。他最愛的是把頭歪到四十五度看人 — 看久了會覺得自己比他笨。阿虎是場上表情最多的一隻。",
    placeholder: true,
  },
  {
    slug: "momo",
    name: "墨墨",
    romaji: "Mò mò",
    breed: "純黑貓",
    coverImage: "/photos/cats/momo/01.jpg",
    gallery: [
      "/photos/cats/momo/01.jpg",
      "/photos/cats/momo/02.jpg",
      "/photos/cats/momo/03.jpg",
      "/photos/cats/momo/04.jpg",
      "/photos/cats/momo/05.jpg",
    ],
    tagline: "黑夜裡兩盞金燈籠",
    story:
      "墨墨在這裡代表了一群純黑的孩子。在民間傳說裡黑貓常被誤解，但在雲深貓舍，他們是最神秘也最親人的一批。墨墨喜歡在紙箱上窩著，偷偷看你煮飯。",
    placeholder: true,
  },
  {
    slug: "xiaonai",
    name: "小奶",
    romaji: "Xiǎo nǎi",
    breed: "淺色雙色貓",
    coverImage: "/photos/cats/xiaonai/01.jpg",
    gallery: [
      "/photos/cats/xiaonai/01.jpg",
      "/photos/cats/xiaonai/02.jpg",
      "/photos/cats/xiaonai/03.jpg",
      "/photos/cats/xiaonai/04.jpg",
    ],
    tagline: "師父身邊最黏的那一隻",
    story:
      "小奶是師父床邊的常客。每次師父坐下來休息，他會從什麼地方鑽出來，頭抵著師父的手掌。師父說他剛來的時候怕人，現在是最會撒嬌的一隻。",
    placeholder: true,
  },
  {
    slug: "douhua",
    name: "豆花",
    romaji: "Dòu huā",
    breed: "黑白乳牛貓",
    coverImage: "/photos/cats/douhua/01.jpg",
    gallery: [
      "/photos/cats/douhua/01.jpg",
      "/photos/cats/douhua/02.jpg",
      "/photos/cats/douhua/03.jpg",
    ],
    tagline: "表情最戲劇化的奶牛",
    story:
      "豆花身上黑白分明像是剛倒出的甜豆花。他的表情庫存量在整個貓舍排第一 — 歪頭、翻肚、瞇眼、瞪人，一天可以演完一齣戲。",
    placeholder: true,
  },
  {
    slug: "danhuang",
    name: "蛋黃",
    romaji: "Dàn huáng",
    breed: "橘黃虎紋",
    coverImage: "/photos/cats/danhuang/01.jpg",
    gallery: [
      "/photos/cats/danhuang/01.jpg",
      "/photos/cats/danhuang/02.jpg",
      "/photos/cats/danhuang/03.jpg",
    ],
    tagline: "山上的一顆小太陽",
    story:
      "蛋黃是那種大家一看到就會笑出來的橘貓。不管坐姿、睡姿、站姿都有一種說不出的憨。師父說他一天能吃掉兩隻貓的份量，但胖得很有禪意。",
    placeholder: true,
  },
];

export function getCat(slug: string): Cat | undefined {
  return cats.find((c) => c.slug === slug);
}
