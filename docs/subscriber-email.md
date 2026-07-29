# 山上月報訂閱信

「山上月報」是有對價的數位內容訂閱，不是捐款或募款。訂閱者付費後，
每月會收到一封記錄山上貓咪近況與照護日常的 email。

## 訂閱確認信（已自動化）

正式流程全部運行在 Cloudflare，不使用 Resend、GitHub Actions、R2、KV 或 D1：

1. Stripe 首次訂閱付款完成後，傳送 `invoice.paid` webhook。
2. `yunshenmao-subscriber-welcome` Worker 驗證 Stripe webhook 簽章，只接受：
   - live mode；
   - `billing_reason = subscription_create`；
   - `metadata.project = yunshenmao`；
   - `metadata.plan = monthly-500` 至 `monthly-5000`。
3. Cloudflare Workflow 等到付款事件發生滿 5 分鐘。
4. Workflow 透過受 HMAC 保護的 Pages Function 再向 Stripe 查詢訂閱。
5. 只有訂閱仍是 `active` 或 `trialing`，且沒有取消、排定取消或暫停時，
   才由 Cloudflare Email Service 寄出雲深貓園確認信。

每個 Stripe subscription 使用固定 Workflow ID，重送同一 webhook 不會再次建立寄信流程。

### 正式資源

- Webhook：`https://hooks.yunshenmao.com/stripe/webhook`
- 健康檢查：`https://hooks.yunshenmao.com/health`
- Stripe 狀態代理：`https://yunshenmao-checkout.pages.dev/api/subscription-status`
- 寄件者：`雲深貓園 <monthly@yunshenmao.com>`
- 回覆信箱：`xup654m42@gmail.com`
- Stripe 訂閱管理：
  `https://billing.stripe.com/p/login/14A5kD5HJ57bggjcva7wA01`

Stripe 帳號金鑰只保存在既有 `yunshenmao-checkout` Pages 專案。
Welcome Worker 只有 webhook signing secret 與狀態代理 HMAC secret，不能直接操作 Stripe。

### Cloudflare Secrets

`yunshenmao-checkout` Pages：

- `STRIPE_SECRET_KEY`
- `STRIPE_STATUS_PROXY_TOKEN`

`yunshenmao-subscriber-welcome` Worker：

- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_STATUS_PROXY_TOKEN`

Secret 值不得寫入 Git、文件、`wrangler.jsonc` 或一般環境變數。

### 維運檢查

```bash
cd workers/subscriber-welcome
npm test
npm run typecheck
npx wrangler deploy --dry-run

curl -i https://hooks.yunshenmao.com/health
npx wrangler workflows instances list yunshenmao-subscriber-welcome
```

正常健康檢查為 HTTP 200 與 `{"status":"ok"}`。若需看單一寄信流程：

```bash
npx wrangler workflows instances describe \
  yunshenmao-subscriber-welcome WORKFLOW_INSTANCE_ID
```

不要把 Workflow 輸出、Stripe customer ID、subscription ID 或收件地址貼到公開 issue。

## 每月月報（目前仍由人工寄送）

確認信已自動化；每個月實際的「山上月報」內容仍由人工整理與寄送：

1. 在 Stripe Dashboard 篩選有效訂閱，並限定雲深貓園的方案或
   `metadata.project = yunshenmao`，避免混到同帳號的其他專案。
2. 從當月山上日誌挑選近況、照片與照護紀錄，依方案補上相應內容。
3. 使用可保護收件者隱私的寄信方式；若手動寄送，收件者必須放 BCC，不可放 To/CC。
4. 信末附 Stripe 訂閱管理連結，並記錄寄送月份、日期與人數。

若未來要自動產生並寄送每月內容，應另建每月 Workflow；不要把它混入首次訂閱確認信。

## 取消與退款

- 訂閱者可透過確認信中的 Stripe 管理連結更新付款資料或取消，取消會在當期結束生效。
- 也可回信或私訊雲深貓園協助處理。
- 退款依網站[使用條款](../app/terms/page.tsx)辦理。

## 上線紀錄

- 2026-07-29：五分鐘確認信自動化正式上線。
- 上線時已對 2 位既有有效訂閱者執行一次性狀態確認與補寄；兩個寄信 Workflow 均完成。
- 一次性補寄入口、設定 Secret 與含設定程式的 Pages 部署均已刪除。
