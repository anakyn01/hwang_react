/*자바는 8이전과 이후로 나뉜다
java,util.Date and Calendar는 치명적인 설계에 결함
월이 0부터 시작함
불변객체가 아님(Mutabale) 생성된 날짜 객체의 값을
setter로 바꿀수 있다..
명확하지 않은 이름 Date라고 하지만 실제로는 시간까지 포함
그래서 자바에서는..
java.time 도입
이패키지의 핵심뼈대가  Temporal인터페이스
구현체들 실무 3대장
LocalDate:날짜만 필요할때
LocalTime:시간만 ''
LocalDateTime:날짜와 시간이 모두 필요
이 3명은 모두 불변으로 안전하고
plusDays(), minusMonths()와 같이 인간의
언어에 가까운 직관적인 메서드 제공
*/
//유지보수시에 만나게 될 코드
import java.util.Calendar;
import java.util.Date;

//유지보수할때 바꿔야 하는것
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Date_14 {

public void issueCouponMordern(){
    LocalDateTime issueDate = LocalDateTime.now();
    //템포럴 인터페이스가 제공하는 기능 새로운 객체를 반환하여 안전합니다
    LocalDateTime expireDate = issueDate.plusMonths(1);
    //실무에서 필수로 쓰는 날짜 포멧팅(원하는 형태로 출력)
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

System.out.println("쿠폰 발급 로직");
System.out.println("발급일 : " + issueDate.format(formatter));
System.out.println("만료일 : " + expireDate.format(formatter) );

//비즈니스 로직 : 만료일 이전인지 아닌지
boolean isValid = LocalDateTime.now().isBefore(expireDate);
System.out.println("현재쿠폰 사용가능여부 : " + isValid);
}




    public void issueCouponLegacy(){
        //현재 시간 가져오기
        Calendar calendar = Calendar.getInstance();
        Date issueDate = calendar.getTime();

        //2.한달 더하기
        calendar.add(Calendar.MONTH, 1);
        Date expireDate = calendar.getTime();

        System.out.println("발급일: " + issueDate);
        System.out.println("만료일: " + expireDate);

    }
    
    public static void main(String[] args) {
        Date_14 example = new Date_14();
        example.issueCouponMordern();
    }
}
