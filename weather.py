import os, json, pathlib, datetime, urllib.parse, http.client

# 좌표 (창원: nx=90, ny=77)
NX, NY = 90, 77
OUT_PATH = pathlib.Path("data/weather.json")
OUT_PATH.parent.mkdir(exist_ok=True)

# 현재 시간 → base_date, base_time 계산
kst = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
hour = kst.hour
minute = kst.minute
if minute < 45:
    hour -= 1
    if hour < 0:
        hour = 23
        kst -= datetime.timedelta(days=1)
base_date = kst.strftime("%Y%m%d")
base_time = f"{hour:02d}30"

SERVICE_KEY = os.environ["KMA_SERVICE_KEY"]

# API 엔드포인트
host = "apis.data.go.kr"
path = "/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"

# 쿼리 파라미터
params = {
    "serviceKey": SERVICE_KEY,
    "numOfRows": 1000,
    "pageNo": 1,
    "dataType": "JSON",
    "base_date": base_date,
    "base_time": base_time,
    "nx": NX,
    "ny": NY
}

# URL 인코딩
query = urllib.parse.urlencode(params)

# HTTPS 요청
conn = http.client.HTTPSConnection(host, timeout=30)
conn.request("GET", f"{path}?{query}")
res = conn.getresponse()
body = res.read().decode("utf-8")
conn.close()

# JSON 파싱
data = json.loads(body)

items = data["response"]["body"]["items"]["item"]

# 필요한 값 정리
want = {"T1H": "temp", "REH": "humidity", "WSD": "wind", "SKY": "sky", "PTY": "pty"}
sky_map = {"1": "맑음", "3": "구름많음", "4": "흐림"}
pty_map = {"0": "없음", "1": "비", "2": "비/눈", "3": "눈"}

forecast = {}
for it in items:
    cat = it["category"]
    if cat in want:
        forecast[want[cat]] = it["fcstValue"]

forecast["sky_text"] = sky_map.get(forecast.get("sky", ""), "")
forecast["pty_text"] = pty_map.get(forecast.get("pty", ""), "")

result = {
    "base": {"date": base_date, "time": base_time},
    "values": forecast
}

OUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2))
print("✅ Saved weather.json")

