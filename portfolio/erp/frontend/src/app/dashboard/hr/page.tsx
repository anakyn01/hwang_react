"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
//import styles from "@/assets/sass/main.module.scss";
import axios from "axios";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";


interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  status: "active" | "leave" | "resigned";
  joinDate: string;    
}

//임직원 데이터 구조를 정의하는 인터페이스
interface RoleEntry{
role: string;
count: number;
}

export default function Hr() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  // 검색어 입력
  const [searchQuery, setSearchQuery] = useState("");
  // 셀렉트로 필터링
  const [selectedRole, setSelectedRole] = useState("ALL");
  // 페이징 현재 페이지 번호 상태 (기본 1페이지)
  const [currentPage, setCurrentPage] = useState(1);
  // 💡 총 페이지 수 상태
  const [totalPages, setTotalPages] = useState(1);
// 💡 전체 임직원 수 상태
const [totalElements, setTotalElements] = useState(0);
// 💡 현재 휴직자 수 상태
const [leaveCount, setLeaveCount] = useState(0);

// 퇴사자가 발생하고 신규로 롤을 부여 
const [isRegisterModalOpen, setIsRegisterModalOpen] = 
useState(false);



const [newEmpName, setNewEmpName] = useState("");
  // 💡 신규 등록할 부서명 입력 상태
const [newEmpDept, setNewEmpDept] = useState("");
  // 💡 신규 등록 시 다중 직급 권한 부여를 위한 배열 상태

const [roleEntries, setRoleEntries] =
useState<RoleEntry[]>([{role:"부장", count:1}]);  

