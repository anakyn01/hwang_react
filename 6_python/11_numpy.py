import numpy as np

#ndmin으로 숫자를 설정하면 거기에 맞는 차원에 배열을 만들수 있습니다
five = np.array([1,2,3,4], ndmin=5)
print(five)
print('shape of array: ', five.shape)

#Numpy Array Shape
sha = np.array([[1,2,3,4],[4,5,6,7]])
print(sha.shape) #2차원 배열에 각각 3개의 요소가 있음

#numpy 복사 하고 보기 변동사항이 생길때 원본은 남겨나야 합니다
arr = np.array([1,2,3,4,5])
x = arr.copy() #원본에게 영향을 끼치지 않게 하기위해 복사본을 만듬
arr[0] = 42

print(arr)
print(x)


#3차원
three = np.array([ [[1,2,3],[4,5,6]], [[7,8,9],[10,11,12]] ])
print(three[0, 1, 2])

#Negative Indexing 배열의 끝에서 부터 접근할때 음수 인덱싱 사용
append = np.array([[1,2,3,4,5],[6,7,8,9,10]])
print('last element from 2nd dim: ',append[1, -1])


#2차원 배열에 엑세스
two = np.array([[1,2,3,4,5],[6,7,8,9,10]])
print('2nd element on 1st row: ',two[0, 1])

arr = np.array([1,2,3,4,5])
print(arr)
print(type(arr))
#배열인덱싱
print(arr[0])#첫번째요소




'''
Numerical Python
파이선에는 배열이 존재하지 않아서 list를 사용합니다
그런데 array를 사용하려면 numpy를 사용
사용하는 이유 최소 list보다 50배정도가 빠름
2005년
설치할때는 pip install numpy
'''