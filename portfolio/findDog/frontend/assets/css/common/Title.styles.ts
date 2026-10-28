import styled, {css} from 'styled-components';
import { Fw400, Fw500,Fw600,Fw700,Fw900,Nowrap, TextCenter } from './Common.styles';
//title
export const H5Bold = styled.h5`
${Fw600};
letter-spacing:-0.03rem;
color:#333;
`;
export const H3Title = styled.h3`
${Fw700};
letter-spacing:-0.03rem;
color:#333;
`;
export const H3Size16 = styled.h3`
font-size:16px; 
${Fw900};
margin-bottom:15px;
`;

export const H2Size20 = styled.h2`
font-size:20px; 
${Fw500};
margin-bottom:25px;
color:#000;
`;

export const NewsTitle = styled.p`
margin-top:6px; font-size:.8rem;
${TextCenter};
${Nowrap};
overflow:hidden;
`;



export const PhotoUploadBottomText = styled.span`
font-size:12px; 
${Fw400};
letter-spacing:-0.03rem;
color:#333;
`;


export const PageTitle = styled.h1`
font-size:1.75rem; color:#5a5c69;
margin-bottom:1.5rem;
`;