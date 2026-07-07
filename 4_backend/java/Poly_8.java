class Animal { //가장 기본이 되는 부모설계도
    public void animalSound(){//메서드 정의
        System.out.println("동물에 소리는 각각 다릅니다");
    }
}

class Pig extends Animal{//상속 받고
    public void animalSound(){
        System.out.println("돼지는 꿀");
        //입맛에 맞게 정의 오버라이딩..
    }
}

class Dog extends Animal{
    public void animalSound(){
        System.out.println("강아지는 멍멍");
    }
}


public class Poly_8 {

    public static void main(String[] args) {
        //아래는 객체화 [Animal이지만 실제내용물로 채워 부모타입으로 자식객체를 담는것이것이 다형성에 시작]
        Animal myAnimal = new Animal();
        Animal myPig = new Pig();
        Animal myDog = new Dog();
        myAnimal.animalSound();
        myPig.animalSound();
        myDog.animalSound();
    }
    
}
/*
Polymorphism
- 다양한 형태 상속을 통해 서로 연관된 클래스가 있을때 발생
- 예시로 아래처럼 동물에 소리를 각각 다르게 형성할때 사용
상속 다형성 메서드오버라이딩
*/