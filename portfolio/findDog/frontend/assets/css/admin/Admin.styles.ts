import { css } from 'styled-components';

// 1. 쿨그레이 컬러 팔레트 (Tailwind CSS Slate 기반의 안정적인 쿨그레이)
export const coolGray = {
  50: '#f8fafc',  // 앱 배경색
  100: '#f1f5f9', // 호버 배경색, 테이블 헤더
  200: '#e2e8f0', // 구분선, 기본 테두리
  300: '#cbd5e1', // 비활성화 요소, 인풋 테두리
  400: '#94a3b8', // 플레이스홀더, 보조 아이콘
  500: '#64748b', // 보조 텍스트
  600: '#475569', // 기본 텍스트
  700: '#334155', // 강조 텍스트, 네비게이션 텍스트
  800: '#1e293b', // 제목, 메인 버튼 (Primary)
  900: '#0f172a', // 최상위 강조, 다크모드 배경
};

// 2. 어드민 공통 믹스인 정의

// 페이지 최상단 래퍼 스타일 (배경 & 기본 텍스트)
export const adminBaseStyle = css`
  background-color: ${coolGray[50]};
  color: ${coolGray[700]};
  font-family: 'Pretendard', sans-serif;
  min-height: 100vh;
`;

// 대시보드 카드/패널 스타일
export const adminCard = css`
  background-color: #ffffff;
  border: 1px solid ${coolGray[200]};
  border-radius: 8px;
  /* 쿨그레이 베이스의 은은한 그림자로 깊이감 부여 */
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.1); 
`;

// 메인 액션 버튼 (진한 쿨그레이)
export const adminPrimaryBtn = css`
  background-color: ${coolGray[800]};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${coolGray[700]};
  }

  &:disabled {
    background-color: ${coolGray[300]};
    cursor: not-allowed;
  }
`;

// 보조 액션 버튼 (아웃라인)
export const adminOutlineBtn = css`
  background-color: #ffffff;
  color: ${coolGray[700]};
  border: 1px solid ${coolGray[300]};
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${coolGray[50]};
    border-color: ${coolGray[400]};
  }
`;

// 입력창(Input, Select 등) 공통 스타일
export const adminInput = css`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${coolGray[300]};
  border-radius: 6px;
  color: ${coolGray[800]};
  background-color: #ffffff;
  font-size: 14px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${coolGray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${coolGray[600]};
    /* 포커스 시 쿨그레이 톤의 링(Ring) 효과 */
    box-shadow: 0 0 0 2px rgba(71, 85, 105, 0.15); 
  }
`;

// 테이블 공통 스타일
export const adminTable = css`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: ${coolGray[100]};
    color: ${coolGray[600]};
    font-weight: 600;
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid ${coolGray[200]};
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid ${coolGray[200]};
    color: ${coolGray[700]};
  }

  tbody tr:hover {
    background-color: ${coolGray[50]};
  }
`;