//설계도 역활
interface Number{//넘버라는 이름의 인터페이스 정의
//구현부가 없는 추상메서드를 선언
int sum(int[] a, boolean odd);
/* 정수 배열(a)과 논리값(odd)을 매개변수로
받아서 정수형(int)을 반환해야 한다는 규칙을 정합니다.
*/
}

//인터페이스에서 확장된 클래스
class ODDNumber implements Number{
// 인터페이스에 선언된 sum 메서드의 
// 실제 동작(구현부)을 작성합니다.
    public int sum(int[] a, boolean odd){
//조건에 맞는 숫자들의 합을 누적해서 저장할 변수 
// result를 0으로 초기화합니다.
        int result = 0;
//첫번째요소 (인덱스 0) 마지막 요소 a.length - 1 까지 반복
        for(int i=0; i < a.length; i++){
            if((odd && a[i] % 2 !=0) || (!odd && a[i] % 2 == 0)){
                result += a[i];
            }
        }

/*
1. 매개변수 odd가 true이면서(AND), 
현재 배열의 값(a[i])이 홀수(2로 나눈 나머지가 0이 아님)이거나 
(OR)
2. 매개변수 odd가 false이면서(AND), 현재 배열의 값(a[i])이 
짝수(2로 나눈 나머지가 0임)라면
*/
return result;
        }
    
}

public class Inter {

    public static void main(String[] args) {
        
        int a[] = {1,2,3,4,5,6,7,8,9};

        ODDNumber OE = new ODDNumber();

System.out.print(OE.sum(a, true) + ", " + OE.sum(a, false));

//1+3+5+7+9 =25, 2+4+6+8=20

    }
    
}
