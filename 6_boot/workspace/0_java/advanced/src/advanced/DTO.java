package advanced;

public class DTO {

	public static void main(String[] args) {
		
	Person person = new Person(
		"emp20260709","황영일",49,"dev01"	
			);
	
	//데이터접근
	System.out.println("사원 번호: " + person.employeeId());
	System.out.println("사원 이름: " + person.name());
	
	System.out.println(person);//toString() 자동 구현 확인
	
	Person pp = new Person(
		"emp2027","황장군",51,"dev02"	
			);
		
	//
	System.out.println("두 객체의 값이 같은가?: " + person.equals(pp));
		
	Person ppp = new Person(
			"emp20260709","황영일",49,"dev01"	
				);	
		
	System.out.println("두 객체의 값이 같은가?: " + person.equals(ppp));	
		
		
		String spring = "핵심실무"+
	"Entity : 데이터베이스 테이블과 1:1로 매핑 클래스 자동 db만들기"+
    "JPA : java Persistence API"+
	"DTO : Data Transfer Object 데이터전송객체 계층간에 데이터를 주고받음"+
    "VO : Value Object 값객체 불변성을 가짐"+
	" 자바에서 반복되는 코드를 줄이기 위해 14버전에서 레코드 도입";

	}

}
