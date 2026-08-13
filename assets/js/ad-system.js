(function () {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : window.location.href;
  const siteRoot = new URL("../../", scriptUrl);

  function hideSlot(slot) {
    slot.hidden = true;
    slot.replaceChildren();
    slot.dataset.adState = "none";
  }

  function renderImage(slot, config) {
    if (!config.image || !config.link || !config.alt) {
      hideSlot(slot);
      return;
    }

    const label = config.sponsorLabel
      ? '<span class="ad-slot__label">' + config.sponsorLabel + '</span>'
      : "";

    slot.innerHTML = label +
      '<a class="ad-slot__image-link" href="' + config.link + '" target="_blank" rel="noopener sponsored">' +
      '<img src="' + new URL(config.image, siteRoot).href + '" alt="' + config.alt + '">' +
      '</a>';
    slot.hidden = false;
    slot.dataset.adState = "image";
  }

  function renderAdsense(slot) {
    slot.innerHTML =
      '<div class="ad-slot__adsense" data-adsense-slot>' +
      '<span>ADVERTISEMENT</span>' +
      '<small>AdSense slot ready</small>' +
      '<!-- Add the approved Google AdSense <ins> element here later. -->' +
      '</div>';
    slot.hidden = false;
    slot.dataset.adState = "adsense";
  }

  function renderSlot(slot) {
    const key = slot.dataset.adSlot;
    const config = (window.APLUS_AD_CONFIG && window.APLUS_AD_CONFIG[key]) || { type: "none" };

    if (config.type === "image") {
      renderImage(slot, config);
      return;
    }

    if (config.type === "adsense") {
      renderAdsense(slot);
      return;
    }

    hideSlot(slot);
  }

  function renderAll() {
    document.querySelectorAll("[data-ad-slot]").forEach(renderSlot);
  }

  document.addEventListener("DOMContentLoaded", renderAll);

  window.AplusAds = {
    render: renderAll,
    renderSlot: renderSlot
  };
})();

