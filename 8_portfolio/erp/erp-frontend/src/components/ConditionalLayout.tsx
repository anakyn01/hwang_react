"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import * as S from "@/assets/css/LayoutWrapper.style"; // 기존에 쓰시던 레이아웃 스타일

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  // 현재 URL 경로를 가져옵니다 (예: "/login")
  const pathname = usePathname();

  // 💡 헤더와 푸터를 숨기고 싶은 URL 경로들을 배열에 적어줍니다.
  const hiddenPaths = ["/login", "/member", "/find-id", "/forgot", "/"]; 
  // (루트 "/" 가 로그인 페이지라면 "/" 도 추가하세요)

  // 현재 경로가 hiddenPaths 배열 안에 포함되어 있는지 확인 (true or false)
  const isHidden = hiddenPaths.includes(pathname);

  return (
    <S.PageWrapper>
      
  
      
      <S.MainContent>
        {children}
      </S.MainContent>
      
  
      
    </S.PageWrapper>
  );
}