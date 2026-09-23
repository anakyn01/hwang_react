import styled from 'styled-components';

// -----------------------------------------
// 🎯 안전시스템 관리 (Safety) 전용 스타일
// -----------------------------------------

export const SafetyContainer = styled.div`
  width: 100%;
`;

export const SafetyPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SafetyPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const SafetySaveButton = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(58, 59, 69, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #2e59d9;
  }
`;

export const SafetyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const SafetyLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SafetyRightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SafetyCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const SafetyCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const SafetyCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const SafetyCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const SafetyFormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

export const SafetyLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
`;

export const SafetyInput = styled.input`
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
export const SafetyTextarea = styled.textarea`
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

export const SafetyFileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .file-name {
    font-size: 0.85rem;
    color: #858796;
    word-break: break-all;
  }
`;

export const SafetyFileInput = styled.input`
  display: none;
`;

export const SafetyFileLabel = styled.label`
  background-color: #fff;
  border: 1px solid #d1d3e2;
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5a5c69;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  
  &:hover {
    background-color: #eaecf4;
  }
`;

export const SafetyPreviewRect = styled.div`
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

export const SafetyAddButton = styled.button`
  width: 100%;
  background-color: #fff;
  border: 1px dashed #b7b9cc;
  color: #5a5c69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  &:hover {
    background-color: #eaecf4;
    border-color: #858796;
  }
`;

export const SafetyTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
`;

export const SafetyTable = styled.table`
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

export const SafetyThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 0.35rem;
  background-color: #eaecf4;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #b7b9cc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SafetyRankBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1cc88a; /* 안전 관련이므로 그린 계열로 적용 */
  color: #fff;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  box-shadow: 0 0.15rem 0.25rem rgba(0,0,0,0.1);
`;

export const SafetyActionBtn = styled.button`
  background: #eaecf4;
  border: none;
  color: #5a5c69;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #d1d3e2;
  }
`;

export const SafetyDeleteBtn = styled.button`
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