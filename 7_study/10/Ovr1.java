/*
상속(Inheritance)'과 '메서드 오버라이딩(Overriding)', 그리고 super 키워드
*/
public class Ovr1 {
    
    public static void main(String[] args) {
        Ovr1 a1 = new Ovr1();
        //부모 클래스(ovr1)의 객체 a1을 만듭니다.
        Ovr2 a2 = new Ovr2();
        //자식 클래스(ovr2)의 객체 a2를 만듭니다.
        System.out.println(a1.sum(3,2) + a2.sum(3,2));
        /*
        a1.sum(3,2) 부모의 sum메서드 실행  = 5
        a2.sum(3,2) 3-2 = 6
        */
    }

    int sum(int x, int y) {
        //
        return x + y;
    }


}

class Ovr2 extends Ovr1 {

    //메서드 오버라이딩 (재정의)
    int sum(int x, int y) {
//super 키워드를 사용하면 오버라이딩 되기 전의 부모 메서드를 몰래 불러올 수 있습니다.
        return x -y + super.sum(x,y);
    }
}
