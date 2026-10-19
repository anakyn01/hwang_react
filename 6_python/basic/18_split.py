import numpy as np

arr = np.array([41, 42, 43, 44])
filter_arr = arr > 42
newarr = arr[filter_arr]

print(filter_arr)
print(newarr)

#필터배열
arr = np.array([41, 42, 43, 44])

filter_arr = []

for element in arr:
    if element > 42:
        filter_arr.append(True)
    else:
        filter_arr.append(False)

newarr = arr[filter_arr]

print(filter_arr)
print(newarr)


#필터링 기초
arr = np.array([41, 42, 43, 44])
x = [True, False, True, False]
newarr = arr[x]
print(newarr)


#2차원 배열도 정렬 가능함
arr = np.array([[3,2,4],[5,0,1]])
print(np.sort(arr))

#불리언
arr = np.array([True, False, True])
print(np.sort(arr))
#불리언 배열을 정수로 출력
print(arr.astype(int))

#알파베티컬
arr = np.array(['banana','cherry','apple','B',1])
print(np.sort(arr))

arr = np.array([3,2,0,1])
print(np.sort(arr))


'''#sort() 정열이란 요소들을 순서대로 배열하는것
asc : 내림차순
desc : 오름차순
정렬된 시퀀스란 숫자 또는 알파벳 순서, 오름차순 또는 내림차순 같이
요소에 해당하는 순서가 있는 시퀀스를 말함
'''




#값이 다중일 경우 서치
arr = np.array([1,3,5,7])
x = np.searchsorted(arr,[2,4,6])
print(x)


#오른쪽부터 검색을 할경우
arr = np.array([9,6,8,7])
x = np.searchsorted(arr, 7, side='right')
print(x)

#search sort
arr = np.array([6, 7, 8, 9])

x = np.searchsorted(arr, 9)

print(x)

arr = np.array([10, 14, 93, 41, 8, 7]) #왼쪽부터 인데
x = np.searchsorted(arr, 93)
#지정된걸 들어갈 색인을 찾아주는것
print(x) #출력할때 들어가 있는 인덱스가 나옴
x = np.searchsorted(arr, 7)
#지정된걸 들어갈 색인을 찾아주는것
print(x) #출력할때 들어가 있는 인덱스가 나옴


#값이 짝수인 인덱스를 찾아주세요
arr = np.array([10, 14, 93, 41,8,7])
x = np.where(arr%2 == 0)
print(x)

#값이 홀수인 인덱스를 찾아주세요
arr = np.array([10, 14, 93, 41,8,7])
x = np.where(arr%2 == 1)
print(x)

arr = np.array([1,2,3,4,5,4,4])
x = np.where(arr == 4)
print(x) #몇번째에 위치하는지 인덱싱 번호가 나온다..
"""배열 검색 : 특정값을 검색하고 해당값이 일치하는 인덱스를 리턴
배열을 검색하려면 where()메서드를 사용합니다

"""


'''
머신러닝에서 데이터 분석의 필수 과정이기 때문에
1) 학습용과 테스트용으로 데이터를 나누기(Train/Test)
2) 문제지와 정답지를 분리하기 위해서 문제지 뭉치 x와 y를 분리
3) 컴퓨터 메모리의 한계를 극복하기 위해서
데이터가 100줄 1000줄이면 한번에 처리할수 잇음
그러나 1억줄이 넘어서면 프로그램이 뻣
'''
#2차원 배열을 세 개의 2차원 배열로 분할합니다.
arr = np.array([[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13, 14, 15], [16, 17, 18]])
newarr = np.array_split(arr, 3, axis=1)
print(newarr)

#2차원 배열도 분할이 가능
arr = np.array([[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]])
newarr = np.array_split(arr, 3)
print(newarr)

arr = np.array([1,2,3,4,5,6])
newarr = np.array_split(arr,7)

print(newarr)
'''
배열 분할
분할은 하나의 배열을 여러개로 분할
array_split() : 분할할 배열과 분할 횟수를 전달합니다
'''