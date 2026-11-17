class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    #함수
    def move(self):
        print("Move!")
        
#밑에 자동차 클래스가 상속받음
class Car(Vehicle):
    pass

class Boat(Vehicle):
    def move(self):
        print("Sail")
        
class Plane(Vehicle):
    def move(self):
        print("Sail")        

#객체설정
car1 = Car("기아","pv5")
boat1 = Boat("Ibiza","touring 20")
plane1 = Plane("Boeing","747")

for x in (car1, boat1, plane1):
    print(x.brand)
    print(x.model)
    x.move()
    print("   ")

# 다형성 다양한 형태 동일한 이름을 가진  
# 메서드 함수 연산자가 여러 객체나 클래스에서 실행