export type AdopterStory = {
  slug: string;
  adopterName: string;
  catName: string;
  adoptedDate: string;
  location?: string;
  photo?: string;
  quote: string;
  body?: string;
  placeholder?: boolean;
};

/**
 * 認養人案例 — 目前先放 1 個示範版占位。
 * 要新增案例：複製一個物件、填入實際資料，`placeholder: false` 或移除該欄位。
 * 要補照片：將照片放到 `public/photos/adopters/<slug>.jpg`，把 `photo` 欄位填入完整路徑。
 */
export const adopters: AdopterStory[] = [
  {
    slug: "story-1",
    adopterName: "待更新",
    catName: "待更新",
    adoptedDate: "待更新",
    location: "待更新",
    // photo: "/photos/adopters/story-1.jpg",  // 有照片時取消註解並填入路徑
    quote:
      "這裡會放認養人親口說的一段話 — 一個讓人看了會心一笑或心頭一暖的真實片段。例如：「他剛來的時候躲在衣櫃後面，現在每天晚上會鑽進棉被，把頭塞在我的脖子下面睡覺。」",
    body:
      "下面這段是比較長的敘述版本，可寫可不寫。認養人可以分享剛帶回家那幾天的不安、一個月後的轉變，或讓他們最印象深刻的小片段。",
    placeholder: true,
  },
];
