"use client";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '@/assets/css/Style.style';

// 💡 DB에서 받아올 셀피 데이터 타입 정의
interface SelfieData {
    id: number;
    img: string;
    likes: number;
    views: number;
}

export default function Selfies() {
    // 🎯 가로 스크롤 영역을 조작하기 위한 훅
    const sliderRef = useRef<HTMLDivElement>(null);
    
    // 🎯 상태 관리: DB에서 불러온 셀피 목록
    const [selfies, setSelfies] = useState<SelfieData[]>([]);

    // 💡 화면 첫 렌더링 시 백엔드에서 데이터 불러오기
    useEffect(() => {
        const fetchSelfies = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/selfies");
                if (response.data.success) {
                    // 관리자가 '노출중(Y)'으로 설정한 데이터만 골라내기
                    const activeSelfies = response.data.data.filter((s: any) => s.IS_ACTIVE === 'Y');
                    
                    // 프론트엔드에서 쓰기 편하게 데이터 모양 다듬기
                    const formatted = activeSelfies.map((s: any) => ({
                        id: s.SELFIE_IDX,
                        img: `http://localhost:4000/images/${s.FILE_NAME}`, // 실제 이미지 경로
                        likes: s.LIKES,
                        views: s.VIEWS
                    }));
                    
                    setSelfies(formatted);
                }
            } catch (error) {
                console.error("셀피 데이터 로드 실패:", error);
            }
        };

        fetchSelfies();
    }, []);

    // 화살표 클릭 시 좌우로 300px씩 스크롤하는 함수
    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            sliderRef.current.scrollBy({ 
                left: scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <S.SliderSection>
            <S.SliderInner>
                <S.SliderHeader>
                    <S.SliderTitleGroup>
                        <S.SliderMainTitle>셀피</S.SliderMainTitle>
                        <S.SliderSubTitle>SELFIES</S.SliderSubTitle>            
                    </S.SliderTitleGroup>

                    <S.SliderControls>
                        <S.SliderViewMoreBtn>view more</S.SliderViewMoreBtn>
                        <S.SliderArrowBtn onClick={() => scroll('left')}>
                            &lt;
                        </S.SliderArrowBtn>
                        <S.SliderArrowBtn onClick={() => scroll('right')}>
                            &gt;
                        </S.SliderArrowBtn>
                    </S.SliderControls>
                </S.SliderHeader>

                {/* 🎯 사진 슬라이더 영역 */}
                <S.SelfieSliderWrapper ref={sliderRef}>
                    {/* 💡 기존 가짜 데이터 대신 DB에서 받아온 selfies 배열 렌더링 */}
                    {selfies.map((item) => (
                        <S.SelfieCard key={item.id}>
                            <img src={item.img} alt={`selfie_${item.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <S.SelfieCardOverlay>
                                <S.SelfieLikeBadge>
                                    <span>♥</span>{item.likes.toLocaleString()} {/* 숫자에 천단위 콤마 찍기 */}
                                </S.SelfieLikeBadge>

                                <S.SelfieViewCount>
                                    {item.views.toLocaleString()}명이 보고 있어요
                                    <span>SELFIES</span>
                                </S.SelfieViewCount>
                            </S.SelfieCardOverlay>
                        </S.SelfieCard>       
                    ))}
                    
                    {/* 만약 등록된/노출중인 셀피가 하나도 없을 때 안내문구 */}
                    {selfies.length === 0 && (
                        <div style={{ padding: '2rem', color: '#999' }}>등록된 셀피가 없습니다.</div>
                    )}
                </S.SelfieSliderWrapper>

            </S.SliderInner>
        </S.SliderSection>    
    );
}