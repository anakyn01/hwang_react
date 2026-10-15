import java.util.LinkedList;

public class Linked_21 {
    public static void main(String[] args) {//int에 래퍼클래스 Integer
        LinkedList<Integer> nums = new LinkedList<Integer>();
        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.add(4);
        nums.addFirst(0);
        nums.addLast(5);
        System.out.println(nums);
        System.out.println(nums.get(0));
        System.out.println(nums.getFirst());
        System.out.println(nums.getLast());
        /*래퍼클래스는 컬렉션객체에서 (리스트에서는 객체만 저장 할수 있음)
        byte         Byte
        short        Short
        int          Integer
        long         Long
        float        Float
        double       Double
        boolean      Boolean
        char         Character
        기본데이터타입 (원시값)을 객체형태로 다룰수 있게 감싸주는 클래스
        */
    }
}
