#입력된 데이터의 자료형 타입이 무엇인지 판별하고 그에 따른 값을 리턴
def func(value):
    if type(value) == type(100):
        return 100 #입력된 값이 정수형이면 무조건 100을 리턴
    elif type(value) == type(""):
        return len(value)#입력되 값이 문자열이면 해당 문자열의 길이를
    else:#정수도 아니고 문자열도 아니 그외의 모드 자료형(실수,튜플)
        return 20
 
 
a = '100.0'  #5 
b= 100.0 #20 
c=(100, 200) #20

print(func(a) + func(b) +func(c)) #45