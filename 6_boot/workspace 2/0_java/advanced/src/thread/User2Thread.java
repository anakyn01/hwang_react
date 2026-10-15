package thread;

//예는 이제부터 혼자 일하는 작업자야
public class User2Thread extends Thread{

    //이 직원이 일할때 사용할 계산기를 놓을 개인책상(변수)를 준비
    private Calculator calculator;

    //직업이 처음 채용될때(객체가 만들어 질때) 가장 먼저 실행되는 준비과정(생성자)
    public User2Thread(){//스레드 이름 변경
        setName("User2Thread");
        //누가 지금 계산기를 쓰고 잇지 확인할때 이 이름이 출력
    }

    //외부에서 공유객체인 Calculator를 받아서 필드에 저장
    public void setCalculator(Calculator calculator){

        this.calculator = calculator;
    }

    @Override //원래 스ㅔ드가 하던 기본행동 말고 내가 지금 부터 새로지시할께..
    public void run(){
        calculator.setMemory2(50);//동기화 메소드 호출
    }
}
