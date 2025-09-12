// OpenWeather API 키 직접 입력
const apiKey = "d3755b84dd6b6f2d1cf7d75d1b3aff30";  // 꼭 실제 키로 바꿀 것
const city = "Changwon";

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
      resultDiv.textContent = "날씨 정보를 불러올 수 없습니다.";
      console.error("에러 발생:", error);
    });
}

// 페이지 로딩 시 실행
loadWeather();
