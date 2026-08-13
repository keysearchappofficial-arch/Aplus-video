(function () {
  const articles = window.APLUS_ARTICLES || [];

  function articleUrl(article) {
    return "./article.html?slug=" + encodeURIComponent(article.slug);
  }

  function articleCard(article) {
    return '<article class="article-card">' +
      '<a class="article-card__media" href="' + articleUrl(article) + '">' +
      '<img src="' + article.image + '" alt="' + article.alt + '" loading="lazy"></a>' +
      '<div class="article-card__content">' +
      '<span class="article-category">' + article.category + '</span>' +
      '<h3 class="article-card__title"><a href="' + articleUrl(article) + '">' + article.title + '</a></h3>' +
      '<p class="article-card__description">' + article.description + '</p>' +
      '<div class="article-meta">' + article.date + ' · ' + article.readingTime + '</div>' +
      '</div></article>';
  }

  function renderHome() {
    const featuredRoot = document.getElementById("featured-article");
    const latestRoot = document.getElementById("latest-grid");
    const moreRoot = document.getElementById("more-grid");
    if (!featuredRoot || !latestRoot || !moreRoot || !articles.length) return;

    const featured = articles[0];
    featuredRoot.innerHTML =
      '<a class="featured-article__media" href="' + articleUrl(featured) + '">' +
      '<img src="' + featured.image + '" alt="' + featured.alt + '"></a>' +
      '<div class="featured-article__content"><span class="article-category">' + featured.category + '</span>' +
      '<h2 class="featured-article__title"><a href="' + articleUrl(featured) + '">' + featured.title + '</a></h2>' +
      '<p class="featured-article__description">' + featured.description + '</p>' +
      '<div class="article-meta">' + featured.date + ' · ' + featured.readingTime + '</div></div>';

    latestRoot.innerHTML = articles.slice(1, 5).map(articleCard).join("");
    moreRoot.innerHTML = articles.slice(5, 9).map(articleCard).join("");
  }

  function renderBlog() {
    const root = document.getElementById("all-articles-grid");
    if (!root) return;

    const category = new URLSearchParams(window.location.search).get("category");
    const filtered = category
      ? articles.filter(function (article) { return article.category === category; })
      : articles;
    const title = document.getElementById("archive-title");
    const description = document.getElementById("archive-description");

    if (category && title && description) {
      title.textContent = category + "文章";
      description.textContent = "Aplus 整理的" + category + "實用內容。";
      document.title = category + "文章｜Aplus";
    }

    root.innerHTML = filtered.map(articleCard).join("");
  }

  function relatedMarkup(current) {
    return articles
      .filter(function (article) { return article.slug !== current.slug; })
      .slice(0, 3)
      .map(function (article) {
        return '<a class="related-item" href="' + articleUrl(article) + '">' +
          '<img src="' + article.image + '" alt="" loading="lazy">' +
          '<span>' + article.title + '</span></a>';
      }).join("");
  }

  function setArticleSeo(article) {
    const url = "https://www.keysearch-app.com/article.html?slug=" + encodeURIComponent(article.slug);
    const imageUrl = new URL(article.image, url).href;
    document.title = article.title + "｜Aplus";

    const values = [
      ["meta[name='description']", "content", article.description],
      ["link[rel='canonical']", "href", url],
      ["meta[property='og:title']", "content", article.title],
      ["meta[property='og:description']", "content", article.description],
      ["meta[property='og:url']", "content", url],
      ["meta[property='og:image']", "content", imageUrl],
      ["meta[name='twitter:title']", "content", article.title],
      ["meta[name='twitter:description']", "content", article.description]
    ];
    values.forEach(function (item) {
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
        image: imageUrl,
        datePublished: article.date.replaceAll(".", "-"),
        author: { "@type": "Organization", name: "Aplus" },
        publisher: { "@type": "Organization", name: "Aplus" },
        mainEntityOfPage: url,
        inLanguage: "zh-Hant"
      });
    }
  }

  function renderArticle() {
    const root = document.getElementById("article-view");
    const notFound = document.getElementById("article-not-found");
    if (!root) return;

    const slug = new URLSearchParams(window.location.search).get("slug");
    const article = window.APLUS_CONTENT && window.APLUS_CONTENT.getArticle(slug);
    if (!article) {
      root.hidden = true;
      if (notFound) notFound.hidden = false;
      document.title = "找不到文章｜Aplus";
      return;
    }

    document.getElementById("breadcrumb-category").textContent = article.category;
    document.getElementById("article-category").textContent = article.category;
    document.getElementById("article-title").textContent = article.title;
    document.getElementById("article-lead").textContent = article.lead;
    document.getElementById("article-meta").textContent = article.date + " · " + article.readingTime;
    const hero = document.getElementById("article-image");
    hero.src = article.image;
    hero.alt = article.alt;
    document.getElementById("article-content").innerHTML = article.content;

    const related = relatedMarkup(article);
    document.querySelectorAll("[data-related-articles]").forEach(function (node) {
      node.innerHTML = related;
    });
    setArticleSeo(article);
  }

  renderHome();
  renderBlog();
  renderArticle();
})();

