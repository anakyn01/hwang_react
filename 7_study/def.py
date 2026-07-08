#문자열 x안에서 특정 문자열 y가 몇번 포함되어있는지 세어주는 함수
def fnCalculation(x, y):
    
    result = 0;#나중 결과를 위해서  0으로 초기화
    
    #문자열 x의 전체 길이만큼 반복문 실행
    for i in range(len(x)):
# 문자열 x의 i번째 인덱스부터 'y의 길이'만큼 잘라내어(슬라이싱) temp 변수에 저장
        temp = x[i:i+len(y)]
 # 방금 잘라낸 부분 문자열(temp)이 
 # 우리가 찾고자 하는 문자열(y)과 똑같은지 비교       
        if temp == y:
            #똑같다면 찾은 횟수를 1증가
            result += 1
            #전체 문자열을 다검사한후 횟수를 1증가
            return result
        
#검색대상
a = "abdcabcabca"

#첫번째로 찾을 문자열패턴
p1 = "ab" #3
#두번째 패턴
p2 = "ca" #3

#출력
out = f"ab{fnCalculation(a,p1)}ca{fnCalculation(a,p2)}"

print(out) #ab3ca3