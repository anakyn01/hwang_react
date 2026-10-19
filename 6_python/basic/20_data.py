'''
가중치(확률)가 부여된 무작위 추출을 수행하는 코드
'''
from numpy import random

x = random.choice([3,5,7,9], p=[0.1, 0.3, 0.6, 0.0], size=(3, 5))
'''
[3,5,7,9] 후보숫자 배열
p는 확률을 의미
size=(100) 총 100개의 숫자
'''
print(x)