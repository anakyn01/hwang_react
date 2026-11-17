"use client";

import { useState, useEffect} from "react";
import axios from "axios";
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

interface EquipmentItem {
   id:number;
   equipmentName:string;
   cleanroomZone:string;
   temperature:number;
   humidity:number;
   status:string;
}

export default function CleanroomPage(){
const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
const [form, setForm] = useState({ equipmentName: "", cleanroomZone: "Zone A (Class 100)", temperature: 22.5, humidity: 45.0, status: "NORMAL" });

const fetchEquipments = async ()  => {
   try{

   }catch (err){

   }
}

useEffect(() => {fetchEquipments();}, []);

const handleSubmit = async (e:React.FormEvent) => {
   e.preventDefault();
   try{

   }catch(err){
      
   }
}

    return(

<Layout>
            <S.CalendarLayout>
                <S.LeftPanel>
<S.Title>클린룸 및 설비 등록</S.Title>
<S.Form onSubmit={handleSubmit}>
<S.Input 
type="text" 
placeholder="설비명 (예: CNC Machine #3)" 
value={form.equipmentName} 
onChange={e => setForm({...form, equipmentName: e.target.value})}
/>
<S.Input 
type="text" 
placeholder="클린룸 구역" 
value={form.cleanroomZone} 
onChange={e => setForm({...form, cleanroomZone: e.target.value})}
/>
<S.Input 
type="number" 
step="0.1" 
placeholder="온도 (℃)" 
value={form.temperature} 
onChange={e => setForm({...form, temperature: Number(e.target.value)})}
/>
<S.Input 
type="number" 
step="0.1" 
placeholder="습도 (%)" 
value={form.humidity} 
onChange={e => setForm({...form, humidity: Number(e.target.value)})} 
/>
<S.Button 
type="submit" 
$fullWidth
$variant="primary"
>상태 전송
</S.Button>
</S.Form>
                </S.LeftPanel>
                <S.RightPanel>
                    <S.Title>클린룸 환경 및 설비 관제</S.Title>
                    <S.Grid>
                        {equipments.map(item => {
const isWarning = item.status !== "RUNNING" && item.status !== "NORMAL";
const isRunning = item.status === "RUNNING" || item.status !== "NORMAL";

                           return(
<S.LineCard key={item.id} $isWarning={isWarning}>
<p><strong>{item.equipmentName}</strong></p>
<p>({item.cleanroomZone})</p>
<p>온도: {item.temperature}℃</p> 
<p>습도: {item.humidity}%</p>
<S.StatusBadge $isRunning={isRunning} $isWarning={isWarning}>
   상태:{item.status}
</S.StatusBadge>
</S.LineCard>
);
})}
                    </S.Grid>
                </S.RightPanel>
            </S.CalendarLayout>
        </Layout>    
      
    );
}