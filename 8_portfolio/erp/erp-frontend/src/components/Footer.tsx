"use client";
import * as S from "../assets/css/HeaderFooter.style";

export const Footer = () => {
    return(
        <>

<S.FooterContainer>
      <S.FooterInfo>
        <strong>Smart MES System</strong> v1.2.0 <br />
        &copy; {new Date().getFullYear()} All rights reserved.
      </S.FooterInfo>
      
      <S.FooterLinks>
        <a href="/support">기술지원</a>
        <a href="/terms">이용약관</a>
        <a href="/manual">사용자 매뉴얼</a>
      </S.FooterLinks>
 </S.FooterContainer>
      
        </>
    )
}