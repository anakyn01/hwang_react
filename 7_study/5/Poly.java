class ClassOne {
    int a, b;

    public ClassOne(int a, int b){ //a=10, b=11
        this.a = a;//10을 저장
        this.b = b;//11저장
    }
    public void print(){
        System.out.println(a + b);
    }
}

class ClassTwo extends ClassOne {
    int po = 3;
    public ClassTwo(int i){//10
        super(i, i+1);//super(10, 11) 부모생성자로 점프
    }
    public void print(){
        System.out.println(po * po);
    }
}



public class Poly {
    
    public static void main(String[] args) {
        ClassOne one = new ClassTwo(10);
        /*
ClassTwo 타입에 객체를 생성하되 리모컨은 부모인 ClassOne타입인
업캐스팅 숫자 10을 들고 자식 생성자로 갑니다        
        */
        one.print();
        /*메서드가 완벽히 오버라이딩된후 껍데기 리모컨 부모타입이라도
        실제 메모리에서 만들어진 알맹이 자식객체를 최우선으로 실행
        동적바인딩
        
        */
    }
}
