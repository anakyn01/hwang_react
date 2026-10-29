"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PetsIcon from '@mui/icons-material/Pets';
// 작성하신 스타일 파일 경로에 맞게 수정해 주세요. (예: style.styles.ts)
import * as S from "@/assets/css/style.styles"; 

import 'swiper/css';

// 1. 임시 데이터
const connectsData = [
  { id: 1, name: '콩이', imageUrl: '/img/dog1.jpg' },
  { id: 2, name: '짜요', imageUrl: '/img/dog2.jpg' },
  { id: 3, name: '경기-양평-2026-...', imageUrl: '/img/dog3.jpg' },
  { id: 4, name: '삐삐', imageUrl: '/img/dog4.jpg' },
];

export default function ConnectsCarousel() {
  return (
    <S.ThumWrapper>
      {/* 헤더 영역 */}
      <S.ThumHeader>
        <S.ThumTitle>
          C<PetsIcon className="paw-icon" />nnects
        </S.ThumTitle>
        <S.MoreButton>더보기 &gt;</S.MoreButton>
      </S.ThumHeader>

      {/* 가로 스와이프 리스트 영역 */}
      <S.SwiperContainer>
        <Swiper
          spaceBetween={12} // 카드 사이 간격
          slidesPerView={'auto'} // width에 맞춰 자동으로 슬라이드 개수 조절
          freeMode={true} // 스냅 없이 부드럽게 스크롤
        >
          {connectsData.map((item) => (
            /* 주의: SwiperSlide는 라이브러리 컴포넌트이므로 S. 를 붙이지 않습니다 */
            <SwiperSlide key={item.id} style={{ width: '140px' }}>
              <S.CardWrapper>
                <S.CardImage src={item.imageUrl} alt={item.name} />
                <S.TopRightIcon>
                  <PetsIcon />
                </S.TopRightIcon>
                <S.GradientOverlay />
                <S.NameText>{item.name}</S.NameText>
              </S.CardWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </S.SwiperContainer>
    </S.ThumWrapper>
  );
}