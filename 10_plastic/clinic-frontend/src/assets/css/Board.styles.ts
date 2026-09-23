import styled from 'styled-components';

// -----------------------------------------
// 🎯 게시판 관리 (Board Admin) 전용 스타일
// -----------------------------------------

export const BoardContainer = styled.div`
  width: 100%;
`;

export const BoardPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const BoardPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const BoardSaveButton = styled.button`
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

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* 좌측 폼보다 우측 테이블을 좀 더 넓게 */
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const BoardLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardRightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const BoardCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const BoardCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const BoardCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const BoardFormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

export const BoardLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
`;

export const BoardInput = styled.input`
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

// 💡 새로 추가된 Select(콤보박스) 스타일
export const BoardSelect = styled.select`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5a5c69;
  background-color: #fff;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    border-color: #4e73df;
  }
`;

export const BoardAddButton = styled.button`
  width: 100%;
  background-color: #f8f9fc;
  border: 1px dashed #4e73df;
  color: #4e73df;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaecf4;
  }
`;

export const BoardTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
`;

export const BoardTable = styled.table`
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

// 스킨 타입별로 색상을 다르게 보여주는 배지
export const BoardTypeBadge = styled.span<{ $type: string }>`
  background-color: ${(props) => {
    if (props.$type === '갤러리형') return '#36b9cc';
    if (props.$type === 'FAQ형') return '#f6c23e';
    return '#858796'; // 일반게시판
  }};
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const BoardActionBtn = styled.button`
  background: #eaecf4;
  border: none;
  color: #5a5c69;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #d1d3e2;
  }
`;

export const BoardDeleteBtn = styled.button`
  background: transparent;
  border: 1px solid #e74a3b;
  color: #e74a3b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fdeaea;
  }
`;
