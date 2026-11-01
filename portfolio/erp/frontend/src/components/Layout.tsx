"use client";

import React from "react";
import { Top } from "./Top";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topArea}>
        <Top />
        <Header />
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.lnbWrapper}>
          <SideBar />
        </aside>
        
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};