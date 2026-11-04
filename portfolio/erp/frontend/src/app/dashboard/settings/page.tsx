"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

interface MasterItem {
  code: string;
  name: string;
  category: string;
  unitPrice: number;
}

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("company");

  // 가상의 품목 마스터 데이터
  const [masterItems, setMasterItems] = useState<MasterItem[]>([
    { code: "MTR-001", name: "알루미늄 프레임 A형", category: "원자재", unitPrice: 15000 },
    { code: "MTR-002", name: "공업용 모터 250W", category: "부품", unitPrice: 85000 },
    { code: "MTR-003", name: "제어용 메인보드 v2", category: "부품", unitPrice: 120000 },
  ]);

  // 💡 모달 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  // 💡 폼 입력 상태 관리
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("원자재");
  const [newPrice, setNewPrice] = useState("");

  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);
  const [selectedRole, setSelectedRole] = useState("생산 관리자");

  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const handleSaveCompany = () => {
    showAlert("회사 기본 정보가 성공적으로 저장되었습니다.");
  };

  const handleAddItemSubmit = () => {
    if (!newCode || !newName || !newPrice) {
      showAlert("모든 필드를 입력해 주세요.");
      return;
    }
    setMasterItems([...masterItems, { code: newCode, name: newName, category: newCategory, unitPrice: Number(newPrice) }]);
    setIsAddModalOpen(false);
    setNewCode("");
    setNewName("");
    setNewPrice("");
    showAlert("신규 품목 마스터가 성공적으로 등록되었습니다.");
  };

  const handleEditItemSubmit = () => {
    if (!editingItem) return;
    setMasterItems(masterItems.map(item => item.code === editingItem.code ? editingItem : item));
    setIsEditModalOpen(false);
    showAlert(`[${editingItem.code}] 품목 정보가 수정되었습니다.`);
  };

  const handlePermissionSubmit = () => {
    setIsPermissionModalOpen(false);
    showAlert(`${selectedRole} 권한 설정이 변경되었습니다.`);
  };

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerWrapper)}>
          <h2 {...stylex.props(styles.title)}>기준정보 설정</h2>
        </div>

        <div {...stylex.props(styles.settingsContentLayout)}>
          {/* 좌측 사이드바 */}
          <div {...stylex.props(styles.settingsSidebar)}>
            <ul {...stylex.props(styles.sidebarMenuUl)}>
              <li 
                {...stylex.props(styles.sidebarItem, activeMenu === "company" && styles.sidebarItemActive)} 
                onClick={() => setActiveMenu("company")}
              >
                회사 기본 정보
              </li>
              <li 
                {...stylex.props(styles.sidebarItem, activeMenu === "items" && styles.sidebarItemActive)} 
                onClick={() => setActiveMenu("items")}
              >
                품목 마스터 관리
              </li>
              <li 
                {...stylex.props(styles.sidebarItem, activeMenu === "users" && styles.sidebarItemActive)} 
                onClick={() => setActiveMenu("users")}
              >
                시스템 권한 설정
              </li>
            </ul>
          </div>

          {/* 우측 메인 패널 */}
          <div {...stylex.props(styles.settingsMainPanel)}>
            <h3 {...stylex.props(styles.panelTitle)}>
              {activeMenu === "company" && "회사 기본 정보"}
              {activeMenu === "items" && "품목 마스터 관리"}
              {activeMenu === "users" && "시스템 권한 설정"}
            </h3>
            
            {/* 1. 회사 기본 정보 탭 */}
            {activeMenu === "company" && (
<>
    <div {...stylex.props(styles.formGroup)}>
      <label {...stylex.props(styles.formLabel)}>회사명</label>
      <div {...stylex.props(styles.inputWrapper)}>
        <input type="text" defaultValue="Apple ERP Korea" placeholder="회사명을 입력하세요" {...stylex.props(styles.formInput)} />
      </div>
    </div>
    
    <div {...stylex.props(styles.formGroup)}>
      <label {...stylex.props(styles.formLabel)}>사업자 등록번호</label>
      <div {...stylex.props(styles.inputWrapper)}>
        <input type="text" defaultValue="123-45-67890" placeholder="- 없이 입력" {...stylex.props(styles.formInput)} />
      </div>
    </div>

    <div {...stylex.props(styles.formGroup)}>
      <label {...stylex.props(styles.formLabel)}>대표 이메일</label>
      <div {...stylex.props(styles.inputWrapper)}>
        <input type="email" defaultValue="admin@apple-erp.co.kr" {...stylex.props(styles.formInput)} />
      </div>
    </div>

    <button {...stylex.props(styles.saveButton)} onClick={handleSaveCompany}>
      변경사항 저장
    </button>
  </>
            )}

            {/* 2. 품목 마스터 관리 탭 */}
            {activeMenu === "items" && (
              <div {...stylex.props(styles.masterTableWrapper)}>
                <div {...stylex.props(styles.masterTableTopBar)}>
                  <span style={{ fontSize: "13px", color: "#86868B" }}>등록된 표준 품목 마스터 목록입니다.</span>
                  <button 
                    {...stylex.props(styles.addMasterBtn)}
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    + 품목 추가
                  </button>
                </div>

                <div {...stylex.props(styles.tableCard)} style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "none" }}>
                  <table {...stylex.props(styles.table)}>
                    <thead>
                      <tr>
                        <th {...stylex.props(styles.tablePaddingLeft)}>품목 코드</th>
                        <th>품목명</th>
                        <th>분류</th>
                        <th {...stylex.props(styles.tableTextAlignRight)}>기준 단가</th>
                        <th {...stylex.props(styles.tableTextAlignCenter)}>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masterItems.map((item) => (
                        <tr key={item.code}>
                          <td {...stylex.props(styles.tablePaddingLeft)}>
                            <strong {...stylex.props(styles.itemIdText)}>{item.code}</strong>
                          </td>
                          <td {...stylex.props(styles.itemNameText)}>{item.name}</td>
                          <td>{item.category}</td>
                          <td {...stylex.props(styles.itemStockText)}>₩ {item.unitPrice.toLocaleString()}</td>
                          <td {...stylex.props(styles.tableTextAlignCenter)}>
                            <button 
                              {...stylex.props(styles.editButton)}
                              onClick={() => {
                                setEditingItem({ ...item });
                                setIsEditModalOpen(true);
                              }}
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
            )}

            {/* 3. 시스템 권한 설정 탭 */}
            {activeMenu === "users" && (
              <div {...stylex.props(styles.permissionList)}>
                <div {...stylex.props(styles.permissionRow)}>
                  <div {...stylex.props(styles.permissionInfo)}>
                    <span {...stylex.props(styles.permissionTitle)}>최고 관리자 (Administrator)</span>
                    <span {...stylex.props(styles.permissionDesc)}>모든 ERP 시스템 모듈 및 권한 제어 허용</span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0066CC" }}>기본 부여됨</span>
                </div>

                <div {...stylex.props(styles.permissionRow)}>
                  <div {...stylex.props(styles.permissionInfo)}>
                    <span {...stylex.props(styles.permissionTitle)}>생산 관리자 (Production Manager)</span>
                    <span {...stylex.props(styles.permissionDesc)}>생산 오더 등록, 상태 변경 및 진척도 관리</span>
                  </div>
                  <button 
                    {...stylex.props(styles.editButton)}
                    onClick={() => {
                      setSelectedRole("생산 관리자");
                      setIsPermissionModalOpen(true);
                    }}
                  >
                    권한 편집
                  </button>
                </div>

                <div {...stylex.props(styles.permissionRow)}>
                  <div {...stylex.props(styles.permissionInfo)}>
                    <span {...stylex.props(styles.permissionTitle)}>인사 관리자 (HR Manager)</span>
                    <span {...stylex.props(styles.permissionDesc)}>임직원 등록, RBAC 직급 권한 및 상태 제어</span>
                  </div>
                  <button 
                    {...stylex.props(styles.editButton)}
                    onClick={() => {
                      setSelectedRole("인사 관리자");
                      setIsPermissionModalOpen(true);
                    }}
                  >
                    권한 편집
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 💡 1. 품목 추가 모달 */}
      {isAddModalOpen && (
        <div {...stylex.props(styles.modalOverlay)}>
          <div {...stylex.props(styles.modalContent)}>
            <div {...stylex.props(styles.modalHeader)}>
              <h3 {...stylex.props(styles.hrModalTitle)}>신규 품목 마스터 등록</h3>
              <button onClick={() => setIsAddModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
            </div>

            <div {...stylex.props(styles.modalBodyGroup)}>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>품목 코드</label>
                <input type="text" placeholder="예: MTR-004" value={newCode} onChange={(e) => setNewCode(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
              </div>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>품목명</label>
                <input type="text" placeholder="품목명을 입력하세요" value={newName} onChange={(e) => setNewName(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
              </div>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>분류</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} {...stylex.props(styles.modalSelectBlock)}>
                  <option value="원자재">원자재</option>
                  <option value="부품">부품</option>
                  <option value="포장재">포장재</option>
                  <option value="소모품">소모품</option>
                </select>
              </div>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>기준 단가 (원)</label>
                <input type="number" placeholder="단가를 입력하세요" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
              </div>
            </div>

            <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handleAddItemSubmit}>
              등록 완료
            </button>
          </div>
        </div>
      )}

      {/* 💡 2. 품목 수정 모달 */}
      {isEditModalOpen && editingItem && (
        <div {...stylex.props(styles.modalOverlay)}>
          <div {...stylex.props(styles.modalContent)}>
            <div {...stylex.props(styles.modalHeader)}>
              <h3 {...stylex.props(styles.hrModalTitle)}>품목 정보 수정 ({editingItem.code})</h3>
              <button onClick={() => setIsEditModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
            </div>

            <div {...stylex.props(styles.modalBodyGroup)}>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>품목명</label>
                <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} {...stylex.props(styles.modalInputBlock)} />
              </div>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>분류</label>
                <select value={editingItem.category} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} {...stylex.props(styles.modalSelectBlock)}>
                  <option value="원자재">원자재</option>
                  <option value="부품">부품</option>
                  <option value="포장재">포장재</option>
                  <option value="소모품">소모품</option>
                </select>
              </div>
              <div {...stylex.props(styles.formGroup)}>
                <label {...stylex.props(styles.modalLabel)}>기준 단가 (원)</label>
                <input type="number" value={editingItem.unitPrice} onChange={(e) => setEditingItem({ ...editingItem, unitPrice: Number(e.target.value) })} {...stylex.props(styles.modalInputBlock)} />
              </div>
            </div>

            <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handleEditItemSubmit}>
              수정 완료
            </button>
          </div>
        </div>
      )}

      {/* 💡 3. 시스템 권한 설정 (권한 편집) 모달 */}
      {isPermissionModalOpen && (
        <div {...stylex.props(styles.modalOverlay)}>
          <div {...stylex.props(styles.modalContent)}>
            <div {...stylex.props(styles.modalHeader)}>
              <h3 {...stylex.props(styles.hrModalTitle)}>{selectedRole} 권한 편집</h3>
              <button onClick={() => setIsPermissionModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
            </div>

            <div {...stylex.props(styles.modalBodyGroup)}>
              <span style={{ fontSize: "13px", color: "#86868B" }}>해당 역할이 접근할 수 있는 모듈 권한을 설정합니다.</span>
              
              <div {...stylex.props(styles.permissionCheckboxGroup)}>
                <label {...stylex.props(styles.permissionCheckLabel)}>
                  <input type="checkbox" defaultChecked {...stylex.props(styles.permissionCheckbox)} /> 대시보드 조회 권한
                </label>
                <label {...stylex.props(styles.permissionCheckLabel)}>
                  <input type="checkbox" defaultChecked {...stylex.props(styles.permissionCheckbox)} /> 생산 관리 및 오더 제어
                </label>
                <label {...stylex.props(styles.permissionCheckLabel)}>
                  <input type="checkbox" defaultChecked {...stylex.props(styles.permissionCheckbox)} /> 재고 관리 및 품목 조회
                </label>
                <label {...stylex.props(styles.permissionCheckLabel)}>
                  <input type="checkbox" {...stylex.props(styles.permissionCheckbox)} /> 인사 관리 및 RBAC 권한 제어
                </label>
                <label {...stylex.props(styles.permissionCheckLabel)}>
                  <input type="checkbox" {...stylex.props(styles.permissionCheckbox)} /> 기준정보 설정 변경
                </label>
              </div>
            </div>

            <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handlePermissionSubmit}>
              권한 저장
            </button>
          </div>
        </div>
      )}

      {/* 커스텀 알럿 모달 */}
      <CustomAlert 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />
    </Layout>
  );
}