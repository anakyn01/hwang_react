import styled from 'styled-components';

export const AppContainer = styled.div`
display:grid;
grid-template-rows:60px 1fr 60px;
grid-template-columns:100%;
min-height: 100vh;
/*Viewport Height 브라우저창의 전체 높이를 100%로 보겠다는 단위
정확히 100%높이를 의미 사용하는 이유는 height:100은 부모요소의 영향을 받음
그래서 전체화면을 차지 않는 경우가 많다..어떤 상황에서도 화면전체를 꽉 채우는 
레이아웃을 만들때 사용한다
*/
max-width:480px;
margin:0 auto;
background-color:#f8f9fa;
box-shadow:0 4px 12px rgba(0,0,0,0.1);
`;

export const Header = styled.header`
display:flex; 
justify-content:center;//가로 가운데 정렬
align-items:center;//세로 가운데 정렬

background-color:#fff;
border-bottom:1px solid #e0e0e0;
font-weight:bold;
front-size:1.1rem;
`;

export const MainContent = styled.main`
overflow-y:auto; 
//정해진 길이보다 오버될때 알아서 스크롤바 생성되란 의미
padding:16px;
`;

export const BottomNav = styled.nav`
display:flex;
justify-content:space-around; 
//왼쪽 오른쪽 공간을 뛰운후 정렬
align-items:center;
background-color:#fff;//6자리가 일치하면 3개로줄일수 있다
border-top:1px solid #e0e0e0;
`;
