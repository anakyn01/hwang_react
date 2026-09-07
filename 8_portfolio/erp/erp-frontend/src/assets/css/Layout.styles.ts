import styled from "styled-components";

export const PageWrapper = styled.div`
display:flex; flex-direction:column;
min-height:100vh;
`;
export const TopArea = styled.div`
position:sticky;
top:0;
z-index:100;
`;
export const MainContent = styled.div`
display:flex; flex:1;
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
export const ContentArea = styled.main``;