interface Animal{
    public void animalSound();
    public void sleep();
}

class Pig implements Animal{
    public void animalSound(){
        System.out.println("본문을가짐");
    }
    public void sleep(){
 System.out.println("본문을가짐");
    }
}

public class Interface_11 {
    public static void main(String[] args) {
        Pig myPig = new Pig();
        myPig.animalSound();
        myPig.sleep();
    }
}
