import styled from 'styled-components';
import { FlexCenter, BoxShadow, FlexBetween, 
    BlueButtonTheme, LinearGradient, 
    FlexColumn,
    TransitionAll,
    ButtonBasic,
    TextCenter} from './admin/Common.styles';

export const PwWrapper= styled.div`
background-color: #4e73df;
${LinearGradient}
background-size:cover;
width:100%;
min-height:100vh;
${FlexCenter}
padding:1.4rem;
`;
export const PwTitle = styled.h6`
font-size:1.5rem;
color:#111;
`;
export const PwCard= styled.div`
background-color:#fff;
border:none;
border-radius:0.35rem;
${BoxShadow};
width:100%;
max-width:500px;
padding:3rem;
`;
export const PwHeader= styled.header`
text-align:center;
margin-bottom:2rem;
`;

export const PwDescription= styled.p`
font-size:0.875rem;
color:#858796;
margin-bottom:0.5rem;
`;
export const PwForm= styled.form`
${FlexColumn};
gap:1.2rem;
`;
export const PwInput = styled.input`
width:100%;
padding:1rem 1.5rem;
font-size:0.8rem;
border-radius:10rem;
border:1px solid #d1d3e2;
color:#6e707e;
outline:none;
${TransitionAll};
&:focus{
border-color:#bac8f3;
${BoxShadow};
}
`;
export const PwButton = styled.button`
${ButtonBasic};
background-color:#4e73df;
border:1px solid #4e73df;
color:#fff;
${TransitionAll};
margin-top:10px;

&:hover{
background-color:#2e59d9;
border-color:#2653d4;
}
`;
export const PwDivider= styled.hr`
margin:1.5rem 0;
border:0;
border-top:1px solid #e3e6f0;
`;
export const PwLinkGroup= styled.div`
${TextCenter};
${FlexColumn};
gap:0.5rem;
`;
export const PwStyledLink= styled.a`
font-size:0.8rem;
color:#4e73df;
text-decoration:none;
cursor:pointer;

&:hover{
text-decoration:underline;
color:#224abe;
}
`;