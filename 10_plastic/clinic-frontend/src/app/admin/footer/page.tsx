"use client";
import React, { useState } from "react";
import * as S from "@/assets/css/Style.style";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { Layout } from "../Layout";
import { Popup } from "@/component/modal/Popup";

interface ScheduleData{
id:number; department:string; weekday:string;
night:string; weekend:string;
}

interface FamilySiteData{
id:number; name:string; url:string;
}

export default function FooterSetting(){
const [companyInfo, setCompanyInfo] = useState({
    name:"",
    address:"",
    clinicName:"",
    phone:"",
    email:"",
    locationUrl:""
});

const [schedules, setSchedules] = useState<ScheduleData[]>([
{ id: 1, department: "성형외과", weekday: "AM 09:00 - PM 06:00", night: "", weekend: "PM 09:00 - PM 03:00" },
{ id: 2, department: "스킨케어", weekday: "AM 09:00 - PM 06:00", night: "", weekend: "PM 09:00 - PM 03:00" }
]);

const [familySites, setFamilySites] = useState<FamilySiteData[]>([
{ id: 1, name: "Breast Surgery Center", url: "#" },
{ id: 2, name: "Derm", url: "#" },
{ id: 3, name: "Lifting Center", url: "#" }
]);

const [isSavePopupOpen, setIsSavePopupOpen] =useState(false);

//1. 진료시간 수정 핸들러 (입력창에 글자를 칠 때마다 실행)
const handleScheduleChange = 
(id:number, field:keyof ScheduleData, value:string) => {
setSchedules(schedules.map(sch =>
// 현재 확인 중인 항목의 id가 내가 지금 글자를 
// 치고 있는 항목의 id와 같다면?    
sch.id === id
// 기존 데이터(...sch)는 그대로 유지한 채, 
// 변경된 특정 칸([field])만 새로운 글자(value)로 덮어씌웁니다
? {...sch, [field]:value}
//id가 다르면 내가 건드린 항목이 아니므로 
// 아무것도 바꾸지 않고 그대로 둡니다.
: sch
));
};

//2. 패밀리 사이트 추가 핸들러 ('추가' 버튼 클릭 시 실행)
const handleAddFamilySite = () => {
    setFamilySites([...familySites,{id:Date.now(), name:"", url:""}]);
}
//3. 패밀리 사이트 삭제 핸들러 (휴지통 버튼 클릭 시 실행)
const handleRemoveFamilySite = (id:number) => {
/*
filter 함수를 사용해, 휴지통을 누른 항목의 id와
'일치하지 않는' 항목들만 걸러냅니다.
선택된 녀석만 쏙 빼고 나머지들로만 새로운 배열을 만들어
덮어씌우는 방식으로 삭제를 구현합니다.
*/
setFamilySites(familySites.filter(site => site.id !== id));
}
//4. 패밀리 사이트 정보 수정 핸들러 (사이트명이나 URL 입력 시 실행)
const handleFamilySiteChange=(
id:number, field:keyof FamilySiteData, value:string)=>{
setFamilySites(familySites.map(site =>
  site.id === id
  ? {...site, [field]:value}
  : site  
))
};
//5. 최종 저장 핸들러 ('설정 저장하기' 버튼 클릭 시 실행)
const handleSave = () => {
const payload = {companyInfo, schedules, familySites};
console.log("DB에 저장될 푸터 데이터:", payload);
setIsSavePopupOpen(true);
};
    return(
        <>
        <Layout>
 <S.FooterAdminContainer>
                    <S.FooterPageHeader>
                        <S.FooterPageTitle>푸터(하단 영역) 관리</S.FooterPageTitle>
                        <S.FooterSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.FooterSaveButton>
                    </S.FooterPageHeader>

                    <S.FooterGrid>
                        {/* 🏢 1. 병원 기본 정보 카드 */}
                        <S.FooterCard>
                            <S.FooterCardHeader>
                                <S.FooterCardTitle>병원 기본 정보</S.FooterCardTitle>
                            </S.FooterCardHeader>
                            <S.FooterCardBody>
                                <S.FooterFormGroup>
                                    <S.FooterLabel>병원명 (타이틀)</S.FooterLabel>
                                    <S.FooterInput 
                                        type="text" 
                                        value={companyInfo.name}
                                        onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                                    />
                                </S.FooterFormGroup>
                                <S.FooterFormGroup>
                                    <S.FooterLabel>상세 주소</S.FooterLabel>
                                    <S.FooterInput 
                                        type="text" 
                                        value={companyInfo.address}
                                        onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                                    />
                                </S.FooterFormGroup>
                                <S.FooterFlexRow>
                                    <S.FooterFormGroup>
                                        <S.FooterLabel>의료기관 명칭</S.FooterLabel>
                                        <S.FooterInput 
                                            type="text" 
                                            value={companyInfo.clinicName}
                                            onChange={(e) => setCompanyInfo({...companyInfo, clinicName: e.target.value})}
                                        />
                                    </S.FooterFormGroup>
                                    <S.FooterFormGroup>
                                        <S.FooterLabel>대표번호</S.FooterLabel>
                                        <S.FooterInput 
                                            type="text" 
                                            value={companyInfo.phone}
                                            onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                                        />
                                    </S.FooterFormGroup>
                                    <S.FooterFormGroup>
                                        <S.FooterLabel>이메일</S.FooterLabel>
                                        <S.FooterInput 
                                            type="text" 
                                            value={companyInfo.email}
                                            onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                                        />
                                    </S.FooterFormGroup>
                                </S.FooterFlexRow>
                                <S.FooterFormGroup style={{ marginBottom: 0 }}>
                                    <S.FooterLabel>'오시는길 바로가기' 버튼 링크 URL</S.FooterLabel>
                                    <S.FooterInput 
                                        type="text" 
                                        value={companyInfo.locationUrl}
                                        onChange={(e) => setCompanyInfo({...companyInfo, locationUrl: e.target.value})}
                                    />
                                </S.FooterFormGroup>
                            </S.FooterCardBody>
                        </S.FooterCard>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* ⏰ 2. 진료 시간 안내 카드 */}
                            <S.FooterCard>
                                <S.FooterCardHeader>
                                    <S.FooterCardTitle>진료 시간 안내 (CS CENTER)</S.FooterCardTitle>
                                </S.FooterCardHeader>
                                <S.FooterCardBody>
                                    {schedules.map((sch, index) => (
                                        <div key={sch.id} style={{ marginBottom: index === schedules.length - 1 ? 0 : '1.5rem', paddingBottom: index === schedules.length - 1 ? 0 : '1.5rem', borderBottom: index === schedules.length - 1 ? 'none' : '1px dashed #e3e6f0' }}>
                                            <S.FooterFormGroup>
                                                <S.FooterLabel>구분명 (예: 성형외과, 스킨케어)</S.FooterLabel>
                                                <S.FooterInput 
                                                    type="text" 
                                                    value={sch.department}
                                                    onChange={(e) => handleScheduleChange(sch.id, 'department', e.target.value)}
                                                />
                                            </S.FooterFormGroup>
                                            <S.FooterFlexRow>
                                                <S.FooterFormGroup>
                                                    <S.FooterLabel>평일 시간</S.FooterLabel>
                                                    <S.FooterInput 
                                                        type="text" 
                                                        value={sch.weekday}
                                                        onChange={(e) => handleScheduleChange(sch.id, 'weekday', e.target.value)}
                                                    />
                                                </S.FooterFormGroup>
                                                <S.FooterFormGroup>
                                                    <S.FooterLabel>야간 진료 (없으면 비워두기)</S.FooterLabel>
                                                    <S.FooterInput 
                                                        type="text" 
                                                        value={sch.night}
                                                        onChange={(e) => handleScheduleChange(sch.id, 'night', e.target.value)}
                                                    />
                                                </S.FooterFormGroup>
                                                <S.FooterFormGroup>
                                                    <S.FooterLabel>토요일 시간</S.FooterLabel>
                                                    <S.FooterInput 
                                                        type="text" 
                                                        value={sch.weekend}
                                                        onChange={(e) => handleScheduleChange(sch.id, 'weekend', e.target.value)}
                                                    />
                                                </S.FooterFormGroup>
                                            </S.FooterFlexRow>
                                        </div>
                                    ))}
                                </S.FooterCardBody>
                            </S.FooterCard>

                            {/* 🔗 3. 패밀리 사이트 카드 */}
                            <S.FooterCard>
                                <S.FooterCardHeader>
                                    <S.FooterCardTitle>패밀리 사이트 설정</S.FooterCardTitle>
                                </S.FooterCardHeader>
                                <S.FooterCardBody>
                                    {familySites.map((site) => (
                                        <S.FooterFamilyRow key={site.id}>
                                            <S.FooterInput 
                                                type="text" 
                                                placeholder="사이트명 (예: Derm)"
                                                value={site.name}
                                                onChange={(e) => handleFamilySiteChange(site.id, 'name', e.target.value)}
                                            />
                                            <S.FooterInput 
                                                type="text" 
                                                placeholder="연결 URL (예: https://...)"
                                                value={site.url}
                                                onChange={(e) => handleFamilySiteChange(site.id, 'url', e.target.value)}
                                            />
                                            <S.FooterDeleteBtn onClick={() => handleRemoveFamilySite(site.id)}>
                                                <FiTrash2 size={18} />
                                            </S.FooterDeleteBtn>
                                        </S.FooterFamilyRow>
                                    ))}
                                    <S.FooterAddButton onClick={handleAddFamilySite}>
                                        <FiPlus size={18} /> 패밀리 사이트 추가
                                    </S.FooterAddButton>
                                </S.FooterCardBody>
                            </S.FooterCard>
                        </div>
                    </S.FooterGrid>
                </S.FooterAdminContainer>           
        </Layout>
        </>
    )
}