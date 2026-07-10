package advanced;

import lombok.*;


/*
컴파일 과정에서 기본생성자와 함께
Getter, Setter, HashCode(), equals(),
toString 자동으로 생성됩니다
*/
@Data
public class Lombok {
	
	private String id;
	@NonNull
	private String name;
	private int age;
	
	/*
	@NoArgsConstructor : 기본 매개변수가 없는 생성자
	@AllArgsConstructor : 모든 필드를 초기화 시키는 생성자
	@RequiredArgsConstructor : 기본적으로 매개변수가 없는 생성자포함
	만약 final또는 @NonNull이 붙은 필드가 있다면
	이필드만 초기화시키는 생성자 포함
	@EqualsAndHashCode : equals와 hashCode 메소드 포함
	@ToString : toString() 메소드 포함
	 */
	
	

}
