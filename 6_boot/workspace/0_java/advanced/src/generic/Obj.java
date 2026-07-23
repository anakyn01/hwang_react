package generic;

public class Obj {

	public static void main(String[] args) {
		
		Box2<String> box2 = new Box2<>();
		box2.content = "100";
		
		Box2<String> box3 = new Box2<>();
		box3.content = "100";
		
		boolean result1 = box2.compare(box3);
		System.out.println("result1:"+result1);

	}

}
