package generic;

public class GerericExam {

	public static void main(String[] args) {
		
		Product<Tv, String> product1 = new Product<>();
/*
Product 라는 객체를 생성 하는데
이객체가 다룰 타입을 <Tv, String>으로 미리 정해줍니다
첫번째 데이터는 tv객체만 
두번째 데이터는 String(문자열만 받겠다고 선언)
왜 이렇게 할까?:
타입을 콕 집어 정해두면, 나중에 실수로 Car 객체나 Integer 숫자를 넣으려고 할 때 
자바 컴파일러가 에러를 띄워 실수를 미리 막아주기 때문
타입 안정성
*/
//setKind 메서드를 통해 product1의 종류로 새로운 Tv 객체를 생성해서 넣습니다.		
		product1.setKind(new Tv());
//setModel 메서드를 통해 모델명으로 "스마트Tv"라는 문자열을 넣습니다.
		
		product1.setModel("스마트Tv");

		//기존 만들어 놓은 세팅값을 tv tvModel 이라는 변수에 담습니다
		//장점 형변환을 생략할수 있습니다
		Tv tv = product1.getKind();
		String tvModel = product1.getModel();
		
		/*코드를 재사용하는 Product 객체 (Car)
		똑같은 Product 클래스를 사용하지만, 
		다룰 타입을 <Car, String>으로 지정합니다.
		왜 이렇게 할까?
		Product 클래스를 Tv용, Car용으로 따로 두 개 만들 필요가 없고
		틀(클래스)은 하나만 만들어 두고, 
		쓸 때마다 원하는 타입을 끼워 맞춰 코드를 재사용
		*/
		Product<Car, String> product2 = new Product<>();
		
		product2.setKind(new Car());
		product2.setModel("SUV자동차");
		
		Car car = product2.getKind();
		String carModel = product2.getModel();

		/*왜 제네릭을 사용하는거임?
타입 안정성 보장 : 의도하지 않은 타입의 데이터가 들어가는것을 실행전에 차단
번거로운 형변환 제거 : 데이터를 꺼낼때 매번 원래 타입으로 바꿔주는 작업을 생략할수 있다
뛰어난 재사용성 :  클래스를 하나만 잘 설계해 두면 
(Product, Box), 사용할 때 타입을 <Tv>, <Car>, <String>, <Integer> 
등 자유자재로 바꾸어 재사용할 수 있습니다.
		 * */
		
		
		
		// 아까 만들었는 박스 클래스 사용
		Box<String> box1 = new Box<>();
		box1.content = "안녕하세요";
		String str = box1.content;
		System.out.println(str);
		
		Box<Integer> box2 = new Box<>();
		box2.content = 100;
		int value = box2.content;
		System.out.println(value);

	}

}
