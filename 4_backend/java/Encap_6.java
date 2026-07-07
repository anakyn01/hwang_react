/*민감한 데이터가 다른 사용자게 노출되지 않도록 하는것
getter 있는 값을 리턴
setter 값을 세팅 => 친척은 리액트 useState
*/
public class Encap_6 { //캡슐화가 왜 필요하냐면 반복되는 일상에서 편리하게 하기위한 기준

    private int age;//아무나 접근못하게 
    private String name;

    //getter 있는값을 리턴한다
    public int getAge(){ return age;}
    public String getName(){return name;}

   //setter
    public void setAge(int newAge) {this.age = newAge;}
    public void setName(String newName) {this.name = newName;}
    
}
