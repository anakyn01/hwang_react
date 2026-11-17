//리액트에서 이벤트를 발생하려면 상태관리를 사용해야됨
import React,{useState, useEffect} from 'react';
//{상태관리, 부작용[부수적인효과]}
//특정값이 변할때 실행할 로직을 관리

import { Container, Row, Col, Button 
} from "react-bootstrap"

const Fs = () => {

 //1)초 기값 설정: 로컬스토리지에서 값을 불러오거나 없으면 0으로 시작
  const [count, setCount] = useState(() =>{
    const saved = localStorage.getItem("count");
    return saved !== null ? Number(saved) : 0;
/*
count 는 현재값을 저장하는 변수 
setCount 그 값을 변경할때 사용하는 함수
useState(() =>{...} 컴포넌트가 처음 렌더링 될때 딱 한번 실행되는
초기화 로직
localStorage.getItem("count"); 브라우저 저장소인 localStorage
에서 count라는 키를 가진 데이터를 가져옵니다
return saved !== null ? Number(saved) : 0;
저장된 값이 있으면 숫자로 변환하고 없으면 기본값인 0을 사용합니다

모든개발은 똑같다..java 
getter 세팅한는것이 setter
*/    
  })

  //2.저장함수 count의 값을 localStorage에 문자열 형태로 저장
  const saveCount = () => {
    localStorage.setItem("count", count.toString());
    alert("현재 값이 저장되었습니다!");
  };

  /*3.불러오기 함수(필요시 직접 혹은 초기 로딩시 자동 적용)
  loadCount : localStorage에서 데이터를 다시 불러와
  setCount를 통해 count값을 업데이트하여 화면에 반영
  */
  const loadCount = () => {
    const saved = localStorage.getItem("count");
    if (saved !== null) {
        setCount(Number(saved));
    }
  }

    return(
        <>
<Container>
<Row>
    <Col>
<h1 className='display-1 mt-5 mb-3 text-primary'>
{count}
</h1>  
<div className="">
<Button onClick={()=>setCount(prev => prev + 1)}>+</Button>
<Button onClick={()=>setCount(prev => prev - 1)}>-</Button>
<Button onClick={()=>setCount(0)}>RESET</Button>
<Button onClick={saveCount}>SAVE</Button>
<Button onClick={loadCount}>LOAD</Button>
</div>  
    </Col>
</Row>
</Container>       
        </>
    )
}
export default Fs