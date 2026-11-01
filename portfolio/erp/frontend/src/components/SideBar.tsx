"use client";

import React from "react";
import styles from "./SideBar.module.css";

export const SideBar = () => {
  return (
    <aside className={styles.asideContainer}>
      <div className={styles.menuSection}>
        <h3 className={styles.sectionTitle}>ERP 업무</h3>
        <ul className={styles.menuList}>
          <li><a href="/dashboard" className={styles.menuItem}>대시보드</a></li>
          <li><a href="/dashboard/calender" className={styles.menuItem}>캘린더</a></li>
          <li><a href="/dashboard/production" className={styles.menuItem}>생산관리</a></li>
          <li><a href="/dashboard/inventory" className={styles.menuItem}>재고관리</a></li>
          <li><a href="/dashboard/hr" className={styles.menuItem}>인사관리</a></li>
          <li><a href="/dashboard/settings" className={styles.menuItem}>기준정보</a></li>
        </ul>
      </div>

      <div className={styles.menuSection}>
        <h3 className={styles.sectionTitle}>시스템 관리</h3>
        <ul className={styles.menuList}>
          <li><a href="/master-data" className={styles.menuItem}>기준 정보 관리</a></li>
          <li><a href="/users" className={styles.menuItem}>사용자 권한 관리</a></li>
          <li><a href="/settings" className={styles.menuItem}>시스템 환경설정</a></li>
        </ul>
      </div>
    </aside>
  );
};