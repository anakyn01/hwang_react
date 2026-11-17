package advanced;

public class ToString {

	/*Object의 toString()메소드는 객체의 문자정보를 리턴
	객체의 문자정보란 객체를 문자열로 표현한값
	
	 * */
	public static void main(String[] args) {
		
		SmartPhone myPhone = new SmartPhone("아이폰","ios");
		
		String strObj = myPhone.toString(); //toString()메소드 호출
		System.out.println(strObj);
		System.out.println(myPhone);
	}

}
