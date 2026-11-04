"use client";

import { Layout } from "@/components/Layout";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function ManualPage() {
  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerWrapper)}>
          <h2 {...stylex.props(styles.title)}>사용자 매뉴얼</h2>
        </div>

        <div {...stylex.props(styles.wideMainPanel)}>
          <div style={{ marginBottom: "20px" }}>
            <h3 {...stylex.props(styles.panelTitle)}>Smart ERP 시스템 운영 가이드</h3>
            <span style={{ fontSize: "12px", color: "#86868B" }}>최종 업데이트: 2026년 11월 (Standard Edition v1.2)</span>
          </div>

          <div {...stylex.props(styles.termsBox)}>
            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>1. 대시보드 및 네비게이션</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                - 로그인 직후 메인 대시보드에서 전사적 자원 관리 현황(생산, 재고, 인사 등)을 한눈에 파악할 수 있습니다.<br />
                - 상단 헤더 및 우측 상단의 마이페이지 아이콘을 통해 내 정보 관리, 비밀번호 변경, 일정 확인 및 쪽지 전송 기능을 이용할 수 있습니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>2. 생산 관리 모듈</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                - 생산 오더 목록을 조회하고, 상단의 [+ 신규 오더 등록] 버튼을 통해 제품명, 수량, 납기일을 설정하여 새로운 생산 지시를 내릴 수 있습니다.<br />
                - 각 오더의 진행 상태(생산대기, 생산중, 생산완료)와 진척도를 실시간으로 모니터링할 수 있습니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>3. 재고 관리 모듈</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                - 원자재, 부품, 포장재 등의 현재고 수량 및 자산 가치를 관리합니다.<br />
                - 재고 부족이나 품절 상태인 항목은 자동으로 배지가 부여되며, [신규 품목 등록], [수정], [삭제] 모달을 통해 마스터 데이터를 유연하게 정돈할 수 있습니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>4. 인사 및 캘린더 관리</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                - 임직원 현황 및 직급별 권한(RBAC)을 확인할 수 있습니다.<br />
                - 캘린더 및 마이페이지의 일정 탭을 통해 주간 회의, 월간 회의, 개인 등록 일정 및 완료/취소 상태를 체계적으로 관리할 수 있습니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>5. 기준정보 설정 및 기술지원</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                - 회사 기본 정보, 품목 마스터, 시스템 권한을 관리자가 직접 세팅할 수 있습니다.<br />
                - 시스템 이용 중 문의 사항이 발생할 경우 하단 푸터의 [기술지원] 메뉴를 통해 FAQ를 참고하거나 1:1 문의를 접수할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}