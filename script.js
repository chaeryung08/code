
const API_KEY = "회원님_API_KEY";
const city = "Seoul";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  .then(res => res.json())
  .then(data => {
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerText = `${data.name}의 현재 온도: ${data.main.temp}°C`;
  })
  .catch(err => console.error(err));
