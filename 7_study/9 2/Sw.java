public class Sw {
//break문이 없어 다실행하고 폴스로(Fall-through)
    public static void main(String[] args) {
        int i =3; int k =1;
        switch(i){
            case 1:k += 1;
            case 2:k++;
            case 3:k = 0;//1)
            case 4:k += 3;//2
            case 5:k -=10;//-7
            default:k--;//-8
        }
        System.out.print(k);
    }
    
}
