import styled from "styled-components";

// 전체 화면을 감싸고 헤더, 메인, 푸터를 상하로 배치
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// 헤더와 푸터 사이의 중간 영역 (가로로 LNB와 콘텐츠 분할)
export const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

// 좌측 LNB(SideBar) 영역
export const LnbWrapper = styled.aside`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none; /* 모바일에서는 LNB를 숨김 (헤더 햄버거 메뉴 사용) */
  }
`;

// 우측 본문(캘린더) 영역
export const ContentArea = styled.main`
  flex: 1;
  padding: 32px;
  background-color: #f8fafc;
  overflow-y: auto;
  min-width: 0; /* Flex 자식 요소가 부모를 넘어가지 않게 방지 */
`;

// 캘린더 2개를 담는 레이아웃 (반응형 지원)
export const CalendarLayout = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 1024px) {
    flex-direction: column; /* 태블릿/모바일에서는 캘린더가 위아래로 떨어짐 */
  }
`;

// 스몰 캘린더 패널
export const LeftPanel = styled.div`
  width: 320px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

// 메인 캘린더 패널
export const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
`;