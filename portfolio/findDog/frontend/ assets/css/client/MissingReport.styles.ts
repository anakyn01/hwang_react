import styled from 'styled-components';
import { BgWhite, BorderNone, BoxShadow, FlexBetween, FlexCenter, Fw600, Nowrap, Pointer } from '../common/Common.styles';

export const BellIconWrapper = styled.div`
cursor:pointer;
`;

export const FilterBar = styled.div`
display:flex;
gap:0.5rem;
padding:0.75rem 1rem;
background-color:#fff;
border-bottom:1px solid #eee;

&::-webkit-scrollbar {display:none;}
`;

export const FilterButton = styled.button`
${FlexCenter}
gap:0.25rem;
background-color:#f1f3f5;
${BorderNone}
border-radius:1.25rem;
font-size:0.8125rem;
padding:0.375rem 0.75rem;
color:#495057;
${Nowrap}
${Pointer}
`;

export const AlertBanner = styled.div`
${FlexBetween}
${BgWhite}
margin: 0.75rem 1rem;
padding:0.875rem 1rem;
border-radius:0.75rem;
${BoxShadow}
`;

export const AlertTitle = styled.div`
font-size:0.875rem;
${Fw600}
color:#333;
`;

export const AlertSub = styled.div`
font-size:0.6875rem;
color:#888;
margin-top:0.125rem;
`;




