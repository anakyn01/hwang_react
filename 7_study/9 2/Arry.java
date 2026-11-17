/*
핵심요약
배열의 참조(주소값)반환
함수안에서 4칸짜리 배열을 만들고 숫자를 채워 넣은뒤
그배열에 있는 메모리주소(위치)를 main함수로 넘겨줍니다
결과적으로 main함수의 intArr는 MakeArray가
만든 배열을 똑가팅 가리키게되어 그안의 
데이터를 사용할수 잇게됨
*/

public class Arry {

    static int[] MakeArray(){
//작업이 끝나면 정수형배열을 결과값으로 반환하겠다는 뜻


        int[] tempArr = new int[4];
//tempArr라는 이름의 4칸짜리 빈정수형 배열을 생성합니다
        for(int i=0; i<tempArr.length; i++){
            tempArr[i]=i;
        }

        return tempArr;
    }

    public static void main(String[] args) {
        
        int[] intArr;
        //값을 담아둘 정수형 배열변수 하나를 선언
        intArr = MakeArray();
//위에서 선언한 메서드 실행
        for(int i=0; i <intArr.length; i++){
System.out.print(intArr[i]);
        }
    }
    
}
