"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import * as S from '@/assets/css/Style.style';

// DB에서 받아올 팝업 데이터 타입 정의
interface PopupData {
    id: number;
    imageUrl: string;
    link: string;
    useTodayClose: boolean;
    top: number;
    left: number;
}
//팝업 각각의 입력 상태를 따로 관리하기 위한 독립 컴포넌트
const PopupCard = (
    {popup, handleClose}:{popup:PopupData, 
        handleClose:(id:number, useTodayClose:boolean) => void}) =>{
//1.입력값 상태 관리
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [department, setDepartment] = useState('');
const [isAgreed, setIsAgreed] = useState(false);

//폼 제출 핸들러
const handleSubmit = async () => {
    if(!name.trim()) return alert('이름을 입력해 주세요');
    if(!phone.trim()) return alert('연락처를 입력해 주세요');
//연락처 길이가 너무 짧은 경우
    if(phone.length < 9 ) return alert('연락처를 올바르게 끝까지 입력해 주세요');
if(/(\d)\1{6}/.test(phone)) return alert('잘못된 번호는 접수할수 없습니다. 실제 연락처를 입력해 주세요');
 if(!department.trim()) return alert('상담부위 입력해 주세요');
 if(!isAgreed) return alert('개인정보 처리방침에 동의해 주세요');
    try{
const response =
await axios.post('http://localhost:4000/api/consult/quick',{
name, phone, department    
});
if(response.data.success){
alert('상담 신청이 성공적으로 완료되었습니다. 곧 연락 드리겠습니다');
//전송 성공시 폼 초기화
setName('');
setPhone('');
setDepartment('');
setIsAgreed(false);  
}
    }catch(error){
console.error('상담 신청 실패:', error);
alert('상담 신청중 문제가 발생했습니다. 다시 시도해 주세요');
    }
};

return(
<S.PopupContainer
$top={popup.top} $left={popup.left}
>
<S.PopupLink href={popup.link || "#"} $hasLink={!!popup.link}>
<S.ImageWrapper>
<S.PopupImage src={popup.imageUrl} alt={`이벤트 ${popup.id}`}/>
</S.ImageWrapper>
</S.PopupLink>

<S.FormWrapper>
    <S.InputGroup>
<S.Input
type="text"
placeholder='이름'
value={name}
onChange={(e) => setName(e.target.value)}
/>  
<S.Input
type="tel"
placeholder='연락처'
value={phone}
onChange={(e) => {
const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');    
    setPhone(onlyNumbers)}} maxLength={11}
/>   
<S.Input
type="text"
placeholder='상담부위 (예: 눈, 코)'
value={department}
onChange={(e) => setDepartment(e.target.value)}
/>    
<S.SubmitBtn
onClick={handleSubmit}
>상담신청</S.SubmitBtn>
    </S.InputGroup>

<S.PrivacyLabel>
<S.PrivacyCheckbox
type="checkbox"
checked={isAgreed}
onChange={(e) => setIsAgreed(e.target.checked)}
/>
<S.PrivacyText>
개인정보 수집 · 이용에 관한 사항에 동의 [필수] 
<span>자세히보기</span>
</S.PrivacyText>    
</S.PrivacyLabel>
</S.FormWrapper>

<S.FooterWrapper>
{popup.useTodayClose ? (
<S.CloseLabel htmlFor={`today_close_${popup.id}`}>
<S.CloseCheckbox type="checkbox" id={`today_close_${popup.id}`}/>    
오늘 하루 보지 않음
</S.CloseLabel>
):(
<div/>
)}
<S.CloseBtn
onClick={() => handleClose(popup.id, popup.useTodayClose)}
>
X    
</S.CloseBtn>
</S.FooterWrapper>
</S.PopupContainer>    
)
}

// 🎯 메인 컴포넌트: 팝업 데이터 불러오기 및 필터링
export default function EventPopup() {
    const pathname = usePathname();
    const [popupList, setPopupList] = useState<PopupData[]>([]);
    const [visiblePopups, setVisiblePopups] = useState<number[]>([]);

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/popups");
                if (response.data.success) {
                    const { maxPopups, popups } = response.data;
                    const now = new Date().getTime();

                    let activePopups = popups.filter((p: any) => {
                        const start = new Date(p.START_DATE).getTime();
                        const end = new Date(p.END_DATE).getTime();
                        return now >= start && now <= end;
                    });

                    activePopups = activePopups.slice(0, maxPopups);

                    const filteredPopups = activePopups.filter((p: any) => {
                        const hideUntil = localStorage.getItem(`hide_popup_${p.POPUP_IDX}`);
                        if (hideUntil && now < parseInt(hideUntil)) return false;
                        return true;
                    });

                    const formatted = filteredPopups.map((p: any, index: number) => ({
                        id: p.POPUP_IDX,
                        imageUrl: `http://localhost:4000/images/${p.FILE_NAME}`,
                        link: p.LINK,
                        useTodayClose: p.USE_TODAY_CLOSE === 'Y',
                        top: 150 + (index * 30),
                        left: 100 + (index * 420)
                    }));

                    setPopupList(formatted);
                    setVisiblePopups(formatted.map((p: PopupData) => p.id));
                }
            } catch (error) {
                console.error("팝업 데이터 로드 실패", error);
            }
        };

        fetchPopups();
    }, []);

    const handleClose = (id: number, useTodayClose: boolean) => {
        if (useTodayClose) {
            const checkbox = document.getElementById(`today_close_${id}`) as HTMLInputElement;
            if (checkbox && checkbox.checked) {
                const tomorrow = new Date();
                tomorrow.setHours(24, 0, 0, 0); 
                localStorage.setItem(`hide_popup_${id}`, tomorrow.getTime().toString());
            }
        }
        setVisiblePopups((prev) => prev.filter((popupId) => popupId !== id));
    };

    const hidePopupRoutes = ['/register', '/login', '/mypage'];
    const shouldHide = hidePopupRoutes.some(route => pathname.includes(route));
    if (shouldHide) return null;

    if (visiblePopups.length === 0 || popupList.length === 0) return null;

    return (
        <>
            {popupList.map((popup) => {
                if (!visiblePopups.includes(popup.id)) return null;
                
                // 💡 컴포넌트 분리: 각 팝업 카드(PopupCard)를 호출하여 데이터 전달
                return <PopupCard key={popup.id} popup={popup} handleClose={handleClose} />;
            })}
        </>
    )
}