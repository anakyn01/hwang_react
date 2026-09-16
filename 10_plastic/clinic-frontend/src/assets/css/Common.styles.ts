import { css } from 'styled-components';

export const FlexCenter = css`
display:flex;
justify-content:center;
align-items:center;
`;
export const FlexBetween = css`
display:flex;
justify-content:space-between;
align-items:center;
`;
export const FlexColumn = css`
display:flex;
flex-direction:column;
`;
export const FlexRow = css`
display:flex;
flex-direction:row;
`;

export const BlueButtonTheme = css`
background-color:#4e73df;
color:white;
border-radius:10rem;
&:hover{
background-color:#2e59d9;
}
`;
export const LinearGradient = css`
background-image:linear-gradient(180deg, #4e73df 10%, #224abe 100%);
`;
export const BoxShadow = css`
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59, 69, 0.15);
`;

export const TransitionAll = css`
transition:all 0.15s ease-in-out;
`;

export const ButtonBasic =css`
width:100%;
padding:0.75rem 1rem;
font-size:0.8rem;
border-radius:10rem;
font-weight:bold;
cursor:pointer;
`

export const TextCenter = css`
text-align:center;
`;
export const TextLeft = css`
text-align:left;
`;
export const TextRight = css`
text-align:right;
`;