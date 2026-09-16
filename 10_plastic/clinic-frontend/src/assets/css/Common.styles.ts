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