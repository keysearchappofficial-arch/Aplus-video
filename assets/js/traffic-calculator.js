(function () {
  const dailyInput = document.getElementById("traffic-daily");
  const monthlyInput = document.getElementById("traffic-monthly");
  const pagesInput = document.getElementById("traffic-pages");
  const resetButton = document.getElementById("traffic-reset");

  if (!dailyInput || !monthlyInput || !pagesInput) return;

  const outputDaily = document.getElementById("output-daily");
  const outputMonthly = document.getElementById("output-monthly");
  const outputPages = document.getElementById("output-pages");
  const outputPageviews = document.getElementById("output-pageviews");

  function readPositive(input) {
    if (input.value.trim() === "") return null;
    const value = Number(input.value);
    if (!Number.isFinite(value) || value < 0) return null;
    return value;
  }

  function formatNumber(value, maximumFractionDigits) {
    if (value === null || !Number.isFinite(value)) return "—";
    return new Intl.NumberFormat("zh-TW", {
      maximumFractionDigits: maximumFractionDigits
    }).format(value);
  }

  function render(daily, monthly, pages) {
    const pageviews = monthly === null || pages === null ? null : monthly * pages;
    outputDaily.textContent = formatNumber(daily, 2);
    outputMonthly.textContent = formatNumber(monthly, 2);
    outputPages.textContent = formatNumber(pages, 2);
    outputPageviews.textContent = formatNumber(pageviews, 2);
  }

  function updateFromDaily() {
    const daily = readPositive(dailyInput);
    const pages = readPositive(pagesInput);
    const monthly = daily === null ? null : daily * 30;
    monthlyInput.value = monthly === null ? "" : String(Number(monthly.toFixed(2)));
    render(daily, monthly, pages);
  }

  function updateFromMonthly() {
    const monthly = readPositive(monthlyInput);
    const pages = readPositive(pagesInput);
    const daily = monthly === null ? null : monthly / 30;
    dailyInput.value = daily === null ? "" : String(Number(daily.toFixed(2)));
    render(daily, monthly, pages);
  }

  function updatePages() {
    render(readPositive(dailyInput), readPositive(monthlyInput), readPositive(pagesInput));
  }

  dailyInput.addEventListener("input", updateFromDaily);
  monthlyInput.addEventListener("input", updateFromMonthly);
  pagesInput.addEventListener("input", updatePages);

  resetButton.addEventListener("click", function () {
    dailyInput.value = "333";
    monthlyInput.value = "9990";
    pagesInput.value = "2.5";
    render(333, 9990, 2.5);
  });

  render(333, 9990, 2.5);
})();

