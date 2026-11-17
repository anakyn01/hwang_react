public class Two {
    public static void main(String[] args) {
        int[]a = new int[8];
        //8칸짜리 정수배열
        int i =0; //start index
        int n =10;

        while (n >0 ) {
            a[i++] = n % 2;
/*  [빈칸 2: n % 2] n을 2로 나눈 나머지를 
배열 a의 i번째 칸에 넣고, i를 1 증가시킵니다.*/
            n /= 2;
            // n을 2로 나눈 몫을 다시 n에 저장합니다.
            /*
    1바퀴: n=10 -> 10 %2  0
    2  : n =5  -> 5%2  1
    3  :  2%2 0
    4 : 1   
    [0 1 0 1 0 0 0 0]   
            */
        }
        for(i=7; i>=0; i--){
            //7번 칸부터 0번칸까지 거꾸로 내려가면서 출력
            System.out.print(a[i]);
            //00001010
        }
    }
}
