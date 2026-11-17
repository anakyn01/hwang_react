x = input() #사용자로부터 키보드로 문자열을 입력받아 변수 x에 저장
x = x.capitalize() #맨첫글자만 대문자로 바꿈
#Python P[0]r[1]o[2]g[3]r[4]a[5]m[6]ming 
y = x.split() #띄어쓰기(공백)를 기준으로 문자열을 쪼개서 리스트(배열) 형태로 변수y에 저장
#["Python", "Programming"] [0, 1]
print(y[0][::2], end="*")#0번 위치에서 2씩 증가 Pto
print(y[1][3:6])#gra
# Pto*gra

'''
이문제는 python programming이라는 입력을 하고난 후에 문제입니다
'''
