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

export default function EventPopup() {
    const pathname = usePathname();

    // 🎯 상태 관리
    const [popupList, setPopupList] = useState<PopupData[]>([]);
    const [visiblePopups, setVisiblePopups] = useState<number[]>([]);

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/popups");
                if (response.data.success) {
                    const { maxPopups, popups } = response.data;
                    const now = new Date().getTime();

                    // 1. 기간에 맞는 팝업만 필터링 (노출중인 팝업)
                    let activePopups = popups.filter((p: any) => {
                        const start = new Date(p.START_DATE).getTime();
                        const end = new Date(p.END_DATE).getTime();
                        return now >= start && now <= end;
                    });

                    // 2. 관리자가 설정한 '최대 노출 갯수'만큼만 자르기
                    activePopups = activePopups.slice(0, maxPopups);

                    // 3. '오늘 하루 보지 않음' 체크 (localStorage 확인)
                    const filteredPopups = activePopups.filter((p: any) => {
                        const hideUntil = localStorage.getItem(`hide_popup_${p.POPUP_IDX}`);
                        if (hideUntil && now < parseInt(hideUntil)) {
                            return false; // 아직 숨김 기간이면 안 보여줌
                        }
                        return true;
                    });

                    // 4. 화면에 그리기 좋게 데이터 가공 및 위치 자동 계산
                    const formatted = filteredPopups.map((p: any, index: number) => ({
                        id: p.POPUP_IDX,
                        imageUrl: `http://localhost:4000/images/${p.FILE_NAME}`,
                        link: p.LINK,
                        useTodayClose: p.USE_TODAY_CLOSE === 'Y',
                        top: 150 + (index * 30), // 살짝 아래로 어긋나게 배치
                        left: 100 + (index * 420) // 가로로 겹치지 않게 우측으로 밀어서 배치
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

    // 🎯 팝업 닫기 핸들러 ('오늘 하루 보지 않음' 처리 포함)
    const handleClose = (id: number, useTodayClose: boolean) => {
        if (useTodayClose) {
            const checkbox = document.getElementById(`today_close_${id}`) as HTMLInputElement;
            // 체크박스가 체크되어 있다면
            if (checkbox && checkbox.checked) {
                const tomorrow = new Date();
                tomorrow.setHours(24, 0, 0, 0); // 다음날 0시 정각으로 설정
                // localStorage에 다음날 0시까지의 시간을 저장
                localStorage.setItem(`hide_popup_${id}`, tomorrow.getTime().toString());
            }
        }
        // 화면에서 팝업 숨기기
        setVisiblePopups((prev) => prev.filter((popupId) => popupId !== id));
    };

    // 🎯 중요한 페이지에서는 팝업 숨기기
    const hidePopupRoutes = ['/register', '/login', '/mypage'];
    const shouldHide = hidePopupRoutes.some(route => pathname.includes(route));
    if (shouldHide) return null;

    // 활성화된 팝업이 없으면 렌더링하지 않음
    if (visiblePopups.length === 0 || popupList.length === 0) return null;

    return (
        <>
            {popupList.map((popup) => {
                if (!visiblePopups.includes(popup.id)) return null;

                return (
                    <S.PopupContainer key={popup.id} $top={popup.top}$left={popup.left}>
                        {/* 이미지를 클릭하면 설정한 링크로 이동하도록 감싸기 */}
                        <Link href={popup.link || "#"} style={{ display: 'block', cursor: popup.link ? 'pointer' : 'default' }}>
                            <S.ImageWrapper>
                                <img src={popup.imageUrl} alt={`이벤트 ${popup.id}`} style={{ width: '100%', display: 'block' }} />
                            </S.ImageWrapper>
                        </Link>

                        <S.FormWrapper>
                            <S.InputGroup>
                                <S.Input type="text" placeholder='이름' />
                                <S.Input type="tel" placeholder='연락처' />
                                <S.Input type="text" placeholder='상담부위' />
                                <S.SubmitBtn>상담신청</S.SubmitBtn>
                            </S.InputGroup>

                            <S.PrivacyLabel>
                                <S.PrivacyCheckbox type="checkbox" />
                                <S.PrivacyText>
                                    개인정보 수집 · 이용에 관한 사항에 동의 [필수]
                                    <span>자세히보기</span>
                                </S.PrivacyText>
                            </S.PrivacyLabel>
                        </S.FormWrapper>

                        <S.FooterWrapper>
                            {/* 관리자가 '오늘 하루 보지 않음'을 사용하겠다고 한 경우에만 보여줌 */}
                            {popup.useTodayClose ? (
                                <S.CloseLabel htmlFor={`today_close_${popup.id}`}>
                                    <S.CloseCheckbox type="checkbox" id={`today_close_${popup.id}`} />
                                    오늘 하루 보지 않음
                                </S.CloseLabel>
                            ) : (
                                <div></div> // 공간 맞추기용 빈 div
                            )}
                            <S.CloseBtn onClick={() => handleClose(popup.id, popup.useTodayClose)}>
                                X
                            </S.CloseBtn>
                        </S.FooterWrapper>
                    </S.PopupContainer>
                )
            })}
        </>
    )
}