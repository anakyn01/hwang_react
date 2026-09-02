import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registy";
import { GlobalStyle } from "@/assets/css/GlobalStyle";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import * as S from "@/assets/css/LayoutWrapper.style";

export const metadata: Metadata = {
title: {
  template:"%s | ERP",//%s 자리에 각 페이지의 타이틀이 들어갑니다. 
  default:"ERP 시스템",//각 페이지에 타이틀 설정이 없을때 나오는 기본값
},
  description: "사내 ERP 시스템 입니다.",
};

export default function RootLayout({ children }: Readonly<{children:React.ReactNode;
  }>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle/>
          <S.PageWrapper>
            <Header/>
            <S.MainContent>
          {children}
          </S.MainContent>
          <Footer/>
          </S.PageWrapper>
        </StyledComponentsRegistry>
        </body>
    </html>
  );
}
