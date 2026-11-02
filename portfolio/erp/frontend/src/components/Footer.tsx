"use client";

import React from "react";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles"; // 💡 StyleX 스타일 경로 임포트

export const Footer = () => {
  return (
    <footer {...stylex.props(styles.footerContainer)}>
      <div {...stylex.props(styles.footerInfo)}>
        <strong {...stylex.props(styles.strong)}>Smart ERP System</strong> v1.2.0 <br />
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
      
      <div {...stylex.props(styles.footerLinks)}>
        <a href="/support" {...stylex.props(styles.link)}>기술지원</a>
        <a href="/terms" {...stylex.props(styles.link)}>이용약관</a>
        <a href="/manual" {...stylex.props(styles.link)}>사용자 매뉴얼</a>
      </div>
    </footer>
  );
};