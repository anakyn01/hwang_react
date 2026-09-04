"use client";
import React, {useState} from 'react';
//현재 url경로를 가져오는 후크추가
import {usePathname} from 'next/navigation';
import * as S from '@/assets/css/Style.style';

const POPUP_LIST = [
    {
    id: 1,
    imageUrl: '/images/popup/popup1.jpg', // 실제 이미지 경로로 변경 (image_df4702.png)
    top: 150,
    left: 100,
  },
  {
    id: 2,
    imageUrl: '/images/popup/popup2.jpg', // 실제 이미지 경로로 변경 (image_df49f0.jpg)
    top: 150,
    left: 520, // 첫 번째 팝업과 겹치지 않게 우측으로 밀어서 배치 (Cascading)
  },
];

export default function EventPopup () {
//현재경로 확인
const pathname = usePathname();

// 현재 켜져 있는 팝업들의 ID를 배열로 관리 (초기값은 모든 팝업 ID)
const [visiblePopups, setVisiblePopups] = useState<number[]>(
POPUP_LIST.map((popup) => popup.id)
);
//특정 팝업 닫기 핸들러
const handleClose = (id:number) => {
setVisiblePopups((prev) => prev.filter((popupId) => popupId !== id));
};

//중요한 곳에서는 popup이 보이지 않게
//if (pathname.includes('/register')) return null; 단일일 경우
//여러 페이지에서 숨기고 싶을때 응용법
const hidePopupRoutes = ['/register', '/login', '/mypage'];
const shouldHide = hidePopupRoutes.some(route => pathname.includes(route));
if (shouldHide) return null;
//활성화된 팝업이 없으면 아무것도 렌더링하지 않음
if(visiblePopups.length === 0) return null;

return(
    <>
    {POPUP_LIST.map((popup) => {
//visiblePopup 해당 id가 있을때만 렌더링
if (!visiblePopups.includes(popup.id)) return null;

return(
<S.PopupContainer key={popup.id} 
$top={popup.top} $left={popup.left}>
<S.ImageWrapper>
    <img src={popup.imageUrl} alt={`이벤트 ${popup.id}`}/>
</S.ImageWrapper>

<S.FormWrapper>
    <S.InputGroup>
        <S.Input type="text" placeholder='이름'/>
        <S.Input type="tel" placeholder='연락처'/>
        <S.Input type="text" placeholder='상담부위'/>
        <S.SubmitBtn>상담신청</S.SubmitBtn>
    </S.InputGroup>

    <S.PrivacyLabel>
        <S.PrivacyCheckbox type="checkbox"/>
        <S.PrivacyText>
개인정보 수집 · 이용에 관한 사항에 동의 [필수] 
<span>자세히보기</span>            
        </S.PrivacyText>
    </S.PrivacyLabel>
</S.FormWrapper>

<S.FooterWrapper>
    <S.CloseLabel>
        <S.CloseCheckbox type="checkbox"/>
        오늘 하루 보지 않음
    </S.CloseLabel>
    <S.CloseBtn onClick={() => handleClose(popup.id)}>
        X
    </S.CloseBtn>
</S.FooterWrapper>

</S.PopupContainer>
)
    })}
    </>
)

}