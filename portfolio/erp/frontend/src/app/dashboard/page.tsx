"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function DashboardPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const recentOrders = [
    { id: "PRD-2023-001", productName: "알루미늄 프레임 A형", quantity: 500, status: "progress", progress: 65, dueDate: "2026-11-20" },
    { id: "PRD-2023-002", productName: "공업용 모터 250W", quantity: 120, status: "planning", progress: 0, dueDate: "2026-11-25" },
    { id: "PRD-2023-003", productName: "제어용 메인보드 v2", quantity: 300, status: "completed", progress: 100, dueDate: "2026-11-15" },
  ];

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        
        {/* 상단 타이틀 */}
        <div {...stylex.props(styles.headerWrapper)}>
          <h2 {...stylex.props(styles.title)}>대시보드</h2>
          <p {...stylex.props(styles.subtitle)}>Smart ERP 통합 운영 현황 및 실시간 지표입니다.</p>
        </div>

        {/* 상단 지표 카드 4개 (총 임직원 카드를 독립된 고유 컴포넌트/스타일로 분리) */}
        <div {...stylex.props(styles.metricsGrid)}>
          <div {...stylex.props(styles.metricCard)}>
            <div {...stylex.props(styles.metricLabel)}>전체 가동 오더</div>
            <div {...stylex.props(styles.metricValue, styles.metricValueBlue)}>12건</div>
          </div>
          <div {...stylex.props(styles.metricCard)}>
            <div {...stylex.props(styles.metricLabel)}>이번 달 생산 완료</div>
            <div {...stylex.props(styles.metricValue, styles.metricValueGreen)}>28건</div>
          </div>
          <div {...stylex.props(styles.metricCard)}>
            <div {...stylex.props(styles.metricLabel)}>재고 부족 품목</div>
            <div {...stylex.props(styles.metricValue, styles.metricValueOrange)}>2건</div>
          </div>

          {/* 💡 겹침을 제거하고 독립적으로 분리된 총 임직원 카드 */}
          <div {...stylex.props(styles.employeeMetricCard)}>
            <div {...stylex.props(styles.employeeMetricLabel)}>총 임직원 (HR 연동)</div>
            <div {...stylex.props(styles.employeeMetricValue)}>4명</div>
          </div>
        </div>

        {/* 중간 차트 및 그래프 영역 */}
        <div {...stylex.props(styles.chartsGrid)}>
          
          {/* 부문별 생산 공정 진척도 */}
          <div {...stylex.props(styles.chartCard)}>
            <div {...stylex.props(styles.cardHeader)}>
              <span>주요 생산 공정 진척도</span>
              <span {...stylex.props(styles.cardHeaderSubText)}>실시간 업데이트</span>
            </div>
            
            <div {...stylex.props(styles.barChartContainer)}>
              <div {...stylex.props(styles.barItem)}>
                <div {...stylex.props(styles.barInfo)}>
                  <span>알루미늄 프레임 A형</span>
                  <span {...stylex.props(styles.barInfoPercent)}>65%</span>
                </div>
                <div {...stylex.props(styles.barTrack)}>
                  <div {...stylex.props(styles.barFill, styles.fillBlue)} style={{ width: "65%" }}></div>
                </div>
              </div>

              <div {...stylex.props(styles.barItem)}>
                <div {...stylex.props(styles.barInfo)}>
                  <span>공업용 모터 250W</span>
                  <span {...stylex.props(styles.barInfoPercent)}>30%</span>
                </div>
                <div {...stylex.props(styles.barTrack)}>
                  <div {...stylex.props(styles.barFill, styles.fillOrange)} style={{ width: "30%" }}></div>
                </div>
              </div>

              <div {...stylex.props(styles.barItem)}>
                <div {...stylex.props(styles.barInfo)}>
                  <span>제어용 메인보드 v2</span>
                  <span {...stylex.props(styles.barInfoPercent)}>100%</span>
                </div>
                <div {...stylex.props(styles.barTrack)}>
                  <div {...stylex.props(styles.barFill, styles.fillGreen)} style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 시스템 상태 요약 */}
          <div {...stylex.props(styles.chartCard)}>
            <div {...stylex.props(styles.cardHeader)}>
              <span>시스템 리소스 상태</span>
            </div>
            
            <div {...stylex.props(styles.statusList)}>
              <div {...stylex.props(styles.statusRow)}>
                <span>API 서버 연동</span>
                <span {...stylex.props(styles.statusGreenText)}>정상 (99.9%)</span>
              </div>
              <div {...stylex.props(styles.statusRow)}>
                <span>Oracle DB 커넥션</span>
                <span {...stylex.props(styles.statusGreenText)}>연결됨</span>
              </div>
              <div {...stylex.props(styles.statusRow)}>
                <span>Docker 컨테이너</span>
                <span {...stylex.props(styles.statusBlueText)}>가동중</span>
              </div>
            </div>
          </div>

        </div>

        {/* 하단 최근 생산 오더 목록 테이블 */}
        <div {...stylex.props(styles.tableCard)}>
          <div {...stylex.props(styles.cardHeader, styles.tableCardHeaderOverride)}>
            <span>최근 긴급 생산 오더 현황</span>
            <button 
              {...stylex.props(styles.tableActionBtn)}
              onClick={() => showAlert("전체 오더 목록 페이지로 이동합니다.")}
            >
              전체보기 &rarr;
            </button>
          </div>
          
          <table {...stylex.props(styles.table)}>
            <thead>
              <tr>
                <th {...stylex.props(styles.tablePaddingLeft)}>오더 번호</th>
                <th>제품명</th>
                <th>수량</th>
                <th>상태</th>
                <th {...stylex.props(styles.tableColWidth25)}>진행률</th>
                <th>납기일</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td {...stylex.props(styles.tablePaddingLeft)}><strong>{order.id}</strong></td>
                  <td>{order.productName}</td>
                  <td>{order.quantity.toLocaleString()} 개</td>
                  <td>
                    <span {...stylex.props(styles.badge, order.status === 'completed' ? styles.badgeCompleted : order.status === 'progress' ? styles.badgeProgress : styles.badgePlanning)}>
                      {order.status === 'completed' ? '생산완료' : order.status === 'progress' ? '생산중' : '생산대기'}
                    </span>
                  </td>
                  <td>
                    <div {...stylex.props(styles.progressCellWrapper)}>
                      <span {...stylex.props(styles.progressCellText)}>{order.progress}%</span>
                      <div {...stylex.props(styles.barTrack, styles.progressCellTrack)}>
                        <div 
                          {...stylex.props(styles.barFill, order.status === 'completed' ? styles.fillGreen : styles.fillBlue)} 
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td {...stylex.props(styles.tableDateText)}>{order.dueDate}</td>
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