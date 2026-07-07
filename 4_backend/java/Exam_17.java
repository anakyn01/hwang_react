//인터페이스 설계(계약서 작성)
interface Machine{
    void run();
    /*
    메소드의 이름과 반환 타입만 있고 중괄호{}감싸진
    실제내용(로직)이 없다 이를 추상메소드(Abstract Method)라고
    부른다
    */
}
public class Exam_17 implements Machine{
    //저는 기계인터페이스 규칙에 따르겠습니다
    //필드(name)
    private String name;

    //생성자
    public Exam_17(){
        this.name = "LG";
    }

    //이부분이 핵심 Machine 인터페이스와 계약을 했기에 껍데기만 있는 메서드의 실제 작동조건을 적어줘야 합니다
    //이메서드를 작성하지 않으면 빨간줄을 뛰우며...계약위반 오버라이딩
    public void run(){
        System.out.println("running");
    }

    //메인 메서드 실행
    public static void main(String[] args) {
        Exam_17 wm = new Exam_17();
        wm.run();
    }
    
}
