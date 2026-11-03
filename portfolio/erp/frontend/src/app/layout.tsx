import "./globals.css"; //테일윈드 사용할 경우
import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registy";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ConditionalLayout from "@/components/ConditionalLayout";
import { ReduxProvider } from "@/store/ReduxProvider";
import * as S from "@/assets/css/Style.style";

// StyleX 추가
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

// 전역 스케줄 Context 임포트
import { ScheduleProvider } from "@/context/ScheduleContext";
// 💡 방금 분리한 클라이언트 전용 토스트 컴포넌트 임포트
import { GlobalToastManager } from "@/components/GlobalToastManager";

export const metadata: Metadata = {
  title: {
    template: "%s | ERP", 
    default: "ERP 시스템", 
  },
  description: "사내 ERP 시스템 입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }> ) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body {...stylex.props(styles.pageWrapper)} className="h-full m-0 bg-gray-50 text-gray-900 antialiased">
        <ReduxProvider>
          <ScheduleProvider>
            <GlobalToastManager />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ScheduleProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}