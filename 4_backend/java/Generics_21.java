class Box<T> {//<T> type parameter 아직정해지지 않은 타입을 의미
  T value; //상자안에 실제로 들어갈 내용물

  //상자안에 내용물을 넣는 매서드
  void set(T value){this.value = value;}
  //상자에서 내용물을 꺼내는 메서드
  T get(){return value;}
  //생성자에 코드량을 줄여준다
}


/*상자를 만들때 이상자에 무엇을 담을지 지금은 모르겟고 
상자를 실제로 사용할때 담은물건에 타입을 정할께 
마법의 상자라고 비유
*/



public class Generics_21 {

    public static void main(String[] args) {
        Box<String> str = new Box<>();
        str.set("문자열");
        Box<Integer> num = new Box<>();
        num.set(50);
        System.out.println(str.get() + " \n" + num.get());
    }
    
}
