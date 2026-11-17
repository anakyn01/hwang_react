import numpy as np
#vstack 세로방향으로 차원이 늘어남
arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

arr = np.dstack((arr1, arr2)) #깊이 까지 결합
print(arr)


#vstack 세로방향으로 차원이 늘어남
arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

arr = np.vstack((arr1, arr2))
print(arr)

#hstack 가로 방향(수평, Horizontal) 으로 나란히 이어 붙이는
arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

arr = np.hstack((arr1, arr2))
print(arr)



#np.concatenate()가 기존 축을 따라 '이어 붙이는' 것이라면
#np.stack()은 말 그대로 차원을 하나 늘려서 '포개어 쌓는' 것입니다
arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

arr = np.stack((arr1, arr2), axis=1)
#axis에 영향을 받지만 축을 하나 더늘림
print(arr)



#2차원 이상일때는 axis를 적어야 함..
arr1 = np.array([[1,2],[3,4]])
arr2 = np.array([[5,6],[7,8]])

arr = np.concatenate((arr1, arr2), axis=1)
#원래 있는 스타일로 나올때는 0 단순화는 1

print(arr)

#1차원 배열은 문제가 없지만 ..
arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

newArray = np.concatenate((arr1,arr2))
print(newArray)