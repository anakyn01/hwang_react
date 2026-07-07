//새롭게 매번 변동되는 것은
import java.util.ArrayList;

public class Array_20 {

    public static void main(String[] args){

ArrayList<String> car = new ArrayList<>();
/*매번추가되어야 하는 리스트에 경우에는 자바유틸 어레이리스트를 사용한다
내장 어레이와 다른점은 1) 객체화 시키고
매번 추가되기 때문에 2)add()라는 걸로 추가를 한다
*/
car.add("v");car.add("b");car.add("f");
System.out.println(car);
//인덱스를 사용하여 바꿀수 있다
car.add(0, "m");
System.out.println(car);
car.get(1);//2번째 출력
//기존에 항목을 변경할때
car.set(2, "체인지");
car.remove(3);
//항목이 몇개인지 볼때는 
car.size();
//항목이 많을경우 for foreach
for (int i=0; i < car.size(); i++) {
    System.out.println(car.get(i));
}
//껍데기만 남기고 지울때는
car.clear();//안에 있는 내용물이 다 지워집니다
//foreach출력
for (String i : car) {
    System.out.println(i);
}



        String[] cars= {"v","b","f","m"};
        System.out.println(cars[0]);

        String listVSarraylist = "리스트는 변수타입,매개변수리턴타입선언시"+
        "array리스트 new 키워드를 통해 실제 리스트데이터를 담을 메모리객체 생성할때"+
        "사용해 주세요";
    }
    
}
