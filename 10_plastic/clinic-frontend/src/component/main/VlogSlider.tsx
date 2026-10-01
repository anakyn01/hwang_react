"use client";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '@/assets/css/Style.style';

// 💡 DB에서 받아올 VLOG 데이터 타입 정의
interface VlogData {
    id: number;
    desc: string;     // 영상 제목
    img: string;      // 썸네일 이미지 경로
    videoUrl: string; // 유튜브 영상 링크
}

export const VlogSlider = () => {
    // 슬라이더(가로 스크롤 영역)의 실제 HTML DOM 요소에 직접 접근하기 위해 useRef 훅을 생성합니다.
    const sliderRef = useRef<HTMLDivElement>(null);
    
    // 🎯 상태 관리: DB에서 불러온 VLOG 목록
    const [vlogs, setVlogs] = useState<VlogData[]>([]);

    // 💡 화면 렌더링 시 백엔드에서 데이터 불러오기
    useEffect(() => {
        const fetchVlogs = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/vlogs");
                if (response.data.success) {
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.VLOG_IDX,
                        desc: item.TITLE, // DB의 TITLE을 화면의 desc로 사용
                        img: `http://localhost:4000/images/${item.FILE_NAME}`, // 실제 이미지 경로
                        videoUrl: item.VIDEO_URL
                    }));
                    setVlogs(formatted);
                }
            } catch (error) {
                console.error("VLOG 데이터 로드 실패:", error);
            }
        };

        fetchVlogs();
    }, []);

    // 화살표 버튼을 누를때 실행될 스크롤 조작함수('left' 또는 'right'를 인자로 받습니다)
    const scroll = (direction: 'left' | 'right') => {
        // sliderRef.current가 존재하는지(화면에 슬라이더 요소가 정상적으로 렌더링되어 잡혔는지를) 안전하게 확인
        if (sliderRef.current) {
            /*
            클릭한 방향이 'left'면 왼쪽으로 260px(-260), 
            'right'면 오른쪽으로 260px(260) 이동하도록 이동량을 결정합니다.
            260인 이유: 카드 1개의 너비(240px) + 카드 사이의 여백(20px)을 합쳐서 
            딱 한 칸씩만 정확하게 넘어가도록 계산한 값입니다)
            */   
            const scrollAmount = direction === 'left' ? -260 : 260;
            
            /*
            자바스크립트 내장 DOM API 인 scrollBy()를 사용해
            설정한 이동량(scrollAmount)만큼 스크롤바를 이동시킵니다.
            behavior: 'smooth' 옵션을 주어 화면이 딱딱하게 끊기지 않고 
            부드럽게 스르륵 넘어가게 만듭니다.
            */ 
            sliderRef.current.scrollBy({ 
                left: scrollAmount, 
                behavior: 'smooth' 
            });   
        }
    };

    return (
        <>
            <S.VlogSection>
                <S.VlogInner>
                    {/* 헤더 영역 (타이틀 및 컨트롤 버튼) */}
                    <S.VlogHeader>
                        <S.VlogTitleGroup>
                            <S.VlogMainTitle>
                                Ahn's VLOG.
                            </S.VlogMainTitle>
                        </S.VlogTitleGroup>

                        <S.VlogControls>
                            <S.VlogViewMoreBtn>view more +</S.VlogViewMoreBtn>

                            <S.VlogArrowBtn onClick={() => scroll('left')}>
                                &lt;
                            </S.VlogArrowBtn>

                            <S.VlogArrowBtn onClick={() => scroll('right')}>
                                &gt;
                            </S.VlogArrowBtn>
                        </S.VlogControls>
                    </S.VlogHeader>

                    {/* 슬라이더 영역 */}
                    <S.VlogSliderWrapper ref={sliderRef}>
                        {/* 💡 기존 가짜 데이터 대신 DB에서 받아온 vlogs 배열 렌더링 */}
                        {vlogs.map((item) => (
                            <S.VlogCard key={item.id}>
                                {/* 💡 클릭 시 유튜브 영상으로 넘어갈 수 있도록 <a> 태그로 감싸줍니다 */}
                                <a 
                                    href={item.videoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                >
                                    <S.VlogImageWrapper>
                                        <img 
                                            src={item.img} 
                                            alt={item.desc} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />        
                                    </S.VlogImageWrapper>
                                    <S.VlogInfo>
                                        <S.VlogDesc>
                                            {item.desc}
                                        </S.VlogDesc>
                                    </S.VlogInfo>
                                </a>
                            </S.VlogCard>        
                        ))}

                        {/* 데이터가 비어있을 때 안내 문구 */}
                        {vlogs.length === 0 && (
                            <div style={{ padding: '3rem', color: '#999' }}>등록된 영상이 없습니다.</div>
                        )}
                    </S.VlogSliderWrapper>
                </S.VlogInner>
            </S.VlogSection>        
        </>
    );
};