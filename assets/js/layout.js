const GA_MEASUREMENT_ID = "G-ZWC50XN0X0";

function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || window.__ga_initialized__) return;
  window.__ga_initialized__ = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

async function loadComponent(selector, path) {
  const mountNode = document.querySelector(selector);
  if (!mountNode) return null;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Failed to load component: " + path);
    mountNode.innerHTML = await response.text();
    return mountNode;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getComponentPath(fileName) {
  return "./components/" + fileName;
}

function bindMobileNav(headerRoot) {
  const toggle = headerRoot && headerRoot.querySelector(".nav-toggle");
  const nav = headerRoot && headerRoot.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function ensureContentData() {
  if (window.APLUS_ARTICLES) return Promise.resolve();

  return new Promise(function (resolve) {
    const script = document.createElement("script");
    script.src = window.location.pathname.includes("/en/")
      ? "../assets/js/content-data.js"
      : "./assets/js/content-data.js";
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });
}

function articleLink(slug) {
  const prefix = window.location.pathname.includes("/en/") ? "../" : "./";
  return prefix + "article.html?slug=" + encodeURIComponent(slug);
}

function bindSearch(headerRoot) {
  const toggle = headerRoot && headerRoot.querySelector(".search-toggle");
  const panel = headerRoot && headerRoot.querySelector(".search-panel");
  if (!toggle || !panel) return;

  const closeButton = panel.querySelector(".search-close");
  const form = panel.querySelector(".search-form");
  const input = panel.querySelector("input[type='search']");
  const results = panel.querySelector(".search-results");

  function renderResults(query) {
    const normalized = String(query || "").trim().toLowerCase();
    const source = window.APLUS_ARTICLES || [];
    const matches = normalized
      ? source.filter(function (article) {
          return [article.title, article.category, article.description]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        })
      : source.slice(0, 5);

    if (!matches.length) {
      results.innerHTML = '<p class="search-empty">找不到符合的文章，請換一個關鍵字。</p>';
      return;
    }

    results.innerHTML = matches.slice(0, 8).map(function (article) {
      return '<a class="search-result" href="' + articleLink(article.slug) + '"><small>' +
        article.category + '</small><strong>' + article.title + '</strong></a>';
    }).join("");
  }

  async function openSearch() {
    await ensureContentData();
    panel.hidden = false;
    document.body.classList.add("search-open");
    renderResults("");
    window.setTimeout(function () { input.focus(); }, 0);
  }

  function closeSearch() {
    panel.hidden = true;
    document.body.classList.remove("search-open");
  }

  toggle.addEventListener("click", openSearch);
  closeButton.addEventListener("click", closeSearch);
  panel.addEventListener("click", function (event) {
    if (event.target === panel) closeSearch();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    renderResults(input.value);
  });
  input.addEventListener("input", function () {
    renderResults(input.value);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) closeSearch();
  });
}

async function initSharedLayout() {
  initGoogleAnalytics();
  const header = await loadComponent("#site-header", getComponentPath("header.html"));
  bindMobileNav(header);
  bindSearch(header);
  await loadComponent("#site-footer", getComponentPath("footer.html"));
}

document.addEventListener("DOMContentLoaded", initSharedLayout);

