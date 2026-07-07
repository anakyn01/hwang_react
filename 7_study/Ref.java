public class Ref {
//참조 전달과 값 하당의 차이를 묻는 문제
    public static void change(String[] data, String s){
//현재상태 data는 main의 data와 같은배열 ["A"]를 가르킴
//s는 문자열 B를 가르킴

        data[0] = s; //첫번째 s가 B
        s = "Z";//change매섣 안에 있는 지역변수 s가 가르키는 방향을 "Z" 
        // 원본에 영향을 주지 않음

    }
    
    public static void main(String[] args){
        String data[] = {"A"};//1
//메모리 어딘가에 ["A"] 배열의 공간이 만들어지고 
//data라는 변수가 이배열의 주소를 가르킴
String s = "B";//2
//"B"라는 문자열이 만들어지고 변수s가 이를 가르킵니다


        change(data, s);//3
        System.out.println(data[0] + s); //4 BB
    }
}
