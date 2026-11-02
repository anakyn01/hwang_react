"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "@/assets/sass/main.module.scss";

interface InventoryItem {
  id: string; 
  name: string; 
  category: string;
  stock: number; 
  unitPrice: number;
  status: "normal" | "low" | "out";
}

export default function Inventory() {
  const [items] = useState<InventoryItem[]>([
    { id: "INV-1001", name: "알루미늄 프레임 A형", category: "원자재", stock: 1250, unitPrice: 15000, status: "normal" },
    { id: "INV-1002", name: "공업용 모터 250W", category: "부품", stock: 12, unitPrice: 85000, status: "low" },
    { id: "INV-1003", name: "제어용 메인보드 v2", category: "부품", stock: 0, unitPrice: 120000, status: "out" },
    { id: "INV-1004", name: "포장용 종이박스 (대)", category: "포장재", stock: 5000, unitPrice: 800, status: "normal" },
    { id: "INV-1005", name: "스틸 볼트 M8", category: "소모품", stock: 45, unitPrice: 150, status: "low" },
  ]);

  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <span className={`${styles.badge} ${styles.badgeNormal}`}>정상</span>;
      case "low":
        return <span className={`${styles.badge} ${styles.badgeLow}`}>재고부족</span>; 
      case "out":
        return <span className={`${styles.badge} ${styles.badgeOut}`}>품절</span>;  
      default:
        return <span className={`${styles.badge} ${styles.badgeUnknown}`}>알수없음</span>;             
    }
  };

  const lowOrOutCount = items.filter(item => item.status !== 'normal').length;
  const totalAsset = items.reduce((acc, curr) => acc + (curr.stock * curr.unitPrice), 0);

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* 상단 타이틀 및 버튼 */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>재고관리</h2>
          <button 
            className={styles.primaryButton} 
            onClick={() => showAlert("신규 품목 등록 모달이 열립니다.")}
          >
            + 신규 품목 등록
          </button>
        </div> 

        {/* 상단 통계 카드 */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>총 등록 품목</div>
            <div className={`${styles.statValue} ${styles.statValuePrimary}`}>{items.length}개</div>    
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>재고 부족 / 품절</div>
            <div className={`${styles.statValue} ${styles.statValueDanger}`}>
              {lowOrOutCount}건
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>총 재고 자산</div>
            <div className={`${styles.statValue} ${styles.statValueSuccess}`}>
              ₩ {totalAsset.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 메인 데이터 테이블 영역 */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>현재고 현황</span>
            <div className={styles.searchGroup}>
              <input type="text" className={styles.searchInput} placeholder="품목명 또는 코드 검색..." />
              <button className={styles.searchButton} onClick={() => showAlert("검색 기능은 준비 중입니다.")}>
                검색
              </button>
            </div>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "24px" }}>품목 코드</th>
                  <th>품목명</th>
                  <th>분류</th>
                  <th style={{ textAlign: "right" }}>현재고</th>
                  <th style={{ textAlign: "right" }}>단가 (원)</th>
                  <th style={{ textAlign: "center" }}>상태</th>
                  <th style={{ textAlign: "center" }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ paddingLeft: "24px" }}><strong style={{ color: "#86868B" }}>{item.id}</strong></td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.category}</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>{item.stock.toLocaleString()}</td>
                    <td style={{ textAlign: "right", color: "#86868B" }}>{item.unitPrice.toLocaleString()}</td>
                    <td style={{ textAlign: "center" }}>{renderStatusBadge(item.status)}</td>
                    <td style={{ textAlign: "center" }}>
                      <button 
                        className={styles.actionButtonEdit}
                        onClick={() => showAlert(`[${item.id}] 수정 창을 엽니다.`)}
                      >
                        수정
                      </button>
                      <button 
                        className={styles.actionButtonDelete}
                        onClick={() => showAlert(`[${item.id}] 품목을 삭제하시겠습니까?`)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 커스텀 알럿 모달 */}
        <CustomAlert 
          isOpen={isAlertOpen}
          message={alertMessage}
          onClose={() => setIsAlertOpen(false)}
        />

      </div>
    </Layout>
  );
}