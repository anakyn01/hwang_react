"use client";
import React,{useState} from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/Style.style";
import {FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp,
    FiArrowDown} from "react-icons/fi"
import {Popup} from "@/component/modal/Popup";    

/*
타입스크립트에서 인터페이스란..
- 데이터의 구조(타입)를 미리 정의
- 개발자가 실수를 하지 않도록 방지하고
- 코드의 안정성을 높이기 위해
- 자동완성
*/
interface EventRankingData{
id:number; title:string; 
price:string; imageUrl:string;
}

export default function Event(){
    // 🎯 상태 관리: 이벤트 랭킹 목록
const [events, setEvents] = useState<EventRankingData[]>([
    { id: 1, title: "다다고성형", price: "149만원", imageUrl: "" },
    { id: 2, title: "다다고성형", price: "149만원", imageUrl: "" },
    { id: 3, title: "다다고성형", price: "149만원", imageUrl: "" },
    { id: 4, title: "다다고성형", price: "149만원", imageUrl: "" }
])
// 🎯 상태 관리: 새 이벤트 등록 폼
const [newEvent, setNewEvent] = useState({title:"", price:""});
const [fileName, setFileName] = useState("");
const [previewUrl, setPreviewUrl] = useState<string>("");
const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
//추가
const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

// 이미지 첨부 및 썸네일 미리보기
const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//e:파일 선택이라는 행동의 정보를 담고 있는 '이벤트 객체'  
const file = e.target.files?.[0];
    /*사용자가 선택한 파일들 중 첫 번째 파일 하나를 가져와 file이라는 변수에 넣습니다.*/
    if(file){//file 변수에 값이 존재하는지 확인하는 조건문
/*
 사용자가 실제로 파일을 정상적으로 선택했을 때만 다음 단계의 코드를 실행하겠다는 뜻입니다. 
 (파일 선택을 취소한 경우를 방지)
*/       
        setFileName(file.name);
//선택된 파일의 실제 이름 을 추출하여 setFileName 함수를 통해 상태(State)에 저장합니다.
        setPreviewUrl(URL.createObjectURL(file));
//선택된 파일 데이터를 브라우저에서 즉시 접근할 수 있는 임시 가상 URL로 변환        
    }   
};
    // 이벤트 추가
const handleAddEvent = () => {
// [검증] 사용자가 입력창에 하나라도 입력을 안 했으면 (빈칸이면)
    if(!newEvent.title || !newEvent.price || !previewUrl) {
        //기본 alert 대신 커스텀 경고 팝업을 열어줍니다!
        setIsAlertPopupOpen(true);
        //여기서 함수를 강제 종료합니다.
        return;
    }    
    //etEvents 함수를 써서 기존 목록(events)을 갱신
    setEvents([
    ...events, //기존에 있던 이벤트 배열의 내용을 그대로 펼쳐놓고,
        {
            id:Date.now(),
            title:newEvent.title,
            price:newEvent.price,
            imageUrl:previewUrl
        }//이 새로운 객체 1개를 목록 맨 끝에 덧붙입니다.    
    ]);
    //[초기화] 추가가 끝났으니, 입력창을 다시 텅 빈 상태로
    setNewEvent({title:"", price:""});
    setFileName("");
    setPreviewUrl("");
}    
    // 이벤트 삭제
const handleDeleteClick = (id:number) => {
setSelectedDeleteId(id);
setIsDeletePopupOpen(true);
}
// 팝업창에서 '확인'을 눌렀을 때 진짜로 삭제하는 함수
const confirmDelete = () => {
if(selectedDeleteId !== null) {
setEvents(events.filter(e => e.id !== selectedDeleteId));    
}
setIsDeletePopupOpen(false);
setSelectedDeleteId(null);
}


// 랭킹 순서 변경 (위/아래)
const moveEvent = (index:number, direction:'UP'|'DOWN') => {
//기존 배열을 직접 건드리면 안 되기 때문에, 똑같은 복사본을 하나 만듭니다.
const newEvents = [...events];
//만약 'UP(위로)' 버튼을 눌렀고, 현재 항목이 맨 위(0번째)가 아니라면
    if (direction === 'UP' && index > 0) {
    // 내 윗칸(index - 1) 녀석과 지금 내 칸(index) 녀석의 위치를 
    // 맞바꿉니다.
    [newEvents[index - 1], newEvents[index]] = 
    [newEvents[index], newEvents[index - 1]];  
    // 만약 'DOWN(아래로)' 버튼을 눌렀고, 
    // 현재 항목이 맨 아래(마지막 번째)가 아니라면  
}else if(direction === 'DOWN' && index < newEvents.length -1) {
// 내 아랫칸(index + 1) 녀석과 지금 내 칸(index) 녀석의 위치를 맞바꿉니다.
[newEvents[index + 1], newEvents[index]] =
[newEvents[index], newEvents[index + 1]];   
}
/*
순서를 맞바꾼 새로운 복사본 배열을 최종적으로 상태에 덮어씌워서
화면을 새로고침(리렌더링)합니다.
*/   
setEvents(newEvents); 
}
    // 최종 저장
