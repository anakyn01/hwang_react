import styled, {css} from 'styled-components';
import { BgWhite, FlexBetween, TextCenter } from './Common.styles';


export const StatusText = styled.div`
width:100%;
${TextCenter};
padding:20px;
font-size:14px;
color:#6c757d;
`;
export const StatBox = styled.div`
${FlexBetween};
${BgWhite};
padding:16px;
border-radius:8px;
box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;
export const StatItem = styled.div`
font-size:13px;
`;