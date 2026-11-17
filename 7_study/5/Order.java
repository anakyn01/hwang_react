class Parent {
    int x, y;

    Parent(int x, int y) { //(1)
        this.x = x; //4를 저장
        this.y = y; //3을 저장
    }

    int getT() { //(2)
        return x * y;
    }
}

class Child extends Parent{
    int x;
    Child (int x) {//(3)
        //x에 3이 들어옵니다
        super(x+1, x); //super(4,3)을 호출합니다
        this.x=x;
    }
    int getT(int n){//(4)
        return super.getT() + n;
    }
}



public class Order {
    public static void main(String[] args) {//(5)
        Parent parent = new Child(3); //(6)
/*
Child 클래스의 객체를 만들되 그것을 바라보는 리모컨
타입은 Parent로 하겠다는 뜻 
이를 업캐스팅(Upcasting)
숫자 3을 들고 child의 생성자로 이동
*/        
        System.out.println(parent.getT()); //(7)
    }
    
}
/*
5 jvm이 실해되면 가장 먼저 차는곳이 main 메서드

6 객체생성 명령 

3 자식 생성자 진입과 부모호출 제어건이 차일드 생성자로 
넘어 왔지만 자식이 태어나려면 반드시 부모가 먼저 존재해야 한다는 규칙
따라서 자식의 변수 this.x = x를 세팅하기전에
맨 윗줄에 있는 super(x+1, x)를 만나 제어권을 강제로
부모 생성자인 1번으로 토스 이를 생성자 체이닝이라 합니다

1 부모 생성자 실행 및 완성
부모의 뼈대를  완성 하고 자식객체 생성 마무리

7 메서드 호출 명령 

2 오버로딩에 위한 부모 메서드 선택
결국 괄호가 비어있는 원본 메서드를 차아 부모 영역에 있는
2번을 실행 4 * 3 12라는 결과가 반환되고 프로그램이 종료
*/