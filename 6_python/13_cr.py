import requests
from bs4 import BeautifulSoup

# 1. 정보를 가져올 타겟 URL 설정 (크롤링 연습용 명언 사이트)
url = 'http://quotes.toscrape.com/'

# 2. 해당 웹페이지에 접속해서 전체 HTML 데이터 가져오기
response = requests.get(url)

# 정상적으로 접속되었는지 확인 (상태 코드 200이면 성공)
if response.status_code == 200:
    print("웹페이지 접속 성공! 데이터를 분석합니다.\n")

    # 3. 파이썬이 이해하기 쉽도록 HTML 데이터를 변환 (파싱)
    soup = BeautifulSoup(response.text, 'html.parser')

    # 4. 우리가 원하는 특정 데이터만 찾아내기
    # 이 사이트는 명언이 <span class="text"> 태그 안에 들어있습니다.
    quotes = soup.find_all('span', class_='text')

    for i, quote in enumerate(quotes[:5], 1):
        print(f"{i}.{quote.text}")

    else:
        print(f" 웹페이지 접속 실패:에러 코드{response.status_code}")


'''
크롤링 : 어떤 웹페이지들이 있는지 찾아내고 지도(색인)를 만드는것
스크래핑 : 내가 원하는 알맹이(데이터)만 쏙 뽑아옴
'''


