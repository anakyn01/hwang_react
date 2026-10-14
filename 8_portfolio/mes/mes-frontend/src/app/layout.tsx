//import "@/globals.css";

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
    <html lang="ko" className="h-full">
      <body className="h-full m-0 bg-gray-50 text-gray-900 antialiased">
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
