import React,{useState} from 'react';

enum TodoStatus {
    Pending = '대기중',
    InProgress = '진행중',
    Completed = '완료',
}

const Enum: React.FC = () =>  {
//2.enum 상태값 적용
const[status, setStatus] = useState<TodoStatus>(TodoStatus.Pending);
//useState<TodoStatus> 이 status는 TodoStatus 타입만 저장한다.

const getStatusColor = (currentStatus: TodoStatus) =>{
    switch (currentStatus) {
        case TodoStatus.Pending: return 'gray';
        case TodoStatus.InProgress: return 'blue';
        case TodoStatus.Completed: return 'green';
        default: return 'black';
    }
}

    return(
        <>
<h1>현재 상태 : <span style={{ color: getStatusColor(status)}}>
{status}
</span>
</h1>
<p><button onClick={() => setStatus(TodoStatus.Pending)}>
대기
</button></p>
<p><button onClick={() => setStatus(TodoStatus.InProgress)}>
진행
</button></p>
<p><button onClick={() => setStatus(TodoStatus.Completed)}>
완료
</button></p>

<h1>enum (열거형)</h1>
<p>
- 연관된 여러개의 상수(Constant)를 
하나의 이름안에 모아두고 싶을때 사용  
- why Enum :
개발을 하다 보면 상태값이나 카테고리 처럼 정해진 범위내의 값들만 
사용하는 경우가 많다 그래서 이걸 사용하면
아래와 같은 장점이 있습니다
1. 가독성 향상 : 의미를 명확히 알수 있다
2. 오타방지 : 자동완성 기능을 통해 항상 정확한 값을 쓴다
3. 유지보수의 편의 : 만약 나중에 값이 변경되어야 하면
enum정의 부분만 수정하면 프로젝트 전체에 즉시 반영된다
</p>
        </>
    )
}
export default Enum;