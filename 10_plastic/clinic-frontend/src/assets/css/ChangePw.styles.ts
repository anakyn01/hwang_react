import styled from 'styled-components';
import { FlexCenter, BoxShadow, FlexBetween, 
    BlueButtonTheme, LinearGradient } from './Common.styles';

export const Wrapper= styled.div`
background-color:#4e73df;
${LinearGradient};
background-size:cover;
min-height:100vh;
${FlexCenter};
padding:1.4rem;
`;
export const Card= styled.div`
background-color:#fff;
border:none;
border-radius:0.35rem;
${BoxShadow};
width:100%;
max-width:500px;
padding:3rem;
`;
export const Header= styled.header`
text-align:center;
margin-bottom:2rem;
`;

export const Description= styled.p``;
export const Form= styled.form``;
export const PwInput = styled.input``;
export const PwButton = styled.button``;
export const Divider= styled.hr``;
export const LinkGroup= styled.div``;
export const StyledLink= styled.a``;