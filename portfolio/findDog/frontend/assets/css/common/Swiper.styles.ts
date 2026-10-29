import styled from "styled-components";

export const CarouselWrapper = styled.div`
  width: 100%;
  height: 130px; 
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  
  .swiper-pagination-fraction {
    bottom: 8px;
    left: auto;
    right: 12px;
    width: auto;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 12px;
    letter-spacing: 1px;
  }
`;

export const SlideContainer = styled.div<{ $bgColor?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 130px; 
  background-color: ${(props) => props.$bgColor || '#E6F4F1'};
  padding: 0 20px;
  box-sizing: border-box;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`;

// 이름 충돌 방지를 위해 BannerTitle -> CarouselTitle 로 변경
export const CarouselTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.4;
  white-space: pre-line; 
`;

// 이름 충돌 방지를 위해 BannerSub -> CarouselSub 로 변경
export const CarouselSub = styled.p`
  font-size: 12px;
  color: #333;
  margin: 0;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  img {
    height: 110px; 
    object-fit: contain;
  }
`;

// 2. Styled Components 정의
export const ThumWrapper = styled.section`
  width: 100%;
  padding: 20px 0; /* 상하 여백 */
`;

export const ThumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 16px;
`;

export const ThumTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #000;
  display: flex;
  align-items: center;
  margin: 0;

  /* 이미지의 'o' 자리에 들어간 주황색 발바닥 아이콘 구현 */
  .paw-icon {
    color: #FF8A00; 
    font-size: 20px;
    margin: 0 2px;
    transform: rotate(15deg);
  }
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
`;

// 스와이퍼 바깥 여백 확보 (첫 카드가 살짝 여백을 갖도록)
export const SwiperContainer = styled.div`
  padding-left: 20px;
`;

export const CardWrapper = styled.div`
  width: 140px; /* 카드 너비 */
  height: 190px; /* 카드 높이 */
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-color: #f0f0f0;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 흰색 텍스트가 잘 보이도록 하단에 어두운 그라데이션 추가
export const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
  pointer-events: none;
`;

export const NameText = styled.span`
  position: absolute;
  bottom: 12px;
  left: 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
  
  /* 글씨가 길 경우 말줄임표 처리 (예: 경기-양평...) */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 116px; 
`;

// 우측 상단 발바닥 아이콘 (찜하기 기능 등)
export const TopRightIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  svg {
    font-size: 16px;
  }
`;