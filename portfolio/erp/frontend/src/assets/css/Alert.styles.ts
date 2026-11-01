import styled from "styled-components";

// 화면 전체를 덮는 반투명 백드롭 (글래스 룩 배경)
export const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6); // 어두운 네이비 투명 배경
  backdrop-filter: blur(8px);          // 배경을 흐리게 만드는 블러 효과
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// 알림창 카드 박스 (글래스모피즘 디자인)
export const AlertBox = styled.div`
  background: rgba(30, 41, 59, 0.75);    // 반투명 슬레이트 색상
  backdrop-filter: blur(12px);         // 글래스 룩 유리 광택 효과
  border: 1px solid rgba(255, 255, 255, 0.15); // 은은한 테두리 광선
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 16px;
  width: 360px;
  max-width: 90%;
  text-align: center;
  color: #f8fafc;
  animation: modalPop 0.3s ease-in-out;

  @keyframes modalPop {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// 안내 메시지 텍스트
export const AlertMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 1.5;
  color: #e2e8f0;
`;

// 확인 버튼 (글래스 룩 포인트 스타일)
export const AlertButton = styled.button`
  background: rgba(59, 130, 246, 0.85); // 은은한 블루 톤 글래스 버튼
  backdrop-filter: blur(4px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(37, 99, 235, 1);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }
`;