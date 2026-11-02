"use client";

import React from "react";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

// 💡 진짜 기능이 들어있는 컴포넌트들을 임포트합니다
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div {...stylex.props(styles.pageWrapper)}>
      {/* 1. 진짜 상단 헤더 (로그아웃 알럿 & 모바일 메뉴 작동) */}
      <Header />

      {/* 2. 메인 콘텐츠 영역 (사이드바 + 본문 가로 정렬) */}
      <div {...stylex.props(styles.mainContent)}>
        <div {...stylex.props(styles.lnbWrapper)}>
          <SideBar />
        </div>

        <main {...stylex.props(styles.contentArea)}>
          {children}
        </main>
      </div>

      {/* 3. 하단 푸터 */}
      <Footer />
    </div>
  );
}