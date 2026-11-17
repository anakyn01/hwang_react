"use client";

import { useState, useEffect} from "react";
import axios from "axios";
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

interface Inspection{
   id:number;
   serialNumber:string;
   inspectionType:string;
   result:string;//추가
   defectReason:string;
   inspector:string;
}

export default function QualityPage(){
const [inspections, setInspections] =
useState<Inspection[]>([]);

const [form, setForm] = useState<{
serialNumber:string; 
inspectionType:string;
result:string;
defectReason:string;
inspector:string;   
}>({
serialNumber:"", inspectionType:"VISION_SCRATCH", result:"PASS",
defectReason:"", inspector:"AI-Vision-Unit-01"    
});

const fetchInspections = async () => {
   try{

   }catch(err){

   }
}

useEffect(() => {fetchInspections();},[]);

const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try{

   }catch(err){

   }
}

    return(
 <Layout>
    <S.CalendarLayout>
                {/* 좌측 패널: AI 비전 품질 검사 결과를 입력하고 전송하는 폼 영역 */}
                <S.LeftPanel>
                    <S.Title>AI 비전 품질 검사 입력</S.Title>
                    <S.Form onSubmit={handleSubmit}>
                        {/* 기기 시리얼 번호 입력 필드 */}
                        <S.Input 
                        type="text" 
                        placeholder="기기 시리얼 번호 (S/N)" 
                        value={form.serialNumber} 
                        onChange={e => setForm({...form, serialNumber: e.target.value})} 
                        />
                        
                        {/* 검사 타입 선택 셀렉트박스 */}
                        <S.Select value={form.inspectionType} onChange={e => setForm({...form, inspectionType: e.target.value})}>
                            <option value="VISION_SCRATCH">미세 스크래치 비전 검사</option>
                            <option value="WATERPROOF_TEST">방수 씰링 기밀 검사</option>
                        </S.Select>
                        
                        {/* 검사 판정 결과 선택 셀렉트박스 (PASS / FAIL) */}
                        <S.Select value={form.result} onChange={e => setForm({...form, result: e.target.value})}>
                            <option value="PASS">PASS (양품)</option>
                            <option value="FAIL">FAIL (불량)</option>
                        </S.Select>
                        
                        {/* 불량 사유 입력 필드 */}
                        <S.Input type="text" 
                        placeholder="불량 사유 (불량일 경우 입력)" 
                        value={form.defectReason} 
                        onChange={e => setForm({...form, defectReason: e.target.value})} 
                        />
                        
                        {/* 검사 결과 전송 버튼 */}
                        <S.Button 
                        type="submit" 
                        $fullWidth
                        $variant="primary"
                        >검사 결과 전송
                        </S.Button>
                    </S.Form>
                </S.LeftPanel>
                
                {/* 우측 패널: 누적된 비전 검사 이력 로그를 모니터링하는 영역 */}
                <S.RightPanel>
                    <S.Title>비전 검사 이력 로그</S.Title>
                    <S.Grid>
                        {/* inspections 배열을 순회(map)하며 각 검사 이력 카드를 렌더링합니다. */}
                        {inspections.map(item => {
                            // PASS이면 연한 초록색(#f0fff4), FAIL이면 연한 빨간색(#fff5f5) 배경을 적용합니다.
const isPass = item.result === 'PASS';
return(
<S.LineCard key={item.id} $isPass={isPass}>
   <>
<strong>S/N: {item.serialNumber}</strong> 
<p>[{item.inspectionType}]</p>   
   </>
 <p>판정:{""}</p>                               
 <S.StatusBadge $isRunning={isPass} $isWarning={!isPass}>
{item.result}
</S.StatusBadge>
{item.defectReason && `(사유: ${item.defectReason})`}                              
 </S.LineCard>
 ); 
})}
                    </S.Grid>
                </S.RightPanel>
            </S.CalendarLayout>
 </Layout>       
    )
}