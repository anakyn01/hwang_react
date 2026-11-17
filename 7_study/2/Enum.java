enum Tri{//열거형 
    //A,B,C 객체가 순서대로 3개
    A("A"), B("AB"), C("ABC");

    private String code;

    Tri(String code){
        this.code = code;
    }

    public String code(){
        return code;
    }
}


public class Enum {
    
    public static void main(String[] args) {
        Tri t = Tri.values()[Tri.A.name().length()];
        /*
        name() enum객체의 이름 그자체를 문자열로 반환
        괄호안의 code값인 "A"를 가져온것이 아니라
        객체 이름인 A를 자져온것 입니다
        1
        Tri.values()[1]
        */
        System.out.print(t.code()); //AB
    }
}
