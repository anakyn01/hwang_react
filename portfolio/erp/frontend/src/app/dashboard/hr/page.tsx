"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
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

interface RoleEntry {
  role: string;
  count: number;
}

export default function Hr() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpDept, setNewEmpDept] = useState("");
  const [roleEntries, setRoleEntries] = useState<RoleEntry[]>([{ role: "부장", count: 1 }]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hr/employees", {
        params: {
          search: searchQuery,
          role: selectedRole === "ALL" ? "" : selectedRole,
          page: currentPage,
          size: 5,
        }
      });
      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setLeaveCount(response.data.leaveCount);
    } catch (error) {
      console.error("인사 데이터 로딩 실패:", error);
    }
  };

  useEffect(()=> {
    fetchEmployees();
  }, [searchQuery, selectedRole, currentPage]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="badge badgeActive">재직중</span>;
      case "leave":
        return <span className="badge badgeLeave">휴직</span>;
      case "resigned":
        return <span className="badge badgeResigned">퇴사</span>;
      default:
        return <span className="badge badgeUnknown">알수없음</span>;
    }
  };

  const handleAddRoleEntry = () => {
    setRoleEntries([...roleEntries, { role: '과장', count: 1 }]);
  };

  const handleRoleChange = (index: number, role: string) => {
    const updated = [...roleEntries];
    updated[index].role = role;
    setRoleEntries(updated);
  };

  const handleCountChange = (index: number, count: number) => {
    const updated = [...roleEntries];
    updated[index].count = Math.max(1, count);
    setRoleEntries(updated);
  };

  const handleRemoveRoleEntry = (index: number) => {
    if (roleEntries.length === 1) return;
    setRoleEntries(roleEntries.filter((_, i) => i !== index));
  };

  const emptyRowsCount = Math.max(0, 5 - employees.length);

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        
        {/* 상단 페이지 헤더 */}
        <div {...stylex.props(styles.headerWrapperRow)}>
          <h2 {...stylex.props(styles.title)}>인사 관리 (RBAC 권한 제어)</h2>
          <button 
            {...stylex.props(styles.primaryButton)}
            onClick={() => setIsRegisterModalOpen(true)}
          >
            + 신규 직원 등록
          </button>
        </div>

        {/* 상단 요약 통계 카드 영역 */}
        <div {...stylex.props(styles.statsGrid)}>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>총 임직원 수</div>
            <div {...stylex.props(styles.statValue, styles.statValuePrimary)}>{totalElements}명</div>
          </div>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>권한 대상 직급군</div>
            <div {...stylex.props(styles.statValue, styles.statValuePrimary)} style={{ fontSize: "18px", marginTop: "6px" }}>부장·과장·PM·PL 등</div>
          </div>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>현재 휴직자</div>
            <div {...stylex.props(styles.statValue, styles.statValueWarning)}>
              {leaveCount}명
            </div>
          </div>
        </div>

        {/* 검색 및 필터 컨트롤 바 */}
        <div {...stylex.props(styles.filterBar)}>
          <div {...stylex.props(styles.searchBox)}>
            <input 
              type="text"
              placeholder="사번 또는 이름 검색..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              {...stylex.props(styles.searchInput)}
            />
          </div>

          <div {...stylex.props(styles.selectBoxWrapper)}>
            <select
              value={selectedRole}
              onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
              {...stylex.props(styles.selectBox)}
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

        {/* 테이블 카드 영역 */}
        <div {...stylex.props(styles.tableCard, styles.tableCardFixed)}>
          <div {...stylex.props(styles.tableHeader)}>
            임직원 권한 및 직급 목록
          </div>
          
          <div {...stylex.props(styles.tableContainer, styles.tableContainerFixed)}>
            <table {...stylex.props(styles.table, styles.tableElement)}>
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
                      <button 
                        {...stylex.props(styles.editButton)}
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
                {Array.from({ length: emptyRowsCount }).map((_, idx) => (
                  <tr key={`empty-${idx}`} style={{ height: "65px" }}>
                    <td colSpan={7} style={{ padding: 0, border: "none" }}>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이징 바 영역 */}
          <div {...stylex.props(styles.pagingBar)}>
            {totalElements > 5 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.08)", background: currentPage === 1 ? "#F5F5F7" : "#FFFFFF", color: currentPage === 1 ? "#A1A1A6" : "#1D1D1F", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: 500 }}
                >
                  이전
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{ width: "36px", height: "36px", borderRadius: "10px", border: currentPage === page ? "none" : "1px solid rgba(0, 0, 0, 0.08)", background: currentPage === page ? "#0066CC" : "#FFFFFF", color: currentPage === page ? "#FFFFFF" : "#1D1D1F", cursor: "pointer", fontSize: "13px", fontWeight: 600, boxShadow: currentPage === page ? "0 4px 12px rgba(0, 102, 204, 0.25)" : "none" }}
                  >
                    {page}
                  </button>
                ))}

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

        {/* 신규 임직원 등록 모달 */}
        {isRegisterModalOpen && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.modalContent)}>
              
              <div {...stylex.props(styles.modalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>신규 임직원 등록 (RBAC)</h3>
                <button onClick={() => setIsRegisterModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
              </div>

              <div {...stylex.props(styles.modalFormGroup)}>
                <div>
                  <label {...stylex.props(styles.modalLabel)}>이름 / 대표 부서</label>
                  <div {...stylex.props(styles.modalInputRow)}>
                    <input 
                      type="text" placeholder="이름" value={newEmpName} onChange={(e) => setNewEmpName(e.target.value)}
                      {...stylex.props(styles.modalInput)}
                    />
                    <input 
                      type="text" placeholder="부서명 (예: 개발팀)" value={newEmpDept} onChange={(e) => setNewEmpDept(e.target.value)}
                      {...stylex.props(styles.modalInput)}
                    />
                  </div>
                </div>

                <div>
                  <div {...stylex.props(styles.roleSectionHeader)}>
                    <label {...stylex.props(styles.modalLabelBlock)}>직급 권한 설정</label>
                    <button type="button" onClick={handleAddRoleEntry} {...stylex.props(styles.roleAddBtn)}>+ 직급추가</button>
                  </div>

                  {roleEntries.map((entry, idx) => (
                    <div key={idx} {...stylex.props(styles.roleRow)}>
                      <select 
                        value={entry.role} 
                        onChange={(e) => handleRoleChange(idx, e.target.value)}
                        {...stylex.props(styles.roleSelect)}
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
                        {...stylex.props(styles.roleCountInput)}
                        placeholder="인원수"
                      />
                      {roleEntries.length > 1 && (
                        <button type="button" onClick={() => handleRemoveRoleEntry(idx)} {...stylex.props(styles.roleRemoveBtn)}>-</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                onClick={async () => {
                  try {
                    for (const entry of roleEntries) {
                      await axios.post("http://localhost:8080/api/hr/employees", {
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
                    fetchEmployees();
                  } catch (error) {
                    showAlert("등록에 실패했습니다.");
                  }
                }}
                {...stylex.props(styles.hrPrimaryBtn)}
              >
                등록 완료
              </button>
            </div>
          </div>
        )}

        {/* 임직원 권한 및 상태 수정 모달 */}
        {isEditModalOpen && editingEmployee && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.modalContent, styles.editModalMaxWidth)}>
              
              <div {...stylex.props(styles.modalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>
                  임직원 권한 수정 ({editingEmployee.name})
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
              </div>

              <div {...stylex.props(styles.modalFormGroup)} style={{ marginBottom: "28px" }}>
                <div>
                  <label {...stylex.props(styles.modalLabel)}>직급 (RBAC 권한)</label>
                  <select 
                    value={editingEmployee.role}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                    {...stylex.props(styles.modalInput, styles.cursorPointer)}
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

                <div>
                  <label {...stylex.props(styles.modalLabel)}>근무 상태</label>
                  <select 
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as any })}
                    {...stylex.props(styles.modalInput, styles.cursorPointer)}
                  >
                    <option value="active">재직중</option>
                    <option value="leave">휴직</option>
                    <option value="resigned">퇴사</option>
                  </select>
                </div>
              </div>

              <button 
                type="button"
                onClick={async () => {
                  try {
                    await axios.put(`http://localhost:8080/api/hr/employees/${editingEmployee.id}`, {
                      role: editingEmployee.role,
                      status: editingEmployee.status,
                      department: editingEmployee.department,
                    });
                    setIsEditModalOpen(false);
                    showAlert("직원 권한 및 상태가 성공적으로 수정되었습니다.");
                    fetchEmployees();
                  } catch (error) {
                    showAlert("수정에 실패했습니다.");
                  }
                }}
                {...stylex.props(styles.hrPrimaryBtn)}
              >
                수정 완료
              </button>
            </div>
          </div>
        )}

        {/* 성공 알럿 모달 */}
        {isAlertOpen && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.alertCard)}>
              <div {...stylex.props(styles.successIconWrapper)}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h3 {...stylex.props(styles.alertTitle)}>
                알림
              </h3>
              <p {...stylex.props(styles.alertMessageText)}>
                {alertMessage}
              </p>

              <button
                type="button"
                onClick={() => setIsAlertOpen(false)}
                {...stylex.props(styles.alertButtonOverride)}
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