"use client";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from "@/assets/css/Style.style";

// 💡 DB에서 받아올 이벤트 데이터 타입 정의
interface EventData {
    id: number;
    rank: number;
    name: string;
    price: string;
    img: string;
    color: string;
    radius: string;
}

// 🎯 사진의 변한 테두리 모양을 완벽하게 따라가는 텍스트 컴포넌트
const ArchTextOverlay = () => (
  <S.HoverSvg viewBox="0 0 280 340">
    <path 
      id="archPath" 
      d="M 15,330 L 15,140 A 125,125 0 0,1 265,140 L 265,330" 
      fill="none" 
    />
    <text>
      <textPath 
        href="#archPath" 
        startOffset="50%" 
        textAnchor="middle" 
        fill="rgba(255, 255, 255, 0.9)" 
        fontSize="14" 
        fontWeight="bold"
        letterSpacing="2.5"
      >
        DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC
      </textPath>
    </text>
  </S.HoverSvg>
);

// 🎯 마우스 오버 시 나타날 원형 텍스트 컴포넌트
const CircularOverlay = () => (
  <S.HoverSvg viewBox="0 0 100 100">
    <path 
      id="textCircle" 
      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" 
      fill="none" 
    />
    <text>
      <textPath 
        href="#textCircle" 
        startOffset="0" 
        fill="rgba(255, 255, 255, 0.85)" 
        fontSize="6.5" 
        fontWeight="bold"
        letterSpacing="2.5"
      >
        DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC SURGERY
      </textPath>
    </text>
  </S.HoverSvg>
);

export default function EventRanking() {
    const sliderRef = useRef<HTMLDivElement>(null);
    
    // 🎯 상태 관리: DB에서 불러온 이벤트 목록
    const [events, setEvents] = useState<EventData[]>([]);

    // 💡 화면 렌더링 시 백엔드에서 데이터 불러오기
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/events");
                if (response.data.success) {
                    const formatted = response.data.data.map((item: any, index: number) => ({
                        id: item.EVENT_IDX,
                        rank: index + 1, // 배열 순서대로 1, 2, 3... 랭크 부여
                        name: item.TITLE,
                        // 관리자가 '149만원'이라고 써도 화면 하단의 <span>만원</span>과 겹치지 않게 '만원' 글자 제거
                        price: item.PRICE.replace('만원', '').trim(), 
                        img: `http://localhost:4000/images/${item.FILE_NAME}`, // 실제 이미지 경로
                        // 짝수 번째(0, 2, 4..)는 핑크, 홀수 번째(1, 3..)는 옐로우 배경 교차 적용
                        color: index % 2 === 0 ? '#ffcced' : '#ffffcc', 
                        radius: '50%'
                    }));
                    setEvents(formatted);
                }
            } catch (error) {
                console.error("이벤트 데이터 로드 실패:", error);
            }
        };

        fetchEvents();
    }, []);

    const scroll = (direction:'left' | 'right') => {
        if(sliderRef.current){
            const scrollAmount = direction === 'left' ? -310 : 310;
            sliderRef.current.scrollBy({left:scrollAmount, behavior:'smooth'});        
        }
    };

    return(
        <S.EventSection>
            <S.EventInner>
                <S.EventHeader>
                    <S.EventTitleGroup>
                        <S.EventMainTitle>
                            Event Ranking
                        </S.EventMainTitle>
                        <S.EventSubTitle>
                            원진 이벤트 랭킹
                        </S.EventSubTitle>
                    </S.EventTitleGroup>
                    
                    <S.EventControls>
                        <S.EventViewMoreBtn>
                            view more
                        </S.EventViewMoreBtn>
                        <S.EventArrowBtn onClick={() => scroll('left')}>
                            &lt;
                        </S.EventArrowBtn>  
                        <S.EventArrowBtn onClick={() => scroll('right')}>
                            &gt;
                        </S.EventArrowBtn>       
                    </S.EventControls>
                </S.EventHeader> 

                <S.EventSliderWrapper ref={sliderRef}>
                    {/* 💡 기존 가짜 데이터(EVENT_DATA) 대신 DB에서 불러온 events 배열 렌더링 */}
                    {events.map((item) => (
                        <S.EventCard key={item.id}>
                            {/* 왼쪽 위로 튀어나온 랭크 뱃지 */}
                            <S.RankBadge $bgColor={item.color}$radius={item.radius}>
                                {item.rank}
                            </S.RankBadge>

                            <S.EventImageWrapper>
                                <img src={item.img} alt={item.name}/>
                                <ArchTextOverlay />
                            </S.EventImageWrapper>
                            
                            {/* 하단 가격 정보 영역 */}
                            <S.EventInfo $bgColor={item.color}>
                                <S.SurgeryLabel>{item.name}</S.SurgeryLabel>
                                <S.EventPrice>
                                    {item.price}
                                    <span>만원</span>    
                                </S.EventPrice>
                            </S.EventInfo>
                        </S.EventCard>    
                    ))}    
                    
                    {/* 데이터가 없을 때 표시할 안내 문구 */}
                    {events.length === 0 && (
                        <div style={{ padding: '3rem', color: '#999' }}>등록된 이벤트가 없습니다.</div>
                    )}
                </S.EventSliderWrapper>

            </S.EventInner>
        </S.EventSection>   
    )
}