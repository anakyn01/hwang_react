import styled from 'styled-components';
import { FlexCenter, FlexColumn } from '../common/Common.styles';


export const AlertInfo = styled.div`
  ${FlexCenter};
  gap: 12px;

  .icon-circle {
    background-color: #e9ecef;
    width: 38px; 
    height: 38px;
    border-radius: 50%;
${FlexCenter};
  }
  .text-group {
${FlexColumn};
    strong { font-size: 0.95rem; color: #111; }
    span { font-size: 0.8rem; color: #888; margin-top: 3px; }
  }
`;