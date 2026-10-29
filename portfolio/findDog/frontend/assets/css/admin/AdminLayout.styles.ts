import styled from 'styled-components';
import { coolGray, adminCard } from './Admin.styles'; // 앞서 만든 믹스인 임포트

// 1. 전체 화면 래퍼 (#wrapper 대체)
export const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${coolGray[50]};
`;

// 2. 좌측 사이드바 (.sidebar 대체)
export const Sidebar = styled.ul`
  width: 224px; /* SB Admin 기본 너비에 맞춤 */
  background-color: ${coolGray[900]}; /* 기존 파란색 대신 다크 쿨그레이 적용 */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  list-style: none;
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
      background-color: ${(props) => (props.$active ? coolGray[800] : coolGray[800])};
    }

    svg {
      margin-right: 12px;
      font-size: 1.1rem;
    }
  }
`;

// 3. 우측 콘텐츠 영역 래퍼 (#content-wrapper 대체)
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
`;

// 4. 상단 네비게이션 바 (.topbar 대체)
export const Topbar = styled.nav`
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  /* SB Admin 특유의 하단 그림자를 쿨그레이 톤으로 부드럽게 적용 */
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08); 
  z-index: 10;
`;

// 5. 실제 페이지 콘텐츠 영역 (.container-fluid 대체)
export const MainContent = styled.div`
  padding: 24px;
  flex: 1;
`;

// 6. 페이지 제목 (.h3.mb-4.text-gray-800 대체)
export const PageHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${coolGray[800]};
  margin-bottom: 24px;
`;

// 7. 데이터 카드 (.card.shadow 대체)
export const AdminDataCard = styled.div`
  ${adminCard} /* 앞서 만든 카드 믹스인 적용 */
  display: flex;
  flex-direction: column;
  
  .card-header {
    padding: 16px 20px;
    background-color: ${coolGray[50]};
    border-bottom: 1px solid ${coolGray[200]};
    border-radius: 8px 8px 0 0;
    font-weight: 700;
    color: ${coolGray[700]};
  }

  .card-body {
    padding: 20px;
  }
`;