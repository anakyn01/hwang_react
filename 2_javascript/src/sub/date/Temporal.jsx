import React,{useState, useEffect} from "react"

//템포럴 불러오기
import {Temporal} from '@js-temporal/polyfill'
/*
iso국제표준화기구
*/

import { Container, Row, Col, Button
} from "react-bootstrap"

const Temp = () => {
//1. 현재 날짜 가져오기 (시간제외 순수 날짜만) 기존에 데이트는 시/분/초와 타임존
const today = Temporal.Now.plainDateISO();

//상태 관리
const [addDays, setAddDays] = useState(100);
//몇일뒤를 계산할지 숫자를 저장 기본값은 100일
const[targetDateStr, setTargetDateStr] = useState(`${today.year}-12-25`);
//D-day를 계산할 목표 날짜를 문자열(예 "2026-12-25")로 저장

const futureDate = today.add({ days: addDays});
//Temporal은 오늘 날짜에 일수를 입력한 만큼 심플하게 계산

const targetDate = Temporal.PlainDate.from(targetDateStr);
//.from() :사용자가 달력에서 선택한 글자를 Temporal이 계산할수 있게 날짜 데이터로 바꿔줍니다
const daysUntil = today.until(targetDate, {largestUnit:'days'}).days;
/*.until() 오늘부터 목표 날짜까지의 차이 (기간)을 구합니다
largestUnit:'days' 3개월 10일로 쪼개질걸 이옵션 덕분에 100일 사용할수 있다
.days 순수하게 숫자 일수 만 쏙 뽑아옵니다
*/

    return(
        <>
<Container>
    <Row>
        <Col>
<h2>차세대 날짜 템포럴</h2> 
<div className="">
    <h3 className="text-success mt-4 mb-2">오늘날짜 : {today.toString()}</h3>
</div> 
<div>
    <h3>기념일 계산기</h3>
    <p> 오늘부터 
        <input type="number" 
value={addDays}  
onChange={(e) => setAddDays(Number(e.target.value))}      
        />일 뒤는? {futureDate.toString()}
    </p>
</div>  
<div>
<h3>D-day계산기</h3>
<p>목표날짜 : 
<input 
type='date'
value={targetDateStr}
onChange={(e) => setTargetDateStr(e.target.value)}
/>
{daysUntil > 0 ? `👉 D-${daysUntil}` : daysUntil === 0 ? "👉 D-Day! 오늘입니다!" : `👉 D+${Math.abs(daysUntil)} (지남)`}
</p>
</div>    
        </Col>
    </Row>
    <Row>
        <Col>
<h1>기존 Date에 문제점</h1>
<p>
(1) 1월이 0부터 시작하는 기괴함  탬포럴은  1, 12
(2) 원본데이터가 변하는 문제 해결
기준 날짜에 3일을 더하면 원래 있던 깆누날짜 객체 자체의 값이
3일 뒤로 덮어 쒸어짐(원본훼손) 파이선 있는 copy
불변성 원본은 드대로 둔채 3일이 더해진 새로운 결과물
(3) 객체에 짬뽕 시간,날짜,타임존 
<code>Temporal.PlainDate</code>
(4) 울며 겨자먹기에 무거운 라이브러리
Moment.js, Day.js, date-fns
</p>        
        </Col>
    </Row>
</Container>
        </>
    )
}
export default Temp

/*
npm install @js-temporal/polyfill 라이브러리 설치
*/