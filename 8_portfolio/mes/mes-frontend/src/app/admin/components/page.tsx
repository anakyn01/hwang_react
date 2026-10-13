"use client";

import { useState, useEffect} from "react";
import axios from "axios";
import {Layout} from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

interface ComponentItem{
   id:number;
   componentName:string;
   category:string;
   stockQuantity:number;
   minThreshold:number;
   supplier:string;
   status:string;
}

export default function ScmPage(){
// 1. SCM 부품 목록 데이터를 관리하는 상태(components)와 초기 빈 배열 설정
const [components, setComponents] =
useState<ComponentItem[]>([]);

// 2. 신규 자재 등록 폼의 입력값들을 관리하는 상태(form)와 초기값 설정
const [form, setForm] =
useState({
   componentName:"", category:"", stockQuantity:0,
   minThreshold:100, supplier:""
})
// 3. 백엔드 서버로부터 현재 등록된 SCM 자재 목록을 비동기로 조회해오는 함수입니다.
const fetchComponents= async () => {
   try{
const token =
localStorage.getItem("token");
const res =
await axios.get("http://localhost:4000/api/scm/components",{
   headers:{Authorization:`Bearer ${token}`}
})
if(res.data.success) setComponents(res.data.components);
   }catch(err){
console.error("SCM 조회 실패", err);
   }
}
// 4. 컴포넌트가 처음 화면에 나타날 때(Mount) 자재 목록을 자동으로 불러오기 위해 useEffect를 사용합니다.
useEffect(() => {fetchComponents();},[]);
// 5. 사용자가 자재 등록 폼을 제출(Submit)했을 때 실행되는 핸들러 함수입니다. 
const handleSubmit = async(e:React.FormEvent) => {
   e.preventDefault();
   try{
const token =
localStorage.getItem("token");
await axios.post("http://localhost:4000/api/scm/components", form, {
   headers:{Authorization:`Bearer ${token}`}
});
alert("자재 정보가 등록되었습니다.");
setForm({ componentName: "", category: "", stockQuantity: 0, minThreshold: 100, supplier: "" });
fetchComponents();   
}catch(err){
alert("등록 실패");
   }
};
return(
 <Layout>
    <S.CalendarLayout>

      <S.LeftPanel>
<S.Title>
부품 SCM 등록
</S.Title>
<S.Form onSubmit={handleSubmit}>
{/* 부품명 입력 필드 */}
<S.Input type="text" 
placeholder="부품명 (예: A19 Pro AP Chip)" 
value={form.componentName} 
onChange={e => setForm({...form, componentName: e.target.value})} />
{/* 카테고리 입력 필드 */}
<S.Input type="text" 
placeholder="카테고리 (CHIP, CAMERA 등)" 
value={form.category} 
onChange={e => setForm({...form, category: e.target.value})} />
{/* 현재 재고 수량 입력 필드 */}
<S.Input type="number" 
placeholder="현재 재고 수량" 
value={form.stockQuantity} 
onChange={e => setForm({...form, stockQuantity: Number(e.target.value)})} />
{/* 안전 재고 임계값 입력 필드 */}
<S.Input type="number" 
placeholder="안전 재고 임계값" 
value={form.minThreshold} 
onChange={e => setForm({...form, minThreshold: Number(e.target.value)})} />
{/* 협력사 입력 필드 */}
<S.Input type="text" 
placeholder="협력사 (Supplier)" 
value={form.supplier} 
onChange={e => setForm({...form, supplier: e.target.value})} />
{/* 자재 등록 제출 버튼 */}
<S.Button 
type="submit"
$fullWidth
$variant="primary"
>자재 등록</S.Button>
</S.Form>
      </S.LeftPanel>

      <S.RightPanel>
<S.Title>
핵심 부품 공급망(SCM) 현황   
</S.Title>
<S.Grid>
{components.map(item => {
// 현재 자재의 상태가 WARNING인지 여부를 판별합니다.
const isWarning = item.status === "WARNING";
return(
   <S.LineCard key={item.id} $isWarning={isWarning}>
      <strong>{item.componentName}</strong>({item.category}) - 공급사:{item.supplier}

<p>재고:{item.stockQuantity}개 (안전기준:{item.minThreshold}) | 상태:{" "}    
   <S.StatusBadge  $isWarning={isWarning}>
      {item.status}
   </S.StatusBadge>
</p>  


   
   </S.LineCard>
);
})}
</S.Grid>
      </S.RightPanel>
    </S.CalendarLayout>
 </Layout>       
    )
}