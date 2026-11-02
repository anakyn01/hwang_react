"use client";

import React from "react";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles"; // 💡 StyleX 스타일 경로 임포트

export const SideBar = () => {
  return (
    <aside {...stylex.props(styles.asideContainer)}>
      <div {...stylex.props(styles.menuSection)}>
        <h3 {...stylex.props(styles.sectionTitle)}>ERP 업무</h3>
        <ul {...stylex.props(styles.menuList)}>
          <li><a href="/dashboard" {...stylex.props(styles.menuItem)}>대시보드</a></li>
          <li><a href="/dashboard/calender" {...stylex.props(styles.menuItem)}>캘린더</a></li>
          <li><a href="/dashboard/production" {...stylex.props(styles.menuItem)}>생산관리</a></li>
          <li><a href="/dashboard/inventory" {...stylex.props(styles.menuItem)}>재고관리</a></li>
          <li><a href="/dashboard/hr" {...stylex.props(styles.menuItem)}>인사관리</a></li>
          <li><a href="/dashboard/settings" {...stylex.props(styles.menuItem)}>기준정보</a></li>
        </ul>
      </div>

      <div {...stylex.props(styles.menuSection)}>
        <h3 {...stylex.props(styles.sectionTitle)}>시스템 관리</h3>
        <ul {...stylex.props(styles.menuList)}>
          <li><a href="/master-data" {...stylex.props(styles.menuItem)}>기준 정보 관리</a></li>
          <li><a href="/users" {...stylex.props(styles.menuItem)}>사용자 권한 관리</a></li>
          <li><a href="/settings" {...stylex.props(styles.menuItem)}>시스템 환경설정</a></li>
        </ul>
      </div>
    </aside>
  );
};