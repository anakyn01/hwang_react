from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

sns.displot(random.normal(loc=1, scale=2, size=1000), kind="kde")

plt.show()

'''
정규분포를 따르는 무작위 숫자 1,000개를 생성
정규분포란, 평균값 주변에 데이터가 가장 많이 몰려 있고, 
평균에서 멀어질수록 데이터가 적어지는 분포를 말합니다.
코드에 평균과 표준편차를 따로 지정하지 않을것이므로 평균 0,
표준편차 1을 따르는 표준정규분포..
'''

'''
칼 프리드리히 가우스의 이름을 따서
가우스 분포
예시로 iQ점수, 심장 박동수등을
loc : 최고점
scale : 표준편차 (그래프에 분포가 얼마나 평평해야 하는지)
size : 반환되는 배열의 형태
'''