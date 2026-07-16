abstract class Vehicle{
    private String name;
    abstract public String getName(String val);
    public String getName(){
        return "vehicle name: " + name;        
    }
    public void setName(String val){
        name = val;
    }
}

class Car3 extends Vehicle{
     public Car3(String val){
        setName(val);
     }
     public String getName(String val){
        return "Car name : " + val;
     }
    public String getName(byte val[]){
        return "Car name : " + val;
     }
}

public class Good2 {
    public static void main(String[] args){
        Vehicle obj = new Car3("Spark");
        System.out.print(obj.getName());
    } 
}
