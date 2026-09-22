import styled from 'styled-components';

// -----------------------------------------
// 🎯 상담신청 관리 (Consult) 전용 스타일
// -----------------------------------------

export const ConsultContainer = styled.div`
  width: 100%;
`;

export const ConsultPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ConsultPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const ConsultFilterCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const ConsultInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ConsultInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #5a5c69;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  outline: none;
  width: 250px;
  
  &:focus {
    border-color: #4e73df;
  }
`;

export const ConsultSearchButton = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2e59d9;
  }
`;

export const ConsultTableCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const ConsultCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const ConsultCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const ConsultTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ConsultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  color: #858796;
  font-size: 0.95rem;

  th {
    background-color: #f8f9fc;
    color: #5a5c69;
    font-weight: 700;
    padding: 1rem;
    border-bottom: 2px solid #e3e6f0;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #e3e6f0;
    vertical-align: middle;
    
    strong {
      color: #5a5c69;
    }
  }

  tbody tr:hover {
    background-color: #f8f9fc;
  }
`;

// 상태 표시 배지 (클릭 시 토글 가능)
export const ConsultStatusBadge = styled.span<{ $status: string }>`
  background-color: ${(props) => (props.$status === "상담완료" ? "#1cc88a" : "#f6c23e")};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ConsultDeleteActionBtn = styled.button`
  background: transparent;
  border: none;
  color: #e74a3b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fdeaea;
  }
`;