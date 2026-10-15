//자바의 람다식과 예외처리 

public class Inter {

    static interface F {
        int apply(int x) throws Exception;        
    }

    public static int run(F f){
        try{
            return f.apply(3);
        }catch (Exception e){
            return 7;
        }
    }

    public static void main(String[] args) {
        
        F f = (x) ->{
            if (x > 2) {//3을 넣어서 강제 에러발생
                throw new Exception();
            }
            return x * 2;//실행하지 않는..
        };

        System.out.print(run(f) + run((int n) -> n + 9));
        //run(f) 7 + 12
    }
    
}
