import styled from "styled-components";
import Link from "next/link";
import { BgWhite, Fixed, FlexBetween, FlexCenter, FlexColumn, H100, W100 } from "./common/Common.styles";
//일정모달
export const ModalOverlay = styled.div`
${Fixed};
top:0; left:0;
background:rgba(0,0,0,.8);
${W100};
${H100};
z-index:99999;
${FlexCenter};
`;
export const ModalContainer =styled.div`
${BgWhite};
width:400px;
padding:24px;
border-radius:8px;
box-shadow:0 4px 12px rgba(0,0,0,0.15);
`;
export const ModalHeader = styled.div`
${FlexBetween};
margin-bottom:1rem;
`;
export const ModalTitle = styled.h3`
font-size:1.2rem;
color:#333;
margin:0;
`;
export const CloseButton = styled.button`
background:transparent;
border:none;
font-size:2rem; font-weight:300;
line-height:1; 
cursor:pointer;
color:#666;
${FlexCenter};
transform:rotate(45deg);
transition:transform 0.2s ease, color 0.2s ease;
&:hover{
color:#333;
transform:rotate(135deg);
}
`;
export const ModalBody = styled.div``;
export const FormGroup = styled.div`
${FlexColumn};
gap:8px;
margin-bottom:1rem;
`;
export const Select = styled.select`
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
font-size:0.9rem;
`;
export const TextArea = styled.textarea`
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
resize:none;
height:80px;
`;
export const ButtonGroup = styled.div`
display:flex;
gap:8px;
justify-content:flex-end;
margin-top:16px;
& > button{
width:auto !important;
min-width:80px;
padding:8px 16px !important;
flex:none;
}
`;
export const ScheduleList = styled.ul`
list-style:none;
padding:0;
margin:16px 0 0 0;
max-height:150px;
overflow-y:auto;
border-top:1px solid #eee;
`;
export const ScheduleItem = styled.li`
${FlexColumn}
padding:12px 0;
border-bottom:1px solid #eee;
gap:8px;
`;
export const ScheduleHeader = styled.div`
${FlexBetween};
font-size:0.85rem;
color:#666;
`;
export const Badge = styled.span<{$status:"대기"|"진행"|"완료"}>`
padding:4px 8px;
border-radius:12px;
font-size:0.75rem;
font-weight:bold;
color:white;
background-color:${({ $status}) =>
$status === "완료" ? "#10b981" :
$status === "진행" ? "#3B82f6" : "#f59e0b"};
`;
export const SmallButton = styled.button`
width:100px;
background:transparent;
border:1px solid #d1d3e2;
border-radius:4px;
padding:4px 8px;
font-size:0.75rem;
cursor:pointer;

`;
export const ScheduleDot = styled.div`
width:6px;
height:6px;
background-color:#3b82f6;
border-radius:50%;
margin-top:4px;
`;
