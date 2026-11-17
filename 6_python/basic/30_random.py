from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

sns.displot(random.chisquare(df=1, size=1000), kind="kde")
plt.show()
'''
카이제곱 분포
가설을 검증하는 기준으로 사용됩니다
두가지 매개변수
df-(자유도)
size : 반환되는 배열의 형태
'''

'''
지수 분포는 다음 사건(예: 실패/성공 등) 발생까지의 시간을 설명하는 데 사용
두 가지 매개변수
scale - 비율의 역수(포아송 분포의 lam참조)는 기본값이 1.0
size - 반환되는 배열의 형태
'''
x = random.exponential(scale=2, size=(2,3))
print(x)



x = random.multinomial(n =6, pvals=[1/6, 1/6, 1/6, 1/6, 1/6, 1/6])
print(x)
'''
Multinomial Distribution
다항분포
이항분포의 일반화된 형태
시나리오가 반드시 두 가지 중 하나여야 하는 이항분포
다항분포 시나리오의 결과를 설명
예를 들어 인구 집단의 혈액형이나 주사위 굴림 결과 등이 있습니다.
n- 실험을 실행할 횟수.
pvals- 결과 확률 목록
(예: 주사위 굴리기의 경우 [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]).
size- 반환되는 배열의 형태.
다항 표본 추출은 단일 값을 생성하지 않습니다!
각 범주에 대해 하나의 값을 생성합니다 pval.
'''