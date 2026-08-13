(function () {
  const articles = window.APLUS_ARTICLES || [];
  const siteUrl = window.APLUS_SITE_URL || function (path) {
    return new URL(path, window.location.href).href;
  };

  function articleUrl(article) {
    return siteUrl("article/" + article.slug + "/");
  }

  function imageUrl(article) {
    return siteUrl(String(article.image || "").replace(/^\.\//, ""));
  }

  function meta(article) {
    return article.date + " · " + article.readingTime;
  }

  function articleCard(article) {
    return '<article class="article-card">' +
      '<a class="article-card__media" href="' + articleUrl(article) + '">' +
      '<img src="' + imageUrl(article) + '" alt="' + article.alt + '" loading="lazy"></a>' +
      '<div class="article-card__content"><span class="article-category">' + article.category + '</span>' +
      '<h3 class="article-card__title"><a href="' + articleUrl(article) + '">' + article.title + '</a></h3>' +
      '<p class="article-card__description">' + article.description + '</p>' +
      '<div class="article-meta">' + meta(article) + '</div></div></article>';
  }

  function toolEntry(tool) {
    return '<article class="tool-entry"><span class="article-category">免費</span>' +
      '<h3>' + tool.name + '</h3><p>' + tool.description + '</p>' +
      '<a class="tool-entry__link" href="' + siteUrl(tool.url) + '">使用工具 →</a></article>';
  }

  const featuredRoot = document.getElementById("featured-article");
  const latestRoot = document.getElementById("latest-grid");
  const moreRoot = document.getElementById("more-grid");

  if (featuredRoot && articles.length) {
    const featured = articles[0];
    featuredRoot.innerHTML =
      '<a class="featured-article__media" href="' + articleUrl(featured) + '">' +
      '<img src="' + imageUrl(featured) + '" alt="' + featured.alt + '"></a>' +
      '<div class="featured-article__content"><span class="article-category">' + featured.category + '</span>' +
      '<h2 class="featured-article__title"><a href="' + articleUrl(featured) + '">' + featured.title + '</a></h2>' +
      '<p class="featured-article__description">' + featured.description + '</p>' +
      '<div class="article-meta">' + meta(featured) + '</div></div>';
    latestRoot.innerHTML = articles.slice(1, 5).map(articleCard).join("");
    moreRoot.innerHTML = articles.slice(5, 9).map(articleCard).join("");
  }

  const homeTools = document.getElementById("home-tools-grid");
  if (homeTools) {
    homeTools.innerHTML = (window.APLUS_TOOLS || [])
      .filter(function (tool) {
        return tool.pricingType === "free" && tool.status === "active";
      })
      .map(toolEntry)
      .join("");
  }

  const archive = document.getElementById("all-articles-grid");
  if (archive) {
    const category = new URLSearchParams(window.location.search).get("category");
    const filtered = category
      ? articles.filter(function (article) { return article.category === category; })
      : articles;
    if (category) {
      document.getElementById("archive-title").textContent = category + "文章";
      document.getElementById("archive-description").textContent =
        "Aplus 的" + category + "實用內容與製作指南。";
    }
    archive.innerHTML = filtered.map(articleCard).join("");
  }

  const articleView = document.getElementById("article-view");
  if (!articleView) return;

  const querySlug = new URLSearchParams(window.location.search).get("slug");
  if (/article\.html$/i.test(window.location.pathname) && querySlug) {
    const legacyArticle = window.APLUS_CONTENT.getArticle(querySlug);
    if (legacyArticle) {
      window.location.replace(articleUrl(legacyArticle));
      return;
    }
  }

  const slug = document.body.dataset.articleSlug || querySlug;
  const article = window.APLUS_CONTENT.getArticle(slug);
  const notFound = document.getElementById("article-not-found");

  if (!article) {
    articleView.hidden = true;
    if (notFound) notFound.hidden = false;
    return;
  }

  ["breadcrumb-category", "article-category"].forEach(function (id) {
    document.getElementById(id).textContent = article.category;
  });
  document.getElementById("article-title").textContent = article.title;
  document.getElementById("article-lead").textContent = article.lead;
  document.getElementById("article-meta").textContent = meta(article);

  const hero = document.getElementById("article-image");
  hero.src = imageUrl(article);
  hero.alt = article.alt;
  document.getElementById("article-content").innerHTML = article.content;

  const related = articles
    .filter(function (item) { return item.slug !== article.slug; })
    .slice(0, 3)
    .map(function (item) {
      return '<a class="related-item" href="' + articleUrl(item) + '">' +
        '<img src="' + imageUrl(item) + '" alt=""><span>' + item.title + '</span></a>';
    }).join("");

  document.querySelectorAll("[data-related-articles]").forEach(function (node) {
    node.innerHTML = related;
  });
  document.querySelectorAll("[data-tool-link]").forEach(function (node) {
    node.href = siteUrl("tools.html#srt-url-generator");
  });

  if (article.relatedProduct && window.APLUS_CATALOG) {
    const product = window.APLUS_CATALOG.getProduct(article.relatedProduct);
    if (product) {
      const mount = document.createElement("section");
      mount.className = "related-product";
      mount.innerHTML =
        '<span class="article-category">相關產品</span><h2>' + product.name + '</h2>' +
        '<p>' + product.description + '</p>' +
        (product.url
          ? '<a class="text-link" href="' + siteUrl(product.url) + '">了解更多 →</a>'
          : '<span class="catalog-entry__status">產品資訊準備中</span>');
      const support = document.querySelector(".article-main [data-support-slot]");
      if (support) support.insertAdjacentElement("beforebegin", mount);
      else document.getElementById("article-content").insertAdjacentElement("afterend", mount);
    }
  }

  const canonical = "https://www.keysearch-app.com/article/" + article.slug + "/";
  document.title = (article.seoTitle || article.title) + "｜Aplus";
  [
    ["meta[name=description]", "content", article.metaDescription || article.description],
    ["link[rel=canonical]", "href", canonical],
    ["meta[property='og:title']", "content", article.title],
    ["meta[property='og:description']", "content", article.description],
    ["meta[property='og:url']", "content", canonical],
    ["meta[property='og:image']", "content", imageUrl(article)]
  ].forEach(function (item) {
    const node = document.querySelector(item[0]);
    if (node) node.setAttribute(item[1], item[2]);
  });

  const schema = document.getElementById("article-schema");
  if (schema) {
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: imageUrl(article),
      datePublished: article.date.replaceAll(".", "-"),
      author: { "@type": "Organization", name: "Aplus" },
      publisher: { "@type": "Organization", name: "Aplus" },
      mainEntityOfPage: canonical,
      inLanguage: "zh-Hant"
    });
  }
})();
