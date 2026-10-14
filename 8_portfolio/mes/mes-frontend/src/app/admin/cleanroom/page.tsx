"use client";

import { useState, useEffect} from "react";
import axios from "axios";
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";
import { AlertModal } from "@/components/modal/AlertModal";

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

// 💡 알림 모달의 오픈 여부와 표시할 메시지를 관리하는 상태
const [isAlertOpen, setIsAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState("");

const fetchEquipments = async ()  => {
   try{
const token =
localStorage.getItem("token");
const res =
await axios.get("http://localhost:4000/api/equipment/status",{
    headers:{Authorization:`Bearer ${token}`}
});

if(res.data.success) setEquipments(res.data.equipments);

   }catch (err){
console.error("클린룸 설비 조회 실패", err)
   }
}

useEffect(() => {fetchEquipments();}, []);

const handleSubmit = async (e:React.FormEvent) => {
   e.preventDefault();
   try{
const token =
localStorage.getItem("token");
await axios.post("http://localhost:4000/api/equipment/status", form,{
    headers:{Authorization:`Bearer ${token}`}
});
//여러분이 만든..
// 💡 등록 성공 시 커스텀 모달 호출
setAlertMessage("설비 상태가 성공적으로 전송되었습니다.");
setIsAlertOpen(true);


fetchEquipments();
   }catch(err){
//여러분이 만든.. 
// 💡 등록 실패 시 커스텀 모달 호출
setAlertMessage("전송 실패");
setIsAlertOpen(true);    
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

{/* 💡 설비 상태 전송 성공/실패 시 렌더링될 커스텀 알림 모달 */}
<AlertModal 
isOpen={isAlertOpen}
message={alertMessage}
onClose={() => setIsAlertOpen(false)}
/>            
        </Layout>    
      
    );
}