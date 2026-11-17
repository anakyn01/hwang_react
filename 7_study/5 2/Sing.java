class Connection {
    //1. 자기 자신의  인스턴스를 담을 정적(static) 변수를 선언합니다. 
    // 처음엔 비어있음(null)
    private static Connection _inst = null;
    //2.호출 횟수를 저장할 인스턴스 변수입니다. 기본값은 0입니다.
    private int count = 0;

    //3.외부에서 객체를 달라고 할때 사용하는 정적메서드
    static public Connection get(){
        //4 만약 만들어진 객체가 (_inst)없다면 ? (최초 1회 실행 시)
        if(_inst == null) {
            _inst = new Connection(); //새 객체를 만들어서 _inst에 저장
            return _inst;//만든 객체를 반환
        }
//5. 이미 만들어진 객체가 있다면..새로 만들지 않고 기존 객체를 그대로 반환
        return _inst;
    }

    //count를 1증가 시키는 
    public void count(){
        count++;
    }

    //7현재 count 값을 반환하는 메서드
    public int getCount(){
        return count;
    }
}


public class Sing {

    public static void main(String[] args) {
        
        //1)[최초 호출] _inst가 null이므로 새 객체가 생성됩니다.
        Connection conn1 = Connection.get();
        conn1.count();

        Connection conn2 = Connection.get();
        conn2.count();

        Connection conn3 = Connection.get();
        conn3.count();

        conn1.count();//4

        System.out.print(conn1.getCount());


    }
    
}
