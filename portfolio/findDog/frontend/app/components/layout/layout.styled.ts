import styled from 'styled-components';
import { coolGray, adminCard } from '@/assets/css/admin/Admin.styles'; // 만들어둔 쿨그레이 믹스인 임포트

// ==========================================
// 💡 1. 사용자 작성 기존 뼈대 코드 (일부 컬러 믹스인 적용)
// ==========================================
export const Wrapper = styled.div`
  display: flex; 
  width: 100%;
  height: 100vh; 
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  width: 100%; 
  overflow-x: hidden;
  /* 기존 #f8f9fc 대신 쿨그레이 팔레트의 가장 밝은 배경색 적용 */
  background-color: ${coolGray[50]}; 
`;

export const MainContent = styled.div`
  flex: 1 0 auto;
  /* 내용물의 크기를 기본으로 잡되(auto), 화면이 좁아져도 원래 크기보다 줄어들지는 말고(0), 
     만약 화면에 빈 공간이 남는다면 남는 여백을 네가 전부 채워라(1) */
`;

export const ContainerFluid = styled.div`
  width: 100%;
  padding-right: 1.5rem; 
  padding-left: 1.5rem;
  margin-right: auto; 
  margin-left: auto;
`;

// ==========================================
// 💡 2. 덧붙여서 추가하는 어드민 레이아웃 요소들
// ==========================================

// 좌측 사이드바 (.sidebar 대체)
export const Sidebar = styled.ul`
  width: 224px;
  background-color: ${coolGray[900]}; /* 다크 쿨그레이 */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  overflow-y: auto; /* 메뉴가 길어지면 스크롤 생성 */
`;

export const SidebarBrand = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.05rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
`;

export const NavItem = styled.li<{ $active?: boolean }>`
  padding: 0 16px;
  margin-top: 8px;

  a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: ${(props) => (props.$active ? '#ffffff' : coolGray[400])};
    font-weight: ${(props) => (props.$active ? '700' : '600')};
    font-size: 0.85rem;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s;
    background-color: ${(props) => (props.$active ? coolGray[800] : 'transparent')};

    &:hover {
      color: #ffffff;
      background-color: ${coolGray[800]}; /* 호버 시 강조된 다크 쿨그레이 */
    }

    svg {
      margin-right: 12px;
      font-size: 1.1rem;
    }
  }
`;

// 상단 네비게이션 바 (.topbar 대체)
export const Topbar = styled.nav`
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem; /* ContainerFluid 패딩과 통일 */
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08); 
  z-index: 10;
  margin-bottom: 1.5rem; /* 아래 콘텐츠와의 간격 확보 */
`;

// 페이지 제목 (.h3.mb-4 대체)
export const PageHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${coolGray[800]};
  margin-bottom: 1.5rem;
`;

// 데이터 카드 (.card.shadow 대체)
export const AdminDataCard = styled.div`
  ${adminCard} /* 앞서 정의한 쿨그레이 그림자+테두리 믹스인 적용 */
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  .card-header {
    padding: 1rem 1.25rem;
    background-color: ${coolGray[50]}; /* 연한 쿨그레이 바탕 */
    border-bottom: 1px solid ${coolGray[200]};
    border-radius: 8px 8px 0 0;
    font-weight: 700;
    color: ${coolGray[700]};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-body {
    padding: 1.25rem;
  }
`;