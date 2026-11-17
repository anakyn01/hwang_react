package advanced;

//Student객체를 동등비교하기위해 hashcode()와 equals()재정의
public class Student {
	
	private int no;
	private String name;
	
	/*생성자
	자바에서 생성자(Constructor)를 만드는 가장 근본적인 이유는 
	바로 "객체가 태어날 때(생성될 때)
	정상적인 상태를 갖추도록 강제하기 위해서(초기화)"입니다.
	1.객체의 무결성 보장 (필수 데이터 강제)
	2. 코드의 간결성과 가독성 향상
	3. 상황에 따른 다양한 생성 방식 제공 (오버로딩)
	 */
	public Student(int no, String name) {
		this.no = no;
		this.name = name;
	}
	
	//getter
	public int getNo() {return no;}
	public String getName() {return name;}
	
	//학생번호와 이름해시코드를 합한 새로운 해시코드 리턴
	//번호와 이름이 같으면 동일한 해시코드가 생성되..
	@Override
	public int hashCode() {
		int hashCode = no + name.hashCode();
		return hashCode;
	}
	
	//equals재정의 Student객체인지를 호가인하고 학생번호와 이름이 같으면 true를 리턴
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Student target) {
			if(no == target.getNo() && name.equals(target.getName())) {
				return true;
			}
		}
		return false;
	}
	

}
