import styled from 'styled-components';
import Link from 'next/link'; 
import { coolGray } from '@/assets/css/admin/Admin.styles'; // 💡 만들어둔 쿨그레이 팔레트 임포트

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
  background-color: ${coolGray[50]}; /* 💡 기존 #f8f9fc 대신 쿨그레이 가장 밝은 톤 적용 */
`;

export const MainContent = styled.div`
  flex: 1 0 auto;
  /* 내용물의 크기를 기본으로 잡되(auto), 
  화면이 좁아져도 원래 크기보다 줄어들지는 말고(0), 
  만약 화면에 빈 공간이 남는다면 남는 여백을 네가 전부 채워라(1)."
  1 (flex-grow): 늘어나는 비율
  부모 컨테이너에 남는 여백이 있을 때, 
  이 요소가 남는 공간을 꽉 채우도록 늘어나라는 뜻입니다. (기본값은 0)
  0 (flex-shrink): 줄어드는 비율
  부모 컨테이너의 공간이 부족해질 때, 
  이 요소의 크기를 절대 줄이지 말라는 뜻입니다. (기본값은 1)
  auto (flex-basis): 기본 크기
  요소의 기본 시작 크기를 내부 콘텐츠의 크기나 
  설정된 width/height 값에 맞추겠다는 뜻입니다.
  */
`;

export const ContainerFluid = styled.div`
  width: 100%;
  padding-right: 1.5rem; 
  padding-left: 1.5rem;
  margin-right: auto; 
  margin-left: auto;
`;

// 💡 기존 SB Admin 2 파란색(#4e73df) 대신 다크 쿨그레이(coolGray[900]) 적용
export const SidebarContainer = styled.ul<{ $isCollapsed?: boolean }>`
  background-color: ${coolGray[900]};
  min-height: 100vh;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '90px' : '224px')} !important;
  transition: width .3s ease-in-out;
  overflow-x: hidden; /* 접혔을 때 텍스트가 삐져나오지 않도록 방어 */
`;

export const BrandText = styled.div<{ $isCollapsed?: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
  margin-right: 1rem;
`;

export const SidebarBrand = styled.a<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $isCollapsed }) => ($isCollapsed ? 'column' : 'row')};  
  height: 4.5rem;
  text-decoration: none !important;
  color: #fff !important;
  font-size: ${({ $isCollapsed }) => ($isCollapsed ? '0.7rem' : '1.2rem')};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    color: #fff;
    text-decoration: none;
  }

  .sidebar-brand-icon {
    font-size: 2rem;
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* 💡 다크 배경에 어울리는 은은한 선으로 변경 */
  margin: 0 1rem 1rem 1rem;
`;

export const NavItem = styled.li`
  width: 100%;
  padding: 0 0.5rem; /* 💡 호버 시 배경색이 사이드바 너비를 꽉 채우지 않도록 여백 부여 */
  margin-bottom: 4px;
`;

export const NavLink = styled.a<{ $isCollapsed?: boolean; $isActive?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 6px; /* 💡 버튼형 메뉴처럼 둥근 모서리 적용 */
  
  /* 💡 활성화(현재 페이지) 상태일 땐 흰색 글씨+배경, 비활성화일 땐 쿨그레이 글씨 */
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : coolGray[400])};
  background-color: ${({ $isActive }) => ($isActive ? coolGray[800] : 'transparent')};
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '600')};
  text-decoration: none;
  transition: all 0.2s;

  /* 사이드 바가 접히면 아이콘 가운데만 정렬되도록 조정 */
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '1rem 0' : '1rem 1rem')};

  span {
    display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'inline')};
    margin-left: 10px;
  }
  
  &:hover {
    color: #fff;
    background-color: ${coolGray[800]}; /* 💡 호버 시 다크 쿨그레이 배경 깔림 */
    text-decoration: none;
  }
  
  i, svg {
    margin-right: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '10px')}; /* 아이콘과 글자 사이 간격 */
  }
`;

export const ToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

export const ToggleButton = styled.button<{ $isCollapsed?: boolean }>`
  width: 40px; 
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  cursor: pointer;
  
  /* 💡 좀 더 모던하게 투명도 조절 */
  background-color: rgba(255, 255, 255, 0.1); 
  transition: background-color .2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

/*
old style
text-align:center;
vertical-align:middle;

항상 어디든 가로세로 가운데 정렬은
display:flex;
*/