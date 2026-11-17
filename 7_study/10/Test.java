public class Test {

    public static void main(String[] args) {
        System.out.print(Test.check(1));
    }

    static String check (int num) {
        return (num >= 0) ? "positive" : "negative";
    }
    
}
