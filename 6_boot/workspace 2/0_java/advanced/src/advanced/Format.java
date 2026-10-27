package advanced;

import java.text.DecimalFormat;
import java.util.regex.Pattern;

public class Format {
	
	public static void main(String[] args) {
/*
자바는 클래스와 인터페이스의 메타정보를 class객체로 관리한다
여기서 메타정보란 패키지의 정보, 타입정보, 멤버(생성자,필드,메소드)
정보 등을 말한다
이러한 메타정보를 프로그램에서 읽고 수정하는 행위를 리플렉션이라고 
합니다
프로그램에서 class객체를 얻으려면 아래의 3가지 방법중 하나를
사용합니다
Class clazz = 클래스이름.class;
Class clazz = Class.forName("패키지..클래스이름")
Class clazz = 객체참조변수.getClass(); 객체로 부터 얻는 방법
*/
		
		
		
		
//boolean result = Pattern.matches("정규식","검증할 문자열");
		String regExp = "(02|010)-\\d{3,4}-\\d{4}";
		String data = "010-123-4567";
		boolean result = Pattern.matches(regExp, data);
		if(result) {
			System.out.println("정규식과 일치합니다");
		}else {
			System.out.println("정규식과 일치하지 않습니다");
		}
		
		regExp = "\\w+@\\w+\\.\\w+(\\.\\w+)?";
		data = "angel@mycompany.com";
		result = Pattern.matches(regExp, data);
		if(result) {
			System.out.println("정규식과 일치합니다");
		}else {
			System.out.println("정규식과 일치하지 않습니다");
		}
		
		double num = 1234567.89;
		
		DecimalFormat df;
		//숫자를 형식화된 문자열로 변환
		df = new DecimalFormat("#,###");
		System.out.println(df.format(num));
		
		df = new DecimalFormat("#,###.0");
		System.out.println(df.format(num));
	}

}
/*
정규 표현식
[abc] a,b,c중 하나의 문자
[^abc] a,b,c 이외의 하나의 문자
[a-zA-Z] a~z,A~Z중 하나의 문자
\d 한개의  수자[0-9]와 동일
\s 공백
\w 한개의 알파벳 또는 한 개의 숫자[a-zA-Z_0-9]와 동일
\. .
. 모든 문자중 한개의 문자
? 없음 또는 한개
+ 한개이상
{n} 정확히 n개
{n.} 최소한 n개
{n.m} n부터 m개 까지
a | b a또는b
() 그룹핑






*/
