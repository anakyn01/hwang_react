import matplotlib.pyplot as plt
import seaborn as sns
#matplotlib을 기반으로 만들어진 고급 시각화 라이브러리 seaborn

sns.displot([0,1,2,3,4,5], kind="kde")
plt.show()
'''
kind="kde" (핵심 기능): 
그래프의 종류를 KDE(Kernel Density Estimate, 커널 밀도 추정)로 지정
데이터가 모여 있는 곳은 높게, 
적은 곳은 낮게 나타나는 연속적이고 부드러운 확률 분포 곡선
'''

