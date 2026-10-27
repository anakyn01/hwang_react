package advanced;

import java.util.HashSet;
//동등객체를 중복저장하지 않는 특징이 있음 불러온건 중복저장이 되는지 아닌지 확인
public class Hash {

	public static void main(String[] args) {
		
		HashSet hashSet= new HashSet();//해시셋 컬렉션 생성
		
		Student s1 = new Student(1, "홍길동");
		hashSet.add(s1); //해시셋에 저장
		System.out.println("저장된 객체 수: " + hashSet.size());
		
		Student s2 = new Student(1, "홍길동");
		hashSet.add(s2); //해시셋에 저장
		System.out.println("저장된 객체 수: " + hashSet.size());
		
		Student s3 = new Student(2, "홍길동");
		hashSet.add(s3); //해시셋에 저장
		System.out.println("저장된 객체 수: " + hashSet.size());
		
		if(s1.hashCode() == s2.hashCode()) {
			if(s1.equals(s2)) {
				System.out.println("동등 객체 입니다");
			}else {
				System.out.println("데이터가 다르므로 동등 객체가 아닙니다");
			}
		}else {
			System.out.println("해시코드가 다르므로 동등 객체가 아닙니다");
		}

	}

}
/*
객체 해시코드 : 객체를 식별하는 정수를 말합니다
hashCode() 객체의 메모리 번지를 이용하여 해시코드를 생성하기때문에
객체마다 다른 정수값을 리턴합니다
메소드의 용도는 equals()메소드와 비슷한데 두 객체가 동등한지를 
비교할때 주로 사용합니다
*/
