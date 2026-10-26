import React from "react";
import {Top} from "./Top";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import * as S from "@/assets/css/Layout.style";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children} : LayoutProps) => {
    return(
        <>
<S.PageWrapper>
      {/* 고정 상단 영역 */}
      <S.TopArea>
        <Top />
        <Header />
      </S.TopArea>

      <S.MainContent>
        {/* 공통 좌측 사이드바 */}
        <S.LnbWrapper>
          <SideBar />
        </S.LnbWrapper>

        {/* 🚀 각 페이지별 핵심 콘텐츠가 들어갈 자리 */}
        <S.ContentArea>
          {children}
        </S.ContentArea>
      </S.MainContent>

      {/* 공통 하단 영역 */}
      <Footer />
    </S.PageWrapper>        
        </>
    )
}