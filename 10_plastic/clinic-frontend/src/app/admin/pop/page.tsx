"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiClock } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

interface PopupData {
    id: number;
    title: string;
    link: string;
    startDate: string;
    endDate: string;
    useTodayClose: boolean;
    fileName?:string;
}

export default function Pop() {
    // 🎯 상태 관리: 팝업 글로벌 설정
    const [maxPopups, setMaxPopups] = useState<number>(1);
    
    // 🎯 상태 관리: 팝업 목록 데이터
    const [popups, setPopups] = useState<PopupData[]>([]);

    // 🎯 상태 관리: 새 팝업 등록 폼
    const [newPopup, setNewPopup] = useState<Partial<PopupData>>({
        title: "", link: "", startDate: "", endDate: "", useTodayClose: true
    });

    //이미지 파일 객체를 저장할 상태추가
    const[selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");

    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    // 실시간 상태 업데이트를 위한 타이머
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().getTime()), 60000);
        return () => clearInterval(timer);
    }, []);

//db에서 불러오기
const fetchPopups = async () => {
    try{
const response =
await axios.get("http://localhost:4000/api/admin/popups");
if(response.data.success) {
    setMaxPopups(response.data.maxPopups);
    const formattedPopups = response.data.popups.map((p:any) => ({
id:p.POPUP_IDX,
title:p.TITLE,
link:p.LINK,
fileName:p.FILE_NAME,
startDate:p.START_DATE,
endDate:p.END_DATE,
useTodayClose:p.USE_TODAY_CLOSE ==='Y'
    }));
    setPopups(formattedPopups);
}
    }catch(error) {
console.error("팝업목록로드실패:",error);
    }
}



    // 🕒 날짜 비교 로직
    const getPopupStatus = (start: string, end: string) => {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        
        if (currentTime < startTime) return { label: "대기중", color: "#f6c23e" };
        if (currentTime > endTime) return { label: "기간만료", color: "#e74a3b" };
        return { label: "노출중", color: "#1cc88a" };
    };

    const handleAddPopup = async () => {
if (!newPopup.title || !newPopup.startDate || !newPopup.endDate || !selectedFile) {
    alert("제목과 시작/종료 일시를 모두 입력해주세요.");
    return;
}

const formData = new FormData();
formData.append("popupImg", selectedFile);
formData.append("title", newPopup.title);
formData.append("link", newPopup.link || "");
formData.append("startDate", newPopup.startDate);
formData.append("endDate", newPopup.endDate);
formData.append("useTodayClose", String(newPopup.useTodayClose));

try{
const response =
await axios.post("http://localhost:4000/api/admin/popups", formData,{
headers:{"Content-Type":"multipart/form-data"}    
})
if(response.data.success){
    alert("팝업이 등록 되었습니다");
setNewPopup({ title: "", link: "", startDate: "", endDate: "", useTodayClose: true });
setSelectedFile(null);
setFileName("");
fetchPopups();
}
}catch(error){
    console.error("팝업 등록 실패: ", error);
    alert("등록에 실패 했습니다");
}
};

const handleDelete = async (id: number) => {
    if (confirm("정말 이 팝업을 삭제하시겠습니까?")) {
        try{
const response =
await axios.delete(`http://localhost:4000/api/admin/popups/${id}`);
if(response.data.success) fetchPopups();
}catch(error){
console.error("팝업 삭제 실패:", error);
}
}
};

