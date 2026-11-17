import requests
from bs4 import BeautifulSoup

def scrape_quotes():
    #1. 데이터를 가져올 url
    url = "http://quotes.toscrape.com/"
    #2. 웹페이지 접속하여 HTML데이터 가져오기
    response = requests.get(url)

    #3. 요청이 성공했는지 확인
    if response.status_code == 200:
        print("웹페이지를 성공적으로 불러 왔습니다!\n")
        print("-" * 50)

        #4. 가져온 HTML텍스트를 BeautifulSoap 객체로 변환 (파싱)
        soup = BeautifulSoup(response.text, 'html.parser')

        #5. html요소 찾기
        quotes = soup.find_all('div', class_='quote')

        #6. 찾은 요소들을 반복문을 통해 하나씩 추출
        for idx, quote in enumerate(quotes, 1):
            text = quote.find('span', class_='text').text
            author = quote.find('small', class_='author').text

            #결과 출력
            print(f"{idx}. {text}")
            print(f"  -{author}\n")

        print("-" * 50)
        print("스크래핑이 완료되었습니다")
    else:
        print(f"현실은 폭망 상태코드: {response.status_code}")

#코드실행
if __name__ == "__main__":
    scrape_quotes()

