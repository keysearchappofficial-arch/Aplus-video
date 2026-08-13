# Aplus Analytics Setup

## Cloudflare Web Analytics

Aplus 使用共用 Analytics Loader，不需要逐頁修改 HTML。

設定檔：

`assets/js/analytics-config.js`

取得 Cloudflare Web Analytics Token 後：

1. 開啟 `assets/js/analytics-config.js`
2. 將 `enabled` 改為 `true`
3. 將正式 Token 填入 `token`
4. 部署 GitHub Pages
5. 到 Cloudflare Web Analytics 後台確認資料

```js
window.APLUS_ANALYTICS = {
  provider: "cloudflare",
  enabled: true,
  token: "填入 Cloudflare 提供的正式 Token"
};
```

只有 `enabled === true` 且 Token 非空時，Loader 才會載入：

`https://static.cloudflareinsights.com/beacon.min.js`

Cloudflare 後台可查看 Visitors、Pageviews、Top Pages 與 Referrers。Aplus 不建立重複的 Analytics Dashboard，也不需要 Cloudflare API、Account ID 或 Site ID。
