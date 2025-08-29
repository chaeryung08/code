from weather import get_weather
import datetime

weather = get_weather()
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

content = f"""
# 🌤️ 창원 날씨 현황

- 현재 기온: {weather.get("temp", "?")} °C  
- 습도: {weather.get("humidity", "?")} %  
- 강수량: {weather.get("rain", "0")} mm  

📅 마지막 업데이트: {now}
"""

with open("README.md", "w", encoding="utf-8") as f:
    f.write(content)
