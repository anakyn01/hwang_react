/*정적변수에 공유특성 후위 증가 연산자의 동작순서
정적변수 : static 키워드가 붙은 변수
객체를 여러개 만들더리도 메모리에 딱 하나만 생성
모든 객체가 값을 공유
일반인스턴스 변수 객체마다 독립적으로 메모리를 가지는 변수
*/
class Static{
    public int a = 20;//인스턴스 변수
    static int b = 0;//모든 객체가 하나의 b값을 공유
}

public class Main {
    public static void main(String[] args){
        int a; //main메서드 안 지역변수a
        a = 10; //지역변수 a에 10을 저장

        Static.b = a;
        //위에 클래스.b에 a의 값(10)을 덮어씁니다 현재 b는 10
        Static st = new Static();
        /*위에 클래스에 새로운 객체 st생성 
        여기에 인스턴스변수 a는 20으로 초기화
        */
       System.out.println(Static.b++);//전위는 즉시 후위는 그다음
       System.out.println(st.b);
       System.out.println(a);//10
       System.out.print(st.a);//20
       /*
 주의사항 후위증가연산자
 b의 현재값인 10을 먼저 화면에 출력한 다음에
 b의 값을 1증가 시켜 11로 만듬      
       */
    }
    
}
