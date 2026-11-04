"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

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
  
  // 💡 신규 오더 등록 모달 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // 💡 폼 입력 필드 상태 관리
  const [newOrderId, setNewOrderId] = useState("PRD-2023-100");
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDueDate, setNewDueDate] = useState("2026-12-31");

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

  // 💡 모달 폼 제출 및 API 전송 로직
  const handleAddOrderSubmit = async () => {
    if (!newProductName || !newQuantity || !newDueDate) {
      showAlert("모든 입력 항목을 채워주세요.");
      return;
    }

    const newOrderData = {
      id: newOrderId, 
      productName: newProductName,
      quantity: Number(newQuantity),
      status: "planning" as const,
      progress: 0,
      dueDate: newDueDate
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:8080/api/production/orders", newOrderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders([...orders, response.data]);
      setIsAddModalOpen(false); // 모달 닫기
      // 입력 폼 초기화
      setNewProductName("");
      setNewQuantity("");
      showAlert("신규 오더가 성공적으로 DB에 저장되었습니다!");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      // 만약 백엔드 연동 전이라면 프론트상에서 바로 추가되도록 예외 처리 시뮬레이션 가능
      setOrders([...orders, newOrderData]);
      setIsAddModalOpen(false);
      showAlert("신규 오더가 추가되었습니다!");
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
      <div {...stylex.props(styles.container)}>
        
        {/* 상단 타이틀 및 등록 버튼 (클릭 시 모달 오픈) */}
        <div {...stylex.props(styles.headerWrapperRow)}>
          <h2 {...stylex.props(styles.title)}>생산 관리</h2>
          <button {...stylex.props(styles.primaryButton)} onClick={() => setIsAddModalOpen(true)}>
            + 신규 오더 등록
          </button>
        </div>

        {/* 상단 통계 카드 섹션 */}
        <div {...stylex.props(styles.statsGrid)}>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>진행중인 오더</div>
            <div {...stylex.props(styles.statValue)}>2건</div>
          </div>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>생산 대기</div>
            <div {...stylex.props(styles.statValue)}>1건</div>
          </div>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statLabel)}>이번 달 완료</div>
            <div {...stylex.props(styles.statValue, styles.statValueSuccess)}>1건</div>
          </div>
        </div>

        {/* 메인 데이터 테이블 섹션 */}
        <div {...stylex.props(styles.tableCard)}>
          <div {...stylex.props(styles.tableHeader)}>
            생산 오더 목록
          </div>
          <div {...stylex.props(styles.tableContainer)}>
            <table {...stylex.props(styles.table)}>
              <thead>
                <tr>
                  <th {...stylex.props(styles.tablePaddingLeft)}>오더 번호</th>
                  <th>제품명</th>
                  <th>수량</th>
                  <th>상태</th>
                  <th {...stylex.props(styles.tableColWidth25)}>진행률</th>
                  <th>납기일</th>
                  <th {...stylex.props(styles.tableTextAlignCenter)}>관리</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const badge = getBadgeInfo(order.status);
                  
                  return (
                    <tr key={order.id}>
                      <td {...stylex.props(styles.tablePaddingLeft)}><strong>{order.id}</strong></td>
                      <td>{order.productName}</td>
                      <td>{order.quantity.toLocaleString()} 개</td>
                      <td>
                        <span {...stylex.props(styles.badge, badge.className)}>
                          {badge.text}
                        </span>
                      </td>
                      <td>
                        <div {...stylex.props(styles.progressWrapper)}>
                          <span {...stylex.props(styles.progressText)}>
                            {order.progress}%
                          </span>
                          <div {...stylex.props(styles.progressTrack)}>
                            <div 
                              {...stylex.props(styles.progressBar, order.status === 'completed' ? styles.progressBarGreen : styles.progressBarBlue)} 
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>{order.dueDate}</td>
                      <td {...stylex.props(styles.tableTextAlignCenter)}>
                        <button {...stylex.props(styles.editButton)}>
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

        {/* 💡 신규 오더 등록 모달 팝업 */}
        {isAddModalOpen && (
          <div {...stylex.props(styles.modalOverlay)}>
            <div {...stylex.props(styles.modalContent)}>
              <div {...stylex.props(styles.modalHeader)}>
                <h3 {...stylex.props(styles.hrModalTitle)}>신규 생산 오더 등록</h3>
                <button onClick={() => setIsAddModalOpen(false)} {...stylex.props(styles.hrCloseBtn)}>✕</button>
              </div>

              <div {...stylex.props(styles.modalBodyGroup)}>
                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>오더 번호</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="text" value={newOrderId} onChange={(e) => setNewOrderId(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
                  </div>
                </div>

                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>제품명</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="text" placeholder="생산할 제품명을 입력하세요" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
                  </div>
                </div>

                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>수량 (개)</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="number" placeholder="수량을 입력하세요" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
                  </div>
                </div>

                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.modalLabel)}>납기일</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} {...stylex.props(styles.modalInputBlock)} />
                  </div>
                </div>
              </div>

              <button {...stylex.props(styles.hrPrimaryBtn)} onClick={handleAddOrderSubmit}>
                등록하기
              </button>
            </div>
          </div>
        )}

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