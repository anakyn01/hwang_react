public class Equals{

    static String[] s = new String[3];
/*
클래스 어디서든 쓸 수 있는(static) 크기가 3인 
문자열 배열 s를 만듭니다.
처음에는 [null,null,null]
*/
static void func(String[]s, int size){
   for(int i=1; i<size; i++){
    if(s[i-1].equals(s[i])){
        System.out.print("O");//두개 비교 OO
    }else{
        System.out.print("N");
    }
   }
   for (String m:s){//s 안에 있는 데이터를 처음부터 끝까지 하나씩 꺼내서 변수 m에 담아 반복
    System.out.print(m);
   }
}
    public static void main(String[] args) {

        s[0] = "A";/* 이 둘은 자바의 문자열상수풀이라는 
        같은 메모리 공간을 가르킴 */
        s[1] = "A";
        s[2] = new String("A");
        //new 키워드를 사용하여 기존 메모리가 아닌 새로운 메모리공간 Heap에 A를 만듬
        func(s, 3);
        /*
        자바는 기본적으로 메모리를 아주 알뜰하게 쓰고 싶어 합니다.
        그래서 힙(Heap) 메모리 영역 안에 'String Pool(문자열 상수 풀)'
        이라는 특별한 구역을 만들어 둡니다. 일종의 공공 도서관입니다.
        앞선 코드에서 s[0] = "A"; 와 s[1] = "A";를 실행했을 때 일어나는 일은 이렇습니다.
        s[0] = "A"; * 자바: "String Pool 도서관에 'A'라는 책이 있나? 없네.
        사서 도서관에 꽂아두고, s[0]에게 그 위치(주소)를 알려줘야지."
        이번에도 'A'라는 책을 달라고 하네? 아까 도서관에 꽂아둔 거랑 내용이 완전 똑같잖아? 
        굳이 돈 들여서 새 책을 살 필요 없이,
        그 책의 위치(주소)를 s[1]한테도 같이 알려
        s[0]과 s[1]은 완전히 동일한 메모리 주소(같은 책)를 함께 가리키게 됩니다.
        공공 도서관 (String Pool)

        new => 서점에서 내책사기
        "도서관에 똑같은 책이 있든 말든 상관 안 할 테니까, 
        무조건 돈(메모리)을 써서 나만의 새로운 책(객체)을 새로 찍어내!"
        메모리 빈공간에 새로운 방을 하나 만듬
        */
        
    }
}