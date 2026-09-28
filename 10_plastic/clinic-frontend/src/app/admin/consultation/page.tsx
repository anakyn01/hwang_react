"use client";

import React ,{useState, useEffect} from "react";
import axios from "axios";


import * as S from "@/assets/css/admin/Admin.style";
import { FiTrash2, FiSearch, FiCheck } from "react-icons/fi";

import { Layout } from "../Layout";

import {Popup} from "@/component/modal/Popup";

//임시 데이터 인터페이스
interface ConsultData{
ID:number; 
NAME:string; 
PHONE:string; 
DEPARTMENT:string; 
CREATED_AT:string;
STATUS: "대기중" | "상담완료";
}

export default function Consult(){

const [consultList, setConsultList] = useState<ConsultData[]>([]);
//팝업창 관리를 위한 상태
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

//화면이 켜질때 db에서 데이터 불러오기
const fetchConsults = async () => {
    try{
const response = await axios.get("http://localhost:4000/api/admin/consult");
if(response.data.success){setConsultList(response.data.data);}
    }catch(error){
console.error("상담 내역 로드 실패: ", error);
    }
};

useEffect(() =>{
fetchConsults();
},[]);

//변경
const toggleStatus = async (id:number) => {
try{
await axios.put(`http://localhost:4000/api/admin/consult/${id}/status`);
fetchConsults();
}catch (error) {
alert("상태 변경에 실패 했습니다");
}
};
//삭제 우리가 만든 팝업 폼으로 바꾸세요
const handleDeleteClick = (id:number ) => {
setDeleteTargetId(id);
setIsPopupOpen(true);
};

//확인을 누를때 실제 삭제 처리
const confrimDelete = async () => {
    if(!deleteTargetId) return;

    try{
await axios.delete(`http://localhost:4000/api/admin/consult/${deleteTargetId}`);
setIsPopupOpen(false);
fetchConsults();
    }catch(error){
alert("삭제에 실패")
    }
}

// 💡 최신 Temporal API를 활용한 날짜 포맷 함수
    const formatDate = (dateString: string) => {
        let dateTime;
        
        try {
            // 1. UTC 기준 ISO 문자열일 경우 (예: 2026-09-21T05:30:00Z) -> 한국 시간으로 변환
            dateTime = Temporal.Instant.from(dateString).toZonedDateTimeISO('Asia/Seoul');
        } catch (error) {
            // 2. 타임존 정보가 없는 일반 문자열일 경우 (예: 2026-09-21 14:30:00) 공백을 T로 치환 후 파싱
            const safeString = dateString.replace(' ', 'T');
            dateTime = Temporal.PlainDateTime.from(safeString);
        }

        // Temporal 객체에서 직관적으로 년/월/일/시/분 추출 (달이 0부터 시작하지 않고 1부터 시작함!)
        const year = dateTime.year;
        const month = String(dateTime.month).padStart(2, '0');
        const day = String(dateTime.day).padStart(2, '0');
        const hour = String(dateTime.hour).padStart(2, '0');
        const minute = String(dateTime.minute).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}`;
    };


    return(
        <>
        <Layout>
          <S.ConsultContainer>
                    <S.ConsultPageHeader>
                        <S.ConsultPageTitle>상담신청 관리</S.ConsultPageTitle>
                    </S.ConsultPageHeader>

                    <S.ConsultFilterCard>
                        <S.ConsultInputGroup>
                            <S.ConsultInput type="text" placeholder="이름 또는 연락처 검색" />
                            <S.ConsultSearchButton>
                                <FiSearch size={16} /> 검색
                            </S.ConsultSearchButton>
                        </S.ConsultInputGroup>
                    </S.ConsultFilterCard>

                    <S.ConsultTableCard>
                        <S.ConsultCardHeader>
                            <S.ConsultCardTitle>빠른 상담신청 접수 내역</S.ConsultCardTitle>
                        </S.ConsultCardHeader>
                        
                        <S.ConsultTableWrapper>
                            <S.ConsultTable>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>이름</th>
                                        <th>연락처</th>
                                        <th>상담분야</th>
                                        <th>신청일시</th>
                                        <th>상태</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultList.map((item, index) => (
                                        <tr key={item.ID}>
                                            <td>{consultList.length - index}</td>
                                            <td><strong>{item.NAME}</strong></td>
                                            <td>{item.PHONE}</td>
                                            <td>{item.DEPARTMENT}</td>
                                            {/* 💡 Temporal이 적용된 포맷 함수로 렌더링 */}
                                            <td>{formatDate(item.CREATED_AT)}</td>
                                            <td>
                                                <S.ConsultStatusBadge 
                                                    $status={item.STATUS} 
                                                    onClick={() => toggleStatus(item.ID)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {item.STATUS === "상담완료" && <FiCheck size={12} />}
                                                    {item.STATUS}
                                                </S.ConsultStatusBadge>
                                            </td>
                                            <td>
                                                <S.ConsultDeleteActionBtn onClick={() => handleDeleteClick(item.ID)}>
                                                    <FiTrash2 size={16} />
                                                </S.ConsultDeleteActionBtn>
                                            </td>
                                        </tr>
                                    ))}
                                    {consultList.length === 0 && (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                                                접수된 상담 내역이 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </S.ConsultTable>
                        </S.ConsultTableWrapper>
                    </S.ConsultTableCard>
                </S.ConsultContainer>
        </Layout>

        <Popup
isOpen={isPopupOpen}
title="상담 내역 삭제"
onClose={() => setIsPopupOpen(false)}   
onConfirm={confrimDelete}     
        >
        정말 이 상담 내역을 삭제하시겠습니까?
        <br/>삭제된 데이터는 복구할 수 없습니다.    
        </Popup>
        </>
    )
}