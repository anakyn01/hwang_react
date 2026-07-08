def func(lst):
    #리스트의 길이를 2로 나눈몫
    #for i in range(3) i는 0,1,2까지 총3번 반복
    for i in range(len(lst) //2):
    #left right swap
    #맨 앞쪽원소와 뒤쪽 원소를 서로 맞바꾸는 작업
        lst[i], lst[-i-1] = lst[-i-1], lst[i]
    '''
    1) [6,2,3,4,5,1]
    2) [6,5,3,4,2,1]
    3) [6,5,4,3,2,1]
    '''
    
        
lst = [1,2,3,4,5,6]
func(lst)
print(lst)

#짝수 인덱스 6,4,2 12 홀수 인덱스 추출 5,3,1 =9
print(sum(lst[::2]) - sum(lst[1::2]))
#그래서 정답은 3

        