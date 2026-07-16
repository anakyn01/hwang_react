class Car2 implements Runnable{
    int a;

    public Car2(){}

    //Runnable 인터페이스를 구현하면 반드시 
    // 작성해야 하는 run() 메서드입니다.
    public void run(){
        System.out.println("message");
        //화면에 message라는 문자열을 출력
    }
}

public class Th {//프로그램 시작점 클래스
    public static void main(String[] args) {
        //메인스레드가 가장 먼저 실행하는 메인 메서드
        /*
        1) new Car() : 작업 지시서 역할을 할 Car 객체를 생성합니다.
        2) new Thread(...) : 실제 스레드 일꾼을 생성하면서 Car 객체를 전달합니다.
        3) Thread t1 = ... : 생성된 스레드 객체를 t1이라는 변수에 저장합니다.
        */
        Thread t1 = new Thread(new Car2());
        //이 메서드가 호출되면 새로운 작업 흐름이 생성되고, 
        // 백그라운드에서 Car의 run() 메서드가 실행됩니다.
        t1.start();
    }
}
/*
스레드(Thread)
실행되는 작업의 흐름(갈래)'을 뜻합니다.

기본적으로 자바 프로그램은 main 메서드라는 
하나의 흐름(메인 스레드)에서 위에서 아래로 순차적으로 실행
하지만 스레드를 추가로 생성하면, 
여러 작업을 동시에(병렬로) 처리할 수 있습니다

자바에서 스레드를 만드는 방법 (Runnable 인터페이스)
자바에서는 스레드를 만들기 위해 보통 
Runnable 인터페이스를 구현(implements)합니다.
Runnable을 구현하겠다고 선언한 클래스 Car는
반드시 내부에 run()이라는 메서드를 만듬
이 run() 메서드 안에 
"새로운 스레드가 해야 할 작업 내용"을 적어줍니다

왜 new Thread(new Car()) 형태로 쓰나요?
Car 클래스는 "무엇을 할지(run)" 작업 지시서만 가지고 있을 뿐, 
스스로 새로운 실행 흐름을 만들어낼 능력은 없습니다.
따라서 실제 일꾼 역할을 하는 Thread 객체를 새로 만들면서
(new Thread()), 
그 일꾼에게 "이 작업 지시서대로 일해!"라고 
Car 객체(new Car())를 넘겨주는 것입니다.

start() 메서드의 중요성
t1.start()를 호출해야 비로소 자바가 
새로운 작업 흐름(스레드)을 하나 생성하고, 
그 흐름 위에서 Car의 run() 메서드를 실행시킵니다.
*/