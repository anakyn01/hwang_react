public class OopMethod_3 {

    //c와 마찬가지 void 리턴값이 없다
    public void fullThrottle() {
        System.out.println("자동차는 빠르게 달릴수 있다");
    }
    //밑에도 함수 void
    public void speed(int maxSpeed){
        System.out.println("최고 속도는 "+ maxSpeed);
    }

    public static void main(String[] hyi) {
        OopMethod_3 myCar = new OopMethod_3();
        //myCar라는 객체 설정
        myCar.fullThrottle();
        myCar.speed(200);
    }
    
}
