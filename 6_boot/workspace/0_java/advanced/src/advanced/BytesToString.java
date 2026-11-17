package advanced;

import java.util.Arrays;
import java.util.StringTokenizer;

public class BytesToString {
	public static void main(String[] args) throws Exception{
		String data3 = "홍길동&이수홍,박연수";
		String[] arr = data3.split("&|,");
		for(String token:arr) {
			System.out.println(token);
		}
		System.out.println();
		
		String data4 = "홍길동/이수홍/박연수";
		StringTokenizer st = new StringTokenizer(data4, "/");
		while(st.hasMoreTokens()) {
			String token =st.nextToken();
			System.out.println(token);
		}
		
		
		
		
		String data2 = new StringBuilder()
.append("DEF").insert(0, "ABC").delete(3, 4).toString();
		System.out.println(data2);
		
		
		
		String data = "자바";
		
		//STring -> byte
		byte[] arr1 = data.getBytes();
		System.out.println("arr1: " + Arrays.toString(arr1));
		
		//byte배열에서 -> String
		String str1 = new String(arr1);
		System.out.println("str1: " + str1);
		
		//String -> byte배열(EUC-KR인코딩)
		byte[] arr2 = data.getBytes("EUC-KR");
		System.out.println("arr2: " + Arrays.toString(arr2));
		
		//byte배열 -> String(EUC-KR)
		String str2 = new String(arr2, "EUC-KR");
		System.out.println("str2: " + str2);
		
		
	}

}
/*
String : 문자열을 저장하고 조작할때 사용
StringBuilder : 효율적인 문자열 조작 기능이 필요할때
StringTokenizer : 구분자로 연결된 문자열을 분리할때 사용
문자열 리터럴은 자동으로 String객체로 생성되지만
String클래스의 다양한 생성자를 이용해서 직접 객체를 생성할수도 있다
프로그램을 개발하다 보면 byte배열을 문자열로 변환하는 경우가 종종있다
예를 들어 네트워크 통신으로 얻은 byte배열을 원래 문자열로 변환하는 경우
이때는 String생성자 중에서 아래 두가지를 사용해 String객체로 생성할수 있다
String str = new String(byte[] bytes);
String str = new String(byte[] bytes, String charsetName);








*/
