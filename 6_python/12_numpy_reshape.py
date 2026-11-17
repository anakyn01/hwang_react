import numpy as np

#다차원 원래 1차 돌리려면 reshape(-1)을 붙인다
two = np.array([[1,2,3],[4,5,6]])
one = two.reshape(-1)
print(one)


#차원을 계산할때 엘리먼트 갯수를 잘 맞춰야 함
nop = np.array([1,2,3,4,5,6,7,8])
newnop = nop.reshape(2,4)
print(newnop)

arr = np.array([1,2,3,4,5,6,7,8,9,10,11,12])
#3차원 배열을 만들어 봅니다
threeArray = arr.reshape(2,3,2)
#엘리먼트 2개를 가진
print(threeArray)


# 3행 2열 (3 x 2) 모양의 2차원 배열이 두묶음


#아래는 2차원 배열을 만듭니다
newarr = arr.reshape(4,3)
print(newarr)





'''
배열의 형태를 바꾸는걸 리셰이핑이라고 합니다
1차원에서 2차원으로 재구성 이것이 리쉐이핑입니다

'''