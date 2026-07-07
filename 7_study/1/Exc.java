/*이 예제는 자바예외 처리를 어떻게 하는지 보는 예제 입니다 */
public class Exc {

    //프로그램이 시작되는 메인 메서드
    public static void main(String[] args) {
        int a =5, b=0;//정수형변수 a에5를 b에 0을 저장

        try{
            System.out.print(a/b);
            //5를 0으로 나누다가 에러가 터짐
        }catch(ArithmeticException e){//수학적 계산 에러
            System.out.print("출력1");
        }catch(ArrayIndexOutOfBoundsException e){
            //배열의 크기를 벋어날때 터지는 에러
            System.out.print("출력2");
        }catch(NumberFormatException e){
            //문자를 숫자로 잘못 바꿀때 터지는 에러
            System.out.print("출력3");
        }catch(Exception e){
             System.out.print("출력4");
        }finally{
            System.out.print("출력5");
        }
    }
}

//인라인이 어서 출력1출력5