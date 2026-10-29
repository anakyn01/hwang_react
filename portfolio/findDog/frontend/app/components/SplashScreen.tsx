"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from './Logo'; // 앞서 만든 로고 컴포넌트 임포트
import * as S from "@/assets/css/style.styles";



export default function SplashScreen() {
  return (
    <S.SplashWrapper>
      {/* 메인 헤더보다 로고 크기를 1.5배 정도 키워서 렌더링 */}
      <Logo width={270} height={54} />
    </S.SplashWrapper>
  );
}