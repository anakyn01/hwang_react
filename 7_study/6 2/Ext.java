//다형성, 매서드 오버라이딩, 동적바인딩
class A{
    public void paint(){
        System.out.print("A");
        draw();
    }
    public void draw(){
        System.out.print("B");//[4] "B"를 출력 B
        draw();//[5] draw()를 다시 호출합니다 
        //실제 생성된게 A가 아니라 B이므로 B의 draw()호출
    }

}
class B extends A{
    public void paint(){
        super.draw();//[3] 부모 클래스의 A의 draw()매서드를 명시적으로 호출
        System.out.print("C");//[6] A의 draw()가 모두 끝난후 돌아와서 C를 출력 BDC
        this.draw();//[7]자기자신의 B의 draw()호출 BDCD
    }
    public void draw(){
        System.out.print("D");
    }
}


public class Ext {
    public static void main(String[] args) {
        A b = new B(); //[1]
/*
다형성 부모클래스 A타입의 참조 변수 b로 자식클래스 B의
인스턴스를 가리키고 있다

동적 바인딩 : 오버라이딩된 메서드를 호출할때 변수의 타입이 아니라
실제로 생성된 객체의 타입을 기준으로 메서드가 실행됨

주의사항
부모클래스 A의 메서드 안에서 다른 메서드( draw)가 호출하더라도
실제 객체가 자식 B라면 자식 클래스에서 오버라이딩된 메서드 호출
*/        
        b.paint(); //[2] b에 paint를 호출 실제 객체가 B이므로 B클래스의 paint가 실행
        b.draw();//[8] 메인 메서드로 돌아와 b의 draw를 호출 이라하여 BDCDD
    }
    
}
