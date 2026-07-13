package advanced;


import java.util.Properties;
import java.util.Set;

public class GetProperty {
	
	public static void main(String[] args) {
		
		String osName = System.getProperty("os.name");
		String userName = System.getProperty("user.name");
		String userHome = System.getProperty("user.home");
		System.out.println(osName);
		System.out.println(userName);
		System.out.println(userHome);
		
		System.out.println("---------------------------");
		System.out.println(" key: value");
		System.out.println("---------------------------");
		Properties props = System.getProperties();
		Set keys = props.keySet();
		
		for(Object objKey: keys) {
			String key = (String) objKey;
			String value = System.getProperty(key);
			System.out.printf("%-40s: %s\n", key, value);
		}
		
		
		
	}

}
