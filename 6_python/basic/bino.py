'''
Binomial Distribution
이항분포는
동전 던지기와 같이 앞면 또는 뒷면이 나오는 이진 시나리오 결과를 설명
세가지 매개변수가 있음
n - 시도횟수
p - 각시행이 발생활 확률
size - 반환되는 배열의 형태
'''
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns


sns.displot(random.binomial(n=10, p=0.5, size=1000))
#x = random.binomial(n=10, p=0.5, size=10)
'''
n=10 동전 10번 던지겠음
p=0.5 앞면이나 뒷면이 나올 확률은 50%

'''
#print(x)
plt.show()