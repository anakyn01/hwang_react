import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "어서찾아주개",
  description: "유기동물 입양 및 정보 제공 플랫폼",
};

export default function RootLayout({ 
  children,  
}:{
  children: React.ReactNode;
}){
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
        {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
