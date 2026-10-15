public class Problem {
//나눗셈의 몫 과 나머지 %가장 큰화페 단위부터 차례대로 돈을 거스르는 그리디 알고리즘
    public static void main(String[] args) {
        int m = 4620;

        int a = m / 1000; //4.62 4가 저장
        int b = (m % 1000) / 500;
        int c = (m % 500) / 100;
        int d = (m % 100) / 10;

        System.out.println(a);//천원짜리 4장 출력
        System.out.println(b);//오백원쩌리 1개 출력
        System.out.println(c);//백원짜리 1개 출력
        System.out.println(d);//십원짜리 2개 출겨

    }
    
}
