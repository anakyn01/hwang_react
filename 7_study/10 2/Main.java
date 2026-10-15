/*객체의 참조가 메서드로 어떻게 전달되는지 확인
A m 메서드의 매개변수로 넘겨줄때 
객체 자체가 복사되는 것이 아니라
객체가 저장된 메모리 주소 참조값 전달
*/
class A{//클래스 A를 정의
    int a; 
    int b; 
    //정수형(int) 멤버 변수 a, b를 선언
}


public class Main {
    // 프로그램의 시작을 담당하는 Main 클래스를 정의

    static void func1(A m){
        //클래스 A의 객체(m)를 매개변수로 받는 정적(static) 메서드 func1
        m.a *= 10;
    }

    static void func2(A m){
        m.a += m.b;
/*전달받은 객체 m의 변수 a에 b의 값을 더한 뒤 다시 a에 저장합니다.
 (m.a = m.a + m.b)*/
    }

    public static void main(String[] args) {
        
        A m = new A();

        m.a = 100;
        func1(m);//1000

        m.b = m.a;
        func2(m);//2000 객체 m의 참조값을 func2로 넘겨실행합니다

        System.out.printf("%d", m.a);
    }
    
}
