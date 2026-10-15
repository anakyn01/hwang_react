package generic;

/*타입 파라미터는 기본적으로 Object타입으로 간주 되므로
Object가 가지고 있는 메소드를 호출할수 잇다
 */
public class Box2<T> {
	public T content;
	public T getContent() {
		return content;
	}



	public void setContent(T content) {
		this.content = content;
	}



	private T t;
	
	
	
	public T getT() {
		return t;
	}



	public void setT(T t) {
		this.t = t;
	}



	//Box의 내용물이 같은지를 비교
	public boolean compare(Box2<T> other) {
		boolean result = content.equals(other.content);
		return result;
	}

}
