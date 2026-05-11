export type Cat = {
  slug: string;
  no: string;
  name: string;
  appearance: string;
  coverImage: string;
  gallery: string[];
  note?: string;
};

/**
 * 待認養貓咪 — 全部來自雲深貓園南投山上的家。
 * 名字由我們暫定，方便大家叫；認養後可由新家自由命名。
 */
export const cats: Cat[] = [
  {
    slug: "c01",
    no: "01",
    name: "米米",
    appearance: "淺灰底細虎紋、躺在橙色毯子上",
    coverImage: "/photos/cats/c01/01.jpg",
    gallery: ["/photos/cats/c01/01.jpg", "/photos/cats/c01/02.jpg"],
  },
  {
    slug: "c02",
    no: "02",
    name: "黑糖",
    appearance: "黑頭白胸、躲在毯子下",
    coverImage: "/photos/cats/c02/01.jpg",
    gallery: ["/photos/cats/c02/01.jpg"],
  },
  {
    slug: "c03",
    no: "03",
    name: "墨墨",
    appearance: "全身純黑、金黃色眼睛、站姿",
    coverImage: "/photos/cats/c03/01.jpg",
    gallery: [
      "/photos/cats/c03/01.jpg",
      "/photos/cats/c03/02.jpg",
      "/photos/cats/c03/03.jpg",
    ],
  },
  {
    slug: "c04",
    no: "04",
    name: "拿鐵",
    appearance: "黑橘交雜、像被打翻的咖啡",
    coverImage: "/photos/cats/c04/01.jpg",
    gallery: ["/photos/cats/c04/01.jpg", "/photos/cats/c04/02.jpg"],
  },
  {
    slug: "c05",
    no: "05",
    name: "小芋",
    appearance: "白底灰塊小貓、站在白籠裡",
    coverImage: "/photos/cats/c05/01.jpg",
    gallery: [
      "/photos/cats/c05/01.jpg",
      "/photos/cats/c05/02.jpg",
      "/photos/cats/c05/03.jpg",
    ],
  },
  {
    slug: "c06",
    no: "06",
    name: "焦糖",
    appearance: "淺棕色虎斑、金黃色眼睛、躲在籠中",
    coverImage: "/photos/cats/c06/01.jpg",
    gallery: ["/photos/cats/c06/01.jpg"],
  },
  {
    slug: "c07",
    no: "07",
    name: "銀寶",
    appearance: "灰底虎紋、金黃色眼睛、靠在角落",
    coverImage: "/photos/cats/c07/01.jpg",
    gallery: ["/photos/cats/c07/01.jpg", "/photos/cats/c07/02.jpg"],
  },
  {
    slug: "c08",
    no: "08",
    name: "太陽",
    appearance: "大隻金橘色虎斑、清楚正面坐姿",
    coverImage: "/photos/cats/c08/01.jpg",
    gallery: [
      "/photos/cats/c08/01.jpg",
      "/photos/cats/c08/02.jpg",
      "/photos/cats/c08/03.jpg",
    ],
    note: "正面坐姿、眼神是會閃光的那種橘",
  },
  {
    slug: "c09",
    no: "09",
    name: "圓圓",
    appearance: "圓滾橘虎斑、其中一眼曾受傷",
    coverImage: "/photos/cats/c09/01.jpg",
    gallery: ["/photos/cats/c09/01.jpg", "/photos/cats/c09/02.jpg"],
  },
  {
    slug: "c10",
    no: "10",
    name: "歪歪",
    appearance: "棕色虎斑、最愛歪著頭看人",
    coverImage: "/photos/cats/c10/01.jpg",
    gallery: [
      "/photos/cats/c10/01.jpg",
      "/photos/cats/c10/02.jpg",
      "/photos/cats/c10/03.jpg",
      "/photos/cats/c10/04.jpg",
    ],
    note: "整個雲深貓園裡表情最多的一隻",
  },
  {
    slug: "c11",
    no: "11",
    name: "雲朵",
    appearance: "白底淡灰塊、清澈黃眼",
    coverImage: "/photos/cats/c11/01.jpg",
    gallery: [
      "/photos/cats/c11/01.jpg",
      "/photos/cats/c11/02.jpg",
      "/photos/cats/c11/03.jpg",
      "/photos/cats/c11/04.jpg",
      "/photos/cats/c11/05.jpg",
      "/photos/cats/c11/06.jpg",
      "/photos/cats/c11/07.jpg",
      "/photos/cats/c11/08.jpg",
      "/photos/cats/c11/09.jpg",
      "/photos/cats/c11/10.jpg",
      "/photos/cats/c11/11.jpg",
      "/photos/cats/c11/12.jpg",
    ],
    note: "雙黃眼最亮的一隻、總是安靜坐在粉籠裡",
  },
  {
    slug: "c12",
    no: "12",
    name: "花花",
    appearance: "白底加橘塊與灰塊、典型三花貓",
    coverImage: "/photos/cats/c12/01.jpg",
    gallery: ["/photos/cats/c12/01.jpg", "/photos/cats/c12/02.jpg"],
  },
  {
    slug: "c13",
    no: "13",
    name: "箱寶",
    appearance: "大隻橘虎斑、最愛窩在紙箱裡",
    coverImage: "/photos/cats/c13/01.jpg",
    gallery: ["/photos/cats/c13/01.jpg"],
  },
  {
    slug: "c14",
    no: "14",
    name: "小桔",
    appearance: "小隻、橘色加白胸口、其中一眼曾受傷",
    coverImage: "/photos/cats/c14/01.jpg",
    gallery: [
      "/photos/cats/c14/01.jpg",
      "/photos/cats/c14/02.jpg",
      "/photos/cats/c14/03.jpg",
    ],
  },
  {
    slug: "c15",
    no: "15",
    name: "雪虎",
    appearance: "大隻、灰白雙色、身上有清楚虎斑",
    coverImage: "/photos/cats/c15/01.jpg",
    gallery: ["/photos/cats/c15/01.jpg"],
  },
  {
    slug: "c16",
    no: "16",
    name: "乳牛",
    appearance: "黑頭白胸、下巴一個白色 V",
    coverImage: "/photos/cats/c16/01.jpg",
    gallery: [
      "/photos/cats/c16/01.jpg",
      "/photos/cats/c16/02.jpg",
      "/photos/cats/c16/03.jpg",
      "/photos/cats/c16/04.jpg",
      "/photos/cats/c16/05.jpg",
    ],
    note: "翻肚、瞇眼、瞪人 — 一天可以演完一齣戲",
  },
  {
    slug: "c17",
    no: "17",
    name: "桃桃",
    appearance: "清楚的三花特寫、粉色鼻子",
    coverImage: "/photos/cats/c17/01.jpg",
    gallery: ["/photos/cats/c17/01.jpg"],
  },
  {
    slug: "c18",
    no: "18",
    name: "奶油",
    appearance: "大隻橘白雙色、躺著像融化的奶油",
    coverImage: "/photos/cats/c18/01.jpg",
    gallery: [
      "/photos/cats/c18/01.jpg",
      "/photos/cats/c18/02.jpg",
      "/photos/cats/c18/03.jpg",
    ],
  },
  {
    slug: "c19",
    no: "19",
    name: "兩兄弟",
    appearance: "灰白虎斑與三花、總是黏在一起的兩位",
    coverImage: "/photos/cats/c19/01.jpg",
    gallery: ["/photos/cats/c19/01.jpg", "/photos/cats/c19/02.jpg"],
    note: "巡邏、吃飯、睡覺都一起 — 認養的話建議一次帶走兩位",
  },
  {
    slug: "c20",
    no: "20",
    name: "阿夜",
    appearance: "全身純黑、毯子上的安靜小團",
    coverImage: "/photos/cats/c20/01.jpg",
    gallery: ["/photos/cats/c20/01.jpg", "/photos/cats/c20/02.jpg"],
  },
];

export function getCat(slug: string): Cat | undefined {
  return cats.find((c) => c.slug === slug);
}
