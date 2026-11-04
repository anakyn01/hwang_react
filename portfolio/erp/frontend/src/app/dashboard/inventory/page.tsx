"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

interface InventoryItem {
  id: string; 
  name: string; 
  category: string;
  stock: number; 
  unitPrice: number;
  status: "normal" | "low" | "out";
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: "INV-1001", name: "알루미늄 프레임 A형", category: "원자재", stock: 1250, unitPrice: 15000, status: "normal" },
    { id: "INV-1002", name: "공업용 모터 250W", category: "부품", stock: 12, unitPrice: 85000, status: "low" },
    { id: "INV-1003", name: "제어용 메인보드 v2", category: "부품", stock: 0, unitPrice: 120000, status: "out" },
    { id: "INV-1004", name: "포장용 종이박스 (대)", category: "포장재", stock: 5000, unitPrice: 800, status: "normal" },
    { id: "INV-1005", name: "스틸 볼트 M8", category: "소모품", stock: 45, unitPrice: 150, status: "low" },
  ]);

  // 모달 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 신규 등록 폼 상태
  const [newId, setNewId] = useState("INV-1006");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("원자재");
  const [newStock, setNewStock] = useState("");
  const [newUnitPrice, setNewUnitPrice] = useState("");

  // 수정/삭제 대상 아이템 상태
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  // 재고 상태 자동으로 판단하는 헬퍼 함수
  const calculateStatus = (stockCount: number): "normal" | "low" | "out" => {
    if (stockCount === 0) return "out";
    if (stockCount <= 20) return "low";
    return "normal";
  };

  // 신규 등록 제출
  const handleAddSubmit = () => {
    if (!newName || !newStock || !newUnitPrice) {
      showAlert("모든 입력 항목을 채워주세요.");
      return;
    }

    const stockNum = Number(newStock);
    const newItem: InventoryItem = {
      id: newId,
      name: newName,
      category: newCategory,
      stock: stockNum,
      unitPrice: Number(newUnitPrice),
      status: calculateStatus(stockNum),
    };

    setItems([...items, newItem]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewStock("");
    setNewUnitPrice("");
    showAlert("신규 품목이 성공적으로 등록되었습니다.");
  };

  // 수정 제출
  const handleEditSubmit = () => {
    if (!selectedItem) return;

    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...selectedItem,
          status: calculateStatus(selectedItem.stock),
        };
      }
      return item;
    });

    setItems(updatedItems);
    setIsEditModalOpen(false);
    showAlert(`[${selectedItem.id}] 품목 정보가 수정되었습니다.`);
  };

  // 삭제 확정
  const handleDeleteConfirm = () => {
    if (!selectedItem) return;

    setItems(items.filter(item => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
    showAlert(`[${selectedItem.id}] 품목이 삭제되었습니다.`);
  };

  const lowOrOutCount = items.filter(item => item.status !== 'normal').length;
  const totalAsset = items.reduce((acc, curr) => acc + (curr.stock * curr.unitPrice), 0);

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        
        {/* 상단 타이틀 및 신규 등록 버튼 */}
        <div {...stylex.props(styles.headerWrapperRow)}>
          <h2 {...stylex.props(styles.title)}>재고관리</h2>
          <button 
            {...stylex.props(styles.primaryButton)} 
            onClick={() => setIsAddModalOpen(true)}
          >
            + 신규 품목 등록
          </button>
        </div> 

        {/* 상단 통계 카드 */}
        <div {...stylex.props(styles.statsGrid)}>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>총 등록 품목</div>
            <div {...stylex.props(styles.statValue, styles.statValuePrimary)}>{items.length}개</div>    
          </div>

          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>재고 부족 / 품절</div>
            <div {...stylex.props(styles.statValue, styles.statValueWarning)}>
              {lowOrOutCount}건
            </div>
          </div>

          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>총 재고 자산</div>
            <div {...stylex.props(styles.statValue, styles.statValueSuccess)}>
              ₩ {totalAsset.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 메인 데이터 테이블 영역 */}
        <div {...stylex.props(styles.tableCard)}>
          <div {...stylex.props(styles.tableHeader)}>
            <span>현재고 현황</span>
            <div {...stylex.props(styles.searchGroup)}>
              <input type="text" {...stylex.props(styles.searchInput)} placeholder="품목명 또는 코드 검색..." />
              <button {...stylex.props(styles.searchButton)} onClick={() => showAlert("검색 기능은 준비 중입니다.")}>
                검색
              </button>
            </div>
          </div>
          
          <div {...stylex.props(styles.tableContainer)}>
            <table {...stylex.props(styles.table)}>
              <thead>
                <tr>
                  <th {...stylex.props(styles.tablePaddingLeft)}>품목 코드</th>
                  <th>품목명</th>
                  <th>분류</th>
                  <th {...stylex.props(styles.tableTextAlignRight)}>현재고</th>
                  <th {...stylex.props(styles.tableTextAlignRight)}>단가 (원)</th>
                  <th {...stylex.props(styles.tableTextAlignCenter)}>상태</th>
                  <th {...stylex.props(styles.tableTextAlignCenter)}>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td {...stylex.props(styles.tablePaddingLeft)}>
                      <strong {...stylex.props(styles.itemIdText)}>{item.id}</strong>
                    </td>
                    <td {...stylex.props(styles.itemNameText)}>{item.name}</td>
                    <td>{item.category}</td>
                    <td {...stylex.props(styles.itemStockText)}>{item.stock.toLocaleString()}</td>
                    <td {...stylex.props(styles.itemPriceText)}>{item.unitPrice.toLocaleString()}</td>
                    <td {...stylex.props(styles.tableTextAlignCenter)}>
                      <span {...stylex.props(styles.badge, item.status === 'normal' ? styles.badgeActive : item.status === 'low' ? styles.badgeLeave : styles.badgeResigned)}>
                        {item.status === 'normal' ? '정상' : item.status === 'low' ? '재고부족' : '품절'}
                      </span>
                    </td>
                    <td {...stylex.props(styles.tableTextAlignCenter)}>
                      <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                        <button 
                          {...stylex.props(styles.editButton)}
                          onClick={() => {
                            setSelectedItem({ ...item });
                            setIsEditModalOpen(true);
                          }}
                        >
                          수정
                        </button>
                        <button 
                          {...stylex.props(styles.roleRemoveBtn)}
                          style={{ width: "auto", height: "auto", padding: "6px 12px", fontSize: "12px", borderRadius: "8px" }}
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 1. 신규 품목 등록 모달 */}
        {isAddModalOpen && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.modalContent)}>
              <div {...stylex.props(styles.modalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>신규 품목 등록</h3>
                <button onClick={() => setIsAddModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
              </div>

              <div {...stylex.props(styles.modalBodyGroup)}>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>품목 코드</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="text" value={newId} onChange={(e) => setNewId(e.target.value)} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>품목명</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="text" placeholder="품목명을 입력하세요" value={newName} onChange={(e) => setNewName(e.target.value)} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>분류</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} {...stylex.props(styles.formInput)} style={{ cursor: "pointer" }}>
                      <option value="원자재">원자재</option>
                      <option value="부품">부품</option>
                      <option value="포장재">포장재</option>
                      <option value="소모품">소모품</option>
                    </select>
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>현재고 수량</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="number" placeholder="수량을 입력하세요" value={newStock} onChange={(e) => setNewStock(e.target.value)} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>단가 (원)</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="number" placeholder="단가를 입력하세요" value={newUnitPrice} onChange={(e) => setNewUnitPrice(e.target.value)} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
              </div>

              <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handleAddSubmit}>
                등록하기
              </button>
            </div>
          </div>
        )}

        {/* 2. 품목 정보 수정 모달 */}
        {isEditModalOpen && selectedItem && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.modalContent)}>
              <div {...stylex.props(styles.modalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>품목 수정 ({selectedItem.id})</h3>
                <button onClick={() => setIsEditModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
              </div>

              <div {...stylex.props(styles.modalBodyGroup)}>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>품목명</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="text" value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>분류</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <select value={selectedItem.category} onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })} {...stylex.props(styles.formInput)} style={{ cursor: "pointer" }}>
                      <option value="원자재">원자재</option>
                      <option value="부품">부품</option>
                      <option value="포장재">포장재</option>
                      <option value="소모품">소모품</option>
                    </select>
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>현재고 수량</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="number" value={selectedItem.stock} onChange={(e) => setSelectedItem({ ...selectedItem, stock: Number(e.target.value) })} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>단가 (원)</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="number" value={selectedItem.unitPrice} onChange={(e) => setSelectedItem({ ...selectedItem, unitPrice: Number(e.target.value) })} {...stylex.props(styles.formInput)} />
                  </div>
                </div>
              </div>

              <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handleEditSubmit}>
                수정 완료
              </button>
            </div>
          </div>
        )}

        {/* 3. 품목 삭제 확인 모달 (인라인 스타일 0%) */}
        {isDeleteModalOpen && selectedItem && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.deleteModalContent)}>
              <div {...stylex.props(styles.deleteModalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>품목 삭제 확인</h3>
              </div>

              <div {...stylex.props(styles.deleteModalBodyText)}>
                <strong>[{selectedItem.id}] {selectedItem.name}</strong> 품목을 정말로 삭제하시겠습니까?<br />
                삭제된 데이터는 복구할 수 없습니다.
              </div>

              <div {...stylex.props(styles.modalBtnGroup)}>
                <button 
                  {...stylex.props(styles.secondaryButton)} 
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  취소
                </button>
                <button 
                  {...stylex.props(styles.dangerButton)} 
                  onClick={handleDeleteConfirm}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        )}

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