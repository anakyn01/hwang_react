import styled,{keyframes} from "styled-components";

// 2초에 맞춰 서서히 투명해지는 애니메이션
export const fadeOut = keyframes`
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`;

export const SplashWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f7d8d2;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 화면 최상단에 노출 */
  animation: ${fadeOut} 2s ease-in-out forwards;
`;