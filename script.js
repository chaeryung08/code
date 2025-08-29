// 기상청 단기예보 API 예제
const SERVICE_KEY = "4e66bf43d5a7b96a73ce3d7510fdb0f17c6ea622e6dad03ff5d839f22c0ab173"; 
const BASE_DATE = "20250829"; // YYYYMMDD
const BASE_TIME = "0500";     // 발표시각 (예: 0500, 1100, 1700, 2300)
const NX = 90;  // 예보 지점 X좌표
const NY = 77; // 예보 지점 Y좌표

const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${BASE_DATE}&base_time=${BASE_TIME}&nx=${NX}&ny=${NY}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data); // 먼저 확인
    const items = data.response.body.items.item;

    // 날씨 데이터 중 TMP(기온) 찾기
    const temp = items.find(item => item.category === "TMP").fcstValue;

    document.getElementById("weather").innerText =
      `창원(${NX},${NY})의 기온: ${temp}°C`;
  })
  .catch(err => console.error(err));
