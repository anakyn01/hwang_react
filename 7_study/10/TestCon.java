/*
싱글톤(Singleton) 패턴:
프로그램 전체에서 어떤 클래스의 객체를 
단 하나만 만들어서 돌려쓰는 기법
- 객체가 단 하나만 생성됨:
- 모두가 같은 객체를 공유함
- 결과 
*/

class Connection{

    private static Connection _inst = null;
/*
프로그램 전체에서 단 하나만 존재하게 
될 Connection 객체를 저장할 숨겨진 변수
static이므로 클래스가 
메모리에 올라갈 때 딱 하나만 만들어집니다.
*/
//객체 내부에서 숫자를 셀 때 사용할 변수입니다.
//  초기값은 0입니다.
    private int count = 0;

    /*외부에서 Connection 객체가 필요할 때 
    호출하는 메서드입니다. (생성자 대신 사용)*/
    static public Connection get(){
// 1. 만약 만들어둔 객체가 없다면 (_inst가 null이라면)
        if(_inst == null) {
            _inst = new Connection();
            // 새로 하나를 만듭니다. 
            // (이 코드는 프로그램 전체에서 딱 한 번만 실행됨)
            return _inst; // 새로 만든 객체를 반환합니다.
        }
// 2. 이미 만들어둔 객체가 있다면, 새로 만들지 않고 기존 객체를 그대로 반환합니다.
        return _inst;    
        }

        //카운트를 1증가 시키는 메서드
        public void count() {count ++;}
        //현재 카운트 값을 반환하는 메서드
        public int getCount() {return count;}

}


public class TestCon {

    public static void main(String[] args) {

        Connection conn1 = Connection.get();
        conn1.count();//카운트 1올림

        Connection conn2 = Connection.get();
        conn2.count();//카운트 1올림 2

        Connection conn3 = Connection.get();
        conn3.count();//카운트 1올림 3

        System.out.println(conn1.getCount());
        
    }
    
}
