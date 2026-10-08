import styled,{css, keyframes} from "styled-components";
import Link from "next/link";
import { BgWhite, BoxShadow, Fixed, FlexBetween, FlexCenter, FlexColumn, H100, W100 } from "./common/Common.styles";

const fadeIn = keyframes`
from{opacity:0;}
to{opacity:1;}
`;
const fadeOut = keyframes`
from{opacity:1;}
to{opacity:0;}
`;

const slideUp = keyframes`
from{opacity:0; transform:translateY(1.25rem);}
to{opacity:1; transform:translateY(0);}
`;
const slideDown = keyframes`
from{opacity:1; transform:translateY(0);}
to{opacity:0; transform:translateY(1.25rem);}
`;

// 💡 Props 타입 정의 추가 (닫히고 있는지 여부를 받음)
interface ModalProps{
 $isClosing?:boolean;   
}

//일정모달
export const ModalOverlay = styled.div<ModalProps>`
${Fixed};
top:0; left:0;
background:rgba(0,0,0,.8);
${W100};
${H100};
z-index:99999;
${FlexCenter};

/* 💡 상태에 따라 애니메이션 교체 */
animation:${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} .3s ease-out forwards;
`;
export const ModalContainer =styled.div`
${BgWhite};
width:400px;
padding:24px;
border-radius:8px;
box-shadow:0 4px 12px rgba(0,0,0,0.15);
`;

//alert modal start
export const ModalBox = styled.div<ModalProps>`
background-color: #1e293b;
padding:2rem;
border-radius:0.75rem;
min-width:18.75rem;
max-width:90%;
gap:1.5rem;
${FlexColumn};
${BoxShadow};
animation:${({ $isClosing }) => ($isClosing ? slideDown : slideUp)} .3s ease-out forwards;
`;
export const ModalText = styled.p`
font-size:1.125rem;
color:#fff;
text-align:center;
margin:0;
line-height:1.5;
`;
//alert modal end

export const ModalHeader = styled.div`
${FlexBetween};
margin-bottom:1rem;
`;
export const ModalTitle = styled.h3`
font-size:1.2rem;
color:#333;
margin:0;
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

export const ScheduleDot = styled.div`
width:6px;
height:6px;
background-color:#3b82f6;
border-radius:50%;
margin-top:4px;
`;
