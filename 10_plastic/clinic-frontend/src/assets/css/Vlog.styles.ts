import styled from 'styled-components';


// -----------------------------------------
// 🎯 VLOG 관리 전용 스타일
// -----------------------------------------

export const VlogContainer = styled.div`
  width: 100%;
`;

export const VlogPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const VlogPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

export const VlogSaveButton = styled.button`
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

export const VlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const VlogLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VlogRightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VlogCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
`;

export const VlogCardHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const VlogCardTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
`;

export const VlogCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;
`;

export const VlogFormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

export const VlogLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a5c69;
  margin-bottom: 0.5rem;
`;

export const VlogInput = styled.input`
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

export const VlogFileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .file-name {
    font-size: 0.85rem;
    color: #858796;
    word-break: break-all;
  }
`;

export const VlogFileInput = styled.input`
  display: none;
`;

export const VlogFileLabel = styled.label`
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

// 💡 유튜브 영상처럼 가로가 긴 16:9 비율의 미리보기 영역
export const VlogPreviewRect = styled.div`
  width: 160px;
  height: 90px;
  border-radius: 0.25rem;
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

export const VlogAddButton = styled.button`
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

export const VlogTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
`;

export const VlogTable = styled.table`
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

// 💡 리스트 내부의 16:9 썸네일
export const VlogThumbnail = styled.div`
  width: 100px;
  height: 56px; 
  border-radius: 0.25rem;
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

export const VlogRankBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #36b9cc;
  color: #fff;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  box-shadow: 0 0.15rem 0.25rem rgba(0,0,0,0.1);
`;

export const VlogActionBtn = styled.button`
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

export const VlogDeleteBtn = styled.button`
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