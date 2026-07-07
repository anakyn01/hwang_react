import { Container, Row, Col, Button } from "react-bootstrap"

import {useState} from 'react';

const Hook = () => {

    const [color, setColor] = useState("red");

    return(
        <>
<Container fluid>
    <Row>
        <Col md={3}>
        <h1>useReducer</h1>
        <p>useState 와 동일 하지만 사용자 정의 상태로직을 
            허용하기에 복잡한 논리에 의존하는 여러 상태 정보를 추적해야 하는
            경우 useReducer를 사용하는 편이 좋다
        </p>
        </Col>
        <Col md={3}>
        <h1>useCallback</h1>
        <p>콜백함수를 메모이제이션 하는데 사용된다
        메모이제이션이란 함수 겨로가를 캐싱하여 다시 꼐산할 필요가 없도록 하는것
        </p>
        </Col>
        <Col md={3}>
        <h1>useMemo</h1>
        <p> 메모이제이션 된 값을 리턴</p>
        </Col>
        <Col md={3}>
        <h1>Custom hook</h1>
        <p>json 으로 제목을 달았는데 이걸 다른 컴포넌트에서도 동일하게 사용하고 싶어서
본을 떠서 만들 hook가 커스텀 후크임             
        </p>
        </Col>
    </Row>
    <Row>
        <Col md={3}>
        <h1>useState : 컴포넌트에서 상태를 추적할수 있다</h1>
        <h1>My favorite color is {color} !</h1>
        <button onClick={() => setColor("blue")}>
            Blue
        </button>
        <button onClick={() => setColor("yellow")}>
            yellow
        </button>
        </Col>
        <Col md={3}>
        <h1>useEffect : 구성요소에 부작용을 발생시킬수 있다</h1>
        <code>
        {/*useEffect(()  {
s           setTimeout(())
        }, 1000) []*/}
        </code>
        </Col>
        <Col md={3}>
        <h1>useContext</h1>
        <p>다섯명에 대해서 전달을 할때 1번이 5번 한테 전달할때..
            props를 사용하는데 절차 복잡하여
            useContext.Provider를 사용하면 좀더 원할하게 전달할수 있습니다

        </p>
        </Col>
        <Col md={3}>
        <h1>useRef</h1>
        렌더링간에 값을 유지함 1초 전에 값이 30 현재는 35
        과거의 값을 추적하고 변경가능한 값을 저장하는데 사용할수 있다
        그러나 리액트에서 가장 싫어하는 리렌더링을 유발하지 않는다

        </Col>
    </Row>


    <Row>
        <Col md={12}>
<h1 className="mt-4 mb-2">
React Hooks : 
<small>
리액트 v16.8 클래스를 쓰지 않고도 함수형 컴포넌트에서
리액트의 핵심 기능들을 갈고리 처럼 걸어서 사용한다고 하여 후크라한다
</small>
</h1>
<p>
1. 훅을 사용하는 존재이유
- 코드의 간결함 : 클래스형 특유의 복잡한 문법을 사용하지 않는다
- 로직의 재 사용성 : 내가 만든 커스텀 훅을 사용하면 서로 다른 컴포넌트에서 
상태관리 로직을 쉽게 공유합니다

2.가장 자주 쓰는 핵심 훅
- useState(상태관리훅)
- useEffect(사이드 이펙트 처리 훅)
- useRef (저장공간 및 DOM접근 훅)

3.훅을 사용할때 어기면 안되는 규칙 2가지
- 최상위에서만 호출
- 리액트 함수 내에서만 호출
</p>
        </Col>
    </Row>

</Container>
        </>
    )
}
export default Hook