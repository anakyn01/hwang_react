from numpy import random
#choice() 메서드를 사용하면 값 배열을 기반으로 난수를 생성합니다
x = random.choice([3,5,7,9], size=(3,5))
print(x)


#실수로 할때는 rand
x = random.rand(3, 5)
print(x)


x = random.rand(5)
print(x)


#랜덤 2차원 정수
x = random.randint(100, size=(3, 5))
#임의의 정수 5개가 포함된 3행의 2차원 배열
print(x)



#랜덤배열 생성
x = random.randint(100, size=(5))
print(x)



#임의의 부동 소수점 생성 random모듈의 rand()메서드는 0과 1사이의 임의의 실수값을 보이게 합니다
x = random.rand()
print(x)



x = random.randint(100)
print(x)
'''
난수란 매번 다른  숫자를 의미하는것이 아니라
논리적으로 예측할수 없는 걸을 의미 합니다
'''