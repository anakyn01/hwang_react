import React,{useState, useEffect} from "react"
import { Container, Row, Col, Button
} from "react-bootstrap"

const DateC = () => {//예약어는 변수명으로 사용할수 없음

    //초기값
    const [now, setNow] = useState(new Date());

    //부작용 실시간 업데이트 1초마다 새로운 데이트 객체 생성
    useEffect(() => {//1초마 시간 바뀜 구현
const timer = setInterval(() => { setNow(new Date());},1000);
//컴포넌트가 사라질때 타이머 정리 (메모리 누수 방지)
return () => clearInterval(timer);
console.log("첨 한번만 실행됩니다")
    },[]);
//  이럴경우 },[count]) 카운트 값이 바뀔때 마다 다시 그려라;
// 최악에 상황 }); 화면의 어떤 데이터든 바꾸ㅣ어서 다시 그렬질때 마다 무조건 실행 브라우저 터짐

//날짜 포멧팅 도우미 함수
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    /*
 이글자를 무조건 두자리로 만들건데 만얀 자리가 모자라면 맨앞에 0을 채워라   
    */
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`
}

//날짜 계산 함수(예 일주일 뒤)
const getNextWeek = () => {
    const future = new Date(); 
    //오늘 날짜를 기준으로 새로운 객체 생성
    future.setDate(future.getDate() + 7);
    //현재 날짜에 7을 더함
    return formatDate(future);
}
    return(
        <>
<Container fluid>
    <Row>
        <Col>
<h2 className="mt-5 mb-3">Date객체 핵심</h2>
<div className="bg-primary p-5">
<h2 className="text-warning">1.현재 시간(실시간)</h2>
<p className="display-1 text-warning">
{formatDate(now)}
</p>
</div> 

<h2 className="mt-5 mb-3">2.날짜계산 7일뒤</h2>
<p><code>setDate(getDate() +7)</code>사용</p>
<p className="p-5 display-1 bg-primary text-warning">
{getNextWeek()}    
</p>
        </Col>
    </Row>
</Container>
        </>
    )
}
export default DateC