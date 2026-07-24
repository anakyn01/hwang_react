package thread;

public class Name {
    public static void main(String[] args) {
        Thread mainThread = Thread.currentThread();
        System.out.println(mainThread.getName() + " 실행");

        for(int i=0; i<3; i++){
            Thread threadA = new Thread(){
                @Override
                public void run(){
                    System.out.println(getName() +" 실행");
                }
            };
            threadA.start();
        }

        Thread chatThread = new Thread(){
            @Override
            public void run(){
                System.out.println(getName() + " 실행");
            }
        };
         chatThread.setName("chat-thread");
         chatThread.start();

    }
}
/*
스레드느 자신이 이름을 가지고 있다 main
작업스레드는 자동적으로
Thread-n이라는 이름을 가진다
작업 스레드의 이름을 Thread-n대신
다른 이름으로 설정하고 싶다면..
setName()메소드를 사용
* */