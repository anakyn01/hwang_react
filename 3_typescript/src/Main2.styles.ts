import styled,{createGlobalStyle} from 'styled-components';
import { Link } from 'react-router-dom';

//0 전역 스타일 (모든 요소에 box-sizing 설정)
export const GlobalStyle = createGlobalStyle`
* {
box-sizing: border-box;
}
`

//반응형 크기 기준점 변수
const sm = '576px';
const md = '768px';

//전체 레이아웃을 감싸는 그리드 컨테이너
export const Container = styled.div`
display:grid;
grid-template-columns: repeat(12,[col-start] 1fr);
gap:20px;

    /*mobile first
    & > * {

    border: 1px solid green;
    background-color:beige;
    padding:10px;
    grid-column: col-start / span 12;
    }
`;

//1.전체 내비게이션 바 컨테이너
export const NavBar = styled.nav`
background-color:#333;
padding:1rem 2rem;
display:flex;
justify-content:space-between;
align-items:center;

    ul{
    list-style:none; margin:0; padding:0;

    @media (min-width: ${sm}) {
        display:flex; justify-content:space-between;
    }

    @media (min-width: ${md}) {
        flex-direction: column;
    }
}     

    //태블릿 PC환경에서 네비게이션 바 배치 위치
    @media (min-width: ${md}) {
    grid-column : col-start / span 2;
    grid-row: 2 / 4
    }
    `;

//2.로고 스타일
export const Logo = styled.h1`
color:#fff; margin:0; font-size:1.5rem;
`;

//3.메뉴 링크들을 담는 박스
export const NavLinks = styled.div`
display:flex; gap:20px;
`;

export const StyledLink = styled(Link)`
color:#aaa; 
text-decoration:none;
font-size:1.1rem; 
font-weight:bold;
transition: color 0.2s ease-in-out;

 &:hover{ color: #fff; }
`;

export const Content = styled.main`
    @media (min-width: ${sm}) {
        grid-column: col-start 4 / span 9;
    }
    @media (min-width: ${md}) {
        grid-column: col-start 3 / span 8;
        grid-row: 2 / 4;
    }
`;

export const Sidebar = styled.aside`
@media (min-width: ${sm}) {
 grid-column: col-start / span 3;
 grid-row: 3;
}
@media (min-width: ${md}) {
    grid-column: col-start 11 / span 2;
    grid-row: auto;
}
`;

export const Ads = styled.div`
@media (min-width: ${sm}) {
    grid-column: col-start / span 3;
}
@media (min-width: ${md}) {
   grid-column : col-start 11 / span 2;
}
`;

export const Footer = styled.footer`
@media (min-width: ${sm}) {
    grid-column: col-start 4 / span 9;
}
@media (min-width: ${md}) {
    grid-column: col-start / span 12;
}
`;


//5
export const PageContainer = styled.div`
padding:2rem; text-align:center; 
font-family:sans-serif;
`;