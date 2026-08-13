(function () {
  const source = document.currentScript.src;
  const siteRoot = new URL("../../", source);

  window.APLUS_SITE_ROOT = siteRoot;
  window.APLUS_SITE_URL = function (path) {
    return new URL(String(path || "").replace(/^\.\//, ""), siteRoot).href;
  };

  const siteUrl = window.APLUS_SITE_URL;

  function loadScript(path) {
    return new Promise(function (resolve) {
      const script = document.createElement("script");
      script.src = siteUrl(path);
      script.onload = resolve;
      script.onerror = function () {
        console.error("Aplus shared script failed:", path);
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  async function loadAnalytics() {
    if (!window.APLUS_ANALYTICS) {
      await loadScript("assets/js/analytics-config.js");
    }
    if (!window.AplusAnalytics) {
      await loadScript("assets/js/analytics-loader.js");
    }
  }

  async function loadComponent(selector, file) {
    const mount = document.querySelector(selector);
    if (!mount) return null;

    try {
      const response = await fetch(siteUrl("components/" + file));
      if (!response.ok) throw new Error("HTTP " + response.status);
      mount.innerHTML = await response.text();
      mount.querySelectorAll("[href^='./']").forEach(function (node) {
        node.href = siteUrl(node.getAttribute("href").slice(2));
      });
      mount.querySelectorAll("[src^='./']").forEach(function (node) {
        node.src = siteUrl(node.getAttribute("src").slice(2));
      });
      return mount;
    } catch (error) {
      console.error("Aplus component load failed:", file, error);
      return null;
    }
  }

  function bindNavigation(header) {
    const toggle = header && header.querySelector(".nav-toggle");
    const nav = header && header.querySelector(".site-nav");
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
    return loadScript("assets/js/content-data.js");
  }

  function bindSearch(header) {
    const toggle = header && header.querySelector(".search-toggle");
    const panel = header && header.querySelector(".search-panel");
    if (!toggle || !panel) return;

    const close = panel.querySelector(".search-close");
    const form = panel.querySelector("form");
    const input = panel.querySelector("input");
    const output = panel.querySelector(".search-results");

    function render(query) {
      const normalized = String(query || "").trim().toLowerCase();
      const articles = (window.APLUS_ARTICLES || []).filter(function (article) {
        return !normalized || [article.title, article.category, article.description]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      }).slice(0, 8);

      output.innerHTML = articles.length
        ? articles.map(function (article) {
            return '<a class="search-result" href="' +
              siteUrl("article/" + article.slug + "/") +
              '"><small>' + article.category + '</small><strong>' +
              article.title + '</strong></a>';
          }).join("")
        : '<p class="search-empty">找不到符合的文章。</p>';
    }

    function closeSearch() {
      panel.hidden = true;
      document.body.classList.remove("search-open");
    }

    toggle.addEventListener("click", async function () {
      await ensureContentData();
      panel.hidden = false;
      document.body.classList.add("search-open");
      render("");
      input.focus();
    });
    close.addEventListener("click", closeSearch);
    panel.addEventListener("click", function (event) {
      if (event.target === panel) closeSearch();
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      render(input.value);
    });
    input.addEventListener("input", function () {
      render(input.value);
    });
  }

  document.addEventListener("DOMContentLoaded", async function () {
    loadAnalytics();
    const header = await loadComponent("#site-header", "header.html");
    bindNavigation(header);
    bindSearch(header);
    await loadComponent("#site-footer", "footer.html");
  });
})();
