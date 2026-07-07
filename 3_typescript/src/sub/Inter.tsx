import React, { useState } from 'react';
//데이터 상태를 저장하고 변결할때 사용하는 훅

//1.데이터의 구조 정의()
export interface Todo{//todo라는 형태를 만듬
    id:number; text:string; 
    isCompleted:boolean; 
    //true 또는 false만 저장 할일을 완료 했는지 표시
}

//2.Props타입 정의
interface TodoItemProps{
    todo: Todo;//위에서 만든 Todo값을 받음
    onToggle:(id:number) => void;
    //숫자 id하나를 받고 아무것도 반환하지 않는다
}

//3.자식 컴포넌트 TodoItem 이라는 컴포넌트를 만듭니다
const TodoItem: React.FC<TodoItemProps> = ({todo, onToggle}) => {
    //todo onToggle처럼 사용할수 있게 구조분해를 해줌
    return(
        <li>
            <span onClick={() => onToggle(todo.id)}>
                {todo.text}
            </span>
        </li>
    )
}

const Inter: React.FC = () => {

const [todos, setTodos] = useState<Todo[]>([
 { id:1, text:'TypeScript 공부하기', isCompleted:false}, 
 { id:2, text:'react예제 만들기', isCompleted:true}, 
]);

const handleToggle = (id:number) => {
    setTodos(prev =>
prev.map(t => (t.id === id ? {...t, isCompleted: !t.isCompleted}:t))
/*
t.id === id 클릭한 Todo인지 확인합니다
맞으면
...t 기존 데이터를 복사하고
완료 여부만 반대로 바꿉니다
false -> true    
: t

*/
    );
}

    return(
        <>
        <h1>오늘의 할일</h1>
        <ul>
{todos.map(todo => (
<TodoItem key={todo.id} todo={todo} onToggle={handleToggle}/>
))}
        </ul>
<h1>인터페이스를 사용하는 이유</h1>
<p>
인터페이스는 한마디로 코드간의 약속(계약, Contract)입니다<br/>
- 일관성 유지 : 데이터의 형태나 클래스의 동작 방식을 강제하여<br/>
협업시 누가 코드를 작성하든 정해진 규격대로 작업하게 만듭니다<br/>
- 추상화(Abstraction):내부 구현(어떻게 동작하는지)은 숨기고<br/>
외부에서 사용하는 방식(무엇을 하는지만)노출합니다<br/>
아를 통해 결합도를 낮출수 있다<br/>
- 유지보수 용이 : 인터페이스를 구현하는 실제코드는 수정하더라도 <br/>
인터페이스를 사용하는 쪽의 코드는 수정할 필요가 없습니다(변경의 유연성)<br/>
- IDE지원 : 타입스크립트 사용시 객체가 가져야할 속성을 미리 알수 있어 자동완성과 에러 <br/>
검출이 매우 정확해 진다 <br/> 
</p>
<h1>타입스크립트 인터페이스와 자바 인터페이스의 차이</h1>
<p>
-이름기반 구조기반 런타임존재여부<br/>
           자바                      타입스크립트<br/> 
타이핑방식  Nominal                   Structural<br/> 
상속/구현   implements키워드           명시적선언 불필요<br/>
존재시점    컴파일 후에도 런타임 존재    컴파일 시에만 사용(런타임에서 사라짐)<br/>
주 목적    런타임 다형성(polymorphism) 컴파일 타임 타입 검사(에러방지)<br/>
</p>
        </>
    )
}
export default Inter;