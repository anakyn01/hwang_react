package advanced;

import java.lang.reflect.*;

public class Reflection {

	public static void main(String[] args) {
	
		Class clazz = TheName.class;
	System.out.println("[생성자 정보]");
	Constructor[] constructors = clazz.getDeclaredConstructors();
	for(Constructor constructor: constructors) {
		System.out.print(constructor.getName() + "(");
		Class[] parameters = constructor.getParameterTypes();
		printParameters(parameters);
		System.out.println(")");
	}
	System.out.println();
	
	System.out.println("[메소드 정보]");
	Method[] methods = clazz.getDeclaredMethods();
	for(Method method : methods) {
		System.out.print(method.getName() + "(");
		Class[] parameters = method.getParameterTypes();
		printParameters(parameters);
		System.out.println(")");
	}
				
		/*Class clazz = class.forName("advanced/TheName");
		TheName thename = new TheName();
		Class clazz = thename.getClass();*/
		System.out.println("패키지: "  + clazz.getPackageName());
		System.out.println("클래스 간단이름 : "  + clazz.getSimpleName());
		System.out.println("클래스 전체이름 : "  + clazz.getName());

	}
	
	private static void printParameters(Class[] parameters) {
		for(int i=0; i<parameters.length; i++) {
			System.out.print(parameters[i].getName());
			if(i<(parameters.length-1)) {
				System.out.print(",");
			}
		}
	}

}
