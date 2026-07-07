public class Cons_4 {

    //속성 선언만 시킴
    int x;
    int modelYear;
    String modelName;
    String lunch;
    String lunchAfter;

    //생성자 자바에 생성자는 클래스명과 동일하게 사용
    public Cons_4(int y, int year, String name, String lunch, String lunchAfter){
        x = y;//x는 곧 y임
        modelYear = year;
        modelName = name;
        this.lunch = lunch;//변수 셰도잉 발생 해결방법으로 앞에 this키워드를 붙여야 한다
        this.lunchAfter = lunchAfter;

    }

    //
    public static void main(String[] args) {
        Cons_4 obj = new Cons_4(10, 1969, "mus","밥","커피");
        System.out.println(obj.x);
        System.out.println(obj.modelYear + " " + obj.modelName);
        System.out.println(obj.lunch + " " + obj.lunchAfter);
    }
    
}
