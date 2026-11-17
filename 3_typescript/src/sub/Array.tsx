import React, { useState} from 'react';
//데이터를 저장하고 변경할수 있는 기능 (상태)

//1.데이터의 타입(모양)정의 
interface Todo { 
    id:number; //id는 숫자형 할일을 구별하기위한 고유번호
    text:string; //텍스트는 문자열 할일의 내용을 저장
}

const Array = () => { //컴포넌트를 만듭니다

    //2.초기 상태 및 타입 설정
    const [todos, setTodos] = useState<Todo[]>([]);
    /*타입지정: useState<타입[]>(초기값)형태의 구조로 엄격히 관리
  todos : 할일 목록을 저장하는 변수
  setTodos : 할일 목록을 변경하는 함수
  useState([]) : 처음에는 빈배열로 시작
  <Todo[]> : Todo타입의 데이터만 들어갈수 있습니다
    */

    const [inputText, setInputText] = useState<string>('');

    //3.배열에 항목 추가(불변성 유지)
const handleAddTodo = () =>  {
    if (inputText.trim() === '') return;
    /*
    trim() : 앞뒤 공백을 제거
    입력한 글자가 공백인지 확인합니다
    return 만약 아무 글자도 없다면 함수 종료
    */

    const newTodo: Todo  = { //새로운 할일 하나를 만듭니다
        id: Date.now(), //고유한 ID생성 pk 현제시간을 숫자로 가져옵니다
        text: inputText,//입력창에 있는 글자를 저장합니다
    }

    //기존 배열을 복사하고 맨뒤에 새 항목을 추가한 새로운 배열을 만든다
    setTodos([...todos, newTodo]);
    //마지막 으로 입력창에 쓴건 데이터로 올라가고 입력창을 비움
    setInputText('');

}

/*삭제 버튼을 누르면 실행되는 함수 삭제할 id를 전달 받습니다*/
const handleDeleteTodo = (id: number) => {
const updateTodos = todos.filter((todo) => todo.id !== id);
//아이디 2번을 삭제 할때..2번을 제외한 다른 아이디를 출력..
setTodos(updateTodos);
}


    return(
        <>
<h1>할일 목록</h1>
<div className="">
    <input
    type="text"
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    placeholder='할일을 입력하세요'
    />
    <button onClick={handleAddTodo}>
        추가
    </button>

    <h1>배열데이터를 화면에 렌더링 하기</h1>
    <ul>
        {todos.map((todo) =>(
            <li key={todo.id}>
                {todo.text}
                <button
                onClick ={() => handleDeleteTodo(todo.id)}
                >
                    삭제
                </button>
            </li>
        ))}
    </ul>
</div>

<h1>Array <small>단일 변수에 여러값을 사용할때</small></h1>
<p>
- 배열의 타입을 지정하는 법은 두가지가 있습니다
(1) 타입 [] 방식 : string[], number[]
(2) Array 방식 제네릭
- 리액트에서는 보통 문자열이나 숫자의 단순배열보다는 
객체(object)들의 배열을 다루는 경우가 많다
이때는 interface나 type을 사용해 데이터의 형태를 먼저정의합니다
useState로 초기값은 빈배열..
</p>
        </>
    )
}
export default Array;