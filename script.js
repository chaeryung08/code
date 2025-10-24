// ⚠️ 여기에 OpenWeather API 키 넣기
const apiKey = "d3755b84dd6b6f2d1cf7d75d1b3aff30";  // 실제 키로 교체
const city = "Changwon,KR";

function loadWeather() {
  const resultDiv = document.getElementById("weatherResult");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("API 요청 실패");
      return response.json();
    })
    .then(data => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      resultDiv.textContent = `${data.name} 날씨: ${weather}, ${temp}°C`;
    })
    .catch(error => {
      resultDiv.textContent = "실패하였습니다";
      console.error("에러 발생:", error);
    });
}

// 페이지 로딩 시 바로 실행
loadWeather();





<!-- Leaflet 라이브러리 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
  // 지도 좌표 설정 (전라남도 순천시)
  const myLocation = [34.9507, 127.4872];
  let mapInitialized = false;

  // 버튼 클릭 이벤트
  document.getElementById("showMapBtn").addEventListener("click", () => {
    const mapContainer = document.getElementById("mapContainer");
    mapContainer.style.display = "block"; // 지도 표시

    if (!mapInitialized) {
      const map = L.map("map").setView(myLocation, 13);

      // 지도 배경 타일
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      // 마커 표시
      L.marker(myLocation)
        .addTo(map)
        .bindPopup("<b>우리 지역: 전라남도 순천시 🌾</b><br>농업 중심 지역입니다.")
        .openPopup();

      mapInitialized = true;
    }
  });
</script>

