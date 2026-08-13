(function () {
  const BEACON_URL = "https://static.cloudflareinsights.com/beacon.min.js";

  function validConfig() {
    const config = window.APLUS_ANALYTICS || {};
    return config.provider === "cloudflare" &&
      config.enabled === true &&
      typeof config.token === "string" &&
      config.token.trim() !== "";
  }

  function load() {
    if (!validConfig()) return false;
    if (document.querySelector('script[data-aplus-analytics="cloudflare"]')) return true;

    const config = window.APLUS_ANALYTICS;
    const beacon = document.createElement("script");
    beacon.type = "module";
    beacon.src = BEACON_URL;
    beacon.dataset.aplusAnalytics = "cloudflare";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: config.token.trim() }));

    if (window.APLUS_ANALYTICS_TEST_MODE === true) {
      beacon.type = "application/x-aplus-analytics-test";
      beacon.removeAttribute("src");
      beacon.dataset.intendedSrc = BEACON_URL;
    }

    document.head.appendChild(beacon);
    return true;
  }

  window.AplusAnalytics = {
    load: load,
    isConfigured: validConfig,
    beaconUrl: BEACON_URL
  };

  load();
})();
