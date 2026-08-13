# Aplus Article Publishing

這是本機 Static Content Generator，不是 CMS，也不會連線 Supabase。它只使用 Node.js built-in modules，不需要 `npm install` 或 `package.json`。

## 如何新增文章

1. 複製 `scripts/article-publisher/example-article.json`
2. 填寫文章資料與簡單 HTML Content
3. 先執行 Dry Run
4. 執行正式發布
5. 啟動本機靜態伺服器，檢查文章頁、封面、連結與響應式版型
6. 之後再由你自行處理 Git 與 GitHub Pages 部署

### Dry Run

```powershell
node scripts/article-publisher/publish-article.js scripts/article-publisher/example-article.json --dry-run
```

### 正式產生

```powershell
node scripts/article-publisher/publish-article.js scripts/article-publisher/my-article.json
```

成功後會：

- 在 `assets/js/content-data.js` 加入 Article Data Entry
- 建立 `article/{slug}/index.html`
- 在 `sitemap-articles.xml` 加入 URL 與 lastmod

## 驗證規則

- title、slug、description、content、coverImage、publishedAt、readingTime 不可空白
- slug 只接受小寫英數字與單一連字號
- category 只接受 AI、科技、影音、專業製作、工具
- publishedAt 必須是有效的 YYYY-MM-DD
- article route 或 content-data.js 已有相同 slug 時停止，顯示 `Article already exists`
- 第一版不支援 Update，不會覆蓋既有文章
- 任一預檢失敗時不會寫入半套檔案

Article Content 使用可信任的簡單 HTML，不載入 Markdown 或 WYSIWYG Library。
