class Generics {

    public static class Collection<T>{
        T value;

        public Collection(T t){
            value = t;
        }

        public void print(){
            new Printer().print(value);
        }
        /*
        printer 객체를 만들고 print(value)를 호출
        컴파일러가 이 코드를 번역할 때, 
        제네릭 T는 어떤 타입인지 아직 확정되지 않은 상태
        자바는 하위 호환성을 위해서 제네릭 타입을 컴파일 시점에 
        가장 최상위 클래스인 Object로 덮어씌워 버립니다.
        이것을 '타입 소거(Type Erasure)'라고 합니다.
        컴파일러의 눈에 저 코드는 new Printer().print((Object) value);로 
        보입니다.
그래서 미리 print(Object a) 메서드를 실행하기로 도장을 쾅 찍어버립니다.
        */
        class Printer{
            void print(Integer a) {
                System.out.print("A" +a);
            }
            void print(Object a) {
                System.out.print("B" +a);
            }
            void print(Number a){ 
                System.out.print("C" + a);
            }
        }

    }
    public static void main(String[] args) {
        new Collection<>(0).print();
        /*
        1) 0이라는 숫자를 넣어 Collection 객체를 생성합니다
        2) 이때 0은 기본형인 int지만,
        3) 제네릭(<T>)에는 클래스(객체)만 들어갈 수 있으므로
        4) 자바가 자동으로 Integer로 변환(오토박싱)
        5) 따라서 이 순간 T는 Integer가 됩니다.
        */
    }
    
}
