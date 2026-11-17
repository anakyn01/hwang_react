import styled from "styled-components";

//다음 팝업
export const Dflex = styled.div`
display:flex; gap:10px; 
margin-bottom:10px;
`;
export const ModalBG = styled.div`
position:fixed;
background-color:rgba(0, 0, 0, .3);
z-index:999999;
left:0; top:0;
width:100%;
height:100%;
`;
export const ModalContent = styled.div`
position:fixed; top:50%; left:50%;
transform:translate(-50%, -50%);
width:400px; height:500px; z-index:9999999;
background-color:#fff;
`;

export const RightBtn = styled.div`
display:flex; 
justify-content:flex-end;
padding:5px;

button{
background-color:transparent;
border:none;
}
`;
