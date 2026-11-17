public class Try {

    public static void main(String[] args){
        int sum = 0;
        try{
         func();
        }catch(NullPointerException e){
            sum = sum + 1; //1
        }catch(Exception e){
            sum = sum + 10;
        } finally {
          sum = sum + 100;
        }
        System.out.print(sum);

    }

    static void func() throws Exception{
        throw new NullPointerException();
    }//함수 호출시 강제로 널포인터익셉션 실행
    
}
