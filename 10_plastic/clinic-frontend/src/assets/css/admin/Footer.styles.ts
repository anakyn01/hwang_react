// -----------------------------------------
// 🎯 푸터 설정 관리 (Footer Admin) 전용 스타일
// -----------------------------------------
import styled from 'styled-components';
import { BoxShadow, FlexBetween, FlexCenter, FlexColumn, TransitionAll } from '../admin/Common.styles';

export const FooterAdminContainer = styled.div`
  width: 100%;
`;

export const FooterPageHeader = styled.div`
${FlexBetween}
  margin-bottom: 1.5rem;
`;

export const FooterPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const FooterSaveButton = styled.button`
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

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
  height: fit-content;
`;

export const FooterCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const FooterCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const FooterCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const FooterFormGroup = styled.div`
  margin-bottom: 1.2rem;
  width: 100%;
`;

export const FooterLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
`;

export const FooterInput = styled.input`
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

export const FooterFlexRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    ${FlexColumn}
    gap: 0;
  }
`;

export const FooterFamilyRow = styled.div`
${FlexCenter}
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

export const FooterDeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: #e74a3b;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 0.25rem;
${FlexBetween}
${TransitionAll}

  &:hover {
    background-color: #fdeaea;
  }
`;

export const FooterAddButton = styled.button`
  width: 100%;
  background-color: #fff;
  border: 1px dashed #b7b9cc;
  color: #5a5c69;
  padding: 0.8rem;
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
${FlexCenter}
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaecf4;
    border-color: #858796;
  }
`;