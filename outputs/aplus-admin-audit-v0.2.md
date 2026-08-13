# Aplus Admin / Supabase Audit V0.2

日期：2026-08-12。範圍：admin/、Supabase 前端整合、公開內容發布鏈路。未修改資料庫。

## 結論
現有 Admin 是具備 Supabase CRUD 程式碼的內部原型，不能視為已可正式發布的 CMS。公開站讀取 assets/js/content-data.js，Admin 寫入 Supabase articles；兩者沒有發布同步。

## 已確認
- 純 HTML/CSS/JavaScript，Supabase JS v2 CDN；Email/Password 登入。
- articles 程式碼包含內容、分類、狀態、SEO、排程、views 與社群欄位；draft/published/scheduled、soft delete 存在。
- 另引用 leads、tracking_events、auto_generate_settings、auto_generate_topics。
- 未找到圖片上傳、Storage bucket/getPublicUrl、migration、schema SQL、RLS policy 或 Supabase CLI 設定。
- 前端只找到 anon key，未找到 service-role key。實際安全性依賴 RLS。
- scheduler 依賴 localhost:3000，AI 流程依賴本機 Ollama，不能直接在 GitHub Pages 運作。
- active admin/js/pages/* 與舊版 JS 重複，存在版本漂移風險。

## 無法確認
對目前 Supabase project host 的唯讀測試因 DNS/連線失敗而無法完成，所以遠端 tables、RLS policies、Auth 使用者、Storage 均是未驗證，不是已通過。

## 本輪安全修正
非 login Admin 頁面載入既有 Auth Guard；未取得 session 前隱藏 UI，無 session 導向 login，登出接 signOut。

## Admin Recommendation
- A（建議）：先當內部原型保留；公開內容維持本地資料，不宣稱正式 CMS。
- B：另開階段修成正式 CMS，補 migrations、逐表 RLS、Storage、Admin role、發布鏈路與部署後端。
- C：短期不維護 Supabase 時，將 Admin 從公開部署排除但保留歷史檔案，不直接刪除。
