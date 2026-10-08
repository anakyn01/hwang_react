import styled from "styled-components";
import Link from "next/link";
import { Absolute, FlexBetween, Ohidden, Pointer, Relative, W100 } from "./common/Common.styles";


// 커스텀 셀렉트 박스 컨테이너
export const CustomSelectContainer = styled.div`
${Relative};
${W100};
z-index:100;
`;

export const SelectTrigger = styled.div`
padding:10px 12px;
border:1px solid #d1d3e2;
border-radius:6px;
background-color:#fff;
font-size:0.9rem;
${Pointer};
${FlexBetween};
color:#333;
&:hover{
border-color:#bac8f3;
}
`;

//드롭다운 리스트 영역
export const SelectList = styled.ul`
${Absolute};
top:100%;
left:0;
width:100%;
margin:4px 0 0 0;
padding:0;
list-style:none;
background:#fff;
border:1px solid #e2e8f0;
border-radius:6px;
box-shadow:0 4px 12px rgba(0,0, 0, 0.1);
z-index:50;
${Ohidden};
`;
interface SelectItemprops {
  $isSelected?: boolean;
}

//드롭다운 개별 항목
export const SelectItem = styled.li<SelectItemprops>`
padding:10px 12px;
font-size:0.9rem;
cursor:pointer;
color:${({ $isSelected }) => ($isSelected ? '#4e73df' :'#475569')};
background-color:${({ $isSelected}) => ($isSelected ? '#f8f9fc' :'transparent')};
font-weight:${({ $isSelected }) => ($isSelected ? 'bold' :'normal')};
&:hover{
background-color:#f1f5f9;
}
`;