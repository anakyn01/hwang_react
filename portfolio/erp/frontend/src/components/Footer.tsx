"use client";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <strong className={styles.strong}>Smart ERP System</strong> v1.2.0 <br />
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
      
      <div className={styles.footerLinks}>
        <a href="/support" className={styles.link}>기술지원</a>
        <a href="/terms" className={styles.link}>이용약관</a>
        <a href="/manual" className={styles.link}>사용자 매뉴얼</a>
      </div>
    </footer>
  );
};