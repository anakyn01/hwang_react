package collect;

import java.util.ArrayList;
import java.util.List;

/*
List컬렉션은 객체 자체를 저장하는 것이 아니라 객체의
번지를 저장합니다
또한 동일한 객체를 중복 저장할수 있는데
이경우 동일한 번지가 저장된다 null또한 저장이 가능합니다

인덱스를 매개 값으로 갖는 메소드
- 객체추가 -
boolean add(E e) 주어진 객체를 맨 끝에 추가
void add(int index, E element) 주어진 인덱스에 객체를 추가
set(int index, E element) 주어진 인덱스의 객체를 새로운 객체로 바꿈

- 객체검색 -
boolean contains(Object o)주어진 객체가 저장되어 있는지 여부
E get(int index)주어진 인덱스에 저장된 객체를 리턴
is Empty()켈렉션이 비워 있는지 조사
int size()저장되어 있는 전체 객체수를 리턴

- 객체삭제 -
void clear() 저장된 모든 객체를 삭제
E remove(int index)주어진 인덱스에 저장된 객체를 삭제
boolean remove(Object o)주어진 객체를 삭제
* */
public class ArrayListt {
    public static void main(String[] args) {
// 1. String 객체의 '번지(주소)'를 저장할
// List 컬렉션 생성 (보통 ArrayList를 가장 많이 사용합니다)
        List<String> list = new ArrayList<>();
        // 2. isEmpty():
System.out.println("처음 리스트가 비어있나요? " + list.isEmpty());
//객체추가 3. add(E e)
        list.add("사과");
        list.add("바나나");
        list.add("사과");
//null 저장: 객체가 없다는 의미인
// null도 하나의 칸을 차지하며 저장될 수 있습니다.
        list.add(null);
//add(int index, E element)
list.add(1, "포도");
list.set(2,"딸기");
System.out.println(list);
System.out.println("총 객체 수: " + list.size());
System.out.println("1번 인덱스의 과일: " + list.size());
System.out.println("1번 인덱스의 과일: " + list.get(1));
System.out.println("사과가 있나요? : " + list.contains("사과"));
list.remove(4);
list.remove("사과");
list.clear();
System.out.println("clear후 리스트가 비어 있나요? " + list.isEmpty());
    }
}
