import requests
import os

API_KEY = os.getenv("API_KEY")
CITY = "Changwon"  # 원하는 도시 (창원)

if not API_KEY:
    raise ValueError("❌ API_KEY가 불러와지지 않았습니다. GitHub Secrets에 WEATHER_API_KEY 등록했는지 확인하세요!")

url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric&lang=kr"
res = requests.get(url)

if res.status_code != 200:
    raise ValueError(f"❌ 날씨 정보를 불러올 수 없음: {res.text}")

data = res.json()
weather = data["weather"][0]["description"]
temp = data["main"]["temp"]

# README.md 업데이트
with open("README.md", "r", encoding="utf-8") as f:
    content = f.readlines()

with open("README.md", "w", encoding="utf-8") as f:
    updated = False
    for line in content:
        if line.startswith("🌤️ 현재 날씨:"):
            f.write(f"🌤️ 현재 날씨: {weather}, {temp}°C\n")
            updated = True
        else:
            f.write(line)
    if not updated:
        f.write(f"\n🌤️ 현재 날씨: {weather}, {temp}°C\n")

print(f"✅ 업데이트 완료: {CITY} 날씨 {weather}, {temp}°C")
