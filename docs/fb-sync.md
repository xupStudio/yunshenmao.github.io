# FB 粉專同步設定（山上日誌）

`/journal` 頁面內容由 GitHub Actions 每 6 小時打 Facebook Graph API 同步而來，貼文文字 + 圖片下載到 repo 後 commit 進 `main`，再由既有的 deploy workflow 重新部署。

設定一次，之後完全自動。

## 一次性設定步驟

### 1. 確認你是粉專管理員

設定者（網站維護者）必須是 FB 粉專 `雲深貓園` 的管理員。如果還不是，請師父先加你：

- 師父在粉專 → 設定 → 粉專管理 → 新增使用者 → 輸入你的 FB 帳號 → 給「管理員」權限

### 2. 建立 Meta 開發者 App

1. 到 https://developers.facebook.com → 我的應用程式 → 建立應用程式
2. 用途選 **「其他」**，類型選 **「商業」**
3. 名稱例如 `yunshenmao-sync`（內部用，不會給使用者看）
4. 建立後**不需要送審**，維持 Development Mode 即可（你是 Admin，可以拿到 token）

### 3. 取得長效 Page Access Token

A. 到 https://developers.facebook.com/tools/explorer/

B. 右上角選你剛建立的 App

C. 點「Generate Access Token」→ 登入 FB → 授權

D. 在「Permissions」欄位加上：
   - `pages_show_list`
   - `pages_read_engagement`

E. 點「Generate Access Token」拿到 **短效 User Token**

F. 把短效 User Token 換成長效 User Token（在 Graph API Explorer 跑一次，或 curl）：

```
GET https://graph.facebook.com/v21.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &fb_exchange_token={短效USER_TOKEN}
```

回傳 JSON 裡的 `access_token` 就是 **長效 User Token**（約 60 天）。

G. 用長效 User Token 換 **長效 Page Access Token**：

```
GET https://graph.facebook.com/v21.0/me/accounts
  ?access_token={長效USER_TOKEN}
```

回傳會列出你管理的所有粉專，找到 `id` 為 `61579639902271` 那筆，裡面的 `access_token` 就是我們要的 **長效 Page Access Token**（理論上不會過期，除非你改密碼、撤銷 App 授權、或 2FA 觸發）。

### 4. 加入 GitHub Secret

到 repo → Settings → Secrets and variables → Actions → New repository secret

- Name: `FB_PAGE_ACCESS_TOKEN`
- Value: 上一步拿到的長效 Page Access Token

### 5. 跑第一次同步

到 repo → Actions → `Sync FB posts` → Run workflow

成功的話：
- `data/journal.json` 會被更新成最近 30 篇貼文
- `public/photos/journal/<post-id>/<n>.jpg` 會出現所有圖片
- 自動 commit 後既有的 deploy workflow 會接著重新部署

## 之後

- 排程：每 6 小時自動跑一次（GitHub cron 設定在 [`.github/workflows/sync-fb.yml`](../.github/workflows/sync-fb.yml)）
- 手動觸發：到 Actions 頁面點 Run workflow
- 改抓多少篇：改 [`scripts/sync-fb.mjs`](../scripts/sync-fb.mjs) 的 `POSTS_LIMIT`

## Token 失效處理

長效 Page Token 在以下情況會失效：

- 你（網站維護者）改 FB 密碼
- 你撤銷對 `yunshenmao-sync` App 的授權
- 你的 FB 開了 2FA 並重新驗證
- 師父把你從粉專管理員移除

Workflow 失敗時 GitHub 會寄信給 repo owner。重跑步驟 3 拿新 token、更新步驟 4 的 secret。

## 法律提醒與目前的處理機制

雲深貓園是未立案狀態，網站受 `memory/project_legal_compliance.md` 規範。FB 貼文若含「捐款」「募款」等字眼，網站直接 mirror 上線會違反《公益勸募條例》。

**目前的三層處理機制**（[`scripts/sync-fb.mjs`](../scripts/sync-fb.mjs)）：

1. **RED_LINE_PATTERNS 偵測**：每行掃描勸募/金錢/金額相關 regex
2. **Gemini 2.5 Flash 改寫**：偵測到紅線行 → 呼叫 Gemini 做最小幅度改寫成師父口吻的中性敘事
3. **改寫結果再驗證**：改寫後再跑一次紅線 regex；還命中或 API 失敗 → fallback 丟掉整行

UI 層也有揭露：[`/journal` 頁面頂部](../app/journal/page.tsx)說明「同步時部分句子會自動調整或省略；以 FB 原文為準」+ 每篇有處理過的貼文標「部分句子已調整」/「部分內容已遮蔽」+ 連結回 FB 原文。

**仍需配合的事**：

- 跟師父維持溝通：FB 貼文盡量用「物資支持」「物資寄送」「贈與」等中性詞，少用直接勸募語句
- 定期巡視，看 [maintenance.md](./maintenance.md) checklist

**緊急狀況**（極端違規貼文已上線）處理流程在 [maintenance.md 緊急狀況](./maintenance.md#緊急狀況) 章節。
