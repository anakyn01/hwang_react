import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registy";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
// 💡 방금 만든 조건부 레이아웃 컴포넌트를 불러옵니다
import ConditionalLayout from "@/components/ConditionalLayout";

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
          <ThemeProviderWrapper>
     
            <ConditionalLayout>
          {children}
          </ConditionalLayout>
     
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
        </body>
    </html>
  );
}
