"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "./Hr.module.css";

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  status: "active" | "leave" | "resigned";
  joinDate: string;    
}

export default function Hr() {
  const [employees] = useState<Employee[]>([
    { id: "EMP-001", name: "김철수", department: "개발팀", role: "수석 엔지니어", status: "active", joinDate: "2020-03-02" },
    { id: "EMP-002", name: "이영희", department: "인사팀", role: "팀장", status: "active", joinDate: "2019-11-15" },
    { id: "EMP-003", name: "박민수", department: "영업팀", role: "사원", status: "leave", joinDate: "2022-07-01" },
    { id: "EMP-004", name: "정지원", department: "디자인팀", role: "UI/UX 디자이너", status: "active", joinDate: "2021-05-20" },
  ]);

  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className={`${styles.badge} ${styles.badgeActive}`}>재직중</span>;
      case "leave":
        return <span className={`${styles.badge} ${styles.badgeLeave}`}>휴직</span>;
      case "resigned":
        return <span className={`${styles.badge} ${styles.badgeResigned}`}>퇴사</span>;
      default:
        return <span className={`${styles.badge} ${styles.badgeUnknown}`}>알수없음</span>;
    }
  };

  const leaveCount = employees.filter(emp => emp.status === 'leave').length;

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* 헤더 영역 */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>인사 관리</h2>
          <button 
            className={styles.primaryButton}
            onClick={() => showAlert("신규 직원 등록 모달이 열립니다.")}
          >
            + 신규 직원 등록
          </button>
        </div>

        {/* 요약 카드 영역 */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>총 임직원 수</div>
            <div className={`${styles.statValue} ${styles.statValuePrimary}`}>{employees.length}명</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>이번 달 신규 입사</div>
            <div className={styles.statValue}>0명</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>현재 휴직자</div>
            <div className={`${styles.statValue} ${styles.statValueWarning}`}>
              {leaveCount}명
            </div>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            임직원 목록
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "24px" }}>사번</th>
                  <th>이름</th>
                  <th>부서</th>
                  <th>직급/직책</th>
                  <th style={{ textAlign: "center" }}>상태</th>
                  <th>입사일</th>
                  <th style={{ textAlign: "center" }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ paddingLeft: "24px", color: "#86868B", fontWeight: 500 }}>{emp.id}</td>
                    <td style={{ fontWeight: 600 }}>{emp.name}</td>
                    <td style={{ color: "#424245" }}>{emp.department}</td>
                    <td style={{ color: "#424245" }}>{emp.role}</td>
                    <td style={{ textAlign: "center" }}>{getStatusBadge(emp.status)}</td>
                    <td style={{ color: "#86868B" }}>{emp.joinDate}</td>
                    <td style={{ textAlign: "center" }}>
                      <button 
                        className={styles.editButton}
                        onClick={() => showAlert(`[${emp.name}] 직원 정보 수정 창을 엽니다.`)}
                      >
                        수정
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