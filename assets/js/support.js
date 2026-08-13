(function () {
  const config = window.APLUS_SITE_CONFIG || {};
  const support = config.support || {};

  function supportMarkup(kind) {
    const isTool = kind === "tool";
    const title = isTool
      ? "這個工具可以免費使用。"
      : "覺得這篇內容有幫助？";
    const description = isTool
      ? "如果它幫你省下一些時間，也可以支持 Aplus 持續維護。"
      : "如果你願意，也可以支持 Aplus 持續整理更多實用內容。";

    return '<div class="support-block__content">' +
      '<strong>' + title + '</strong>' +
      '<p>' + description + '</p>' +
      '<a href="' + support.url + '" target="_blank" rel="noopener sponsored">支持 Aplus →</a>' +
      '</div>';
  }

  function renderSupport() {
    const show = support.enabled === true && typeof support.url === "string" && support.url.trim() !== "";

    document.querySelectorAll("[data-support-slot]").forEach(function (slot) {
      if (!show) {
        slot.hidden = true;
        slot.replaceChildren();
        return;
      }

      slot.innerHTML = supportMarkup(slot.dataset.supportSlot || "article");
      slot.hidden = false;
    });
  }

  function renderContact() {
    document.querySelectorAll("[data-contact-email]").forEach(function (node) {
      const email = String(config.contactEmail || "").trim();

      if (!email) {
        node.textContent = "聯絡方式準備中";
        node.classList.add("contact-status--pending");
        return;
      }

      const link = document.createElement("a");
      link.href = "mailto:" + email;
      link.textContent = email;
      node.replaceChildren(link);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSupport();
    renderContact();
  });

  window.AplusSupport = {
    render: renderSupport
  };
})();

