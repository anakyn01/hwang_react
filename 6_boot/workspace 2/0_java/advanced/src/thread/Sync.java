package thread;

public class Sync {

    public static void main(String[] args) {
        Calculator calculator = new Calculator();

        User1Thread user1Thread = new User1Thread();
        user1Thread.setCalculator(calculator);
        user1Thread.start();

        User2Thread user2Thread = new User2Thread();
        user2Thread.setCalculator(calculator);
        user2Thread.start();

    }

}
/*
멀티스레드는 하나의 객체를 공유해서 작업할수도 있다
이경우 다른 스레드에 의해 객체 내부 데이터가
쉽게 변경될수 있기 때문에 의도했던 것과는 다른 결과가
나올수 있다
잘못하면 데이터가 날라갈수 있다
그래서 객체 내부에 동기화 메소드와 동기화 블록이
여러개 있으면 이들중에 하나를 실행할때
다른 스레드는 해당 메소드는 물론이고
다른 동기화 메소드및 블록도 실행할수 없다
public synchronized void method(){
}
* */