package advanced;

public class RecordExam {

	public static void main(String[] args) {
		
		Mem m = new Mem("summer","비",50);
	System.out.println(m.id());
	System.out.println(m.name());
	System.out.println(m.age());
	System.out.println(m.toString());
	System.out.println();
	
	Mem m1 = new Mem("summer","비",50);
	Mem m2 = new Mem("summer","비",50);
	System.out.println("m1 m2 비교 " + m1.equals(m2));
	System.out.println("m1 해시코드 " + m1.hashCode());
	System.out.println("m2 해시코드 " + m2.hashCode());
	}

}
