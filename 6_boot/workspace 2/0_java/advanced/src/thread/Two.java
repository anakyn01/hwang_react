package thread;

import java.awt.*;

public class Two {
    public static void main(String[] args) {
        Thread thread = new Thread(){
            @Override
            public void run(){
                Toolkit toolkit = Toolkit.getDefaultToolkit();
                for(int i=0; i<5; i++){
                    toolkit.beep();
                    try{Thread.sleep(500);}catch(Exception e){}
                }

            }
        };
        thread.start();
        for(int i=0; i<5; i++){
            System.out.println("띵");
            try{Thread.sleep(500);}catch(Exception e){}
        }
    }
}
/*
 Thread자식 클래스로 생성
 작업 스레드 객체를 생성하는 또다른 방법
 Thread자식 객체로 만드는 것
 1)Thread 상속
 2)run메소드 재정의
 3)스레드가 실행할 코드를 작성
 4)객체를 생성
* */