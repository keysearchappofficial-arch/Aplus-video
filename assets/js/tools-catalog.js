(function () {
  const siteUrl = window.APLUS_SITE_URL || function (path) {
    return new URL(path, window.location.href).href;
  };

  function pricingLabel(item) {
    if (item.status === "coming-soon") return "即將推出";
    if (item.pricingType === "freemium") return "Freemium";
    if (item.pricingType === "paid") return "產品";
    return "免費";
  }

  function actionMarkup(item, label) {
    if (!item.url) return '<span class="catalog-entry__status">' + label + '</span>';
    return '<a class="tool-entry__link" href="' + siteUrl(item.url) + '">' + label + ' →</a>';
  }

  function entry(item, actionLabel) {
    return '<article class="catalog-entry">' +
      '<span class="article-category">' + pricingLabel(item) + '</span>' +
      '<h3>' + item.name + '</h3>' +
      '<p>' + item.description + '</p>' +
      actionMarkup(item, actionLabel) +
      '</article>';
  }

  const freeRoot = document.getElementById("free-tools-catalog");
  if (freeRoot) {
    freeRoot.innerHTML = (window.APLUS_TOOLS || [])
      .filter(function (item) { return item.pricingType === "free" && item.status === "active"; })
      .map(function (item) { return entry(item, "使用工具"); })
      .join("");
  }

  const upcomingRoot = document.getElementById("upcoming-tools-catalog");
  if (upcomingRoot) {
    upcomingRoot.innerHTML = (window.APLUS_TOOLS || [])
      .filter(function (item) { return item.status === "coming-soon"; })
      .map(function (item) { return entry(item, "即將推出"); })
      .join("");
  }

  const productsRoot = document.getElementById("products-catalog");
  if (productsRoot) {
    productsRoot.innerHTML = (window.APLUS_PRODUCTS || [])
      .filter(function (item) { return item.status !== "hidden"; })
      .map(function (item) { return entry(item, item.url ? "了解產品" : "產品資訊準備中"); })
      .join("");
  }
})();
