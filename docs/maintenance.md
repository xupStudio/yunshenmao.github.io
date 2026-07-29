# 雲深貓園 — 定期維護備忘

這份是「網站日常要做什麼事」的 checklist。完整 setup 文件看 [fb-sync.md](./fb-sync.md)。

## 強制（不做會壞）

### 🔴 每 ~60 天：刷新 FB Page Access Token

**為什麼**：FB long-lived page access token 可能因改 FB 密碼、撤銷 App
授權、開 2FA 或被移除管理員權限而失效。token 失效後 Cloudflare 每日同步會
回傳授權錯誤，貼文不再更新。

**怎麼知道該做了**：
- 主動方式：每兩個月到 Cloudflare 的 `yunshenmao-site` → Cron Events /
  Observability 看最近一次同步是否成功
- 被動方式：在 Cloudflare 為同步錯誤建立通知

**怎麼做**：
1. 回到 [fb-sync.md 的步驟 3](./fb-sync.md#3-取得長效-page-access-token) 重新跑一次拿新 token
2. 執行
   `npx wrangler secret put FB_PAGE_ACCESS_TOKEN --config wrangler.site.jsonc`
3. 檢查下一次 Cron Event 與 `/journal`

---

## 建議（不做不會壞，但會品質下降）

### 🟡 每週：瞄一眼 /journal

**看什麼**：
- Gemini 改寫過的句子（標籤「部分句子已調整」或「部分內容已調整或遮蔽」）讀起來是不是像師父口吻
- 有沒有看起來怪怪的、不像同一篇貼文的句子
- 長度是不是嚴重失衡

**發現問題怎麼辦**：
- 個別一兩句不滿意：忍著，下次 sync 會重來、會不一樣
- 普遍系統性問題（例如改寫後都太冷淡、都把貓名拿掉）：調整
  [`workers/site-runtime/src/sync.ts`](../workers/site-runtime/src/sync.ts)
  裡的 prompt，並遞增 `PROCESSOR_VERSION` 讓舊貼文重新處理

### 🟡 每月：對照 FB 看有沒有漏網之魚

開 FB 粉專 → 看最近的貼文 → 比對 /journal → 找有沒有師父用新的迂迴勸募詞，
但
[`RED_LINE_PATTERNS`](../workers/site-runtime/src/red-lines.ts)
沒抓到的。

**已抓的詞**（截至 2026-05）：捐款、捐助、捐贈、募款、勸募、樂捐、善款、匯款、戶頭、轉帳、抵稅、收據、懇請、拜託拜託、乞求、幫幫、善心菩薩、善友、沒有收入、變貧戶、吃泡麵、數字＋萬/千/元/塊

**可能漏網的變體**：例如「需要援軍」「請幫忙湊」「贊助」「支持我們」「需要您」—— Gemini prompt 內已禁這些字眼於輸出，但 sync 的偵測還沒涵蓋。如果師父在 FB 上開始用這類詞，新增 regex 進 `RED_LINE_PATTERNS` array。

### 🟡 每季：查 Cloudflare 同步失敗紀錄

Cloudflare → `yunshenmao-site` → Observability / Cron Events → 看有沒有連續失敗；
通常是 FB token 過期或 Gemini quota 滿。

---

## 不用管的

- **自動 commit / push**：日誌已改存 R2，不再產生 Git commit，也不需要
  GitHub Actions。

### 2026 年需處理的 Gemini 變更

- 2026 年 9 月起應使用 AI Studio 新版 auth key；更新方式：
  `npx wrangler secret put GEMINI_API_KEY --config wrangler.site.jsonc`
- `gemini-2.5-flash` 官方預計最早於 2026-10-16 停用。切換模型前要先用
  紅線句子做品質測試，再修改 `wrangler.site.jsonc` 的 `GEMINI_MODEL`。

---

## 緊急狀況

### 師父在 FB 上發了極端嚴重的勸募 / 個資 / 違法內容

最壞情況：那則貼文已經同步到 R2 的 `journal/data.json` 並顯示在網站上。

**立即處理**：
1. 先請師父刪除或修正 FB 原文，避免下一次每日同步又抓回來
2. 到 Cloudflare R2 的 `yunshenmao-journal` bucket 下載
   `journal/data.json`
3. 刪除該篇 post object 後，上傳覆蓋同一個 object
4. 重新開啟 `/journal` 確認已移除

### 每日同步卡住、跑超久

- 多半是 FB Graph API rate-limited 或 Gemini API 異常
- 到 Cloudflare 查看該次 Cron Event 與 Worker Logs
- Cron 最長 15 分鐘會結束；下一次會在隔日自動重試
- 連續失敗就走「Token 刷新」流程

### Gemini 改寫品質突然集體變差

- 可能 Google 改了 model behavior
- 修改 [`wrangler.site.jsonc`](../wrangler.site.jsonc) 的 `GEMINI_MODEL`，
  先在測試環境驗證後再部署
- 或者調整 prompt 的 temperature / 範例
