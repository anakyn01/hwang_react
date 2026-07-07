#클래스 문제
class charClass :
    a = ["Seoul","Inchon","Kyonggi","Daejun","Daegu","Pusan"]
    
myVal = charClass() #객체
#변수선언만 하면 값이 유도적으로 들어온다 빈 값을 넣으면 +=
str01 = ''#비어진 변수로 선언

#위에 선언한게 객체인 증거
for i in myVal.a:
    str01 = str01 + i[0]
print(str01) #SIKDDP