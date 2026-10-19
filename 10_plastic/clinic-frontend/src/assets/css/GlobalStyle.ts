"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body {
margin:0; padding:0;
width:100%;
height:100%;
}
//모든 요소에 테두리까지 포함해서 크기 계산 (가장 중요!)
*, *::before, *::after{
box-sizing: border-box;
}

a{
text-decoration: none;
color: inherit;
}

ul, ol, li {
list-style:none;
margin:0; padding:0;
}

`;