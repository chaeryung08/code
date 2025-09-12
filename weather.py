import os
import requests

API_KEY = os.getenv("API_KEY")
CITY = "Changwon"

if not API_KEY:
    raise SystemExit("❌ API_KEY 없음. GitHub Secrets 확인해!")

url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric&lang=kr"
res = requests.get(url)

print("응답 코드:", res.status_code)
print("응답 본문:", res.text)
