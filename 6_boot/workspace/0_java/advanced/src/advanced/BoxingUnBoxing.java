package advanced;

public class BoxingUnBoxing {
	//포장객체는 값을 변경할수 없고 단지 객체로 생성하는것에 목적
	public static void main(String[] args) {
/*래퍼클래스는 문자열을 기본 타입 값으로 변환할때도 사용
박싱은 내부값을 비교하기 위해  ==와 !=연산자를 사용못함
이연산은 내부의 값을 비교하는것이 아니라 포장 객체의 번지를 
비교
 * */
		
		
		Integer ob1 = 300;
		Integer ob2 = 300;
		System.out.println("==: " + (ob1 == ob2));
		System.out.println("equals(): " + ob1.equals(ob2));
		//Boxing
		Integer obj = 100;
		System.out.println("value: " + obj.intValue());
		System.out.println("value: " + obj + 100);
		
		//Unboxing
		int value = obj;
		System.out.println("value: " + value);
		
		//연산시 언박싱
		int result = obj + 100;
		System.out.println("result: " + result);
		
		
		
	}

}
