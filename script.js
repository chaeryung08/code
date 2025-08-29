
const API_KEY = "4e66bf43d5a7b96a73ce3d7510fdb0f17c6ea622e6dad03ff5d839f22c0ab173";
const city = "changwon";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  .then(res => res.json())
  .then(data => {
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerText = `${data.name}의 현재 온도: ${data.main.temp}°C`;
  })
  .catch(err => console.error(err));
