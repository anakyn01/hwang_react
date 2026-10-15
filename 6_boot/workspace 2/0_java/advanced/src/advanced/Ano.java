package advanced;

import java.lang.reflect.*;
/*
코드에서 @로 작성되는 요소를 어노테이션이라고 합니다
클래스 또는 인터페이스를 커파일하거나 실행할때 
어떻게 처리해야 할것인지를 알려주는 설정정보 입니다

1)컴파일시 사용하는 정보전달 대표적인 예는 @Override
2)빌드툴이 코드를 자동으로 생성할때 사용하는 정보전달
3)실행시 특정기능을 처리할때 사용되는 정보전달

어노테이션 적용대상
TYPE : 클래스,인터페이스,열거타입
ANNOTATION_TYPE : 어노테이션
FIELD : 필드
CONSTRUCTOR : 생성자
METHOD : 메소드
LOCAL_VARIABLE : 로컬변수
PACKAGE : 패키지

*/
public class Ano {
	@PrintAnnotation
	public void method1() {
		System.out.println("실행내용1");
	}
	
	@PrintAnnotation("*")
	public void method2() {
		System.out.println("실행내용2");
	}
	
	@PrintAnnotation(value="#", number=20)
	public void method3() {
		System.out.println("실행내용3");
	}

	public static void main(String[] args) {
	Method[] declaredMethods = Ano.class.getDeclaredMethods();
		for(Method method : declaredMethods) {
			PrintAnnotation printAnnotation = method.getAnnotation(PrintAnnotation.class);
			
			printLine(printAnnotation);
			try {
				//메소드 호출
				method.invoke(new Ano());
			}catch(Exception e) {
				System.out.println("메소드 호출중 에러 발생");
			}
			
			printLine(printAnnotation);
		}

	}
	
	public static void printLine(PrintAnnotation printAnnotation) {
		if(printAnnotation != null) {
			int number = printAnnotation.number();
			for(int i=0; i<number; i++) {
				String value = printAnnotation.value();
				System.out.print(value);
			}
			System.out.println();
		}
	}

}
