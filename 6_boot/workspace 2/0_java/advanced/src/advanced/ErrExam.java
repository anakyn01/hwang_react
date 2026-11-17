package advanced;

import java.io.IOException;

/*
- 필드 [클래스 내부에 선언된 변수 {데이터,상태,속성을 저장하는 공간}]-
out : 콘솔 모니터에 문자 출력
err : 콘솔 모니터에 에러 내용 출력
in : 키보드 입력
- 메소드 -
exit(int status) : 프로세스 종료
currentTimeMillis : 현재 시간을 밀리초 단위의 long값으로 리턴
nanoTime : 현재시간을 나노초 단위의 long값으로 리턴
getProperty : 운영체제와 사용자 정보제공
getenv : 운영체제의 환경변수 정보 제공
*/

public class ErrExam {

	public static void main(String[] args) throws IOException{
		long time1 = System.nanoTime();
		int sum = 0;
		for(int i=1; i <=1000000; i++ ) {
			sum += i;
		}
		long time2 = System.nanoTime();
		
		System.out.println("1~100000까지의 합: " + sum);
		System.out.println("계산에 "+(time2-time1)+" 나노초가 소요 되었습니다");
		
		
		
		
		
		//java는 in필드로 read()메소드를 호출하면 입력된 키의 코드값을 얻는다
		int speed = 0;
		int keyCode = 0;
		
		while(true) {//enter키를 읽지 않았을 경우에만 실행
			if(keyCode != 13 && keyCode != 10) {
				if (keyCode == 49) {//숫자 1키를 읽었을 경우
					speed++;
				} else if (keyCode == 50) {
					speed--;
				} else if (keyCode == 51) {
					break;
				}
				System.out.println("-----------------");
				System.out.println("1.증속 | 2.감속 | 3.중지");
				System.out.println("-----------------");
				System.out.println("현재속도=" + speed);
				System.out.print("선택: ");
			}
			keyCode = System.in.read();
		}
		System.out.println("프로그램종료");
		
		try {
			int value = Integer.parseInt("1oo");
		}catch(NumberFormatException e) {
			System.err.println("[에러 내용]");
			System.err.println(e.getMessage());
		}
		
		String systemClass = "System 클래스"+
		"자바 프로그램은 운영체제상에서 바로실행되는것이 아니라"+
		"자바 가상 머신(jvm)위에서 실행된다"+
		"따라서 운영체제의 모든 기능을 자바코드로 직접 접근하기가 어렵다"+
		"하지만 java.lang패키지에 속하는 System클래스를 이용하면 "+
		"운영체제의 일부 기능을 이용한다"+
		"이클래스의 정적 static필드와 메소드를 이용하면 프로그램 종료"+
		"키보드 입력"+
		"콘솔 모니터"+
		"출력"+
		"현재시간 읽기 시스템프로퍼티 읽기등이 가능";
	}
}
