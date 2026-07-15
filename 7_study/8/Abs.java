abstract class Vehicle {
    String name; //이름을 저장할 인스턴스 변수

    abstract public String getName(String val);
    //Body가 없다는건 구현부가 없다는 말 추상 메서드
    public String getName(){//일반 메서드
        return "Vehicle name: " + name;
    }

}
/* 추상 클래스 특징 
1) 하나 이상의 추상메서드를 가집니다
2) 직접 객체를 만들수 없음
*/ 

class Car extends Vehicle{//상속받은 메서드
    //Car생성자
    public Car(String val){
        name = super.name = val;
    }
    //강제되는 부모클래스의 오버라이딩(재정의) 추상 메서드
    public String getName(String val){
        return "Car name:" + val;
    }
    //메서드 오버로딩
    public String getName(byte val[]){
        return "Car name:" + val;
    }

}


public class Abs {

    public static void main(String[] args) {
        Vehicle obj = new Car("Spark");

        System.out.println(obj.getName());
    }
    
}
