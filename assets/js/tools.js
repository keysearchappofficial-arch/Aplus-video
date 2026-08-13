(function () {
  const srtForm = document.getElementById("srt-form");
  if (srtForm) {
    srtForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(srtForm);
      const host = String(data.get("host") || "0.0.0.0").trim();
      const port = Number(data.get("port") || 9000);
      const mode = String(data.get("mode") || "listener");
      const latencyMs = Math.max(20, Number(data.get("latency") || 120));
      const streamId = String(data.get("streamid") || "").trim();
      const params = ["mode=" + mode, "latency=" + Math.round(latencyMs * 1000)];
      if (streamId) params.push("streamid=" + encodeURIComponent(streamId));
      document.getElementById("srt-result").textContent =
        "srt://" + host + ":" + port + "?" + params.join("&");
    });
  }

  function timecodeToFrames(value, fps) {
    const parts = String(value).split(":").map(Number);
    if (parts.length !== 4 || parts.some(Number.isNaN)) return null;
    return (((parts[0] * 60 + parts[1]) * 60 + parts[2]) * fps) + parts[3];
  }

  function framesToTimecode(totalFrames, fps) {
    const frames = totalFrames % fps;
    const totalSeconds = Math.floor(totalFrames / fps);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return [hours, minutes, seconds, frames]
      .map(function (part) { return String(part).padStart(2, "0"); })
      .join(":");
  }

  const timecodeForm = document.getElementById("timecode-form");
  if (timecodeForm) {
    timecodeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(timecodeForm);
      const fps = Number(data.get("fps"));
      const first = timecodeToFrames(data.get("first"), fps);
      const second = timecodeToFrames(data.get("second"), fps);
      const result = document.getElementById("timecode-result");
      result.textContent = first === null || second === null
        ? "請使用 HH:MM:SS:FF 格式輸入 Timecode"
        : framesToTimecode(first + second, fps) + "  @ " + fps + " fps";
    });
  }

  const bitrateForm = document.getElementById("bitrate-form");
  if (bitrateForm) {
    bitrateForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(bitrateForm);
      const durationMinutes = Math.max(0, Number(data.get("duration") || 0));
      const videoMbps = Math.max(0, Number(data.get("video") || 0));
      const audioKbps = Math.max(0, Number(data.get("audio") || 0));
      const totalMbps = videoMbps + audioKbps / 1000;
      const sizeGb = totalMbps * durationMinutes * 60 / 8 / 1000;
      document.getElementById("bitrate-result").textContent =
        "預估檔案大小：約 " + sizeGb.toFixed(2) + " GB（未含封裝額外空間）";
    });
  }
})();

