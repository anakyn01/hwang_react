public class Wh {

    public static void main(String[] args) {
        int i =0; int sum=0;
        while(i<10){
            i++;
            if(i%2 == 1) continue;
            //홀수면 건너뛰고
            sum += i;
        }
        System.out.println(sum);
    }
    
}
