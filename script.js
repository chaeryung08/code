
async function loadWeather() {
  const status = document.getElementById("status");
  try {
    const res = await fetch("data/weather.json?v=" + Date.now());
    const j = await res.json();

    document.getElementById("temp").textContent = j.values.temp;
    document.getElementById("humidity").textContent = j.values.humidity;
    document.getElementById("wind").textContent = j.values.wind;
    document.getElementById("sky").textContent = j.values.sky_text;
    document.getElementById("pty").textContent = j.values.pty_text;
    document.getElementById("base").textContent =
      `기준: ${j.base.date} ${j.base.time}`;

    document.getElementById("weather-card").hidden = false;
    status.textContent = "업데이트 완료 ✅";
  } catch (err) {
    console.error(err);
    status.textContent = "날씨 데이터를 불러오지 못했습니다 😢";
  }
}
loadWeather();
