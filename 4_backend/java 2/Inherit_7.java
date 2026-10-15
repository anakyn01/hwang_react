/*
PC => super class : 상속시킴
CC => sub class :  부모한테 상속 받는 클래스
상속받는 아이들은 누구로 부터 확장
extends
*/
class Vehicle {
    protected String brand = "bmw"; //속성
    public void honk(){//함수
        System.out.println("Tuut, tuut");
    }
}

public class Inherit_7 extends Vehicle{

    private String modelName="오토바이";

    public static void main(String[] args) {
        
        //예만에 자체 객체
        Inherit_7 myCar = new Inherit_7();
        myCar.honk();
        System.out.print(myCar.brand + " " + myCar.modelName);
    }
    
}
