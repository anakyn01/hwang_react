class Person:
    #파이선 생성자
    def __init__(self, name, age):
        self.name = name
        self.age = age
    #파이선 함수
    def myfunc(self):
        print(" hello my name is" + self.name)
        
p1 = Person("jhon", 36)

print(p1.name, p1.age)