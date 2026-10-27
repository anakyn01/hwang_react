class Rectangle {
    int width, height;

    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
}

class Square extends Rectangle{
    Square(int a){
        super(a,a);
    }
    int getSquareArea(){
        return width * height;
    }
}


public class Exam_18 {
    public static void main(String[] args) {
        Square sq = new Square(10);
        System.out.println(sq.getSquareArea());
    }
    
}
