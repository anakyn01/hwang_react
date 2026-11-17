from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

sns.displot(random.pareto(a=2, size=1000))

plt.show()


'''
20%의 요인이 80%의 결과를 초래함을 따르는 분포
a - 형상 매개변수
size - 반환되는 배열의 형태
'''