public class Split {

    public static void main(String[] args) {
        String str = "ITISTESTSTRING";
        String[] result = str.split("T");
/*변수 str 대문자 T를 기준으로 나눔
[[0{I}], [1{IS}], [2{ES}], [3{S}], [4{RING}]]

*/
System.out.print(result[3]);
    }
    
}
