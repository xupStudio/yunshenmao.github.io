/**
 * 山上日誌 — 每月由師父與網站維護者整理。
 * 內容性質：物資紀錄、送養紀錄、醫療帳單、支持者收件回報。
 *
 * 法律性質提醒（重要）：
 *   - 本日誌不得使用「捐款 / 募款 / 勸募」字眼（未立案，違《公益勸募條例》第 5 條）。
 *   - 物資寄送性質為訪客對師父個人的「贈與」（民法第 406 條）。
 *   - 不公開支持者真實姓名與聯絡方式，僅使用「暱稱 / 縮寫」。
 *
 * 陣列為空時，/journal 頁會自動顯示「第一則日誌準備中 / 追蹤 FB 粉專」空狀態，
 * 第一筆真實月度紀錄上線時再加進來。
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

export const journalEntries: JournalEntry[] = [];
