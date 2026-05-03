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
 * 認養人案例 — 等真實認養人提供具名同意的引述後再填入。
 * 範例：
 *   {
 *     slug: "lin-buru",
 *     adopterName: "林先生",
 *     catName: "布魯",
 *     adoptedDate: "2024",
 *     location: "台北",
 *     photo: "/photos/adopters/lin-buru.jpg",
 *     quote: "他剛來的時候躲在衣櫃後面...",
 *     body: "（可選）較長的敘述",
 *   }
 *
 * 陣列為空時，/story 頁的「認養人的話」整個區塊會自動隱藏，不會顯示佔位資料。
 */
export const adopters: AdopterStory[] = [];
