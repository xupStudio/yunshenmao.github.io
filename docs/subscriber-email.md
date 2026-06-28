# 月報訂閱 — 每月寄信流程(手動 v1)

訂閱者付費後,**對價就是每月一封「山上月報」email**。Stripe 只負責收款與收集 email,
**寄月報這封信要自己做**。這份文件說明每月怎麼寄,以及上線前要先完成的事。

> 法律定位提醒:月報訂閱是「有對價的數位內容銷售」,**不是捐款/募款**。
> 文案一律用「訂閱 / 贊助 / 月報 / 認養」,**不要**用「捐款 / 募款 / 善款 / 抵稅 / 100%」
> (與 [`scripts/sync-fb.mjs`](../scripts/sync-fb.mjs) 的 RED_LINE_PATTERNS 一致)。

---

## 一、上線前一次性設定

1. **確認 Stripe 方案已建立**:`scripts/setup-stripe-plans.mjs` 已跑過,
   `data/support-plans.ts` 內的連結正確。
2. **測試 → 正式金鑰切換**(見下方第四節)。
3. **(建議)在 Stripe 後台啟用 Customer Portal**
   (Settings → Billing → Customer portal),讓訂閱者能自助取消;
   並把帳號 Public business info 的「Support email / 名稱」設成雲深貓園相關,
   不要顯示 tripcairn。
4. **(建議)設定 ToS URL = https://yunshenmao.com/terms/**
   (Settings → Public details),日後可在 Payment Link 開啟結帳同意勾選。

---

## 二、每月寄月報(手動)

每月一次,大約 10 分鐘:

1. **取得當月訂閱者名單**
   - Stripe Dashboard → **Customers**(或 Subscriptions → 篩選 `Active`)
   - 用上方搜尋/篩選 `metadata.project = yunshenmao` 只看雲深貓園的訂閱者
     (避免混到 tripcairn)
   - 匯出 CSV(Export),取 email 欄。
2. **準備月報內容**
   - 可直接沿用「山上日誌」(`data/journal.json`,已過紅線過濾)的當月內容,
     挑幾則近況 + 幾張照片整理成一封信。
   - 高階方案(認養贊助 / 守護者)記得加上對應回饋
     (季度攝影集、指定貓近況、列名等)。
3. **寄信**
   - 用你慣用的信箱或電子報工具,把訂閱者放 **BCC**(保護彼此隱私,別放 To/CC)。
   - 信末附一句:「如需取消訂閱,可回信告知,或透過 Stripe 寄給你的管理連結取消。」
4. **記錄**:留一份「X 月已寄、寄給幾人」的簡單紀錄,作為已履行對價的佐證。

---

## 三、取消 / 退款處理

- **取消**:訂閱者自助(Customer Portal)或來信 → 你在 Stripe Dashboard 找到該 subscription → Cancel。取消後不再扣款。
- **七日退款**:若訂閱後七日內來信不滿意 → 在該筆付款做 Refund,並取消訂閱。
  (條款見 [`/terms`](../app/terms/page.tsx) 第七條。)

---

## 四、測試 → 正式金鑰切換

`data/support-plans.ts` 目前是 **TEST 連結**(`STRIPE_MODE = "test"`)。驗收 OK 後:

```bash
set -a; source /Users/xup/workspace/tripcairn/.env; set +a
node scripts/setup-stripe-plans.mjs --live      # 用正式金鑰重建,輸出 live 連結
```

把輸出的 `buy.stripe.com/...`(沒有 `test_`)貼回 `data/support-plans.ts`,
並將 `STRIPE_MODE` 改為 `"live"`,重新 `npm run build`。

> 切到 live 前再確認一次:Product 名為中文「雲深貓園 …」、statement descriptor = `YUNSHENMAO`、
> 所有物件 `metadata.project = yunshenmao`,與 tripcairn 完全分開。

---

## 五、未來自動化(Phase 2,選用)

等訂閱者夠多、手動太累時,可沿用 `sync-fb.yml` 的 GitHub Actions 排程模式:
新增 `email-subscribers.yml`(每月 cron)+ 一支腳本,
用 Stripe API 撈 `active` 訂閱者 + Resend/Mailgun API 自動寄月報。
屆時需新增 email 服務金鑰為 GitHub secret,並處理退訂連結。
