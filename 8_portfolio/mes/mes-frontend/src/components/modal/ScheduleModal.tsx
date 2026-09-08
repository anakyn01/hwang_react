"use client";

import { useState, useEffect} from "react";
import { Temporal }from "@js-temporal/polyfill";
import * as S from "@/assets/css/Style.style";
import ModalLayout from "./ModalLayout";

export interface Schedule {
id:string; date:number; content:string;
status:"대기"|"진행"|"완료";
createdAt:string;
}

interface ScheduleModalProps {
isOpen: boolean; onClose:() => void;
month:number;
selectedDate:number | null;
schedules:Schedule[];
setSchedules:React.Dispatch<React.SetStateAction<Schedule[]>>;


       
}

export default function ScheduleModal({
    isOpen, onClose, month, selectedDate,
    schedules, setSchedules,
}: ScheduleModalProps){
    const [formContent, setFormContent] = useState("");
    const [formStatus, setFormStatus] = 
    useState<"대기"|"진행"|"완료">("대기");
    const [editingId, setEditingId] = 
    useState<string | null>(null);

    //커스텀 셀렉트 박스 열림 / 닫힘 상태
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    //모달이 열리거나 날짜가 바뀔대 입력창 초기화
    useEffect(() => {
        if(isOpen) {
            setFormContent("");
            setFormStatus("대기");
            setEditingId(null);
            setIsSelectOpen(false); //모달 열릴때 드롭다운 닫기
        }
    }, [isOpen, selectedDate]);

    if (!isOpen || selectedDate === null) return null;

    const handleSave = () => {
      if(!formContent.trim()) return;
      const currentTime = 
      Temporal.Now.plainTimeISO().toString().split(".")[0];

      if(editingId) {
        setSchedules((prev) => 
        prev.map((sch) => sch.id === editingId ? {
    ...sch, content:formContent, status:formStatus        
        } : sch));
      } else {
        setSchedules((prev) => [
            ...prev,{
id:crypto.randomUUID(),
date:selectedDate,
content:formContent,
status:formStatus,
createdAt:currentTime,
},
]);
}
setFormContent("");
setFormStatus("대기");
setEditingId(null);
    };

    const handleEdit = (sch:Schedule) => {
        setFormContent(sch.content);
        setFormStatus(sch.status);
        setEditingId(sch.id);
    }

    const handleDelete = (id:string) => {
        if(confirm("일정을 삭제하시겠습니까?")){
            setSchedules((prev) => prev.filter((sch) => sch.id !== id));
            if(editingId === id) {
                setFormContent("");
                setEditingId(null);
            }            
        }
    };

    return(
<ModalLayout
isOpen={isOpen}
onClose={onClose}
title={`${month}월 ${selectedDate}일 업무 일정`}
>
    <S.FormGroup>
<S.CustomSelectContainer>
    <S.SelectTrigger
    onClick={() => setIsSelectOpen(!isSelectOpen)}
    >
   {formStatus}
<span style={{ fontSize:"0.7rem", color:"#94a3b8"}}>
{isSelectOpen ? "▲" : "▼"}
</span>        
    </S.SelectTrigger>
{isSelectOpen && (
    <S.SelectList>
      {["대기", "진행", "완료"].map((status) => (
        <S.SelectItem
          key={status}
          $isSelected={formStatus === status}
          onClick={() => {
            setFormStatus(status as "대기" | "진행" | "완료");
            setIsSelectOpen(false);    
          }}
        >
          {status}
        </S.SelectItem>
      ))}
    </S.SelectList>                
  )}


</S.CustomSelectContainer>

<S.TextArea
placeholder="일정 내용을 입력하세요..."
value={formContent}
onChange={(e) => setFormContent(e.target.value)}
/>    
</S.FormGroup>





<S.ButtonGroup>
    <S.Button
onClick={handleSave}    
    >
{editingId ? "수정" :"등록"}        
    </S.Button>
<S.SearchButton
onClick={onClose}
>닫기</S.SearchButton>    
</S.ButtonGroup>

<S.ScheduleList>
{schedules.filter((sch) => sch.date === selectedDate).map((sch) => (
    <S.ScheduleItem key={sch.id}>
<S.ScheduleHeader>
<S.Badge $status={sch.status}>
{sch.status}    
</S.Badge>
<span>{sch.createdAt}작성</span>
</S.ScheduleHeader> 
<div className="">{sch.content}</div> 
<S.ButtonGroup>

<S.SmallButton
onClick={() => handleEdit(sch)}
>수정</S.SmallButton>

<S.SmallButton
onClick={() => handleDelete(sch.id)}
>삭제</S.SmallButton>
</S.ButtonGroup>      
    </S.ScheduleItem>
))}    
</S.ScheduleList>

</ModalLayout>        
    )
}

/*
<S.Select
value={formStatus}
onChange={(e) => setFormStatus(e.target.value as "대기" | "진행" | "완료")}
>
<option value="대기">대기</option>
<option value="진행">진행</option>
<option value="완료">완료</option>    
    </S.Select> 

*/