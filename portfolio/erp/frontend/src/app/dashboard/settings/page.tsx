"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "./Settings.module.css";

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("company");

  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const handleSave = () => {
    showAlert("변경사항이 성공적으로 저장되었습니다.");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>기준정보 설정</h2>
        </div>

        <div className={styles.content}>
          {/* 좌측 사이드바 */}
          <div className={styles.sidebar}>
            <ul>
              <li 
                className={activeMenu === "company" ? styles.active : ""} 
                onClick={() => setActiveMenu("company")}
              >
                회사 기본 정보
              </li>
              <li 
                className={activeMenu === "items" ? styles.active : ""} 
                onClick={() => setActiveMenu("items")}
              >
                품목 마스터 관리
              </li>
              <li 
                className={activeMenu === "users" ? styles.active : ""} 
                onClick={() => setActiveMenu("users")}
              >
                시스템 권한 설정
              </li>
            </ul>
          </div>

          {/* 우측 메인 패널 */}
          <div className={styles.mainPanel}>
            <h3>
              {activeMenu === "company" && "회사 기본 정보"}
              {activeMenu === "items" && "품목 마스터 관리"}
              {activeMenu === "users" && "시스템 권한 설정"}
            </h3>
            
            {activeMenu === "company" && (
              <>
                <div className={styles.formGroup}>
                  <label>회사명</label>
                  <input type="text" defaultValue="Apple ERP Korea" placeholder="회사명을 입력하세요" />
                </div>
                
                <div className={styles.formGroup}>
                  <label>사업자 등록번호</label>
                  <input type="text" defaultValue="123-45-67890" placeholder="- 없이 입력" />
                </div>

                <div className={styles.formGroup}>
                  <label>대표 이메일</label>
                  <input type="email" defaultValue="admin@apple-erp.co.kr" />
                </div>

                <button className={styles.saveBtn} onClick={handleSave}>
                  변경사항 저장
                </button>
              </>
            )}

            {activeMenu === "items" && (
              <div style={{ color: "#86868B", padding: "20px 0" }}>
                품목 마스터 관리 화면이 준비 중입니다.
              </div>
            )}

            {activeMenu === "users" && (
              <div style={{ color: "#86868B", padding: "20px 0" }}>
                시스템 권한 설정 화면이 준비 중입니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 커스텀 알럿 모달 */}
      <CustomAlert 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />
    </Layout>
  );
}