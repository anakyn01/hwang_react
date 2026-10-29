"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import * as S from "@/assets/css/style.styles";

import 'swiper/css';
import 'swiper/css/pagination';

const bannerData = [
  {
    id: 1,
    title: "유기동물 입양자라면\n50% 할인 혜택 받으세요!",
    sub: "목줄 | 리드줄 | 물그릇",
    bgColor: "#E6F4F1", 
    imageUrl: "/img/banner/b1.png", 
  },
  {
    id: 2,
    title: "어서찾아주개 스토어 오픈\n신규 가입시 3,000원 쿠폰",
    sub: "사료 | 간식 | 영양제",
    bgColor: "#FFF3E0", 
    imageUrl: "/img/banner/b1.png",
  },
  {
    id: 3,
    title: "이번 달 추천 입양 캠페인\n따뜻한 가족이 되어주세요",
    sub: "입양 절차 알아보기",
    bgColor: "#F3E5F5", 
    imageUrl: "/img/banner/b1.png",
  },
];

export default function BannerCarousel() {
  return (
    <S.CarouselWrapper>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ type: 'fraction' }}
        style={{ width: '100%', height: '100%' }}
      >
        {bannerData.map((slide) => (
          /* 수정됨: S.SwiperSlide가 아닌 SwiperSlide를 사용해야 합니다 */
          <SwiperSlide key={slide.id}>
            <S.SlideContainer $bgColor={slide.bgColor}>
              <S.TextWrapper>
                {/* 이름이 변경된 컴포넌트 적용 */}
                <S.CarouselTitle>{slide.title}</S.CarouselTitle>
                <S.CarouselSub>{slide.sub}</S.CarouselSub>
              </S.TextWrapper>
              
              {slide.imageUrl && (
                <S.ImageWrapper>
                  <img src={slide.imageUrl} alt="배너 이미지" />
                </S.ImageWrapper>
              )}
            </S.SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.CarouselWrapper>
  );
}