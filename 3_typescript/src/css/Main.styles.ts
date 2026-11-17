import styled, { createGlobalStyle} from "styled-components";
import {Link} from 'react-router-dom';
import {theme} from './theme';

export const GlobalStyle = createGlobalStyle`
* {
box-sizing: border-box;
}
`;

const sm = '576px';
const md = '768px';

//1)
export const Container = styled.div`
display: grid;
grid-template-columns : repeat(12, [col-start] 1fr);
gap: 20px;

    & > * {
    border: 1px solid green;
    background-color: beige;
    padding: 10px;
    grid-column: col-start / span 12;
    }

`;

//header
export const Head = styled.header`

`;

//nav
export const Nav = styled.nav`
    ul{
       list-style: none;
       margin:0; padding:0;

       @media (min-width: 576px) {
         display:flex;
         justify-content: space-between;
       }

       @media (min-width: 768px) {
         flex-direction: column;
       }
    }

    @media (min-width: 768px) {
     grid-column: col-start / span 2;
     grid-row: 2 / 4;
    }
`;

//nav ul li a 대신에 리액트 라우터 Link 스타일링
export const StyledLink = styled(Link)`
    color:blue; 
    text-decoration: underline;
    display:inline-block;
    padding:2px 0;

    &:hover{
        color:darkblue;
    }
`;

//가운데 라우터가 교체될 본문영역
export const Content = styled.div`
    @media (min-width: 576px) {
     grid-column: col-start 4 / span 9;
    }
    @media (min-width: 768px) {
     grid-column: col-start 3 / span 8;
     grid-row: 2 / 4;
    }
`;

export const Sidebar = styled.div`
    @media (min-width: 576px) {
     grid-column: col-start / span 3;
     grid-row:3;
    }
    @media (min-width: 768px) {
     grid-column: col-start 11 / span 2;
     grid-row: auto;
    }
`;

export const Ads = styled.div`
    @media (min-width: 576px) {
     grid-column: col-start / span 3;
    }
    @media (min-width: 768px) {
     grid-column: col-start 11 / span 2;
    }
`;

export const Footer = styled.footer`
    @media (min-width: 576px) {
     grid-column: col-start 4 / span 9;
    }
    @media (min-width: 768px) {
     grid-column: col-start / span 12;
    }
`;