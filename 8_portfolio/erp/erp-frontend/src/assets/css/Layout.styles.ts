import styled from "styled-components";
import { FlexColumn, H100, Vh100, W100 } from "./common/Common.styles";

export const PageWrapper = styled.div`
${FlexColumn};
${Vh100};
`;
export const TopArea = styled.div`
${W100};
position:sticky;
top:0;
z-index:100;
`;
export const MainContent = styled.div`
display:flex; 
${W100};
${H100};
`;
export const LnbWrapper = styled.aside`
width:250px;
background-color:#fff;
border-right:1px solid #e2e8f0;
flex-shrink:0;
@media(max-width:768px){
display:none;
}
`;
export const ContentArea = styled.main`
flex:1;
padding:2rem;
background-color:#f8fafc;
overflow-y:auto;
min-width:0;
`;

