

import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

import * as S from '@/assets/css/LayoutWrapper.style';
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | MES",
    default:"MES 시스템",
  },
  description: "사내 MES 시스템입니다",
};

export default function RootLayout({ children, 
  }: Readonly<{
    children:React.ReactNode;
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
