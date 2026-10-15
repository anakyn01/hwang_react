import styled from 'styled-components';
import { BoxShadow, FlexBetween, FlexCenter, FlexColumn, TransitionAll } from './Common.styles';

// -----------------------------------------
// 🎯 안전시스템 관리 (Safety) 전용 스타일
// -----------------------------------------

export const AdminSafetyContainer = styled.div`
  width: 100%;
`;

export const AdminSafetyPageHeader = styled.div`
${FlexBetween}
  margin-bottom: 1.5rem;
`;

export const AdminSafetyPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const AdminSafetySaveButton = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
${FlexCenter}
  gap: 0.5rem;
  cursor: pointer;
${BoxShadow}
${TransitionAll}

  &:hover {
    background-color: #2e59d9;
  }
`;

export const AdminSafetyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminSafetyLeftColumn = styled.div`
${FlexColumn}
`;

export const AdminSafetyRightColumn = styled.div`
${FlexColumn}
`;

export const AdminSafetyCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
${BoxShadow}
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const AdminSafetyCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const AdminSafetyCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const AdminSafetyCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const AdminSafetyFormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

export const AdminSafetyLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
`;

export const AdminSafetyInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5a5c69;
  background-color: #fff;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #4e73df;
  }
`;

// 💡 상세 설명을 위한 Textarea 컴포넌트 추가
export const AdminSafetyTextarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5a5c69;
  background-color: #fff;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #4e73df;
  }
`;

export const AdminSafetyFileInputWrapper = styled.div`
${FlexCenter}
  gap: 1rem;
  
  .file-name {
    font-size: 0.85rem;
    color: #858796;
    word-break: break-all;
  }
`;

export const AdminSafetyFileInput = styled.input`
  display: none;
`;

export const AdminSafetyFileLabel = styled.label`
  background-color: #fff;
  border: 1px solid #d1d3e2;
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5a5c69;
  cursor: pointer;
${FlexCenter}
  gap: 0.4rem;
  white-space: nowrap;
  
  &:hover {
    background-color: #eaecf4;
  }
`;

export const AdminSafetyPreviewRect = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid #e3e6f0;
  margin-top: 1rem;
  background-color: #f8f9fc;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AdminSafetyAddButton = styled.button`
  width: 100%;
  background-color: #fff;
  border: 1px dashed #b7b9cc;
  color: #5a5c69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
${FlexCenter}
  gap: 0.5rem;
  margin-top: 1.5rem;

  &:hover {
    background-color: #eaecf4;
    border-color: #858796;
  }
`;

export const AdminSafetyTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
`;

export const AdminSafetyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  color: #858796;
  font-size: 0.9rem;

  th {
    color: #5a5c69;
    font-weight: 700;
    padding: 0.8rem;
    border-bottom: 2px solid #e3e6f0;
    white-space: nowrap;
  }

  td {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #eaecf4;
    vertical-align: middle;
  }
`;

export const AdminSafetyThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 0.35rem;
  background-color: #eaecf4;
  margin: 0 auto;
  overflow: hidden;
${FlexCenter}
  font-size: 0.7rem;
  color: #b7b9cc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AdminSafetyRankBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1cc88a; /* 안전 관련이므로 그린 계열로 적용 */
  color: #fff;
  font-weight: 900;
${FlexCenter}
  font-size: 0.9rem;
  box-shadow: 0 0.15rem 0.25rem rgba(0,0,0,0.1);
`;

export const AdminSafetyActionBtn = styled.button`
  background: #eaecf4;
  border: none;
  color: #5a5c69;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.25rem;
${FlexCenter}
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #d1d3e2;
  }
`;

export const AdminSafetyDeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: #e74a3b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: #fdeaea;
  }
`;