/**
 * 山上日誌 — 每月由師父與網站維護者整理。
 * 內容性質：物資紀錄、送養紀錄、醫療帳單、支持者收件回報。
 *
 * 法律性質提醒（重要）：
 *   - 本日誌不得使用「捐款 / 募款 / 勸募」字眼（未立案，違《公益勸募條例》第 5 條）。
 *   - 物資寄送性質為訪客對師父個人的「贈與」（民法第 406 條）。
 *   - 不公開支持者真實姓名與聯絡方式，僅使用「暱稱 / 縮寫」。
 */

export type JournalEntry = {
  /** YYYY-MM 月份 */
  month: string;
  /** 簡短標題 */
  title: string;
  /** 該月概要（1-3 段） */
  summary: string[];
  /** 物資收件紀錄 */
  supplies?: Array<{
    item: string;
    qty?: string;
    from?: string;
  }>;
  /** 送養紀錄 */
  adoptions?: Array<{
    name: string;
    location?: string;
    note?: string;
  }>;
  /** 重要醫療事件 */
  medical?: string[];
  /** 該月相關照片（路徑為 /photos/journal/<month>/<n>.jpg） */
  photos?: string[];
};

export const journalEntries: JournalEntry[] = [
  // TODO: 由師父與網站維護者每月補上實際紀錄。
  // 下面是一個示範格式，等真實資料補上後請替換或刪除。
  {
    month: "2026-05",
    title: "示範條目 · 月度日誌格式預覽",
    summary: [
      "這是日誌格式的示範。當有真實資料時，此處會記錄該月份的關鍵事件、收到的物資、送出的毛孩。",
      "我們希望日誌能讓所有支持者看到：每一份善意最後變成了什麼。",
    ],
    supplies: [
      { item: "皇家 LP34 4kg", qty: "3 包", from: "—" },
      { item: "豆腐砂", qty: "10 包", from: "—" },
    ],
    adoptions: [
      { name: "示範 · 圓圓", location: "—", note: "等候真實紀錄補上" },
    ],
    medical: ["示範 · 牛牛回診抽血"],
  },
];
