"use client";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '@/assets/css/Style.style';

// 💡 DB에서 받아올 안전마취 데이터 타입 정의
interface SafetyData {
    id: number;
    title: string;
    desc: string;
    img: string;
}

export const SafetySlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    
    // 🎯 상태 관리: DB에서 불러온 데이터 저장
    const [safetyList, setSafetyList] = useState<SafetyData[]>([]);

    // 💡 화면 렌더링 시 백엔드 API에서 데이터 불러오기
    useEffect(() => {
        const fetchSafetyData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/safety");
                if (response.data.success) {
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.SAFETY_IDX,
                        title: item.TITLE,
                        desc: item.DESCRIPTION,
                        img: `http://localhost:4000/images/${item.FILE_NAME}` // 실제 파일 경로
                    }));
                    setSafetyList(formatted);
                }
            } catch (error) {
                console.error("안전마취 데이터 로드 실패:", error);
            }
        };

        fetchSafetyData();
    }, []);

    // 💡 슬라이더 좌/우 스크롤 로직
    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            sliderRef.current.scrollBy({
                left: scrollAmount, 
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <S.SafetySection>
                <S.SafetyInner>
                    <S.SafetyHeader>
                        <S.SafetyTitleGroup>
                            <S.SafetyMainTitle>
                                Ahn's 안전마취
                            </S.SafetyMainTitle>
                        </S.SafetyTitleGroup>
                        <S.SafetyControls>
                            <S.SafetyViewMoreBtn>
                                view more +
                            </S.SafetyViewMoreBtn>
                            <S.SafetyArrowBtn onClick={() => scroll('left')}>
                                &lt;
                            </S.SafetyArrowBtn>
                            <S.SafetyArrowBtn onClick={() => scroll('right')}>
                                &gt;
                            </S.SafetyArrowBtn>
                        </S.SafetyControls>
                    </S.SafetyHeader>

                    <S.SafetySliderWrapper ref={sliderRef}>
                        {/* 💡 기존 가짜 데이터 대신 DB에서 받아온 safetyList 렌더링 */}
                        {safetyList.map((item) => (
                            <S.SafetyCard key={item.id}>
                                <S.SafetyImage 
                                    src={item.img} 
                                    alt={item.title.replace('\n', '')} 
                                />
                                <S.SafetyTextOverlay>
                                    <S.SafetyCardTitle>
                                        {/* 타이틀에 줄바꿈(\n)이 포함되어 있다면 개행 처리 */}
                                        {item.title.split('\n').map((line, idx) => (
                                            <React.Fragment key={idx}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </S.SafetyCardTitle>

                                    <S.SafetyCardDesc>
                                        {item.desc}
                                    </S.SafetyCardDesc>
                                </S.SafetyTextOverlay>
                            </S.SafetyCard>
                        ))}
                    </S.SafetySliderWrapper>
                </S.SafetyInner>
            </S.SafetySection>
        </>
    );
};