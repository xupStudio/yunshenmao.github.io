export type Cat = {
  slug: string;
  name: string;
  appearance: string;
  coverImage: string;
  gallery: string[];
  note?: string;
};

/**
 * 待認養貓咪 — 全部來自雲深貓舍。
 * 因為山上 80+ 隻貓多數還沒有正式名字，這裡先以「外觀」為代稱。
 * 真正的名字會在師父方便時補上。
 */
export const cats: Cat[] = [
  {
    slug: "baihui",
    name: "白灰花",
    appearance: "白底淡灰塊、黃眼",
    coverImage: "/photos/cats/baihui/01.jpg",
    gallery: [
      "/photos/cats/baihui/01.jpg",
      "/photos/cats/baihui/02.jpg",
      "/photos/cats/baihui/03.jpg",
      "/photos/cats/baihui/04.jpg",
      "/photos/cats/baihui/05.jpg",
      "/photos/cats/baihui/06.jpg",
      "/photos/cats/baihui/07.jpg",
      "/photos/cats/baihui/08.jpg",
    ],
    note: "雙琥珀眼最亮的一隻、總是安靜坐在粉籠裡",
  },
  {
    slug: "xiaobaihui",
    name: "小白灰",
    appearance: "白多灰少的小貓",
    coverImage: "/photos/cats/xiaobaihui/01.jpg",
    gallery: [
      "/photos/cats/xiaobaihui/01.jpg",
      "/photos/cats/xiaobaihui/02.jpg",
      "/photos/cats/xiaobaihui/03.jpg",
      "/photos/cats/xiaobaihui/04.jpg",
    ],
  },
  {
    slug: "zonghu",
    name: "棕虎",
    appearance: "棕色虎斑、表情很多",
    coverImage: "/photos/cats/zonghu/01.jpg",
    gallery: [
      "/photos/cats/zonghu/01.jpg",
      "/photos/cats/zonghu/02.jpg",
      "/photos/cats/zonghu/03.jpg",
      "/photos/cats/zonghu/04.jpg",
    ],
    note: "歪著頭看人是他的招牌動作",
  },
  {
    slug: "huihu",
    name: "灰虎",
    appearance: "淺灰底虎紋、金黃色眼睛、愛被梳毛",
    coverImage: "/photos/cats/huihu/01.jpg",
    gallery: [
      "/photos/cats/huihu/01.jpg",
      "/photos/cats/huihu/02.jpg",
      "/photos/cats/huihu/03.jpg",
    ],
  },
  {
    slug: "niu",
    name: "黑白乳牛",
    appearance: "黑頭白胸、下巴一個白色 V",
    coverImage: "/photos/cats/niu/01.jpg",
    gallery: [
      "/photos/cats/niu/01.jpg",
      "/photos/cats/niu/02.jpg",
      "/photos/cats/niu/03.jpg",
      "/photos/cats/niu/04.jpg",
    ],
    note: "翻肚、瞇眼、瞪人 — 一天可以演完一齣戲",
  },
  {
    slug: "yanzhao",
    name: "眼罩黑白",
    appearance: "黑色眼罩、白臉、白身",
    coverImage: "/photos/cats/yanzhao/01.jpg",
    gallery: ["/photos/cats/yanzhao/01.jpg"],
  },
  {
    slug: "hei",
    name: "純黑",
    appearance: "全身純黑、金黃色眼睛",
    coverImage: "/photos/cats/hei/01.jpg",
    gallery: [
      "/photos/cats/hei/01.jpg",
      "/photos/cats/hei/02.jpg",
      "/photos/cats/hei/03.jpg",
      "/photos/cats/hei/04.jpg",
      "/photos/cats/hei/05.jpg",
    ],
    note: "山上有好幾隻純黑色的孩子、這位最常出現在木窗台與紙箱旁",
  },
  {
    slug: "daju",
    name: "大金橘",
    appearance: "大隻、明亮金橘色虎斑",
    coverImage: "/photos/cats/daju/01.jpg",
    gallery: [
      "/photos/cats/daju/01.jpg",
      "/photos/cats/daju/02.jpg",
    ],
    note: "正面坐姿、眼神是會閃光的那種橘",
  },
  {
    slug: "xiaoju",
    name: "小橘",
    appearance: "小隻橘虎斑、愛蜷在角落",
    coverImage: "/photos/cats/xiaoju/01.jpg",
    gallery: [
      "/photos/cats/xiaoju/01.jpg",
      "/photos/cats/xiaoju/02.jpg",
      "/photos/cats/xiaoju/03.jpg",
      "/photos/cats/xiaoju/04.jpg",
      "/photos/cats/xiaoju/05.jpg",
      "/photos/cats/xiaoju/06.jpg",
      "/photos/cats/xiaoju/07.jpg",
    ],
  },
  {
    slug: "dajubai",
    name: "大橘白",
    appearance: "橘白雙色、躺著像融化的奶油",
    coverImage: "/photos/cats/dajubai/01.jpg",
    gallery: [
      "/photos/cats/dajubai/01.jpg",
      "/photos/cats/dajubai/02.jpg",
      "/photos/cats/dajubai/03.jpg",
    ],
  },
  {
    slug: "xiaojubai",
    name: "小橘白",
    appearance: "小隻、白底加橘色斑",
    coverImage: "/photos/cats/xiaojubai/01.jpg",
    gallery: [
      "/photos/cats/xiaojubai/01.jpg",
      "/photos/cats/xiaojubai/02.jpg",
      "/photos/cats/xiaojubai/03.jpg",
    ],
  },
  {
    slug: "daimao",
    name: "玳瑁",
    appearance: "黑橘交雜、像被打翻的咖啡",
    coverImage: "/photos/cats/daimao/01.jpg",
    gallery: [
      "/photos/cats/daimao/01.jpg",
      "/photos/cats/daimao/02.jpg",
    ],
  },
  {
    slug: "sanhua",
    name: "三花",
    appearance: "白底加橘塊與灰塊、典型三花貓",
    coverImage: "/photos/cats/sanhua/01.jpg",
    gallery: [
      "/photos/cats/sanhua/01.jpg",
      "/photos/cats/sanhua/02.jpg",
      "/photos/cats/sanhua/03.jpg",
    ],
  },
  {
    slug: "dahubai",
    name: "大灰白虎",
    appearance: "大隻、灰白雙色、身上有清楚的虎斑",
    coverImage: "/photos/cats/dahubai/01.jpg",
    gallery: [
      "/photos/cats/dahubai/01.jpg",
      "/photos/cats/dahubai/02.jpg",
      "/photos/cats/dahubai/03.jpg",
    ],
  },
];

export function getCat(slug: string): Cat | undefined {
  return cats.find((c) => c.slug === slug);
}
