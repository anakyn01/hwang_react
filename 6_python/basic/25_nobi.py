
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

data = {
    "normal":random.normal(loc=50, scale=5, size=1000),
#loc=50평균 scale=5 데이터가 평균에서 넓게 퍼지는지 결정
    "binomial":random.binomial(n=100, p=0.5, size=1000)
    #n=100  같은 시도가 100번 한번 시도 성공확률 0.5
}
sns.displot(data, kind="kde")

plt.show()