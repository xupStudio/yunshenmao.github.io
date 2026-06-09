# 雲深貓園 — 定期維護備忘

這份是「網站日常要做什麼事」的 checklist。完整 setup 文件看 [fb-sync.md](./fb-sync.md)。

## 強制（不做會壞）

### 🔴 每 ~60 天：刷新 FB Page Access Token

**為什麼**：FB long-lived page access token 約 60 天會失效（改 FB 密碼、撤銷 App 授權、開 2FA、被移除管理員權限都會提前失效）。token 失效後 sync workflow 開始回傳 401、貼文不再更新。

**怎麼知道該做了**：
- 主動方式：每兩個月手動跑一次 [`Sync FB posts` workflow](https://github.com/xupStudio/yunshenmao.github.io/actions/workflows/sync-fb.yml) 看有沒有 ❌
- 被動方式：GitHub 會在 workflow 連續失敗時寄信給 repo owner

**怎麼做**：
1. 回到 [fb-sync.md 的步驟 3](./fb-sync.md#3-取得長效-page-access-token) 重新跑一次拿新 token
2. `gh secret set FB_PAGE_ACCESS_TOKEN --repo xupStudio/yunshenmao.github.io`（terminal 會跳 prompt 讓你貼 token，不會留在 shell history）
3. 手動 trigger workflow 確認跑得起來

---

## 建議（不做不會壞，但會品質下降）

### 🟡 每週：瞄一眼 /journal

**看什麼**：
- Gemini 改寫過的句子（標籤「部分句子已調整」或「部分內容已調整或遮蔽」）讀起來是不是像師父口吻
- 有沒有看起來怪怪的、不像同一篇貼文的句子
- 長度是不是嚴重失衡

**發現問題怎麼辦**：
- 個別一兩句不滿意：忍著，下次 sync 會重來、會不一樣
- 普遍系統性問題（例如改寫後都太冷淡、都把貓名拿掉）：跟 Claude 說，調 [`scripts/sync-fb.mjs`](../scripts/sync-fb.mjs) 裡的 prompt

### 🟡 每月：對照 FB 看有沒有漏網之魚

開 FB 粉專 → 看最近的貼文 → 比對 /journal → 找有沒有師父用新的迂迴勸募詞，但 [`RED_LINE_PATTERNS`](../scripts/sync-fb.mjs#L15) 沒抓到的。

**已抓的詞**（截至 2026-05）：捐款、捐助、捐贈、募款、勸募、樂捐、善款、匯款、戶頭、轉帳、抵稅、收據、懇請、拜託拜託、乞求、幫幫、善心菩薩、善友、沒有收入、變貧戶、吃泡麵、數字＋萬/千/元/塊

**可能漏網的變體**：例如「需要援軍」「請幫忙湊」「贊助」「支持我們」「需要您」—— Gemini prompt 內已禁這些字眼於輸出，但 sync 的偵測還沒涵蓋。如果師父在 FB 上開始用這類詞，新增 regex 進 `RED_LINE_PATTERNS` array。

### 🟡 每季：查 GitHub Actions 失敗紀錄

[Actions 頁面](https://github.com/xupStudio/yunshenmao.github.io/actions) → 看有沒有 sync workflow 連續失敗 → 通常是 FB token 過期或 Gemini quota 滿。

---

## 不用管的

- **Gemini quota**：免費 250 req/day。最壞情況一天 ~240 calls，但實際多數貼文沒紅線、遠低於上限。要焦慮再說。
- **Gemini key 輪替**：技術上半年到一年換一次比較安全，但不換也不會壞。要換就回 [aistudio.google.com/apikey](https://aistudio.google.com/apikey) 重發、`gh secret set GEMINI_API_KEY` 蓋掉。
- **自動 commit / push**：workflow 設定每 6 小時自己跑、用 `yunshenmao-bot` 身份 push，不用人工介入。

---

## 緊急狀況

### 師父在 FB 上發了極端嚴重的勸募 / 個資 / 違法內容

最壞情況：那則貼文已經被 sync 進 `data/journal.json` 並 deploy 上線。

**立即處理**：
1. `git revert <bad-commit>`、push（10 秒內網站就會重新 deploy 移除）
2. 或直接編輯 `data/journal.json` 把那篇 post object 刪掉、commit、push
3. 該則 FB 貼文的 ID 加進 sync 腳本的 deny-list（如有需要再做）
4. 請師父刪掉 FB 原文（不然下次 sync 會抓回來；雖然有 red-line filter 但保險起見）

### Workflow 卡住、跑超久

- 多半是 FB Graph API rate-limited 或 Gemini API 異常
- 到 Actions 頁面手動 cancel 那個 run
- 等 5 分鐘再 retry
- 連續失敗就走「Token 刷新」流程

### Gemini 改寫品質突然集體變差

- 可能 Google 改了 model behavior
- 看 [`scripts/sync-fb.mjs`](../scripts/sync-fb.mjs) 的 `GEMINI_MODEL` 常數，試試別的（`gemini-2.5-pro` 較貴但較強，或 `gemini-2.0-flash`）
- 或者調整 prompt 的 temperature / 範例
