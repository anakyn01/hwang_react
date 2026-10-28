import styled from 'styled-components';
import { BgWhite, BoxShadow, FlexColumn, Grid, Ohidden } from '../common/Common.styles';

export const Terms = styled.div`
max-height: showTerms ? '150px' : '0';
overflow:hidden;
transition:max-height 0.3s ease-in-out;
background-color:#f9f9f9;
border-radius:4px;
`;
export const Privacy = styled.div`
max-height: showPrivacy ? '150px' : '0';
overflow:hidden;
transition:max-height 0.3s ease-in-out;
background-color:#f9f9f9;
border-radius:4px;
`;

export const TermsInner = styled.div`
margin:10px 0px;
padding:10px;
font-size:12px;
color:#666;
`;

export const UpAndDown = styled.span`
cursor:pointer; font-size:12px; 
color:#888;
`;
