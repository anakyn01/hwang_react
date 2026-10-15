//추상클래스
abstract class Ani {

    //추상메서드 본문이 없다
    public abstract void animalSound();

    //일반 메서드
    public void sleep(){
        System.out.println("Zzzz");
    }


}

//서브클래스
class Pii extends Ani {
//추상메서드 본문이 없다
    public void animalSound(){
        System.out.println("======");
    }
}


public class Abs_10 {
    public static void main(String[] args) {
        Pii myPig = new Pii();
        myPig.animalSound();
        myPig.sleep();
    }
}
/*
추상클래스 : 객체를 생성할수 없다
추상메서드 : 추상클래스에서만 사용할수 있고 본문이 없다
자바개발
아파치서브버전(메이븐,그라델)
xml-> class-> interface -> controller
*/