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

<head>
        {/* 1. 폰트어썸 CDN (아이콘 살리기) */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
        />
        
        {/* 2. 부트스트랩 4 CDN (레이아웃, 버튼, 컬러 살리기) */}
        <link 
          rel="stylesheet" 
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
        />

        {/* 3. 구글 폰트 Nunito (SB Admin 2 기본 폰트 - 선택사항) */}
        <link 
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" 
          rel="stylesheet" 
        />

        {/* 💡 만약 기존 프로젝트에서 sb-admin-2.min.css 파일을 public/css 폴더 안에 넣어두셨다면 아래 주석을 풀고 사용하세요! */}
        {/* <link href="/css/sb-admin-2.min.css" rel="stylesheet" /> */}
      </head>

      <body id="page-top" className="bg-primary text-gray-800">
        <StyledComponentsRegistry>
        {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
