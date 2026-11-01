"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "./Production.module.css";

interface ProductionOrder {
  id: string;
  productName: string;
  quantity: number;
  status: 'planning' | 'progress' | 'completed';
  progress: number;
  dueDate: string;    
}

export default function Production() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  
  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/api/production/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("오더 목록 로딩 오류:", error);
    }
  };

  const handleAddOrder = async () => {
    const newOrderData = {
      id: `PRD-2023-999`, 
      productName: "테스트 신규 모터",
      quantity: 100,
      status: "planning",
      progress: 0,
      dueDate: "2023-12-31"
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:8080/api/production/orders", newOrderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders([...orders, response.data]);
      showAlert("신규 오더가 성공적으로 DB에 저장되었습니다!");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      showAlert("등록에 실패했습니다.");
    }
  };

  // 상태에 따른 뱃지 및 스타일 매핑
  const getBadgeInfo = (status: string) => {
    switch (status) {
      case 'progress': 
        return { className: styles.badgeProgress, text: '생산중' };
      case 'completed': 
        return { className: styles.badgeCompleted, text: '생산완료' };
      case 'planning':
      default: 
        return { className: styles.badgePlanning, text: '생산대기' };    
    }    
  };

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* 상단 타이틀 및 등록 버튼 */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>생산 관리</h2>
          <button className={styles.primaryButton} onClick={handleAddOrder}>
            + 신규 오더 등록
          </button>
        </div>

        {/* 상단 통계 카드 섹션 */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>진행중인 오더</div>
            <div className={styles.statValue}>2건</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>생산 대기</div>
            <div className={styles.statValue}>1건</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>이번 달 완료</div>
            <div className={`${styles.statValue} ${styles.statValueSuccess}`}>1건</div>
          </div>
        </div>

        {/* 메인 데이터 테이블 섹션 */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            생산 오더 목록
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "24px" }}>오더 번호</th>
                  <th>제품명</th>
                  <th>수량</th>
                  <th>상태</th>
                  <th style={{ width: "25%" }}>진행률</th>
                  <th>납기일</th>
                  <th style={{ textAlign: "center" }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const badge = getBadgeInfo(order.status);
                  
                  return (
                    <tr key={order.id}>
                      <td style={{ paddingLeft: "24px" }}><strong>{order.id}</strong></td>
                      <td>{order.productName}</td>
                      <td>{order.quantity.toLocaleString()} 개</td>
                      <td>
                        <span className={`${styles.badge} ${badge.className}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "13px", color: "#86868B", minWidth: "35px" }}>
                            {order.progress}%
                          </span>
                          <div className={styles.progressTrack}>
                            <div 
                              className={`${styles.progressBar} ${order.status === 'completed' ? styles.progressBarGreen : styles.progressBarBlue}`} 
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>{order.dueDate}</td>
                      <td style={{ textAlign: "center" }}>
                        <button className={styles.detailButton}>
                          상세보기
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 커스텀 알럿 모달 렌더링 */}
        <CustomAlert 
          isOpen={isAlertOpen}
          message={alertMessage}
          onClose={() => setIsAlertOpen(false)}
        />

      </div>
    </Layout>
  );
}