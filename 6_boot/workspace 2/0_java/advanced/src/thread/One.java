package thread;

import java.awt.Toolkit;

public class One {

	public static void main(String[] args) {

		Thread thread = new Thread(new Runnable(){
			@Override
			public void run(){
				Toolkit toolkit = Toolkit.getDefaultToolkit();
				for(int i=0; i<5; i++){
					toolkit.beep();
					try{ Thread.sleep(500);}catch(Exception e){}
				}
			}
		});
		thread.start();
		for(int i=0; i<5; i++){
			System.out.println("띵");
			try{ Thread.sleep(500);}catch(Exception e){}
		}

	}

}
/*
java.lang 패키지에 있는 Thread클래스로 부터 작업 스레드 객체 직접 생성
Runnabel 구현객체를 매개값으로 갖는 생성자를 호출
1)  Thread thread = new Thread(Runnable target);

Runnable은 스레드가 작업을 실행할때 사용하는 인터페이스
Runnable에는 run()메소드가 정의됨..
구현클래스는 run()을 재정의해서
스레드가 실행할 코드를 가지고 있어야 됩니다

2)
class Task implements Runnable{
	@Override
	public void run(){
	//스레드가 실행할 코드
	}
}

Runnable구현 클래스는 작업 내용을 정의한 것으로
스레드에 전달을 해야한다
Runnable구현객체를 생성한후
Thread생성자 매개값으로 Runnable객체를 아래와 같이 전달한다..
Runnable task = new Task();
Thread thread = new Thread(task);

3)이게 좀더 권장하는 방법
Thread thread = new Thread(new Runnable(){
@Override
public void run(){
//스레드 실행할 코드
}
});

4)함수 호출하듯이 스레드 실행
thread.start();

* */
