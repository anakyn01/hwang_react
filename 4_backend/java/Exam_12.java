//아래에 문제는 오버로딩과 오버라이딩이 동시에 나오는 문제입니다
class A{
    String f(Object x) {//f라는 메소드를 만듭니다
        //매개변수는 object[모든 객체를 받는다]
        return "1";//호출되면 1을 리턴함
    }
    String g(){//g라는 메소드를 만든다
        return f("a");//컴파일 할때는 f를 호출하는것으로 결정
    }
}

class B extends A {//클래스 B는 A로 부터 상속받음
    String f(Object x) {// a의 f(object를 다시만듬 오버라이딩)
        return "2";//호출되면 2를 리턴
    }
    String f(String x){
        return "3";//호출되면 3을 리턴
    }
}



public class Exam_12 {//프로그램시작 클래스 
    public static void main(String[] args){
        A a = new B();
        //객체를 만드는데 큰 A클래스를 객체명 소문자a 실제 객체는 B
        //but그러나 변수 타입은 a
        System.out.println(a.g());
        /*
        b에는 g가 존재하지 않는다
        그래서 a의 g를 사용한다
        a의 g는 컴파일 할때 f(Object)밖에 없다
        그래서 f(Object)를 호출하기로 결정하지만
        실제 객체는 new B()
        그래서 실행할때는 B의 f(Object x)
     가 호출
     그래서 정답은 2   
*/
    }
}
