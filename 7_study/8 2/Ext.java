class Parent{
    int x = 100; //부모클래스의 인스턴스 변수
    
    Parent(){//부모의 기본 생성자
        this(500);
/*내 클래스 안에서 정수 1개를 받는 다른 
생성자를 호출해라
*/
    }
//정수를 매개변수로 받는 부모의 생성자
    Parent(int x){
        this.x = x;
    }
    //넘어온값(500)을 부모의 인스턴스 변수x에 저장
    int getX() {
        return x;
    }//부모의 x값을 반환하는 메서드
}

/*
생성자 호출 순서의 super(): 반드시 부모 클래스의 기본
생성자가 먼저 실행
변수 은닉과 메서드 실행위치 :
자식클래스에서 부모와 똑같은 이름을 만들면 부모의 변수는 
숨겨짐 하지만 물려받은 메서드는 자기가 태어난 곳
부모클래스의 변수를 바라봅니다
*/
class Child extends Parent{
    int x  = 4000;
    Child(){this(5000);}
    Child(int x){this.x = x;}
    //자식은 5000
}


public class Ext {
    public static void main(String[] args){
        Child obj = new Child();
        System.out.println(obj.getX());
    }
}
