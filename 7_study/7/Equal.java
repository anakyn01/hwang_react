public class Equal {
    
    public static void main(String[] args){
        String str1 = "Programing";
        String str2 = "Programing";
        String str3 = new String("Programing");

        System.out.println(str1== str2);
        System.out.println(str1== str3);
        System.out.println(str1.equals(str3));
        System.out.print(str2.equals(str3));

        /*
        == 메모리의 주소위치 두변수가 완전히 같은 방 객체를
        가르키는지 확인
        . equals() 실제내용
        */
    }
}
