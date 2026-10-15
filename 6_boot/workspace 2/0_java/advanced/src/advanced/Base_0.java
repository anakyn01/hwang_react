package advanced;

class Member {
	public String id;
	//생성자
	public Member(String id) {
		this.id = id;
	}
	
	@Override//Object의 equals()메소드 재정의
	public boolean equals(Object obj) {
		if(obj instanceof Member target) {
			//obj가 Member타입인지 검사하고 타입변환후 target변수에 대입
			if(id.equals(target.id)) {//id문자열이 같은지 비교
				return true;
			}
			
		}
		return false;
		
	}
}



public class Base_0 {

	public static void main(String[] args) {
		
		Member obj1 = new Member("blue");
		Member obj2 = new Member("blue");
		Member obj3 = new Member("red");
		
		if(obj1.equals(obj2)) {
			System.out.println("obj1과 obj2는 동등합니다");
		}else {
			System.out.println("obj1과 obj2는 동등하지 않습니다");
		}
		
		if(obj1.equals(obj3)) {
			System.out.println("obj1과 obj3는 동등합니다");
		}else {
			System.out.println("obj1과 obj3는 동등하지 않습니다");
		}
		
		
String obj = "클래스를 선언할때 extends키워드로 다른 클래스를 상속하지 않으면"+
	"암시적으로 java.Object클래스를 상속하게 된다"+
	"따라서 자바의 모든 클래스는 Object의 자식이거나 자손이다"+
	"Object의 equals()메소드는 객체의 번지를 비교하고 boolean값을 리턴합니다";		
		
String base = "java.base"+
	"모듈중 유일하게 import를 하지 않아도 사용합니다\n"+
		"java.lang:언어의 기본 클래스 제공\n"+
	"java.util:자료구조와 관련된 컬렉션\n"+
		"java.text:날짜 및 숫자를 원하는 형태의 문자열로 만드는 포켓 클래스\\n"+
	"java.time:날짜 및 시간을 조작하거나 연산하는 클래스 제공\\n"+
		"java.io:입출력 스트림 클래스 제공\\n"+
	"java.net:네트워크통시노가 관련된 클래스 제공\\n"+
		"java.nio:데이터 저장으 ㄹ위한 Buffer및 새로운 입출력 클래스를 제공\\n"+
	"java.lang 자바언어의 기본적인 클래스를 담고있는 패키지로 이패키지에 있는"+
		"클래스와 인터페이스는 import없이 사용가능합니다";

	}

}
