public class Calc {
    
    public static void main(String[] args) {

        String str = "abscabcd";
        //분석할 원본 문자열을 " "선언하고 초기화

        /*문자의 중복여부를 체크하기 위해서 크기거 256(ASCII코드 크기)인
        boolean배열을 생성 기본값은 모두 false로 초기화 됩니다
        */
        boolean[] seen = new boolean[256];
// 문자열, 문자열의 마지막 인덱스(7), 그리고 중복 체크 배열을 
// 전달하여 calculFn 메서드를 실행하고 결과를 출력합니다
        System.out.print(calculFn(str, str.length()-1, seen));
    }


    //재귀적으로 문자열을 처리하는 메서드
    public static String calculFn(String str, int index, boolean[] seen){

//종료조건 인덱스가 0보다 작아지면(문자열의 처음을 지나치면) 빈문자열("")반환
if(index < 0) return "";
//현재 인덱스에 해당하는 문자를 문자열에서 
//하나 가져와 변수 c에 저장합니다.
char c = str.charAt(index);
/*재귀호출 현재 문자를 처리하기 전에 인덱스 1을 줄임
이전 문자열을 먼저처리하도록 하기에 실제검사는 
 문자열의 맨앞 인덱스0 부터 시작*/
String result = calculFn(str, index-1, seen);
//현재 문자(c)가 배열 seen에서 false라면 (즉 처음등장한 문자라면)
if(!seen[c]){
seen[c] = true; //이문자는 등장했다고 true로 표시
return c + result; 
//현재 문자(c)를 여태까지 만들어진 결과의 앞에 붙여서 리턴
}
//만약 이미 등장했던 문자라면 seen[c]가 true라면 
//현재 문자를 무시하고 기존 결과를 그대로 리턴
return result;
    }
}

/*
위에 재귀함수는 
호출과 반환순서, 중복문자 제거 및 문자열 뒤집기

abscabcd 0 ~7
index0 (a) 처 a
index1 (b) 처 ba
index2 (a) 무 ba
index3 (c) 처 cba
index4 (a) 무 cba
index5 (b) 무 cba
index6 (c) 무 cba
index7 (d) 처 dcba
*/
