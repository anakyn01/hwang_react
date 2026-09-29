"use client";

import React ,{useState, useEffect} from "react";
import axios from "axios";


import * as S from "@/assets/css/admin/Admin.style";
import { FiTrash2, FiSearch, FiCheck } from "react-icons/fi";

import { Layout } from "../Layout";

import {Popup} from "@/component/modal/Popup";
import { Temporal } from '@js-temporal/polyfill';

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
//검색 및 페이징을 위한 상태 추가
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 10;//10개까지 보여주고 11개부터 다음 페이지로


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

// 💡 2. 검색어에 맞게 데이터 필터링 (이름 또는 전화번호)
const filteredList = consultList.filter((item) => {
    if (!searchTerm) return true;
    return item.NAME.includes(searchTerm) || item.PHONE.includes(searchTerm);
});

/*
💡 3. 페이징 처리 계산
전체 데이터 개수를 한 페이지당 개수(10개)로 나눈 뒤
소수점이 남으면 올림(Math.ceil)하여 전체 페이지 수를 구합니다.
데이터가 11개면 1.1이 되므로 올림해서 2페이지로 계산
*/
const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
// 검색된 전체 리스트(filteredList)에서 
// 현재 페이지에 보여줄 데이터만 싹둑 잘라냅니다(slice).
const paginatedList = filteredList.slice(
//자르기 시작할 번호 (1페이지면 0번부터, 2페이지면 10번부터)
(currentPage - 1) * ITEMS_PER_PAGE,
//자르기를 끝낼 번호 (1페이지면 10번 앞까지, 2페이지면 20번 앞까지)
currentPage * ITEMS_PER_PAGE
);
//검색어 입력 핸들러 (사용자가 검색창에 키보드를 칠 때마다 실행됨)
const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
// 사용자가 방금 입력한 글자를 검색어 상태(State)에 실시간으로 저장합니다.    
setSearchTerm(e.target.value);
//검색어가 바뀌면 결과 리스트가 변하므로, 보던 페이지가 어디였든 무조건 1페이지로 초기화해 줍니다.
setCurrentPage(1);
}


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
const confirmDelete = async () => {
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
        let dateTime: any;
        
        try {
            // 1. UTC 기준 ISO 문자열일 경우 (예: 2026-09-21T05:30:00Z) -> 한국 시간으로 변환
            //@ts-ignore
            dateTime = Temporal.Instant.from(dateString).toZonedDateTimeISO('Asia/Seoul');
        } catch (error) {
            // 2. 타임존 정보가 없는 일반 문자열일 경우 (예: 2026-09-21 14:30:00) 공백을 T로 치환 후 파싱
            const safeString = dateString.replace(' ', 'T');
             //@ts-ignore
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
<S.ConsultInput type="text" placeholder="이름 또는 연락처 검색" 
value={searchTerm}
onChange={handleSearchChange}
/>
{/*input요소의 onChange 이벤트는 입력필드의 값을 변경할때 발생하는 이벤트 */}
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
{paginatedList.map((item, index) => {
const displayIndex = 
filteredList.length - ((currentPage - 1) * ITEMS_PER_PAGE + index);  
return(  
                                        <tr key={item.ID}>
                                            <td>{displayIndex}</td>
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
);
})}
                                    {paginatedList.length === 0 && (
                                        <tr>
<td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
{searchTerm ?"검색 결과가 없습니다.":"접수된 상담 내역이 없습니다" }  
</td>
                                        </tr>
                                    )}
                                </tbody>
                            </S.ConsultTable>
                        </S.ConsultTableWrapper>
{totalPages > 1 && (
    <S.Pagenation>
{Array.from({ length:totalPages}, (_, i) => i + 1).map((page) =>(
<S.PagenationBtn
key={page}
onClick={() => setCurrentPage(page)}
>{page}</S.PagenationBtn>
))}       
    </S.Pagenation>
)}                      
                    </S.ConsultTableCard>
                </S.ConsultContainer>
        </Layout>

        <Popup
isOpen={isPopupOpen}
title="상담 내역 삭제"
onClose={() => setIsPopupOpen(false)}   
onConfirm={confirmDelete}     
        >
        정말 이 상담 내역을 삭제하시겠습니까?
        <br/>삭제된 데이터는 복구할 수 없습니다.    
        </Popup>
        </>
    )
}