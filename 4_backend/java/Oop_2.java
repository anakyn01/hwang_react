public class Oop_2 { 

    int x = 5;//클래스안에 숫자형변수 x
    int y = 1000;//이런것들을 속성이라고 합니다

    public static void main(String[] args) {

 //그래서 위에 것을 객체화 하려면..자바에서는 클래스명과 동일하게 대입시켜야 함
    Oop_2 myObj = new Oop_2();
    //클래스명 객체명 = new 키워드 클래스명에함수표시
    myObj.x = 3000; //이러면 프로그래밍에 혼란이 옴..
    //final을 변수앞에 붙이면..변수속성값을 바꿀수 없다

    String oop = "oop는 객체지향 프로그래밍에 약자 입니다\n"+
    "객체지향프로그래밍은 절차적 프로그래래밍에 비해 여러 장점이 있습니다\n"+
    "객체지향 프로그래밍은 실행 속도가 더 빠르다\n"+
    "DRY 원칙을 지키는데 도움을 주며 코드의 유지보수 및 디버깅을 쉽게 만듭니다\n"+
    "더적은 코드와 더 짧은 개발로 완전히 재사용 가능한 어플리케이션을 만듭니다\n";

        System.out.println(oop);

        //객체화시키고 출력하는 방법
        System.out.println(myObj.x);
        System.out.println(myObj.y);
    }
    
}
