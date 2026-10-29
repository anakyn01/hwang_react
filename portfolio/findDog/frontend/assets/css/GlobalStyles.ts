"use client";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0; 
    padding: 0; 
    width: 100%; 
    height: 100%;

    /* 1. 폰트 안티앨리어싱 (글씨를 뚜렷하고 부드럽게 렌더링) */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* 2. 텍스트 렌더링 최적화 (자간 및 가독성 향상) */
    text-rendering: optimizeLegibility;

    /* 3. 눈의 피로도를 낮추고 명도 대비를 확보하는 기본 폰트 색상 */
    color: #333333; 

    /* (선택) 한글 가독성이 높은 시스템 폰트 스택 적용 예시 */
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none; 
    color: inherit;
  }

  ol, ul, li {
    list-style: none; 
    margin: 0; 
    padding: 0;
  }
`;