const handleSave = async () => {
try{
const response =
await axios.put("http://localhost:4000/api/admin/popups/setting", {maxPopups});
if(response.data.success){
    setIsSavePopupOpen(true);
}
}catch(error){
    const payload = { maxPopups, popups };
console.log("설정 저장 실패:", error);

}
};

    return (
        <>
<Layout>
                <S.PopContainer>
                    <S.PopPageHeader>
                        <S.PopPageTitle>메인 팝업 관리</S.PopPageTitle>
                        <S.PopSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.PopSaveButton>
                    </S.PopPageHeader>

                    <S.PopGrid>
                        <S.PopLeftColumn>
                            <S.PopCard style={{ marginBottom: '1.5rem' }}>
                                <S.PopCardHeader>
                                    <S.PopCardTitle>기본 설정</S.PopCardTitle>
                                </S.PopCardHeader>
                                <S.PopCardBody>
                                    <S.PopFormGroup>
                                        <S.PopLabel>동시 노출 가능한 최대 팝업 갯수</S.PopLabel>
                                        <S.PopInput 
                                            type="number" min={1} max={5} value={maxPopups} 
                                            onChange={(e) => setMaxPopups(Number(e.target.value))} 
                                            style={{ width: '120px' }}
                                        />
                                        <small style={{ color: '#858796', marginTop: '0.5rem', display: 'block' }}>
                                            * '노출중' 상태인 팝업이 이 설정값을 초과하면, 최신 등록순으로 보여집니다.
                                        </small>
                                    </S.PopFormGroup>
                                </S.PopCardBody>
                            </S.PopCard>

                            <S.PopCard>
                                <S.PopCardHeader>
                                    <S.PopCardTitle>새 팝업 등록</S.PopCardTitle>
                                </S.PopCardHeader>
                                <S.PopCardBody>
                                    <S.PopFormGroup>
                                        <S.PopLabel>팝업 제목 (관리용)</S.PopLabel>
                                        <S.PopInput 
                                            type="text" placeholder="예: 수능 할인 이벤트" value={newPopup.title}
                                            onChange={(e) => setNewPopup({...newPopup, title: e.target.value})}
                                        />
                                    </S.PopFormGroup>

                                    <S.PopFormGroup>
                                        <S.PopLabel>이미지 등록</S.PopLabel>
                                        <S.PopFileInputWrapper>
                                            <S.PopFileInput 
                                                type="file" id="popup-img" accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setSelectedFile(file);
                                                        setFileName(file.name);
                                                    }
                                                }}
                                            />
                                            <S.PopFileLabel htmlFor="popup-img"><FiImage /> 이미지 선택</S.PopFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.PopFileInputWrapper>
                                    </S.PopFormGroup>

                                    <S.PopFormGroup>
                                        <S.PopLabel><FiClock /> 노출 기간 설정</S.PopLabel>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <S.PopInput 
                                                type="datetime-local" value={newPopup.startDate}
                                                onChange={(e) => setNewPopup({...newPopup, startDate: e.target.value})}
                                            />
                                            <span>~</span>
                                            <S.PopInput 
                                                type="datetime-local" value={newPopup.endDate}
                                                onChange={(e) => setNewPopup({...newPopup, endDate: e.target.value})}
                                            />
                                        </div>
                                    </S.PopFormGroup>

                                    <S.PopFormGroup>
                                        <S.PopLabel>클릭 시 이동할 링크 URL (선택)</S.PopLabel>
                                        <S.PopInput 
                                            type="text" placeholder="예: /event/1" value={newPopup.link}
                                            onChange={(e) => setNewPopup({...newPopup, link: e.target.value})}
                                        />
                                    </S.PopFormGroup>

                                    <S.PopCheckboxLabel>
                                        <input 
                                            type="checkbox" checked={newPopup.useTodayClose}
                                            onChange={(e) => setNewPopup({...newPopup, useTodayClose: e.target.checked})}
                                        />
                                        "오늘 하루 보지 않음" 버튼 사용하기
                                    </S.PopCheckboxLabel>

                                    <S.PopAddButton onClick={handleAddPopup}>
                                        <FiPlus size={18} /> 새 팝업 추가하기
                                    </S.PopAddButton>
                                </S.PopCardBody>
                            </S.PopCard>
                        </S.PopLeftColumn>

                        <S.PopRightColumn>
                            <S.PopCard style={{ height: '100%' }}>
                                <S.PopCardHeader>
                                    <S.PopCardTitle>등록된 팝업 목록 (총 {popups.length}건)</S.PopCardTitle>
                                </S.PopCardHeader>
                                <S.PopTableWrapper>
                                    <S.PopTable>
                                        <thead>
                                            <tr>
                                                <th>미리보기</th>
                                                <th>제목 / 링크</th>
                                                <th>노출 기간</th>
                                                <th>옵션</th>
                                                <th>상태</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {popups.map(popup => {
                                                const status = getPopupStatus(popup.startDate, popup.endDate);
                                                return (
                                                    <tr key={popup.id}>
                                                        <td>
                                                            {popup.fileName && (
                                                                <img src={`http://localhost:4000/images/${popup.fileName}`} alt="popup" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                            )}
                                                        </td>
                                                        <td style={{ textAlign: 'left' }}>
                                                            <strong>{popup.title}</strong>
                                                            <div style={{ fontSize: '0.8rem', color: '#858796' }}>{popup.link || '링크 없음'}</div>
                                                        </td>
                                                        <td>
                                                            <div style={{ fontSize: '0.85rem' }}>{popup.startDate.replace("T", " ")}</div>
                                                            <div style={{ fontSize: '0.85rem', color: '#858796' }}>~ {popup.endDate.replace("T", " ")}</div>
                                                        </td>
                                                        <td>
                                                            {popup.useTodayClose ? <S.PopBadge $color="#36b9cc">하루안보기 O</S.PopBadge> : <S.PopBadge $color="#858796">하루안보기 X</S.PopBadge>}
                                                        </td>
                                                        <td>
                                                            <S.PopBadge $color={status.color}>{status.label}</S.PopBadge>
                                                        </td>
                                                        <td>
                                                            <S.PopDeleteBtn onClick={() => handleDelete(popup.id)}>
                                                                <FiTrash2 size={16} />
                                                            </S.PopDeleteBtn>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            {popups.length === 0 && (
                                                <tr><td colSpan={6} style={{ padding: '3rem 0' }}>등록된 팝업이 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.PopTable>
                                </S.PopTableWrapper>
                            </S.PopCard>
                        </S.PopRightColumn>
                    </S.PopGrid>
                </S.PopContainer>
            </Layout>

            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                팝업 설정이 성공적으로 저장되었습니다.
            </Popup>
        </>
    );
}