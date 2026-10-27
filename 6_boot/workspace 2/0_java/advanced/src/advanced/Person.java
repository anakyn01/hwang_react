package advanced;

/*
클래스를 선언할때 class대신에 record키워드를 사용하여
괄호안에 상태(필드)만 나열
레코드(Record)의 핵심 특징 요약
완벽한 불변성(Immutable):모든 필드는 내부적으로 
private final로 선언됩니다.값을 변경하는 
Setter가 존재하지 않아 
한 번 생성된 데이터는 안전하게 유지됩니다.

보일러플레이트 코드 제거:롬복(Lombok)의 
@Value나 @Data 어노테이션을 쓰지 않아도 순수 자바 
문법만으로 코드가 매우 간결해집니다.

상속 불가:레코드는 내부적으로 java.lang.Record를 
상속받기 때문에 다른 클래스를 상속(extends)할 수 없습니다. 
대신 인터페이스 구현(implements)은 얼마든지 가능합니다.
*/
public record Person (
String employeeId,		
String name,
int age,
String departmentCode
){
public Person{//선택사항이 필요한경우 데이터 검증로직 표현
if(age<0) {
throw new IllegalArgumentException("나이는 0보다 작을수 없습니다");	
}
}
}
