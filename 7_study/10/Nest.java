public class Nest {

    public static void main(String[] args) {
        int a =3, b=4, c=3, d=5;

        if((a == 2 | a == c) & !(c > d) & (1 == b ^ c != d)){
            a = b + c;
            /*[두 번째 조건문(내부) 검사]
            1.(7==b) ->  7 == 4
            2.(c!=a) -> 3 != 7 
            3. false ^ true
            */
           if(7 == b ^ c != a){
            System.out.println(a);
           }else{
            System.out.println(b);
           }

        }else{
            a = c + d;
            if(7 == c ^ d != a){
                System.out.println(a);
            } else{
                System.out.println(d);
            }
        }
        /*
        | (or) : 양쪽 중 하나라도 참(true)이면 참
        & (AND) : 양쪽이 모두 참(true)이어야 참
        ! (NOT) : 참/거짓을 반대로 뒤집음 (!false = true)
        ^ (XOR, 배타적 논리합) : 
        양쪽의 결과가 서로 다를 때만 참(true). 
        (예: true ^ false = true, true ^ true = false)
        */
    }
    
}
