import styled from 'styled-components';
import { BoxShadow, FlexCenter, FlexColumn, TransitionAll } from './Common.styles';
// -----------------------------------------
// 🎯 팝업 관리 (Pop) 전용 스타일
// -----------------------------------------

export const PopContainer = styled.div`
  width: 100%;
`;

export const PopPageHeader = styled.div`
${FlexCenter}
  margin-bottom: 1.5rem;
`;

export const PopPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const PopSaveButton = styled.button`
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

export const PopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const PopLeftColumn = styled.div`
${FlexColumn}
`;

export const PopRightColumn = styled.div`
${FlexColumn}
`;

export const PopCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
${BoxShadow}
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const PopCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const PopCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const PopCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const PopFormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

export const PopLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
${FlexCenter}
  gap: 0.3rem;
`;

export const PopInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5a5c69;
  background-color: #fff;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: #4e73df;
  }
`;

export const PopFileInputWrapper = styled.div`
${FlexCenter}
  gap: 1rem;
  
  .file-name {
    font-size: 0.85rem;
    color: #858796;
    word-break: break-all;
  }
`;

export const PopFileInput = styled.input`
  display: none;
`;

export const PopFileLabel = styled.label`
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

export const PopCheckboxLabel = styled.label`
${FlexCenter}
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #5a5c69;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;

  input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    cursor: pointer;
  }
`;

export const PopAddButton = styled.button`
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
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaecf4;
    border-color: #858796;
  }
`;

export const PopTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
`;

export const PopTable = styled.table`
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
    
    strong {
      color: #5a5c69;
      font-size: 1rem;
    }
  }
`;

export const PopBadge = styled.span<{ $color: string }>`
  background-color: ${(props) => props.$color};
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const PopDeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: #e74a3b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.25rem;
${TransitionAll}

  &:hover {
    background-color: #fdeaea;
  }
`;