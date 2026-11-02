import "./globals.css"; //테일윈드 사용할 경우
import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registy";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
// 💡 방금 만든 조건부 레이아웃 컴포넌트를 불러옵니다
import ConditionalLayout from "@/components/ConditionalLayout";
import { ReduxProvider } from "@/store/ReduxProvider";

// 💡 StyleX 추가
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export const metadata: Metadata = {
  title: {
    template: "%s | ERP", //%s 자리에 각 페이지의 타이틀이 들어갑니다. 
    default: "ERP 시스템", //각 페이지에 타이틀 설정이 없을때 나오는 기본값
  },
  description: "사내 ERP 시스템 입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }> ) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* 부트스트랩 CDN 추가 */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      {/* 💡 body에 stylex.props(styles.pageWrapper)를 적용하여 전체 배경 및 Flex 구조 유지 */}
      <body {...stylex.props(styles.pageWrapper)} className="h-full m-0 bg-gray-50 text-gray-900 antialiased">
        {/*<StyledComponentsRegistry>
          <ThemeProviderWrapper>*/}
          <ReduxProvider>
                <ConditionalLayout>
                {children}
                </ConditionalLayout>
          </ReduxProvider>
          {/*</ThemeProviderWrapper>
        </StyledComponentsRegistry>*/}
      </body>
    </html>
  );
}