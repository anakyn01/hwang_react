#배열에서 요소를 반복한다는건 순회
import numpy as np
#nd열거형을 사용할 경우
arr = np.array([[1,2,3,4],[5,6,7,8]])
for idx, x in np.ndenumerate(arr):
    print(idx, x) #차원에 대한 키와 밸류가 같이 나옵니다


#서로 다른 데이터 유형을 가진 배열 순회 아래는 데이터 형식을 변경하여 순회
arr = np.array([[1,2,3,4],[5,6,7,8]])
for x in np.nditer(arr[:, ::2]):
    print(x)



arr = np.array([1,2,3])
#2. nditer를 사용한 배열 순회 및 데이터타입 변환
for x in np.nditer(arr, flags=['buffered'], op_dtypes=['S']):
    print(x)
'''
op_dtypes=['S'] 순회하면서 배열의 원소들을 어떤 데이터 타입으로 취급할지를 지정
'S' 바이트 문자열(Byte String)을 의미 원래 정수였던 (1,2,3)였던
데이터를 순회하는 동안만 문자열로 캐스팅
flags=['buffered'] Numpy는 기본적 으로 메모리 효율성을 위해 순회 중 
데이터 타입을 강제로 바꾸는 것을 허용하지 않습니다
원본 배열은 정수형인데 순회할 때만 문자열로 바꾸려면, 
변환된 문자열 데이터를 잠시 저장해 둘 임시 메모리 공간
flags=['buffered']는 NumPy에게 "변환된 데이터를 담을 
버퍼 메모리를 사용해도 좋다"고 허락해 주는 옵션입니다.
'''



#스칼라 요소에 대한 불편함을 해소하기 위해 nditer를 사용함
arr = np.array([[1,2,3],[4,5,6]])
for x in np.nditer(arr):
    print(x)

print("======================")

#2차원 배열의 스칼라 값 출력은 중첩으로 해야됨
arr = np.array([[1,2,3],[4,5,6]])

for x in arr:
    for y in x:
        print(y) #이를 가지고 있는 실제값 스칼라요소라고 함

#3차원 배열을 부를때
arr = np.array([[1,2,3],[4,5,6]])
for x in arr:
    print(x)

arr = np.array([1,2,3]) #[0,1,2]
#한번에 부를때 for foreach
for x in arr:
    print(x)