(function () {
  function makeArticle(data) {
    const content = ["<p>" + data.intro + "</p>"];
    data.sections.forEach(function (section) {
      content.push("<h2>" + section[0] + "</h2><p>" + section[1] + "</p>");
    });
    if (data.extra) content.push(data.extra);
    data.content = content.join("");
    delete data.intro;
    delete data.sections;
    delete data.extra;
    return data;
  }

  const articles = [
    makeArticle({
      slug: "what-is-srt",
      relatedTool: "srt-url-generator",
      relatedProduct: "nexuscut",
      category: "專業製作",
      title: "SRT 是什麼？Listener、Caller 與 Rendezvous 一次搞懂",
      description: "搞懂 SRT 最容易混淆的三種連線模式，讓直播與遠端傳輸設定更穩定。",
      lead: "從誰主動連線開始理解 SRT，就能快速判斷 Listener、Caller 與 Rendezvous 該怎麼選。",
      date: "2026.08.12",
      readingTime: "6 min read",
      image: "./assets/images/solutions/corporate-live.jpg",
      alt: "專業直播與 SRT 遠端影像傳輸工作環境",
      seoTitle: "SRT 是什麼？Listener、Caller、Rendezvous 連線模式一次搞懂",
      metaDescription: "搞懂 SRT 的 Listener、Caller 與 Rendezvous 三種連線模式，了解 Public IP、Port、NAT 與 Port Forwarding 的關係，快速建立穩定的遠端直播與影音傳輸設定。",
      intro: "搞懂 SRT 最容易混淆的三種連線模式，讓直播與遠端傳輸設定更穩定。",
      sections: [],
      extra: "<p>SRT 是遠端直播與跨網路影音傳輸中很常見的協定。真正開始設定時，最容易搞混的通常不是 Bitrate，而是 Listener、Caller 與 Rendezvous 到底該怎麼選。</p>\n\n<p>SRT 全名是 <strong>Secure Reliable Transport</strong>，主要用於透過 IP 網路傳送影音。它能利用延遲緩衝與封包重傳機制，降低網路抖動、封包遺失對影音傳輸造成的影響，因此常見於遠端製作、跨地直播、攝影機回傳與節目訊號交換。</p>\n\n<h2>先理解：誰主動建立連線</h2>\n\n<p>設定 SRT 時，先不要急著背 URL。最重要的是確認：<strong>哪一端主動發起連線，哪一端等待別人連入。</strong></p>\n\n<p>實際使用時，Public IP、防火牆、NAT 與 Port Forwarding 都會影響 Listener 與 Caller 的安排。</p>\n\n<h2>Listener</h2>\n\n<p>Listener 會在指定的 Port 上等待其他設備連入。</p>\n\n<p>例如接收端設定 Port 9000，Caller 就必須連向該設備的 IP 與 9000 Port。若 Listener 位於路由器後方，通常還需要設定 Port Forwarding，並確認防火牆允許相關 UDP 流量。</p>\n\n<h2>Caller</h2>\n\n<p>Caller 會主動連向 Listener，因此需要知道對方的 IP Address 與 Port。</p>\n\n<p>許多攝影現場位於飯店、場館或一般 NAT 網路後方，不方便讓外部設備直接連入，因此常見做法是由現場設備擔任 Caller，主動連向具有固定 Public IP 的接收端。</p>\n\n<blockquote>要注意，Caller 不代表一定是發送端，Listener 也不代表一定是接收端。這兩個名稱描述的是「誰主動建立連線」，而不是影音傳輸方向。</blockquote>\n\n<h2>Rendezvous</h2>\n\n<p>Rendezvous 模式下，兩端都會嘗試向對方建立連線，可以用於部分 NAT 網路環境。</p>\n\n<p>不過 Rendezvous 並不是「不用設定網路就一定能連線」的萬用模式。路由器、防火牆、NAT 類型與 Port 條件仍然會影響結果。</p>\n\n<blockquote>實務上建議先使用 Listener + Caller 建立最容易判斷與排錯的架構，只有在網路條件需要時，再考慮 Rendezvous。</blockquote>\n\n<h2>SRT URL 範例</h2>\n\n<pre><code>srt://203.0.113.10:9000?mode=caller&amp;latency=120000</code></pre>\n\n<p>這代表裝置會以 Caller 模式連向 <strong>203.0.113.10</strong> 的 <strong>9000 Port</strong>。</p>\n\n<p>其中 latency 則代表 SRT 的延遲緩衝設定。不同軟體對 latency 的單位可能不同，因此設定前最好確認該軟體或設備的定義。</p>\n\n<h2>連上不代表傳輸一定正常</h2>\n\n<p>SRT 顯示 Connected，只代表連線已經建立，不代表影音一定完全正常。</p>\n\n<p>實際使用時還要確認畫面是否成功解碼、聲音是否存在、Bitrate 是否穩定，以及 Packet Loss、Latency 與網路抖動是否在可接受範圍內。</p>\n\n<p>如果只想先記住最簡單的概念：</p>\n\n<p><strong>Caller：我主動找你。<br>\nListener：我等你連進來。<br>\nRendezvous：雙方都嘗試建立連線。</strong></p>",
    }),
    makeArticle({
      slug: "obs-receive-srt",
      category: "影音",
      title: "OBS 如何接收 SRT？從 URL 到畫面的完整設定",
      description: "從輸入來源、SRT URL 到延遲參數，整理 OBS 接收遠端畫面的基本流程。",
      lead: "OBS 可以直接透過媒體來源接收 SRT，但 URL 模式、Port 與解碼格式必須一致。",
      date: "2026.08.12",
      readingTime: "5 min read",
      image: "./assets/images/solutions/event-production.jpg",
      alt: "OBS 直播製作與多畫面監看環境",
      intro: "在 OBS 中接收 SRT，通常使用「媒體來源」並取消勾選本機檔案，再將完整 SRT URL 貼入輸入欄位。",
      sections: [
        ["建立媒體來源", "新增媒體來源、取消「本機檔案」、輸入 SRT URL。若需要持續重連，再啟用來源重新啟動相關選項。"],
        ["URL 與模式要配對", "如果 OBS 是 Listener，發送端就要使用 Caller；若 OBS 主動連向遠端 Listener，URL 必須包含正確 IP、Port 與 mode=caller。"],
        ["只有聲音或沒有畫面", "先確認發送端的編碼格式。特殊 Profile、過高 Level 或不支援的色彩格式都可能造成黑畫面。"]
      ]
    }),
    makeArticle({
      slug: "srt-connected-no-video",
      category: "專業製作",
      title: "SRT 有連線卻沒有畫面？常見原因整理",
      description: "連線成功不代表影音能被正確解碼，從編碼、封裝、網路與延遲逐項排查。",
      lead: "SRT 顯示 connected，只代表傳輸通道成立；影音資料是否正確仍要另外確認。",
      date: "2026.08.11",
      readingTime: "6 min read",
      image: "./assets/images/system/modules/u-tp.jpg",
      alt: "專業影音傳輸設備與訊號監看",
      intro: "遇到 SRT 已連線卻沒有畫面時，不要一直重開連線。應把問題拆成傳輸、封裝、編碼與播放四個層次。",
      sections: [
        ["先確認是否真的有資料流", "查看傳送與接收 Bitrate。如果接收端維持 0 kbps，問題多半仍在來源、Port 或防火牆。"],
        ["檢查 Codec 與封裝", "確認接收端支援 H.264 或 H.265、MPEG-TS 內包含視訊 Track，且解析度與 Profile 沒有超出解碼能力。"],
        ["不要忽略 Latency", "Latency 太低時，封包還來不及重傳就會被丟棄。跨區網路應從較保守的數值開始測試。"]
      ]
    }),
    makeArticle({
      slug: "podcast-multicam-editing-workflow",
      relatedProduct: "nexuscut",
      category: "影音",
      title: "Podcast 多機剪輯怎麼做？完整工作流程",
      description: "從素材命名、音訊同步到多機切換，建立可重複使用的 Podcast 剪輯流程。",
      lead: "多機 Podcast 的效率關鍵不只是切鏡頭，而是前期素材管理與主音軌的選擇。",
      date: "2026.08.10",
      readingTime: "7 min read",
      image: "./assets/images/solutions/interview-show.jpg",
      alt: "Podcast 訪談節目的多機拍攝現場",
      intro: "Podcast 多機剪輯最容易浪費時間的地方，是素材沒有一致命名、音訊來源不明，以及同步後沒有建立清楚的主時間線。",
      sections: [
        ["拍攝前先統一規格", "所有攝影機盡量使用相同 Frame Rate，錄音設備保持一致 Sample Rate，開拍時保留明確拍板聲或同步訊號。"],
        ["以主音軌作為基準", "先清理主要錄音，再用波形或 Timecode 對齊各機素材。完成後建立 Multicam Clip。"],
        ["先內容、後畫面", "第一輪先完成對話節奏，第二輪再處理鏡頭切換與畫面修飾，通常更有效率。"]
      ]
    }),
    makeArticle({
      slug: "podcast-multicam-software",
      relatedProduct: "nexuscut",
      category: "工具",
      title: "Podcast 多機剪輯軟體怎麼選？",
      description: "依照同步能力、代理檔、字幕與交付格式，挑選適合的多機剪輯工具。",
      lead: "軟體沒有絕對最好，真正要比較的是素材量、協作方式與每週交付頻率。",
      date: "2026.08.09",
      readingTime: "5 min read",
      image: "./assets/images/products/content-management.jpg",
      alt: "影片剪輯軟體與多機素材管理畫面",
      intro: "選擇 Podcast 多機剪輯軟體時，先列出自己的固定流程，而不是只比較功能數量。",
      sections: [
        ["優先檢查四件事", "確認能否穩定同步長時間素材、支援代理檔與背景轉檔、輸出字幕，以及完整交接或封存專案。"],
        ["高頻交付要重視模板", "每週固定更新的節目，片頭尾、字幕樣式、音訊處理與輸出 Preset 能否重用，往往比單一 AI 功能更重要。"]
      ]
    }),
    makeArticle({
      slug: "ai-subtitle-tools",
      category: "AI",
      title: "AI 字幕工具怎麼選？中文辨識與 SRT 輸出重點",
      description: "比較中文辨識、時間軸品質、說話者辨識與 SRT 匯出的實際差異。",
      lead: "AI 字幕不只看辨識率；時間碼、斷句與後續校對成本同樣重要。",
      date: "2026.08.08",
      readingTime: "5 min read",
      image: "./assets/images/products/seo-content.jpg",
      alt: "AI 字幕辨識與文字時間軸介面",
      intro: "中文 AI 字幕工具的差異，經常出現在專有名詞、台灣口音、英文夾雜與標點斷句。",
      sections: [
        ["先看輸出，不只看 Demo", "測試時應使用自己的素材，檢查 SRT 是否有重疊時間碼、過長單行、錯誤分段與不必要的空白。"],
        ["四個選擇重點", "比較中文與中英混合辨識、長影片時間軸穩定度、說話者辨識，以及 SRT、VTT 或剪輯軟體格式輸出。"]
      ]
    }),
    makeArticle({
      slug: "video-to-srt",
      category: "AI",
      title: "如何把影片自動產生 SRT 字幕？",
      description: "從音訊整理、AI 轉錄到字幕校對，完成可交付的 SRT 檔案。",
      lead: "自動轉錄只是第一步，真正可用的 SRT 還需要時間碼與閱讀節奏校對。",
      date: "2026.08.07",
      readingTime: "5 min read",
      image: "./assets/images/products/topic-generator.jpg",
      alt: "影片自動轉錄與 SRT 字幕輸出流程",
      intro: "把影片轉成 SRT 的流程包含音訊抽取、語音辨識、字幕分段、人工校對與格式檢查。",
      sections: [
        ["音訊品質決定辨識上限", "先降低環境噪音、確認人聲音量，並避免背景音樂蓋過對白。必要時可先輸出單獨的人聲 Track。"],
        ["校對三個層次", "確認文字正確、字幕進出點貼近語音，以及每行長度與斷句容易閱讀。最後用 UTF-8 儲存並實際播放測試。"]
      ]
    }),
    makeArticle({
      slug: "sdi-hdmi-ndi-srt",
      category: "科技",
      title: "SDI、HDMI、NDI、SRT 到底有什麼不同？",
      description: "用傳輸距離、網路需求與應用場景，快速理解四種常見影音介面。",
      lead: "四種技術沒有單一勝負，選擇取決於距離、可靠度、佈線與是否需要跨網路。",
      date: "2026.08.06",
      readingTime: "7 min read",
      image: "./assets/images/system/overview.jpg",
      alt: "專業影音訊號介面與製作系統",
      intro: "SDI 與 HDMI 主要是實體影音介面，NDI 與 SRT 則以 IP 網路傳輸為核心。",
      sections: [
        ["SDI 與 HDMI", "SDI 適合專業現場、長距離與鎖定式接頭；HDMI 普及且成本低，但接頭固定性與長距離傳輸較受限制。"],
        ["NDI 與 SRT", "NDI 常用於區域網路內的低延遲製作，SRT 更適合跨公共網路的可靠傳輸。兩者都需要評估頻寬與網路管理。"]
      ]
    }),
    makeArticle({
      slug: "virtual-studio-basics",
      category: "專業製作",
      title: "虛擬攝影棚是什麼？基本設備與工作流程",
      description: "從攝影機追蹤、即時引擎到燈光，認識虛擬製作系統的基本組成。",
      lead: "虛擬攝影棚把真實攝影機與即時 3D 場景結合，重點是追蹤、同步與現場整合。",
      date: "2026.08.05",
      readingTime: "8 min read",
      image: "./assets/images/system/modules/ue-virtual.jpg",
      alt: "虛擬攝影棚與即時 3D 場景製作",
      intro: "虛擬攝影棚透過綠幕或 LED 顯示牆，將主持人、實景道具與即時生成的 3D 場景整合成完整畫面。",
      sections: [
        ["基本系統組成", "系統通常包含攝影機與鏡頭資料、追蹤系統、即時圖像引擎、Keyer、視訊 I/O、同步、燈光與監看。"],
        ["工作流程核心", "先完成場景比例與鏡頭校正，再處理追蹤延遲、色彩、燈光方向與前後景遮擋。"]
      ]
    }),
    makeArticle({
      slug: "what-is-ccu",
      category: "專業製作",
      title: "CCU 是什麼？專業攝影機為什麼需要 Camera Control？",
      description: "了解 CCU 如何統一管理曝光、白平衡、色彩與多機畫面一致性。",
      lead: "CCU 的價值不是遙控方便，而是讓多台攝影機在直播過程中維持一致畫面。",
      date: "2026.08.04",
      readingTime: "6 min read",
      image: "./assets/images/system/modules/u-cg.jpg",
      alt: "專業多機攝影與 CCU 控制系統",
      intro: "CCU 是 Camera Control Unit，用來遠端控制專業攝影機的曝光、Gain、白平衡、Gamma、Detail 與色彩參數。",
      sections: [
        ["為什麼不能只在開拍前設定", "直播現場的燈光與鏡位會持續變化。Shader 會透過 CCU 即時修正各機，避免切換鏡頭時亮度與色彩跳動。"],
        ["CCU 常見控制項目", "常用項目包含 Iris、Shutter、Gain、White Balance、Master Black、Gamma、Knee、Detail 與色彩矩陣。"]
      ]
    })
  ];

  window.APLUS_ARTICLES = articles;
  window.APLUS_CONTENT = {
    articles: articles,
    getArticle: function (slug) {
      return articles.find(function (article) { return article.slug === slug; }) || null;
    }
  };
})();

