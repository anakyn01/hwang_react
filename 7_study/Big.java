public class Big {

    public static void main(String[] args) {
        int a = 0;
        for(int i=1; i < 999; i++){
            if(i%3==0 && i%2!=0){
                //3으로 나누어 떨어짐과 2로 나누어 떨어지지 않음 홀수
                a = i;
                /*조건을 만족할때 마다 변수 a에 값을 계속덮어쓰기 때문에
                반복문이 끝났을때 가장큰숫자
                */

            }
            System.out.print(a);
        }
    }
    
}
