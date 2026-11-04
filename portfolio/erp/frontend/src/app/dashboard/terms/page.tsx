"use client";

import { Layout } from "@/components/Layout";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function TermsPage() {
  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerWrapper)}>
          <h2 {...stylex.props(styles.title)}>이용약관</h2>
        </div>

        <div {...stylex.props(styles.wideMainPanel)} >
          <div style={{ marginBottom: "20px" }}>
            <h3 {...stylex.props(styles.panelTitle)}>Smart ERP 서비스 이용약관</h3>
            <span style={{ fontSize: "12px", color: "#86868B" }}>시행일자: 2026년 11월 4일 (Ver. 1.2)</span>
          </div>

          <div {...stylex.props(styles.termsBox)}>
            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>제 1 조 (목적)</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                본 약관은 Smart ERP(이하 &quot;회사&quot;라 합니다)가 제공하는 전사적 자원 관리(ERP) 시스템 및 관련 서비스(이하 &quot;서비스&quot;)의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>제 2 조 (용어의 정의)</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                1. &quot;서비스&quot;란 구현되는 단말기(PC, 태블릿, 모바일 등)와 상관없이 회원이 이용할 수 있는 Smart ERP 및 제반 기능을 의미합니다.<br />
                2. &quot;회원&quot;이란 회사의 서비스에 접속하여 본 약관에 동의하고 회사가 제공하는 ID 및 권한을 부여받아 이용하는 임직원 및 관리자를 의미합니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>제 3 조 (약관의 효력과 개정)</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                1. 본 약관은 서비스 화면에 공지하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.<br />
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>제 4 조 (회원의 의무 및 보안)</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                1. 회원은 아이디 및 비밀번호(JWT 토큰 인증 포함) 관리에 대한 보안 책임을 부담합니다.<br />
                2. 회원은 회사의 사전 승낙 없이 서비스를 이용하여 영리 목적의 행위를 할 수 없으며, 기업 내부 기밀 정보를 외부로 유출해서는 안 됩니다.
              </p>
            </div>

            <div {...stylex.props(styles.termsSection)}>
              <h4 {...stylex.props(styles.termsHeading)}>제 5 조 (서비스의 제공 및 중단)</h4>
              <p {...stylex.props(styles.termsParagraph)}>
                1. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br />
                2. 시스템 정기 점검, 서버 교체, 혹은 국가 비상사태 등 불가피한 사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}