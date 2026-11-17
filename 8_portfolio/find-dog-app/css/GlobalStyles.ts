"use client";
import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html, body {margin:0; padding:0; width:100%; height:100%;}
*, *::before, *::after{box-sizing:border-box;}
a{text-decoration:none; color:inherit;}
ol,ul,li{list-style:none; margin:0; padding:0;}
`;