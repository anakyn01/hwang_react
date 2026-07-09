class Oper {

    public static void main(String[] args) {
        int[] a = new int[]{1,2,3,4};
        int[] b = new int[]{1,2,3,4};
        int[] c = new int[]{1,2,3};

        check(a,b);
        check(a,c);
        check(b,c);
    }

    //함수 두개의 정수형 배열을 매개변수로 받아 비교
    public static void check(int[] a, int[] b) {
// == 객체(배열)의 안에 든 실제 값을 비교 아니라 객체가 저장된 메모리 주소값을 비교
        if (a == b) {//두 배열이 메모리상에서 완전이 동일한 객체를 가르키면
System.out.println("O");
        } else {
System.out.println("N");
        }
    }

}