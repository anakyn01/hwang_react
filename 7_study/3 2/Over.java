class Base{
    int x = 3;
    
    int getX(){
        return x * 2;
    }
}

class Derivate extends Base{
    int x = 7;
    
    int getX(){
        return x * 3;
    }
}

public class Over{

    public static void main(String[] args) {
        Base a = new Derivate();
/*
객체 a: 실제 메모리에 만들어진 알맹이는 
자식(Derivate)이지만, 이를 조종하는 
리모컨(참조 타입)은 부모(Base)입니다. 
(다형성 적용)
*/        
Derivate b = new Derivate();
/*
b: 알맹이도 자식(Derivate)이고, 
리모컨도 자식(Derivate)입니다. 
(일반적인 생성)

*/
System.out.print(a.getX() + a.x + b.getX()+b.x);
/*
21 + 3 + 21 +7 => 52
*/
    }
}


/*
메서드 오버라이딩 변수은닉
메서드는 실제 생성된객체 알맹이를 따라가고
변수는 참조하는 타입 (껍데기 /리모컨)을 따라갑니다

*/