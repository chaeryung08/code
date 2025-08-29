import requests
import datetime

API_KEY = "4e66bf43d5a7b96a73ce3d7510fdb0f17c6ea622e6dad03ff5d839f22c0ab173"
URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"

today = datetime.datetime.now().strftime("%Y%m%d")
time = (datetime.datetime.now() - datetime.timedelta(minutes=30)).strftime("%H00")

params = {
    "serviceKey": API_KEY,
    "numOfRows": "10",
    "pageNo": "1",
    "base_date": today,
    "base_time": time,
    "nx": "90",   # 창원 격자 X
    "ny": "77",   # 창원 격자 Y
    "dataType": "JSON"
}

def get_weather():
    res = requests.get(URL, params=params)
    data = res.json()

    items = data["response"]["body"]["items"]["item"]
    weather_info = {}
    for item in items:
        if item["category"] == "T1H":  # 기온
            weather_info["temp"] = item["obsrValue"]
        elif item["category"] == "REH":  # 습도
            weather_info["humidity"] = item["obsrValue"]
        elif item["category"] == "RN1":  # 강수량
            weather_info["rain"] = item["obsrValue"]

    return weather_info

if __name__ == "__main__":
    print(get_weather())

