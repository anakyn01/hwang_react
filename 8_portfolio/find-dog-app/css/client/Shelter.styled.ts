import styled from 'styled-components';
import { BgWhite, BoxShadow, FlexColumn, Grid, Ohidden } from '../common/Common.styles';

export const ShelterHeader = styled.header`
  background-color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const LogoText = styled.h1`
  color: #ff8c00;
  font-size: 1.3rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.5px;
`;

export const TabContainer = styled.div`
  display: flex; 
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
`;

export const TabBtn = styled.button<{$active? : boolean}>`
  background: none;
  border: none;
  padding: 15px 5px;
  margin-right: 20px;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  border-bottom: ${({ $active}) => ($active ? '2px solid #000' : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const FilterContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterIconBtn = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`;

export const FilterSelect = styled.select`
  padding: 0 15px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;
  font-size: 0.9rem;
  color: #333;
  outline: none;
  flex-shrink: 0;
  cursor: pointer;
`;

export const AlertInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon-circle {
    background-color: #e9ecef;
    width: 38px; 
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-group {
    display: flex; 
    flex-direction: column;
    strong { font-size: 0.95rem; color: #111; }
    span { font-size: 0.8rem; color: #888; margin-top: 3px; }
  }
`;

export const ToggleBtn = styled.button<{ $isOn: boolean}>`
  width: 48px; 
  height: 26px;
  border-radius: 13px;
  border: none;
  background-color: ${({ $isOn}) => ($isOn ? '#ff8c00' : '#ddd')};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  .handle {
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${({ $isOn}) => ($isOn ? '24px' : '2px')};
    transition: left 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  }
`;

export const Divider = styled.div`
  height: 8px; 
  background-color: #f4f5f7;
  width: 100%;
`;

export const RecommendSection = styled.section`
  background-color: #fff;
  padding: 25px 0 25px 20px;
`;

export const SectionHeader = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 15px;
  .more-link {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #888;
    text-decoration: none;
  }
`;

export const RecommendScroll = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-right: 20px;
  &::-webkit-scrollbar { display: none; }
`;

export const RecommendCard = styled.div`
  width: 140px;
  flex-shrink: 0;
`;

export const RecommendImgBox = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-color: #eee;
  img { width: 100%; height: 100%; object-fit: cover; }
  .play-icon {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: rgba(255,255,255,0.9);
  }
`;

// 💡 1. 목록 전체 영역: 세로 방향으로 1개씩 쌓이도록 변경
export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f4f5f7;
  gap: 8px;
  padding: 12px;
  box-sizing: border-box;
`;

// 💡 2. 개별 카드: 좌우(row) 배치로 설정하여 사진과 텍스트를 나란히 둠
export const AnimalCard = styled.div`
display: flex !important;
  flex-direction: row !important; /* 💡 세로 배치를 강제로 가로(row) 배치로 변경 */
  align-items: flex-start !important;
  gap: 14px !important;
  width: 100% !important;        /* 💡 160px 고정 너비를 강제로 풀고 꽉 채움 */
  max-width: 100% !important;
  min-width: 0 !important;
  flex-shrink: 1 !important;     /* 💡 0으로 고정된 것을 풀어줌 */
  background-color: #fff !important;
  border-radius: 12px !important;
  padding: 14px !important;
  box-sizing: border-box !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06) !important;
`;

// 💡 3. 이미지 박스 크기 고정 (좌측 배치)
export const AnimalImgBox = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #eee;
  flex-shrink: 0;
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
  }
`;

// 💡 4. 우측 정보 영역
export const AnimalInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
`;

export const Badge = styled.span<{ $type?: 'status'|'female' | 'male' | 'unknown' }>`
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid;
  font-weight: 600;
  ${({ $type}) => {
      switch($type){
          case 'status': return 'color: #555; border-color: #ccc; background-color: #fff;';
          case 'female': return 'color: #ff6b6b; border-color: #ff6b6b; background-color: #fff;';  
          case 'male': return 'color: #4a90e2; border-color: #4a90e2; background-color: #fff;';  
          case 'unknown': return 'color: #555; border-color: #ccc; background-color: #fff;';  
          default: return 'color: #555; border-color: #ccc; background-color: #fff;';        
      }
  }}
`;

// 💡 5. 텍스트 그리드 정렬 (라벨과 값이 가로로 깔끔하게 떨어지도록 설정)
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 3px 6px;
  font-size: 0.8rem;
  .label { 
    color: #888; 
  }
  .value {
    color: #111;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;