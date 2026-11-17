"use client";
//Next.js 클라이언트 컴포넌트(브라우저에서 실행됨)임을 선언합니다

import { useState, useEffect} from "react";
/*
상태 관리(useState)와 생명주기 훅(useEffect)
*/
import axios from "axios";
/*
백엔드 API 서버와 HTTP 통신을 하기 위해 axios 라이브러리를 불러옵니다.
*/
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

// 백엔드에서 받아올 공정 라인 데이터의 타입(TypeScript 인터페이스)을 정의합니다
interface ProcessLine {
   id:number;
   lineName:string;
   processType:string;
   status:string;
   currentProduct:string;
   operator:string;
}

export default function ProcessPage(){
// 1. 공정 라인 목록 데이터를 저장하는 상태(lines)와 초기 빈 배열 설정
const [lines, setLines] = useState<ProcessLine[]>([]);
// 2. 신규 공정 라인 등록 폼의 입력값들을 관리하는 상태(form)와 초기값 설정
const [form, setForm] = useState({lineName:"", 
   processType:"", currentProduct:"", operator:""
})
// 3. 백엔드 서버로부터 현재 등록된 공정 라인 목록을 비동기로 조회해오는 함수입니다.
const fetchLines = async () => {
   try{
//브라우저 로컬 스토리지에 저장된 JWT 인증 토큰을 가져옵니다.
const token = localStorage.getItem("token");
//토큰을 헤더에 담아 Node.js 백엔드 공정 조회 API로 GET 요청을 보냅니다.
const res = 
await axios.get("http://localhost:4000/api/process/lines", {
headers:{ Authorization: `Bearer ${token}`}   
});
// 요청이 성공(res.data.success)하면 받아온 라인 목록 데이터로 lines 상태를 업데이트합니다.
if(res.data.success) setLines(res.data.lines);
   }catch(err){
// 조회 중 에러가 발생하면 콘솔에 에러를 기록합니다.
console.error("공정 라인 조회 실패", err);
   }
};
// 4. 컴포넌트가 처음 화면에 나타날 때(Mount) 공정 라인 목록을 
// 자동으로 불러오기 위해 useEffect를 사용합니다.
useEffect(() => { fetchLines();}, []);
// 5. 사용자가 공정 라인 등록 폼을 제출(Submit)했을 때 실행되는 핸들러 함수입니다.
const handleSubmit = async (e:React.FormEvent) => {
   e.preventDefault();
// 폼 제출 시 페이지가 새로고침되는 기본 동작을 방지합니다.   
   try{
const token = localStorage.getItem("token");
//입력 폼 데이터(form)와 토큰을 담아 백엔드 공정 등록 API로 POST 요청을 보냅니다.
await axios.post("http://localhost:4000/api/process/lines", form, {
   headers: { Authorization: `Bearer ${token}` }
})

alert("공정 라인이 등록되었습니다."); // 성공 알림창을 띄웁니다.
setForm({
   lineName:"", processType:"", currentProduct:"", operator:"",
});
fetchLines();
// 최신 목록을 다시 불러와 화면에 반영합니다.
   }catch(err){
alert("등록 실패"); // 실패 시 알림창을 띄웁니다.
   }
}
return(
 <Layout>
<S.CalendarLayout>
   {/* 좌측 패널: 신규 공정 라인을 입력하고 등록하는 폼 영역 */}
   <S.LeftPanel>
<S.Title>
라인 공정 등록   
</S.Title>
<S.Form onSubmit={handleSubmit}>

<S.Input type="text"
placeholder="라인명 (예: AP SMT Line 1)"
value={form.lineName}
onChange={e => setForm({...form, lineName:e.target.value})}
/>

<S.Input type="text"
placeholder="공정 타입 (예: SMT, CNC)"
value={form.processType}
onChange={e => setForm({...form, processType:e.target.value})}
/>

<S.Input type="text"
placeholder="생산 모델 (예: iPhone Duo)"
value={form.currentProduct}
onChange={e => setForm({...form, currentProduct:e.target.value})}
/>

<S.Input type="text"
placeholder="담당 오퍼레이터"
value={form.operator}
onChange={e => setForm({...form, operator:e.target.value})}
/>

<S.Button type="submit" $variant="primary" $fullWidth
>
등록하기
</S.Button>

</S.Form>
   </S.LeftPanel>
{/* 우측 패널: 등록된 공정 라인들의 실시간 가동 상태를 보여주는 모니터링 영역 */}
   <S.RightPanel>
<S.Title>
iPhone Duo 라인 가동 현황   
</S.Title>
<S.Grid>
{/*  lines 배열을 순회(map)하며 각 공정 라인 카드를 화면에 동적으로 렌더링합니다 */}   
{lines.map(line => (
<S.LineCard key={line.id}>
<strong>{line.lineName}</strong>
[{line.processType}] - 상태:{" "}
<S.StatusBadge $isRunning={line.status === 'RUNNING'}>
   {line.status}
</S.StatusBadge>
</S.LineCard>   
))}
</S.Grid>
   </S.RightPanel>
</S.CalendarLayout>
 </Layout>       
    )
}