import styled from 'styled-components';
import Link from 'next/link'; // 💡 Next.js 전용 링크 불러오기

export const Wrapper = styled.div`
display:flex; width:100%;
height:100vh; overflow:hidden;
`;

export const ContentWrapper = styled.div`
display:flex; flex-direction:column;
width:100%; overflow-x:hidden;
background-color:#f8f9fc;
`;

export const MainContent = styled.div`
flex: 1 0 auto;
/*내용물의 크기를 기본으로 잡되(auto), 
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
width:100%;
padding-right:1.5rem; padding-left:1.5rem;
margin-right:auto; margin-left:auto;
`;

// SB Admin 2 테마는 className으로 스타일이 먹기 때문에 기본 뼈대 태그만 지정해 줍니다.
export const SidebarContainer = styled.ul<{$isCollapsed ?:boolean}>`
  background-color:#4e73df;
  min-height:100vh;
  width:${({ $isCollapsed}) => ($isCollapsed ? '90px':'224px')} !important;
  transition:width .3s ease-in-out;
  overflow-x:hidden;/* 접혔을 때 텍스트가 삐져나오지 않도록 방어 */
`;

export const BrandText = styled.div<{$isCollapsed?:boolean}>`
display:${({$isCollapsed }) => ($isCollapsed ? 'none':'block')};
margin-right:1rem;
`;

export const SidebarBrand = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

flex-direction:${({$isCollapsed}) => ($isCollapsed ? 'column' : 'row')};  
  height:4.5rem;

  text-decoration: none !important;
  color:#fff !important;
  font-size:${({ $isCollapsed }) => ($isCollapsed ? '0.7rem' : '1.2rem')};
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.05rem;
  white-space:nowrap;
  overflow:hidden;

  &:hover{
  color:#fff;
  text-decoration:none;
  }

  .sidebar-brand-icon{
  font-size:2rem;
  }
`;

export const Divider = styled.hr`
`;

export const NavItem = styled.li`
width:100%;
`;

export const NavLink = styled.a<{$isCollapsed?:boolean}>`
  display: flex;
  align-items:center;
  width:100%;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  /* 사이드 바가 접히면 아이콘 가운데만 정렬되도록 조정*/
  justify-content:${({$isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  //add
  padding:${({ $isCollapsed }) => ($isCollapsed ? '1rem 0' : '1rem 1.5rem')};

  span{
  display:${({ $isCollapsed }) => 
    ($isCollapsed ? 'none' : 'inline')};
  margin-left:10px;
  }
  
  &:hover {
    color: #fff;
    text-decoration: none;
  }
  
  i {
    margin-right: ${({$isCollapsed}) => ($isCollapsed ? '0' :'10px')}; /* 아이콘과 글자 사이 간격 */
  }
`;

export const ToggleButtonWrapper=styled.div`
display:flex;
justify-content:center;
padding:1rem 0;
`;
export const ToggleButton=styled.button<{$isCollapsed?:boolean}>`
width:40px; height:40px;
border-radius:50%;
justify-content:center;
background-color:rgba(255,255,255,.2);
border:none;
color:white;
cursor:pointer;
display:flex;
align-items:center;
transition:background-color .2s ease;

&:hover{
background:rgba(255,255,255,0.3);
}
`;

/*
old style
text-align:center;
vertical-align:middle;

항상 어디든 가로세로 가운데 정렬은
display:flex;
*/