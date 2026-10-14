"use client";

import { useState, useEffect} from "react";
import axios from "axios";
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

interface AnalyticsRecord {
    id: number;
    lineName: string;
    targetCount: number;
    actualCount: number;
    defectCount: number;
    yieldRate: number;
}

export default function AnalyticsPage(){

const [records, setRecords] = 
useState<AnalyticsRecord[]>([]);
const [form, setForm] = 
useState({ lineName: "", targetCount: 1000, actualCount: 980, defectCount: 20 });

const fetchRecords = async () => {
   try{
const token =
localStorage.getItem("token");

const res = await axios.get("http://localhost:4000/api/analytics/records",{
    headers:{Authorization:`Bearer ${token}`}
});

if(res.data.success) setRecords(res.data.records);
   }catch(err){
//customModal
   }
}

useEffect(() => {fetchRecords();},[]);

const handleSubmit = async (e:React.FormEvent) => {
   e.preventDefault();
   try{
const token =
localStorage.getItem("token");

await axios.post("http://localhost:4000/api/analytics/records", form,{
    headers:{Authorization:`Bearer ${token}`}
});
//customModal
fetchRecords();
   }catch(err){
//customModal
   }
}

    return(

    <Layout>
            <S.CalendarLayout>
                <S.LeftPanel>
                    <S.Title>생산 실적 및 수율 입력</S.Title>
                    <S.Form onSubmit={handleSubmit} >
<S.Input 
type="text" 
placeholder="라인명" 
value={form.lineName} 
onChange={e => setForm({...form, lineName: e.target.value})} 
/>
<S.Input 
type="number" 
placeholder="목표 생산량" 
value={form.targetCount} 
onChange={e => setForm({...form, targetCount: Number(e.target.value)})} 
/>
<S.Input 
type="number" 
placeholder="실제 양품 생산량" 
value={form.actualCount} 
onChange={e => setForm({...form, actualCount: Number(e.target.value)})} 
 />
<S.Input 
type="number" 
placeholder="불량 대수" 
value={form.defectCount} 
onChange={e => setForm({...form, defectCount: Number(e.target.value)})} 
/>
<S.Button 
type="submit" 
$fullWidth
$variant="primary"
>실적 등록
</S.Button>
</S.Form>
</S.LeftPanel>
<S.RightPanel>
<S.Title>실시간 통합 관제 대시보드 (수율 분석)</S.Title>
<S.Grid>
{records.map(item => (
<S.LineCard key={item.id} >
<strong>{item.lineName}</strong>
<p>목표: {item.targetCount}</p>
<p> 양품: {item.actualCount}</p>
<p>불량: {item.defectCount}</p>
<p>공정 수율:<S.StatusBadge>{item.yieldRate}%</S.StatusBadge> </p>
</S.LineCard>
))}
</S.Grid>
</S.RightPanel>
</S.CalendarLayout>
        </Layout>
     
    );
}