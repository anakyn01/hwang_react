#2차원 리스트
data = [
    [3, 5, 2, 4, 1],#15 5
    [4, 5, 1],#10 3
    [4,4,1,5,4],#18 5
    [4,5]#9 2
]

result = {} 
#계산된 최종 데이터를 저장할 빈딕셔너리

for index, lis in enumerate(data):
#리스트의 내용물 뿐만 아니라 해당데이터의 순서(인덱스)도 함께 
#뽑아주는 함수
    list_sum = sum(lis)
    #현재 뽑아낸 리스트안의 모든 숫자를 더함
    list_len = len(lis)
    #현재 리스트안에 데이터가 몇개 들어가 있는지 셉니다
    result[index] = (list_sum, list_len)
    
print(result)