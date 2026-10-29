import styled from 'styled-components';
import { coolGray } from '@/assets/css/admin/Admin.styles'; // 💡 쿨그레이 팔레트 임포트

export const TopbarContainer = styled.nav`
  height: 4.375rem; /* 70px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background-color: #ffffff;
  
  /* 💡 기존 SB Admin의 탁한 그림자(rgba 58,59,69) 대신 쿨그레이 기반의 부드러운 그림자로 교체 */
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08); 
  margin-bottom: 1.5rem;
`;

export const TopbarSearch = styled.form`
  /* 💡 내부 인풋과 버튼 배치를 더 쉽게 하기 위해 flex로 변경 */
  display: flex; 
  align-items: center;
  margin-right: auto;
  margin-left: 1rem;
`;

export const TopbarNavbar = styled.ul`
  display: flex; 
  align-items: center;
  list-style: none; 
  margin: 0;
  padding: 0;
  gap: 16px; /* 💡 요소들 사이의 간격을 마진 대신 gap으로 깔끔하게 제어 */
`;

export const TopbarProfile = styled.img`
  width: 32px;
  height: 32px;
  
  /* 💡 프로필 이미지를 완전한 원형으로 만들고 쿨그레이 테두리 추가 */
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${coolGray[200]}; 
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${coolGray[400]};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px; /* 검색창 최대 너비 (필요에 따라 조절) */
`;

// 2. 검색 입력창 (Bootstrap의 .form-control 역할)
export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${coolGray[700]};
  background-color: #fff;
  border: 1px solid ${coolGray[300]};
  border-right: none; /* 💡 버튼과 매끄럽게 이어지도록 우측 테두리 제거 */
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${coolGray[400]};
  }

  &:focus {
    border-color: ${coolGray[500]};
    /* 포커스 시 부드러운 쿨그레이 링 효과 */
    box-shadow: inset 0 0 0 1px ${coolGray[200]}; 
  }
`;

// 3. 첨부 래퍼 (이미지의 <div class="input-group-append"> 역할)
export const InputGroupAppend = styled.div`
  display: flex;
`;

// 4. 검색 버튼 (이미지의 <button class="btn btn-primary"> 역할)
export const SearchButton = styled.button`
  background-color: ${coolGray[800]}; /* 다크 쿨그레이 메인 컬러 */
  color: #fff;
  border: 1px solid ${coolGray[800]};
  
  /* 💡 인풋창과 맞닿는 왼쪽은 직각(0), 바깥쪽인 오른쪽은 둥글게(6px) 처리 */
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  
  padding: 0.5rem 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${coolGray[700]};
    border-color: ${coolGray[700]};
  }

  /* 돋보기 아이콘 크기 조정 */
  svg, i {
    font-size: 1.1rem;
  }
`;