const handleSave = () => {
    console.log("DB에 저장될 데이터:", events);
    setIsSavePopupOpen(true);
}
    return(
        <>
        <Layout>
            <S.EventAdminContainer>
                    <S.EventPageHeader>
                        <S.EventPageTitle>이벤트 랭킹 관리</S.EventPageTitle>
                        <S.EventSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.EventSaveButton>
                    </S.EventPageHeader>

                    <S.EventGrid>
                        {/* ⚙️ 1. 새 이벤트 랭킹 등록 폼 */}
                        <S.EventLeftColumn>
                            <S.RankEventCard>
                                <S.EventCardHeader>
                                    <S.EventCardTitle>새 이벤트 등록</S.EventCardTitle>
                                </S.EventCardHeader>
                                <S.EventCardBody>
                                    <S.EventFormGroup>
                                        <S.EventLabel>대표 이미지 (정방형 또는 4:5 비율 권장)</S.EventLabel>
                                        <S.EventFileInputWrapper>
                                            <S.EventFileInput 
                                                type="file" 
                                                id="event-img" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <S.EventFileLabel htmlFor="event-img"><FiImage /> 이미지 선택</S.EventFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.EventFileInputWrapper>
                                        
                                        {previewUrl && (
                                            <S.EventPreviewRect>
                                                <img src={previewUrl} alt="미리보기" />
                                            </S.EventPreviewRect>
                                        )}
                                    </S.EventFormGroup>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <S.EventFormGroup style={{ flex: 1 }}>
                                            <S.EventLabel>타이틀 (예: 다다고성형)</S.EventLabel>
                                            <S.EventInput 
                                                type="text" 
                                                value={newEvent.title}
                                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                            />
                                        </S.EventFormGroup>

                                        <S.EventFormGroup style={{ flex: 1 }}>
                                            <S.EventLabel>가격 텍스트 (예: 149만원)</S.EventLabel>
                                            <S.EventInput 
                                                type="text" 
                                                value={newEvent.price}
                                                onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                                            />
                                        </S.EventFormGroup>
                                    </div>

                                    <S.EventAddButton onClick={handleAddEvent}>
                                        <FiPlus size={18} /> 랭킹 리스트에 추가
                                    </S.EventAddButton>
                                </S.EventCardBody>
                            </S.RankEventCard>
                        </S.EventLeftColumn>

                        {/* 📋 2. 등록된 이벤트 랭킹 리스트 */}
                        <S.EventRightColumn>
                            <S.RankEventCard style={{ height: '100%' }}>
                                <S.EventCardHeader>
                                    <S.EventCardTitle>현재 랭킹 순위 (총 {events.length}개)</S.EventCardTitle>
                                </S.EventCardHeader>
                                <S.EventTableWrapper>
                                    <S.EventTable>
                                        <thead>
                                            <tr>
                                                <th>순위/이동</th>
                                                <th>이미지</th>
                                                <th>타이틀 / 가격</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((evt, index) => (
                                                <tr key={evt.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                            <S.EventRankBadge>{index + 1}</S.EventRankBadge>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                <S.EventActionBtn onClick={() => moveEvent(index, 'UP')} disabled={index === 0}>
                                                                    <FiArrowUp size={14} />
                                                                </S.EventActionBtn>
                                                                <S.EventActionBtn onClick={() => moveEvent(index, 'DOWN')} disabled={index === events.length - 1}>
                                                                    <FiArrowDown size={14} />
                                                                </S.EventActionBtn>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.EventThumbnail>
                                                            {evt.imageUrl ? <img src={evt.imageUrl} alt={evt.title} /> : <span>No Img</span>}
                                                        </S.EventThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <strong>{evt.title}</strong>
                                                        <div style={{ fontSize: '0.9rem', color: '#e74a3b', fontWeight: 'bold', marginTop: '0.2rem' }}>
                                                            {evt.price}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.EventDeleteBtn onClick={() => handleDeleteClick(evt.id)}>
                                                            <FiTrash2 size={16} />
                                                        </S.EventDeleteBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                            {events.length === 0 && (
                                                <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 랭킹 이벤트가 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.EventTable>
                                </S.EventTableWrapper>
                            </S.RankEventCard>
                        </S.EventRightColumn>
                    </S.EventGrid>
                </S.EventAdminContainer>
        </Layout>

<Popup
isOpen={isSavePopupOpen}
title="저장완료"
onClose={() => setIsSavePopupOpen(false)}
onConfirm={() => setIsSavePopupOpen(false)}
>
이벤트 랭킹 설정이 성공적으로 저장되었습니다.
</Popup>     


<Popup
isOpen={isAlertPopupOpen}
title="입력 오류"
onClose={() => setIsAlertPopupOpen(false)}
onConfirm={() => setIsAlertPopupOpen(false)}
>
이미지, 타이틀, 가격을 모두 입력해주세요.
</Popup> 

<Popup 
isOpen={isDeletePopupOpen} 
title="삭제 확인" 
onClose={() => {
    setIsDeletePopupOpen(false);
    setSelectedDeleteId(null);
}}
onConfirm={confirmDelete}
>
해당 이벤트를 랭킹에서 삭제하시겠습니까?
</Popup>
        </>
    )
}