// 💡 권한 수정 모달 열림/닫힘 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // 💡 현재 수정 중인 직원 데이터 상태
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);


  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //alert을 띄우는 공통 함수
  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };
  // 백앤드 API 호출 비동기 (렉방지, 가독성)
  const fetchEmployees = async () => {
     try {
const response = await axios.get("http://localhost:8080/api/hr/employees", {
  params: {//이건 페이징 너때문에
//서버(API)로 페이지네이션(Pagination) 및 검색 데이터를 
// 보낼 때 사용하는 쿼리 파라미터(Query Parameters) 세팅
search: searchQuery,
role: selectedRole === "ALL" ? "" : selectedRole,
// 사용자가 모든을 선택하면 빈문자열을 보내고
// 특정 직급을 선택하면 해당 직급을 보내도록 처리
// 정확히 분기 처리하기 위해서
page: currentPage,
size:5,
  }
});
setEmployees(response.data.content);
setTotalPages(response.data.totalPages);
setTotalElements(response.data.totalElements);
setLeaveCount(response.data.leaveCount);
     }catch (error){
console.error("인사 데이터 로딩 실패:", error);
     }
  }

  // 검색어, 직급 필터, 페이지 번호가 바뀔 때마다 자동으로 목록을 재조회
   useEffect(()=> {
    fetchEmployees();
   },[searchQuery, selectedRole, currentPage]);

  // 근무 상태에 따라 출력값 변경
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

  // 신규등록 모달에서 직급 항목 추가하는 플러스 버튼
  /*
액트(React)의 '불변성(Immutability)' 원칙을 지키며 
상태(State)를 업데이트하기 위해서  
1) 리액트가 변경 감지하기 위해서 (얕은 비교)
2) 기존 데이터를 안전하게 보존하기 위해
3) 새 데이터와 결합하기 위해..
  */
  const handleAddRoleEntry = () => {
    setRoleEntries([...roleEntries, {role:'과장', count:1}]);
  }

  //인덱스의 직급 종류를 변경하는 핸들러
  const handleRoleChange = (index:number, role:string) => {
    const updated = [...roleEntries];
    updated[index].role =role;
    setRoleEntries(updated);
  };

  const handleCountChange = (index:number, count:number) => {
    const updated = [...roleEntries];
    updated[index].count = Math.max(1, count);//최소 1명이상 보장
    setRoleEntries(updated);
  };

  const handleRemoveRoleEntry = (index:number) => {
if (roleEntries.length === 1) return;
//현재 등록된 직급 항목이 딱 1개 뿐이라면 함수를 종료해서 중지
    setRoleEntries(roleEntries.filter((_, i) => i !== index));
    //일치하지 않는 항목들만 걸러내어(filter) 직급 목록 상태(roleEntries)를 새롭게 업데이트합니다
  };

  const emptyRowsCount = Math.max(0, 5 - employees.length);
  /*
  5앞에 0 은 백앤드 데이터 문제가 생겨도 -1 이 아닌 0을 보장
  첫페이지 내용이 꽉차서 523px 이 되는데
  2페이지 데이터가 1 ~ 4개 일때
  덜컹거리는 느낌 때문에
  5 -1 = 4 너가 앞에 거랑 비교할때 너는 줄이 4개 모자르네
  밑에 ui에서 렌더링시점에 부족한 줄을 동일한크기에 빈행 
  <tr key={emp.id} style={{height: '65px'}}>
  </tr>
  */

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        
        {/* 💡 상단 페이지 헤더 및 신규 등록 버튼 영역 */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>인사 관리 (RBAC 권한 제어)</h2>
          <button 
            className={styles.primaryButton}
            onClick={() => setIsRegisterModalOpen(true)} // 클릭 시 신규 등록 모달 오픈
          >
            + 신규 직원 등록
          </button>
        </div>

        {/* 💡 상단 요약 통계 카드 영역 (총 인원, 권한 직급군, 휴직자) */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>총 임직원 수</div>
            <div className={`${styles.statValue} ${styles.statValuePrimary}`}>{totalElements}명</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>권한 대상 직급군</div>
            <div className={styles.statValue} style={{ fontSize: "18px", marginTop: "6px" }}>부장·과장·PM·PL 등</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>현재 휴직자</div>
            <div className={`${styles.statValue} ${styles.statValueWarning}`}>
              {leaveCount}명
            </div>
          </div>
        </div>

        {/* 💡 검색 입력창 및 직급별 필터 셀렉트박스 컨트롤 바 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" }}>
          {/* 사번 또는 이름 검색 인풋 */}
          <div style={{ position: "relative", flex: "1", maxWidth: "320px", height: "46px", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(0, 0, 0, 0.08)", borderRadius: "14px", display: "flex", alignItems: "center", padding: "0 14px" }}>
            <input 
              type="text"
              placeholder="사번 또는 이름 검색..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} // 검색 시 1페이지로 초기화
              style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "#1D1D1F" }}
            />
          </div>

          {/* RBAC 직급별 필터 셀렉트 */}
          <div style={{ height: "46px", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(0, 0, 0, 0.08)", borderRadius: "14px", display: "flex", alignItems: "center", padding: "0 14px" }}>
            <select
              value={selectedRole}
              onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }} // 필터 변경 시 1페이지로 초기화
              style={{ background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "#1D1D1F", cursor: "pointer" }}
            >
              <option value="ALL">전체 직급 (RBAC)</option>
              <option value="부장">부장</option>
              <option value="과장">과장</option>
              <option value="대리">대리</option>
              <option value="계장">계장</option>
              <option value="수석디자이너">수석디자이너</option>
              <option value="PL">PL</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* 💡 테이블 카드 영역 (페이징 포함 전체 높이를 523px로 완벽 고정하여 덜컹임 방지) */}
        <div className={styles.tableCard} style={{ display: "flex", flexDirection: "column", height: "523px", boxSizing: "border-box" }}>
          <div className={styles.tableHeader}>
            임직원 권한 및 직급 목록
          </div>
          
          {/* 테이블 본문 컨테이너 */}
          <div className={styles.tableContainer} style={{ flex: 1, overflow: "hidden" }}>
            <table className={styles.table} style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "24px", width: "18%" }}>사번</th>
                  <th style={{ width: "14%" }}>이름</th>
                  <th style={{ width: "16%" }}>부서</th>
                  <th style={{ width: "16%" }}>직급 (RBAC)</th>
                  <th style={{ textAlign: "center", width: "12%" }}>상태</th>
                  <th style={{ width: "14%" }}>입사일</th>
                  <th style={{ textAlign: "center", width: "10%" }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {/* 💡 임직원 데이터 매핑 출력 */}
                {employees.map((emp) => (
                  <tr key={emp.id} style={{ height: "65px" }}>
                    <td style={{ paddingLeft: "24px", color: "#86868B", fontWeight: 500 }}>{emp.id}</td>
                    <td style={{ fontWeight: 600 }}>{emp.name}</td>
                    <td style={{ color: "#424245" }}>{emp.department}</td>
                    <td>
                      <span style={{ padding: "4px 10px", borderRadius: "8px", backgroundColor: "rgba(0, 102, 204, 0.08)", color: "#0066CC", fontWeight: 600, fontSize: "12px" }}>
                        {emp.role}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>{getStatusBadge(emp.status)}</td>
                    <td style={{ color: "#86868B" }}>{emp.joinDate}</td>
                    <td style={{ textAlign: "center" }}>
                      {/* 권한 수정 버튼: 클릭 시 해당 직원의 데이터를 세팅하고 수정 모달 오픈 */}
                      <button 
                        className={styles.editButton}
                        onClick={() => {
                          setEditingEmployee({ ...emp });
                          setIsEditModalOpen(true);
                        }}
                      >
                        권한수정
                      </button>
                    </td>
                  </tr>
                ))}
                {/* 💡 데이터가 5개 미만일 때 빈 투명 행을 채워 높이를 523px로 정확히 일치시킴 */}
                {Array.from({ length: emptyRowsCount }).map((_, idx) => (
                  <tr key={`empty-${idx}`} style={{ height: "65px" }}>
                    <td colSpan={7} style={{ padding: 0, border: "none" }}>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 💡 하단 페이징 바 영역 (높이 70px 고정) */}
          <div style={{
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid rgba(0, 0, 0, 0.04)",
            flexShrink: 0,
          }}>
            {/* 전체 데이터가 5개를 초과할 때만 페이징 바 노출 */}
            {totalElements > 5 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* 이전 페이지 버튼 */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.08)", background: currentPage === 1 ? "#F5F5F7" : "#FFFFFF", color: currentPage === 1 ? "#A1A1A6" : "#1D1D1F", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: 500 }}
                >
                  이전
                </button>

                {/* 페이지 번호 버튼들 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{ width: "36px", height: "36px", borderRadius: "10px", border: currentPage === page ? "none" : "1px solid rgba(0, 0, 0, 0.08)", background: currentPage === page ? "#0066CC" : "#FFFFFF", color: currentPage === page ? "#FFFFFF" : "#1D1D1F", cursor: "pointer", fontSize: "13px", fontWeight: 600, boxShadow: currentPage === page ? "0 4px 12px rgba(0, 102, 204, 0.25)" : "none" }}
                  >
                    {page}
                  </button>
                ))}

                {/* 다음 페이지 버튼 */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.08)", background: (currentPage === totalPages || totalPages === 0) ? "#F5F5F7" : "#FFFFFF", color: (currentPage === totalPages || totalPages === 0) ? "#A1A1A6" : "#1D1D1F", cursor: (currentPage === totalPages || totalPages === 0) ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: 500 }}
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 💡 신규 임직원 등록 모달 (애플 글래스모피즘 스타일) */}
        {isRegisterModalOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
            <div style={{ width: "100%", maxWidth: "520px", backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "36px", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", border: "1px solid rgba(255, 255, 255, 0.6)", display: "flex", flexDirection: "column", maxHeight: "90vh", overflowY: "auto" }}>
              
              {/* 모달 헤더 및 닫기 버튼 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1D1D1F", margin: 0 }}>신규 임직원 등록 (RBAC)</h3>
                <button onClick={() => setIsRegisterModalOpen(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#86868B" }}>✕</button>
              </div>

              {/* 입력 폼 영역 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {/* 이름 및 부서 입력 */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1D1D1F", marginBottom: "6px" }}>이름 / 대표 부서</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input 
                      type="text" placeholder="이름" value={newEmpName} onChange={(e) => setNewEmpName(e.target.value)}
                      style={{ flex: 1, height: "48px", padding: "0 14px", borderRadius: "12px", border: "1px solid #D2D2D7", outline: "none", fontSize: "14px" }}
                    />
                    <input 
                      type="text" placeholder="부서명 (예: 개발팀)" value={newEmpDept} onChange={(e) => setNewEmpDept(e.target.value)}
                      style={{ flex: 1, height: "48px", padding: "0 14px", borderRadius: "12px", border: "1px solid #D2D2D7", outline: "none", fontSize: "14px" }}
                    />
                  </div>
                </div>

                {/* 직급 및 인원 다중 설정 영역 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#1D1D1F" }}>직급 권한 설정</label>
                    <button type="button" onClick={handleAddRoleEntry} style={{ background: "#0066CC", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>+ 직급추가</button>
                  </div>

                  {/* 등록할 직급 항목 리스트 매핑 */}
                  {roleEntries.map((entry, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                      <select 
                        value={entry.role} 
                        onChange={(e) => handleRoleChange(idx, e.target.value)}
                        style={{ flex: 2, height: "44px", padding: "0 10px", borderRadius: "10px", border: "1px solid #D2D2D7", fontSize: "13px" }}
                      >
                        <option value="부장">부장</option>
                        <option value="과장">과장</option>
                        <option value="대리">대리</option>
                        <option value="계장">계장</option>
                        <option value="수석디자이너">수석디자이너</option>
                        <option value="PL">PL</option>
                        <option value="PM">PM</option>
                      </select>
                      <input 
                        type="number" min="1" value={entry.count} onChange={(e) => handleCountChange(idx, Number(e.target.value))}
                        style={{ flex: 1, height: "44px", padding: "0 10px", borderRadius: "10px", border: "1px solid #D2D2D7", fontSize: "13px", textAlign: "center" }}
                        placeholder="인원수"
                      />
                      {/* 항목이 2개 이상일 때만 삭제(-) 버튼 노출 */}
                      {roleEntries.length > 1 && (
                        <button type="button" onClick={() => handleRemoveRoleEntry(idx)} style={{ background: "#FF3B30", color: "#FFFFFF", border: "none", borderRadius: "10px", width: "36px", height: "44px", cursor: "pointer", fontWeight: "bold" }}>-</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 등록 완료 버튼: 클릭 시 백엔드로 POST 요청 전송 */}
              <button 
                type="button"
                onClick={async () => {
                  try {
                    for (const entry of roleEntries) {
                      await axios.post("http://127.0.0.1:8080/api/hr/employees", {
                        name: newEmpName,
                        department: newEmpDept,
                        role: entry.role,
                        status: "active",
                        joinDate: new Date().toISOString().split('T')[0],
                      });
                    }
                    setIsRegisterModalOpen(false);
                    setNewEmpName("");
                    setNewEmpDept("");
                    showAlert("신규 임직원 정보가 성공적으로 등록되었습니다.");
                    fetchEmployees(); // 목록 새로고침
                  } catch (error) {
                    showAlert("등록에 실패했습니다.");
                  }
                }}
                style={{ width: "100%", height: "52px", backgroundColor: "#0066CC", color: "#FFFFFF", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 14px rgba(0, 102, 204, 0.25)" }}
              >
                등록 완료
              </button>
            </div>
          </div>
        )}

        {/* 💡 임직원 권한 및 상태 수정 모달 */}
        {isEditModalOpen && editingEmployee && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
            <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "36px", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", border: "1px solid rgba(255, 255, 255, 0.6)", display: "flex", flexDirection: "column" }}>
              
              {/* 수정 모달 헤더 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1D1D1F", margin: 0 }}>
                  임직원 권한 수정 ({editingEmployee.name})
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#86868B" }}>✕</button>
              </div>

              {/* 직급 및 근무 상태 변경 셀렉트박스 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                {/* 직급 변경 */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1D1D1F", marginBottom: "6px" }}>직급 (RBAC 권한)</label>
                  <select 
                    value={editingEmployee.role}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                    style={{ width: "100%", height: "48px", padding: "0 14px", borderRadius: "12px", border: "1px solid #D2D2D7", fontSize: "14px", backgroundColor: "#FFFFFF", cursor: "pointer" }}
                  >
                    <option value="부장">부장</option>
                    <option value="과장">과장</option>
                    <option value="대리">대리</option>
                    <option value="계장">계장</option>
                    <option value="수석디자이너">수석디자이너</option>
                    <option value="PL">PL</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                {/* 근무 상태 변경 (재직중 / 휴직 / 퇴사) */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#1D1D1F", marginBottom: "6px" }}>근무 상태</label>
                  <select 
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as any })}
                    style={{ width: "100%", height: "48px", padding: "0 14px", borderRadius: "12px", border: "1px solid #D2D2D7", fontSize: "14px", backgroundColor: "#FFFFFF", cursor: "pointer" }}
                  >
                    <option value="active">재직중</option>
                    <option value="leave">휴직</option>
                    <option value="resigned">퇴사</option>
                  </select>
                </div>
              </div>

              {/* 수정 완료 버튼: 클릭 시 백엔드로 PUT 요청 전송 */}
              <button 
                type="button"
                onClick={async () => {
                  try {
                    await axios.put(`http://127.0.0.1:8080/api/hr/employees/${editingEmployee.id}`, {
                      role: editingEmployee.role,
                      status: editingEmployee.status,
                      department: editingEmployee.department,
                    });
                    setIsEditModalOpen(false);
                    showAlert("직원 권한 및 상태가 성공적으로 수정되었습니다.");
                    fetchEmployees(); // 목록 새로고침
                  } catch (error) {
                    showAlert("수정에 실패했습니다.");
                  }
                }}
                style={{ width: "100%", height: "52px", backgroundColor: "#0066CC", color: "#FFFFFF", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 14px rgba(0, 102, 204, 0.25)" }}
              >
                수정 완료
              </button>
            </div>
          </div>
        )}

        {/* 💡 초록색 원형 체크 애니메이션이 포함된 성공 알럿 모달 */}
        {isAlertOpen && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(12px)",
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
          }}>
            <div style={{
              width: "100%", maxWidth: "380px", backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px 28px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", border: "1px solid rgba(255, 255, 255, 0.6)",
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            }}>
              {/* 초록색 체크 아이콘 */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                backgroundColor: "rgba(52, 199, 89, 0.12)", display: "flex",
                alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#34C759",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1D1D1F", marginBottom: "8px" }}>
                알림
              </h3>
              <p style={{ fontSize: "14px", color: "#424245", lineHeight: "1.5", margin: "0 0 24px 0" }}>
                {alertMessage}
              </p>

              {/* 확인 버튼: 클릭 시 알럿 닫기 */}
              <button
                type="button"
                onClick={() => setIsAlertOpen(false)}
                style={{
                  width: "100%", height: "48px", backgroundColor: "#0066CC", color: "#FFFFFF",
                  border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: "600",
                  cursor: "pointer", boxShadow: "0 4px 12px rgba(0, 102, 204, 0.25)",
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}

      </div>    
    </Layout>
  );
}