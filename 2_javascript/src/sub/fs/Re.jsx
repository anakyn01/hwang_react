import React,{ useState} from 'react';//상태관리 선언
import { Container, Row, Col, Button, Form 
} from "react-bootstrap"

const Re  = () => {

//초기값 세팅    
const [number, setNumber] = useState(10)
//재귀함수에서 시작하는값 세팅
const [result, setResult] = useState(0)

//재귀함수 : 1부터 n까지의 합을 구함
const sumRecursive = (n) => {
    if (n <= 1) return n;
    return n + sumRecursive(n -1)
    /*종료조건 (Base Case):n이 1이하가 되면 1을 반환하고 멈춤
    10 9 8 7 6 5 4 3 2 1 
    재귀 호출 (Recursive Step) : n  + (n-1까지의 합)
    */
}


    return(
        <>
<Container fluid>
<Row>
<Col>
<Form.Control
type="number"
value={number}
onChange={(e) => setNumber(e.target.value) }
/>
{/*
사용자가 입력요소 input,textarea,select등이 
상호작용하여 값이 변경될때마다 실행되는 이벤트
(e) 이벤트가 발생할때 브라우저가 넘겨주는 이벤트 객체
setNumber useState를 통해 만들어진 상태변경함수
e.target => input
.value 값 태그에 적힌 글자
*/}
<Button onClick={() => setResult(sumRecursive(number))}>
합계 계산하기
</Button>
<p>결과:{result}</p>
</Col>
</Row>
</Container>        
        </>
    )
}
export default Re