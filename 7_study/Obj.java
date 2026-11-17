class A{
    //[메서드 1] 모든 객체(Object)를 받을 수 있는 f 메서드입니다.
    String f(Object x){
        return "1";
    }
    //[메서드2] 문자열 "a"를 f 메서드에 집어넣는 g 메서드
    String g(){
        return f("a");
    }
    /*
    핵심 포인트 자바번역기 는 클래스 A만 보고 판단합니다
    무조건 매개변수로 Object를 받는 f를 실행해라라고 ..
    */
}

class B extends A{
    String f(Object x){
        return "2";
    }
    String f(String x){//이따가 탈락될 아이
        return "3";
    }
}


public class Obj {
    public static void main(String[] args) {
//겉보기(리모컨)는 A 클래스이지만, 실제 생성된 알맹이는 B 객체입니다.
        A a = new B();
        System.out.println(a.g());
    }
}
