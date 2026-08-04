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
public class ArrayList {
}
