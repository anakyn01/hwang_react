class One {
    String type ="animal";
}

class Two extends One {
    String type ="dog";

    //밑에는 함수
    public void printType(){
        System.out.println(super.type);
    }
}


public class Super_9 {
    public static void main(String[] args) {
        Two myTwo = new Two();
        myTwo.printType();
    }
}

//서브클래스가 부모에 클래스 참조할때 super키워드를 사용