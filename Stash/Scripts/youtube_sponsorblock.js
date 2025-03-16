$httpClient.get({
  url: `https://sponsor.ajay.app/api/skipSegments?videoID=${getVideoID()}`,
  headers: { "User-Agent": "Mozilla/5.0" }
}, function (error, response, data) {
  if (error) {
    console.log("Ошибка SponsorBlock API:", error);
    $done({});
  } else {
    let segments = JSON.parse(data);
    let skipTimes = segments.map(seg => `[${seg.segment[0]} - ${seg.segment[1]}]`).join(", ");
    
    $done({
      title: "SponsorBlock",
      content: `Пропущенные сегменты: ${skipTimes}`,
      backgroundColor: "#ffcc00",
      icon: "scissors"
    });
  }
});

function getVideoID() {
  let url = $request.url;
  let match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}