/* 다형성 과 메서드 오버라이딩 그리고 재귀함수가 들어간문제 */

class parent{
    //부모 클래스를 정의
    public int compute(int num){
        if (num <= 1) return num;
        return compute(num -1) + compute(num -2);
        //자식클래스의 오버라이딩에 의해 아예 실행되지 않는다
    }
}
class Child extends parent{
    //parent클래스를 상속받는 자식 클래스 child정의
    public int compute(int num){
//부모의 compute 메서드를 자신의 입맛에 맞게 재정의(오버라이딩)합니다.
        if (num <= 1) return num;
        //1이하(1,0,-1등)이면 그숫자 그대로 리턴
        return compute(num -1) + compute(num -3);
        //왼쪽: compute(3) (4 - 1) + 오른쪽: compute(1) (4 - 3)
    }
}


public class Inherit {
    public static void main(String[] args) {
        parent obj = new Child();
/*[업캐스팅] 겉모양(리모컨)은 parent 타입이지만, 실제 알맹이는 Child 객체로 생성합니다.
이로 인해 obj.compute()를 호출하면 무조건 자식(Child)의 compute()가 실행됩니다.
*/       
        System.out.print(obj.compute(4));

    }
}
