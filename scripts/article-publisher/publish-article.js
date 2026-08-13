"use strict";

const fs = require("node:fs");
const path = require("node:path");

const SITE_ORIGIN = "https://www.keysearch-app.com";
const VALID_CATEGORIES = new Set(["AI", "科技", "影音", "專業製作", "工具"]);
const root = path.resolve(__dirname, "../..");

function fail(message) {
  console.error("Publish failed: " + message);
  process.exit(1);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail("Cannot read article JSON: " + error.message);
  }
}

function requiredText(data, key) {
  const value = typeof data[key] === "string" ? data[key].trim() : "";
  if (!value) fail(key + " is required");
  return value;
}

function validate(data) {
  const article = {
    title: requiredText(data, "title"),
    slug: requiredText(data, "slug"),
    category: requiredText(data, "category"),
    description: requiredText(data, "description"),
    content: requiredText(data, "content"),
    publishedAt: requiredText(data, "publishedAt"),
    coverImage: requiredText(data, "coverImage"),
    readingTime: requiredText(data, "readingTime"),
    lead: String(data.lead || data.description || "").trim(),
    coverAlt: String(data.coverAlt || data.title || "").trim(),
    relatedTool: data.relatedTool || null,
    relatedProduct: data.relatedProduct || null,
    seoTitle: String(data.seoTitle || data.title || "").trim(),
    metaDescription: String(data.metaDescription || data.description || "").trim()
  };

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
    fail("slug must use lowercase letters, numbers, and single hyphens only");
  }
  if (!VALID_CATEGORIES.has(article.category)) {
    fail("category must be one of: " + Array.from(VALID_CATEGORIES).join(", "));
  }
  const parsedDate = new Date(article.publishedAt + "T00:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt) ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== article.publishedAt) {
    fail("publishedAt must be a valid YYYY-MM-DD date");
  }
  if (article.relatedProduct && article.relatedProduct !== "nexuscut") {
    fail("relatedProduct is not registered in the current product config");
  }

  return article;
}

function jsValue(value) {
  return JSON.stringify(value);
}

function articleEntry(article) {
  const image = article.coverImage.startsWith("./")
    ? article.coverImage
    : "./" + article.coverImage.replace(/^\/+/, "");

  return [
    "    makeArticle({",
    "      slug: " + jsValue(article.slug) + ",",
    "      relatedTool: " + jsValue(article.relatedTool) + ",",
    "      relatedProduct: " + jsValue(article.relatedProduct) + ",",
    "      category: " + jsValue(article.category) + ",",
    "      title: " + jsValue(article.title) + ",",
    "      description: " + jsValue(article.description) + ",",
    "      lead: " + jsValue(article.lead) + ",",
    "      date: " + jsValue(article.publishedAt.replaceAll("-", ".")) + ",",
    "      readingTime: " + jsValue(article.readingTime) + ",",
    "      image: " + jsValue(image) + ",",
    "      alt: " + jsValue(article.coverAlt) + ",",
    "      seoTitle: " + jsValue(article.seoTitle) + ",",
    "      metaDescription: " + jsValue(article.metaDescription) + ",",
    "      intro: " + jsValue(article.description) + ",",
    "      sections: [],",
    "      extra: " + jsValue(article.content),
    "    })"
  ].join("\n");
}

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildHtml(template, article) {
  return template
    .replaceAll("{{SLUG}}", htmlEscape(article.slug))
    .replaceAll("{{TITLE}}", htmlEscape(article.seoTitle))
    .replaceAll("{{DESCRIPTION}}", htmlEscape(article.metaDescription));
}

function main() {
  const inputArg = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");
  if (!inputArg) {
    fail("Usage: node scripts/article-publisher/publish-article.js <article.json> [--dry-run]");
  }

  const inputPath = path.resolve(process.cwd(), inputArg);
  const article = validate(readJson(inputPath));
  const routeDir = path.join(root, "article", article.slug);
  const contentPath = path.join(root, "assets", "js", "content-data.js");
  const sitemapPath = path.join(root, "sitemap-articles.xml");
  const templatePath = path.join(__dirname, "article-template.html");

  if (fs.existsSync(routeDir)) fail("Article already exists: " + article.slug);

  const originalContent = fs.readFileSync(contentPath, "utf8");
  const originalSitemap = fs.readFileSync(sitemapPath, "utf8");
  const template = fs.readFileSync(templatePath, "utf8");

  if (originalContent.includes('slug: "' + article.slug + '"')) {
    fail("Article already exists in content-data.js: " + article.slug);
  }

  const contentMarker = "\n  ];";
  const contentIndex = originalContent.lastIndexOf(contentMarker);
  if (contentIndex < 0) fail("content-data.js insertion marker not found");
  if (!originalSitemap.includes("</urlset>")) fail("sitemap closing tag not found");

  const newContent =
    originalContent.slice(0, contentIndex) +
    ",\n" + articleEntry(article) +
    originalContent.slice(contentIndex);

  const sitemapEntry =
    '  <url><loc>' + SITE_ORIGIN + '/article/' + article.slug +
    '/</loc><lastmod>' + article.publishedAt + '</lastmod></url>\n';
  const newSitemap = originalSitemap.replace("</urlset>", sitemapEntry + "</urlset>");
  const newHtml = buildHtml(template, article);

  if (dryRun) {
    console.log("Validation passed (dry run)");
    console.log("Route: article/" + article.slug + "/index.html");
    console.log("No files changed.");
    return;
  }

  const tempContent = contentPath + ".tmp-" + process.pid;
  const tempSitemap = sitemapPath + ".tmp-" + process.pid;
  const tempRoute = path.join(root, "article", "." + article.slug + ".tmp-" + process.pid);

  try {
    fs.writeFileSync(tempContent, newContent, "utf8");
    fs.writeFileSync(tempSitemap, newSitemap, "utf8");
    fs.mkdirSync(tempRoute, { recursive: false });
    fs.writeFileSync(path.join(tempRoute, "index.html"), newHtml, "utf8");

    fs.renameSync(tempContent, contentPath);
    fs.renameSync(tempSitemap, sitemapPath);
    fs.renameSync(tempRoute, routeDir);

    console.log("Published: " + article.title);
    console.log("Route: article/" + article.slug + "/index.html");
    console.log("Updated: assets/js/content-data.js");
    console.log("Updated: sitemap-articles.xml");
  } catch (error) {
    try { fs.writeFileSync(contentPath, originalContent, "utf8"); } catch (_) {}
    try { fs.writeFileSync(sitemapPath, originalSitemap, "utf8"); } catch (_) {}
    try { if (fs.existsSync(tempContent)) fs.unlinkSync(tempContent); } catch (_) {}
    try { if (fs.existsSync(tempSitemap)) fs.unlinkSync(tempSitemap); } catch (_) {}
    try { if (fs.existsSync(tempRoute)) fs.rmSync(tempRoute, { recursive: true }); } catch (_) {}
    try { if (fs.existsSync(routeDir)) fs.rmSync(routeDir, { recursive: true }); } catch (_) {}
    fail(error.message);
  }
}

main();
