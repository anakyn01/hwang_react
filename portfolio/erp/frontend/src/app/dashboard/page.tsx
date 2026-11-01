"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  // 가상의 요약 데이터
  const recentOrders = [
    { id: "PRD-2023-001", productName: "알루미늄 프레임 A형", quantity: 500, status: "progress", progress: 65, dueDate: "2026-11-20" },
    { id: "PRD-2023-002", productName: "공업용 모터 250W", quantity: 120, status: "planning", progress: 0, dueDate: "2026-11-25" },
    { id: "PRD-2023-003", productName: "제어용 메인보드 v2", quantity: 300, status: "completed", progress: 100, dueDate: "2026-11-15" },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* 상단 타이틀 */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>대시보드</h2>
          <p className={styles.subtitle}>Smart ERP 통합 운영 현황 및 실시간 지표입니다.</p>
        </div>

        {/* 상단 지표 카드 4개 */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>전체 가동 오더</div>
            <div className={`${styles.metricValue} ${styles.metricValueBlue}`}>12건</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>이번 달 생산 완료</div>
            <div className={`${styles.metricValue} ${styles.metricValueGreen}`}>28건</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>재고 부족 품목</div>
            <div className={`${styles.metricValue} ${styles.metricValueOrange}`}>2건</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>총 임직원</div>
            <div className={styles.metricValue}>4명</div>
          </div>
        </div>

        {/* 중간 차트 및 그래프 영역 */}
        <div className={styles.chartsGrid}>
          
          {/* 부문별 생산 공정 진척도 (커스텀 바 그래프) */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <span>주요 생산 공정 진척도</span>
              <span style={{ fontSize: "12px", color: "#86868B", fontWeight: 400 }}>실시간 업데이트</span>
            </div>
            
            <div className={styles.barChartContainer}>
              <div className={styles.barItem}>
                <div className={styles.barInfo}>
                  <span>알루미늄 프레임 A형</span>
                  <span style={{ fontWeight: 600 }}>65%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillBlue}`} style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className={styles.barItem}>
                <div className={styles.barInfo}>
                  <span>공업용 모터 250W</span>
                  <span style={{ fontWeight: 600 }}>30%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillOrange}`} style={{ width: "30%" }}></div>
                </div>
              </div>

              <div className={styles.barItem}>
                <div className={styles.barInfo}>
                  <span>제어용 메인보드 v2</span>
                  <span style={{ fontWeight: 600 }}>100%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillGreen}`} style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 시스템 상태 요약 */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <span>시스템 리소스 상태</span>
            </div>
            
            <div className={styles.statusList}>
              <div className={styles.statusRow}>
                <span>API 서버 연동</span>
                <span style={{ color: "#34C759", fontWeight: 600 }}>정상 (99.9%)</span>
              </div>
              <div className={styles.statusRow}>
                <span>Oracle DB 커넥션</span>
                <span style={{ color: "#34C759", fontWeight: 600 }}>연결됨</span>
              </div>
              <div className={styles.statusRow}>
                <span>Docker 컨테이너</span>
                <span style={{ color: "#0066CC", fontWeight: 600 }}>가동중</span>
              </div>
            </div>
          </div>

        </div>

        {/* 하단 최근 생산 오더 목록 테이블 */}
        <div className={styles.tableCard}>
          <div className={styles.cardHeader} style={{ padding: "20px 24px", margin: 0, borderBottom: "1px solid rgba(0,0,0,0.06)", backgroundColor: "rgba(255,255,255,0.5)" }}>
            <span>최근 긴급 생산 오더 현황</span>
            <button 
              style={{ background: "none", border: "none", color: "#0066CC", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              onClick={() => showAlert("전체 오더 목록 페이지로 이동합니다.")}
            >
              전체보기 &rarr;
            </button>
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ paddingLeft: "24px" }}>오더 번호</th>
                <th>제품명</th>
                <th>수량</th>
                <th>상태</th>
                <th style={{ width: "25%" }}>진행률</th>
                <th>납기일</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ paddingLeft: "24px" }}><strong>{order.id}</strong></td>
                  <td>{order.productName}</td>
                  <td>{order.quantity.toLocaleString()} 개</td>
                  <td>
                    <span className={`${styles.badge} ${order.status === 'completed' ? styles.badgeCompleted : order.status === 'progress' ? styles.badgeProgress : styles.badgePlanning}`}>
                      {order.status === 'completed' ? '생산완료' : order.status === 'progress' ? '생산중' : '생산대기'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "13px", color: "#86868B", minWidth: "35px" }}>{order.progress}%</span>
                      <div className={styles.barTrack} style={{ height: "6px" }}>
                        <div 
                          className={`${styles.barFill} ${order.status === 'completed' ? styles.fillGreen : styles.fillBlue}`} 
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "#86868B" }}>{order.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
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