window.APLUS_TOOLS = [
  {
    id: "srt-url-generator",
    name: "SRT URL Generator",
    description: "快速產生 SRT Listener、Caller 與 Rendezvous URL。",
    category: "影音傳輸",
    pricingType: "free",
    url: "tools.html#srt-url-generator",
    status: "active"
  },
  {
    id: "timecode-calculator",
    name: "Timecode Calculator",
    description: "快速進行 Timecode 加總計算。",
    category: "影音製作",
    pricingType: "free",
    url: "tools.html#timecode-calculator",
    status: "active"
  },
  {
    id: "bitrate-calculator",
    name: "Bitrate Calculator",
    description: "估算影片錄製時間與檔案大小。",
    category: "影音製作",
    pricingType: "free",
    url: "tools.html#bitrate-calculator",
    status: "active"
  },
  {
    id: "video-to-srt",
    name: "影片轉 SRT 字幕",
    description: "上傳影片，自動產生時間碼字幕。",
    category: "AI 字幕",
    pricingType: "freemium",
    url: "",
    status: "coming-soon"
  }
];

window.APLUS_PRODUCTS = [
  {
    id: "nexuscut",
    name: "NexusCut",
    description: "多機位 Podcast 與訪談工作流程工具。",
    descriptionEn: "Multi-camera editing workflow for podcasts and interviews.",
    category: "影音製作",
    pricingType: "paid",
    url: "",
    status: "active"
  }
];

window.APLUS_CATALOG = {
  tools: window.APLUS_TOOLS,
  products: window.APLUS_PRODUCTS,
  getTool: function (id) {
    return this.tools.find(function (item) { return item.id === id; }) || null;
  },
  getProduct: function (id) {
    return this.products.find(function (item) { return item.id === id; }) || null;
  }
};
