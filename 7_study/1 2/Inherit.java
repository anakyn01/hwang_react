class Parent{//부모 클래스

    //static 모든 객체가 공유하는 공용변수입니다
    static int total = 0;
    int v = 1; //부모클래스가 가진 인스턴스변수 v

    //부모의 생성자 (Child객체를 만들때 가장먼저 은밀히 실행)
    public Parent(){
        total += (++v);//전위전산자는 먼저 값을 1증가 시킨뒤 계산

        show(); //함수호출
    }

    //부모의 show매서드
    public void show(){
        total += total;
    }
}

//상속받은 클래스
class Child extends Parent{
    //상속을 받으면 좋은점 부모에 능력치와 나에 능력치 둘다 사용
    int v = 10;//부모클래스와 이름만 같을뿐 완전히 다른변수 초기값 10

    //자식의 생성자
    public Child(){
        v += 2; //10 +2 =12
        total += v++; //후위전산자는 현재값을 토탈에 더하고 나중에 v를 1증가
        show();
    }

    //부모의 show()를 무시하고 덮어쓴(오버라이딩)자식의 메서드
    @Override
    public void show(){
        total += total * 2;
        //18 += 18 * 2
    }


}



public class Inherit {

    public static void main(String[] args) {
        //차일드 객체를 새로 만듭니다
        new Child(); //자식객체를 만들때는 부모의 생성자부터 먼저 실행
//모든 과정이 끝난후 공용변수인 total의 최종값을 출력
System.out.println(Parent.total);

    }
    
}
/*이문제는 상속,생성자실행순서,다형성(오버라이딩)에 관련된 문제입니다
1)부모 생성자 실행 (Parent)
new Child()를 실행하면 자식을 만들기 전에 무조건 부모인
Parent의 생성자부터 들어갑니다
부모가 가진 변수 v = 1 공용변수는 total 0
v를 먼저 1증가해서 부모의 v는 2가됨
total = 2가 됨
부모생성자안에 show()얘를 만납니다

컴퓨터는 생각한다 지금 코드는 부모 생성자에 안이지만
사실 진짜 만드는 껍데기는 자식 객체잖아..그럼 부모의 show는
무시하고 덮어쓴 자식의 show()를 실행해야지..
이를 통틀어 동적 바인딩 이라고 합니다
자식의 show 내부 total += total * 2
2 + (2 * 2) 그래서 현재 토탈은 6으로 바뀜

3단계 자식생성자 실행
부모의 세팅이 끝났음 child생성자로 넘어 옵니다
v는 10 + 2 = 12
자식으로 내려온 total 6 + (6 * 2) = 18이 됩니다
18되고 난 후에
자식 생성자의 마지막 줄인 show를 만남

*/