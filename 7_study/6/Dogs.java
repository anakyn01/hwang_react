/*
다형성 메서드 오버라이딩 재귀함수
껍데기는 부모지만 알맹이는 자식이다
이렇게 부모의 탈을쓰고 자식객체를 만들때
무조건 실제 생성된 자식객체 메서드 실행
=> 오버라이딩에 의한 동적 바인딩
부모클래스에 컴퓨트 코드 완전 무시 자식클래스에 있는 
컴퓨트 코드만 실행
*/


class PP{//피보나치 수열 공식
    int compute(int num){
        if(num <= 1) return num;
        return compute(num-1) + compute(num-2);
    }
}

//자식클래스 정의 밑 오버라이딩(실제 실행되는 부분)
class Child extends PP{
    int compute(int num){
        //부모와 또같은 이름의 매서드를 재정의(오버라이딩)
        if(num <= 1) return num;
        //num이 1이하면 자기자신(num)을 그대로 반환 (종료조건)
        return compute(num-1) + compute(num-3);
        //재귀 호출(n-1과 n-3을 더함)
    }
}



public class Dogs {
    public static void main(String[] args) {
        PP obj = new Child();
        System.out.print(obj.compute(7));
        /*
단 n < 1 n을 반환
1번 0번 -번 같이 1이하의 숫자들은 
계산할 필요없이 자기 숫자가 곧 점수

        c(2) = 1 + -1 = 0
        c(3) = 2 + 0
        c(4) = 3 + 1
        c(5) = 4 + 2
        c(6) = 5 + 3
        c(7) = 6 + 4
        */
    }
}
