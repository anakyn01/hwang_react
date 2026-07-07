import java.util.Arrays;
/*자바 내장형 array는 정해진것 최적 고정형이 
아닌걸 자바유틸 어레이로 */
enum OrderStatus {//자바에서 공공의 public은 한 번만 나와야 함 enum사용일때는파일명과 일치해됨
    //1.상수정의
PAYMENT_WAITING("결제 대기", true),
PREPARING("상품준비중", true),
 SHIPPED("배송중", false),
 DELIVERED("배송완료", false),
 CANCELED("주문취소",  false);

    //2.필드정의
    private final String description; //화면에 노출될 설명
    private final boolean cancellable;//취소 가능여부

    //3.생성자(enum에서의 생성자는 private)
    OrderStatus(String description, boolean cancellable){
        this.description = description;
        this.cancellable = cancellable;
    }
    //4.getter메서드
    public String getDescription(){
        return description;
    }
    public boolean isCancellable(){
        return cancellable;
    }

    //5.실무활용로직
    public static OrderStatus from(String name){
        /*정적팩토리 메서드(static)객체를 생성하거나 반환할때 사용하는 패턴
        하나의 매개변수를 받아서 해당 타입의 인스턴스를 반환할때(실사용 객체)
        실무에서 관례적으로 from 이나 of라는 메서드 이름을 사용
        */
        return Arrays.stream(OrderStatus.values())
/*이배열을 자바 스크림으로 변환 => for반복문을 사용하지 않고 데이터를 함수형으로 깔끔하게 처리하기 위한 시작점
OrderStatus.values() 모든 상수를 배열로 반환
*/
        .filter(status -> status.name().equalsIgnoreCase(name))
        /*
status.name enum상수의 원래 이름  (예:"DELiVERED")   
외부 API나 프론트엔드에서  대소문자를 섞어서 보내더라도
무시하고 일치하는지 검사   
        
        */
        .findFirst()//필터링 조건에 맞는 첫번째 요소를 찾습니다
        //위에걸로 찾은값이 없으면 완전 엉뚱한 값이 들어온다면 명확하게 무엇이 잘못됬는지 메세지를 남김
        .orElseThrow(() -> new IllegalArgumentException("알수 없는 주문 상태입니더"));
    }

}


public class Enum_13 {//enum을 끌어다 사용하는 클래스는..문기만 한다

public void cancelOrder(OrderStatus currentStatus) {
   if(currentStatus.isCancellable()){
        System.out.println("주문이 정상적으로 취소 되었습니다");
   }else{
        System.out.println("취소불가 현재상태 [" + currentStatus.getDescription()+"]입니다");
   }
}


    public static void main(String[] args) {

        //객체선언
        Enum_13 service = new Enum_13();

        //상황1 : 상품 준비중일때 취소 시도
        OrderStatus status1 = OrderStatus.PREPARING;
        service.cancelOrder(status1);
        //출력 주문이 정상적으로 취소되었습니다

        //상황2 : 배송중일때 취소 시도
        OrderStatus status2 = OrderStatus.SHIPPED;
        service.cancelOrder(status2);
        //출력 주문이 정상적으로 취소되었습니다

        //상황3 : 외부API에서 "DELIVERED"라는 문자열을 받았을때의 안전한 변환
        OrderStatus apiStatus = OrderStatus.from("DELIVERED");
        System.out.println("API 상태 변환결과: " + apiStatus.getDescription());
        //출력 주문이 정상적으로 취소되었습니다

        
        String  enumeration  = "열거형 " +
        "서로 관련된 상수들의 집합을 정의할때 사용하는 자료형\n"+
        "c나 c++ 의 enum 단순히 정수 값에 이름을 붙인것이라면"+
        "자바의 enum은 완전한 기능을 갖춘 클래스 입니다"+
        "자바 enum의 특징 "+
        "타입 안정성 보장 : 컴파일 타임에 타입을 체크 예상치 못한값이 들어오는걸 원천차단"+
        "데이터와 로직의 결합 : 상수 자체가 객체이기 때문에 내부에 필드(변수)와 메서드를 가짐"+
        "리팩토링과 유지보수에 용이 : 상태 코드가 추가되거나 변경될때 enum클래스 하나만 수정하면"+
        "관련된 로직이 모두 안전하게 반영됩니다"
        ;
    }
    
}
