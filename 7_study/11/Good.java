public class Good {
    
    public static void main(String[] args) {
        int i, j;
        for(j=0, i=0; i<=5; i++){
            j+=i;
            System.out.print(i);
            if(i==5){
                 System.out.print("=");
                 System.out.print(j);
            }else{
                System.out.print("+");
            }
        }
    }
}
