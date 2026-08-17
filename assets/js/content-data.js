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
      relatedTool: null,
      relatedProduct: null,
      category: "專業製作",
      title: "OBS 如何接收 SRT？從 URL 到畫面的完整設定",
      description: "從 SRT URL、Caller／Listener 到 OBS Media Source，整理 OBS 接收 SRT 訊號的完整設定方式，以及有連線卻沒有畫面時該先檢查哪些地方。",
      lead: "OBS 本身就可以接收 SRT，不一定需要額外安裝外掛。不過實際設定時，真正容易出問題的通常不是 OBS，而是 SRT URL、Caller／Listener、Port 和網路環境沒有對上。這篇從最基本的連線架構開始，一步一步把 SRT 畫面送進 OBS。",
      date: "2026.08.12",
      readingTime: "5 min read",
      image: "./assets/images/solutions/event-production.jpg",
      alt: "OBS 透過 SRT 接收遠端影音訊號的連線架構示意圖",
      seoTitle: "OBS 如何接收 SRT？SRT URL、Caller 與 Listener 完整設定",
      metaDescription: "OBS 如何接收 SRT？從 Media Source、SRT URL、Caller／Listener 到 IP、Port、Firewall 與 Port Forwarding，整理 OBS 接收遠端 SRT 影音訊號的完整設定與排錯方式。",
      intro: "從 SRT URL、Caller／Listener 到 OBS Media Source，整理 OBS 接收 SRT 訊號的完整設定方式，以及有連線卻沒有畫面時該先檢查哪些地方。",
      sections: [],
      extra: "<p>OBS 本身就可以接收 SRT 訊號，不一定需要另外安裝 SRT 外掛。實際工作時，我反而比較少遇到「OBS 不支援」的問題，更多時候是 SRT URL、Caller／Listener、Port 或網路設定其中一個沒有對上。</p>\n\n<p>所以在 OBS 裡新增來源之前，我通常會先確認一件事：<strong>這台 OBS 到底是主動去連對方，還是等對方連進來？</strong></p>\n\n<h2>先確認 SRT 的連線方向</h2>\n\n<p>假設遠端有一台 Encoder，要把現場畫面送到你的 OBS，最常見的一種架構是：</p>\n\n<pre><code>遠端 Encoder（Caller） ↓ Internet ↓ OBS 接收端（Listener）</code></pre>\n\n<p>這種情況下，Encoder 主動連到 OBS，而 OBS 負責等待連線。</p>\n\n<p>但這不是唯一的方式。如果遠端設備本身是 Listener，OBS 也可以反過來當 Caller，主動連向對方。</p>\n\n<blockquote>先搞清楚誰是 Caller、誰是 Listener，再開始寫 SRT URL。這一步如果錯了，後面的設定再怎麼改都很難收到畫面。</blockquote>\n\n<h2>OBS 要在哪裡加入 SRT？</h2>\n\n<p>在 OBS 裡接收 SRT，我通常會直接新增一個 <strong>Media Source（媒體來源）</strong>。</p>\n\n<p>新增來源後，取消勾選 <strong>Local File</strong>，接著就可以在 Input 欄位輸入 SRT URL。</p>\n\n<p>基本格式會像這樣：</p>\n\n<pre><code>srt://IP_ADDRESS:PORT?mode=caller</code></pre>\n\n<p>或：</p>\n\n<pre><code>srt://0.0.0.0:9000?mode=listener</code></pre>\n\n<p>兩種寫法看起來很像，但代表完全不同的連線方式。</p>\n\n<h2>OBS 當 Caller 怎麼設定？</h2>\n\n<p>如果遠端 Encoder 是 Listener，OBS 就要主動連過去。</p>\n\n<p>例如對方提供：</p>\n\n<pre><code>IP：203.0.113.10 Port：9000</code></pre>\n\n<p>OBS 的 Input 可以設定：</p>\n\n<pre><code>srt://203.0.113.10:9000?mode=caller</code></pre>\n\n<p>這代表 OBS 會主動向 <strong>203.0.113.10:9000</strong> 建立 SRT 連線。</p>\n\n<p>這種方式有一個好處：如果 OBS 所在的網路不能讓外部直接連入，只要它本身可以正常連 Internet，通常會比讓 OBS 當 Listener 更容易處理。</p>\n\n<h2>OBS 當 Listener 怎麼設定？</h2>\n\n<p>如果遠端 Encoder 是 Caller，那 OBS 就要等待對方連入。</p>\n\n<p>例如使用 Port 9000，可以設定：</p>\n\n<pre><code>srt://0.0.0.0:9000?mode=listener</code></pre>\n\n<p><strong>0.0.0.0</strong> 的意思不是你的 Public IP，而是讓 OBS 在本機可用的網路介面上監聽這個 Port。</p>\n\n<p>這也是我看過不少人第一次設定時會搞混的地方：看到自己的 Public IP，就直接把 Public IP 填進 Listener URL。</p>\n\n<p>如果 OBS 位於路由器後方，真正還要處理的是 Router。</p>\n\n<pre><code>Internet ↓ Public IP : 9000 ↓ Router Port Forwarding ↓ OBS 電腦 Local IP : 9000</code></pre>\n\n<p>也就是把外部進入的 UDP Port 轉發到 OBS 所在電腦，同時確認 Windows Firewall 或其他防火牆沒有把這個 Port 擋掉。</p>\n\n<h2>Latency 要不要設定？</h2>\n\n<p>SRT URL 還可以加入 Latency，例如：</p>\n\n<pre><code>srt://203.0.113.10:9000?mode=caller&amp;latency=120000</code></pre>\n\n<p>Latency 不是單純「越低越好」。SRT 需要一定的緩衝時間處理網路抖動與封包重傳，跨網路傳輸時如果設得太低，反而可能增加破圖或卡頓的機率。</p>\n\n<p>另外要特別注意，不同軟體或介面顯示 Latency 時，使用的單位不一定相同。不要看到別人的數值就直接照抄，最好先確認目前使用的 OBS／FFmpeg 版本與相關參數定義。</p>\n\n<h2>設定完成，為什麼還是沒有畫面？</h2>\n\n<p>這是實際測試 SRT 時很常碰到的情況。</p>\n\n<p>我通常不會一開始就一直重設 OBS，而是按照傳輸路徑往回查。</p>\n\n<p>先確認遠端 Encoder 是否真的有在送訊號，再確認 Caller 與 Listener 是否配對、IP 和 Port 是否正確，以及防火牆和 Port Forwarding 是否放行。</p>\n\n<p>如果 SRT 已經建立連線，但 OBS 還是沒有正常畫面，下一步才會去看來源的 Video Codec、Audio Codec、MPEG-TS、解析度、Bitrate，以及實際解碼狀態。</p>\n\n<blockquote>SRT「連線成功」和「影音正常」是兩件不同的事。Connected 只代表兩端建立了連線，不代表 OBS 一定已經成功解碼畫面與聲音。</blockquote>\n\n<h2>我會怎麼測試一條新的 SRT 線路？</h2>\n\n<p>如果是第一次接一個新的遠端訊號，我不會一次把整套直播系統全部接上。</p>\n\n<p>我會先建立最簡單的測試環境：一端送出固定測試畫面與聲音，另一端只負責接收。先確認 SRT 本身可以正常建立連線，再逐步加入正式 Encoder、OBS、導播系統與其他設備。</p>\n\n<p>這樣做最大的好處是，當畫面出問題時，可以很快判斷問題到底出在網路、Encoder、SRT，還是 OBS。</p>\n\n<h2>最後記住這個順序</h2>\n\n<p>OBS 接收 SRT 時，可以按照這個順序檢查：</p>\n\n<p><strong>Caller / Listener → IP → Port → Firewall → SRT Connected → Video / Audio Decode → 畫面與聲音。</strong></p>\n\n<p>不要一看到黑畫面就直接認定是 OBS 的問題。遠端影音傳輸真正麻煩的地方，往往是整條訊號路徑中的某一個環節沒有對上。</p>\n\n<p>如果 SRT 明明已經顯示連線，OBS 卻還是沒有畫面，下一篇我們就來整理<a href=\"https://keysearchappofficial-arch.github.io/Aplus-video/article/srt-connected-no-video-8-common-causes/\">實際工作中最常遇到的 8 個原因</a>。</p>",
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
    }),
    makeArticle({
      slug: "srt-connected-no-video-8-common-causes",
      relatedTool: null,
      relatedProduct: null,
      category: "專業製作",
      title: "SRT 有連線但沒有畫面？最常見的 8 個原因與排查方法",
      description: "SRT 顯示已連線，卻沒有畫面或聲音？整理實際工作中最常遇到的 8 個原因，從 Encoder、Codec、MPEG-TS 到網路與解碼問題逐步排查。",
      lead: "SRT 顯示 Connected，不代表影音一定正常。實際工作中，我遇過不少情況是兩端已經建立連線，但接收端仍然黑畫面、沒有聲音，甚至只有封包卻無法解碼。這時候最有效的方法不是一直重開軟體，而是順著訊號鏈一段一段排查。",
      date: "2026.08.17",
      readingTime: "6 min read",
      image: "./assets/images/solutions/corporate-live.jpg",
      alt: "SRT 顯示已連線但接收端沒有畫面的故障排查示意圖",
      seoTitle: "SRT 有連線但沒有畫面？最常見的 8 個原因與排查方法",
      metaDescription: "SRT 顯示 Connected 卻沒有畫面？整理實際工作最常遇到的 8 個原因，從 Encoder、Codec、MPEG-TS、Bitrate、Packet Loss、Latency 到接收端解碼逐步排查。",
      intro: "SRT 顯示已連線，卻沒有畫面或聲音？整理實際工作中最常遇到的 8 個原因，從 Encoder、Codec、MPEG-TS 到網路與解碼問題逐步排查。",
      sections: [],
      extra: "<p>SRT 最容易讓人誤判的一件事，就是畫面上已經顯示 <strong>Connected</strong>，但接收端卻還是黑的。</p>\n\n<p>我自己在做遠端傳輸測試時，遇到這種狀況通常不會先認定是網路壞掉。因為 SRT 能建立連線，只代表兩端的 Transport 已經通了，並不代表裡面的影音一定有正確送出、封裝或解碼。</p>\n\n<p>如果 SRT 已經連上卻沒有畫面，我通常會從下面這 8 個地方開始查。</p>\n\n<h2>1. 發送端其實沒有真的送出影像</h2>\n\n<p>第一個原因反而最基本。</p>\n\n<p>Encoder 雖然已經建立 SRT 連線，但影像來源可能沒有進來，或 Encoder 根本沒有開始正常編碼。</p>\n\n<p>例如攝影機沒有訊號、HDMI／SDI Source 掉線，或 OBS 雖然開始 Streaming，但實際 Output 沒有 Video Track。</p>\n\n<p>所以我第一件事會先確認發送端：</p>\n\n<p><strong>有沒有 Preview？有沒有 Bitrate？Video Encoder 有沒有真的在工作？</strong></p>\n\n<p>如果發送端本身就是黑畫面，接收端再怎麼調都沒有用。</p>\n\n<h2>2. Caller 和 Listener 雖然連上，但接錯訊號</h2>\n\n<p>SRT 可以建立連線，不代表你一定接到你想要的那一路。</p>\n\n<p>在有多個 Encoder、Port 或 Stream ID 的環境裡，有時候會出現連線成功，但實際連到另一條 Stream 的情況。</p>\n\n<p>尤其是在 Gateway、Relay 或多路 SRT Server 架構裡，不能只看 IP 和 Port。</p>\n\n<p>如果系統有使用 <strong>Stream ID</strong>，也要確認兩邊的識別資訊是否正確。</p>\n\n<h2>3. Video Codec 接收端不支援</h2>\n\n<p>這是很常見的一種情況。</p>\n\n<p>SRT 只是負責傳輸，它不會幫你決定裡面到底是 H.264、H.265 還是其他 Codec。</p>\n\n<p>例如發送端送：</p>\n\n<pre><code>H.265 / HEVC</code></pre>\n\n<p>但接收端的軟體、硬體 Decoder 或 GPU 環境只支援 H.264，就可能出現連線已建立，但完全沒有畫面的狀況。</p>\n\n<p>所以我會確認：</p>\n\n<pre><code>Video Codec Profile Level Pixel Format Hardware Decoder Support</code></pre>\n\n<p>尤其在不同品牌 Encoder 與 Decoder 混用時，Codec 相容性一定要先確認。</p>\n\n<h2>4. MPEG-TS 封裝或 Stream Mapping 有問題</h2>\n\n<p>SRT 很常搭配 <strong>MPEG-TS</strong> 傳輸。</p>\n\n<p>這時除了 Codec 之外，還會牽涉到影音到底怎麼被放進 MPEG-TS。</p>\n\n<p>例如 Video Stream 根本沒有被 Map 進去，或 Program Map Table、PID 等資訊異常，接收端就可能收到資料，但找不到可以播放的 Video Stream。</p>\n\n<p>這種情況用一般播放軟體看，常常只會看到黑畫面，很難直接知道問題在哪。</p>\n\n<p>如果是比較正式的測試，我會進一步看 Stream 資訊，確認：</p>\n\n<pre><code>Video Stream 是否存在 Audio Stream 是否存在 Codec Resolution FPS Program / PID</code></pre>\n\n<p>也就是不要只確認「有資料」，還要確認裡面真的有影像。</p>\n\n<h2>5. Bitrate 有數字，但實際資料不正常</h2>\n\n<p>有些系統在 SRT 建立後會顯示 Bitrate，看起來好像一直有資料進來。</p>\n\n<p>但有 Bitrate 並不代表一定是正常影音。</p>\n\n<p>例如 Encoder 可能持續送 MPEG-TS 封包，但 Video Encoder 已經卡住；也可能只有 Audio 在送，所以仍然看得到流量。</p>\n\n<p>因此我通常會同時看：</p>\n\n<p><strong>總 Bitrate、Video Bitrate、Audio Bitrate，以及接收端實際解析到的 Stream。</strong></p>\n\n<p>如果一個原本應該有 8 Mbps 的視訊突然只剩幾百 kbps，就算 Connected，也很可能已經不正常。</p>\n\n<h2>6. Packet Loss 太高，畫面無法正常解碼</h2>\n\n<p>SRT 本身會透過重傳機制處理部分封包遺失，但它也不是無限救援。</p>\n\n<p>如果網路品質太差、Packet Loss 持續過高，或者 Latency 設得太低，封包可能來不及重傳就已經超過播放時間。</p>\n\n<p>這時常見的現象包含：</p>\n\n<p>黑畫面、馬賽克、畫面停住、跳幀，或偶爾突然恢復。</p>\n\n<p>所以除了看 Connected，我也會看：</p>\n\n<pre><code>Packet Loss Retransmitted Packets RTT Latency Dropped Packets</code></pre>\n\n<p>SRT 的價值是提高不穩定網路下的可靠性，不代表任何網路品質都能正常傳。</p>\n\n<h2>7. Latency 設定太低</h2>\n\n<p>這個問題在跨國或跨城市傳輸時特別容易出現。</p>\n\n<p>很多人看到 Latency 就直覺想設越低越好，例如 20 ms、40 ms。</p>\n\n<p>但假設實際網路 RTT 已經接近甚至超過這個數字，SRT 就沒有足夠時間處理封包重傳。</p>\n\n<p>結果反而可能是：</p>\n\n<p><strong>延遲很低，但畫面根本不穩。</strong></p>\n\n<p>我的做法通常是先讓線路穩定，再慢慢把 Latency 往下降，而不是一開始就追求最低延遲。</p>\n\n<blockquote>直播傳輸真正要追求的不是最低 Latency，而是在可以接受的延遲內，保持穩定且可解碼的畫面。</blockquote>\n\n<h2>8. 接收端的解碼或軟體本身出了問題</h2>\n\n<p>如果前面全部正常，最後就要回到接收端。</p>\n\n<p>OBS、vMix、VLC、FFplay、硬體 Decoder 對 SRT、MPEG-TS 和 Codec 的處理方式不完全一樣。</p>\n\n<p>同一條 Stream 可能在 A 軟體可以正常播放，在 B 軟體卻沒有畫面。</p>\n\n<p>這時候我通常會做交叉測試。</p>\n\n<p>例如原本 OBS 沒畫面，就先換另一個播放器或 Decoder 測試。</p>\n\n<p>如果其他軟體可以正常播放，就代表 SRT 和發送端大致沒問題，問題比較可能落在 OBS 的解碼、Media Source 或相關設定。</p>\n\n<p>相反地，如果所有接收端都沒有畫面，就應該回頭查 Encoder 與 Stream 本身。</p>\n\n<h2>我實際會怎麼排查？</h2>\n\n<p>遇到 SRT Connected 但沒有畫面時，我通常會按照訊號方向從前往後查：</p>\n\n<pre><code>Source ↓ Encoder Input ↓ Video Encode ↓ MPEG-TS / Stream Mapping ↓ SRT Transport ↓ Network ↓ Receiver ↓ Video Decode ↓ Display</code></pre>\n\n<p>這種排查方式比一直重新設定 IP、Port 或重開 OBS 有效率很多。</p>\n\n<p>因為每確認一個環節，就可以排除一大部分可能性。</p>\n\n<h2>Connected 只是第一步</h2>\n\n<p>SRT 顯示 Connected，最多只能證明 Caller 與 Listener 已經成功建立通道。</p>\n\n<p>真正的影音傳輸還包含來源、Encoder、Codec、封裝、Bitrate、網路品質與 Decoder。</p>\n\n<p>所以在實際工作裡，我不會只問「SRT 有沒有連上」，而是會再往下問：</p>\n\n<p><strong>有沒有 Video Stream？Codec 是什麼？Bitrate 正不正常？Packet Loss 有多少？接收端有沒有成功 Decode？</strong></p>\n\n<p>只要照著訊號鏈一路查下去，大部分 SRT 黑畫面的問題，其實都能很快縮小範圍。</p>",
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

