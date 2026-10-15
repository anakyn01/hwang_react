import styled from "styled-components";
import { FlexBetween, FlexCenter, FlexColumn } from "../admin/Common.styles";

//이벤트팝업
export const PopupContainer = styled.div<{ $top:number; $left:number}>`
position:fixed;
top:${(props) => props.$top}px;
left:${(props) => props.$left}px;
width:380px;
background-color:rgba(0,0,0,.8);
box-shadow:0 10px 30px rgba(0, 0, 0, .5);
z-index:99999;
${FlexColumn}
`;
export const ImageWrapper = styled.div`
width:100%;
position:relative;

img{
width:100%; height:auto; display:block;
}
`;
export const FormWrapper = styled.div`
background-color:#000;
padding:15px 15px 20px 15px;

`;
export const InputGroup = styled.div`
display:flex; 
gap:5px; 
margin-bottom:12px;
width:100%; //부모너비에 딱 맟추기
`;
export const Input = styled.input`
flex:1; 
min-width:0;
//인풋에 고집을 꺽고 부모크기에 맞춰 줄어들수 있도록 강제 허용
height:36px; padding:0 8px;
font-size:13px;
border:1px solid #ccc;
outline:none;
background-color:#fff;

&::placeholder{color:#999;}
&:focus{border-color:#000;}
`;
export const SubmitBtn = styled.button`
flex-shrink:0;
//버튼이 다른 애들이 밀어도 절대 크기가 줄어들거나 찌그려 트리지 않게
width:80px;
height:36px;
background-color:#fff176;
color:#000;
font-weight:bold;
font-size:13px;
border:none;
cursor:pointer;
transition:background-color .2s;
&:hover{
background-color:#fce83a;
}
`;
export const PrivacyLabel = styled.label`
${FlexCenter}
gap:6px;
cursor:pointer;
`;
export const PrivacyCheckbox = styled.input`
appearance:none;
width:14px;
height:14px;
background-color:#fff;
border:1px solid #ddd;
cursor:pointer;
position:relative;
&:checked::after{
content:'✔';
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
color:#000;
font-size:10px;
}
`;
export const PrivacyText = styled.span`
color:#fff;
font-size:11px;
letter-spacing:-0.5px;
span{
color:#aaa;
text-decoration:underline;
margin-left:4px;
cursor:pointer;
}
`;
export const FooterWrapper = styled.div`
background-color:#fff;
padding:10px 15px;
${FlexBetween}
`;
export const CloseLabel = styled.label`
${FlexCenter}
gap:6px;
cursor:pointer;
font-size:13px;
color:#000;
`;
export const CloseCheckbox = styled.input`
appearance:none;
width:14px;
height:14px;
border:1px solid #ccc;
background-color:#fff;
cursor:pointer;
position:relative;

&:checked::after{
content:'✔';
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
color:#000;
font-size:10px;
}
`;
export const CloseBtn = styled.button`
background:none;
border:none;
font-size:18px;
font-weight:300;
cursor:pointer;
color:#000;
${FlexCenter}
padding:0;
`;


export const FooterInner = styled.div`
max-width:1860px;
margin:0 auto;
padding:0 40px;
@media (max-width:1024px) {
padding:0 20px;
}
`;
export const TopSection = styled.div`
display:flex; justify-content:space-between;
align-items:flex-start;
padding-bottom:40px;
border-bottom:1px solid #333;
margin-bottom:40px;

@media (max-width: 1024) {
flex-direction:column;
gap:30px;
}
`;
export const CsInfo = styled.div`
flex:1;
`;
export const PhoneNumber = styled.div`
font-size:32px;
font-weight:900;
letter-spacing:1px;
margin-bottom:5px;
`;
export const CsTitle = styled.div`
font-size:14px;
color:#999;
font-weight:bold;
`;
export const ScheduleWrapper = styled.div`
flex:2;
display:flex;
gap:60px;
@media (max-width:768px) {
${FlexColumn};
 gap:20px;
}
`;
export const ScheduleBlock = styled.div`
display:flex; ${FlexColumn}
gap:8px;
`;
export const ScheduleTitle = styled.div`
font-size:14px; font-weight:bold;
color:#fff; margin-bottom:4px;
`;
export const ScheduleText = styled.div`
font-size:13px; color:#aaa;
letter-spacing:-0.5px;
`;
export const LocationButton = styled.button`
flex:0.5; height:48px; padding:0 30px;
border:1px solid #fff;
background-color:transparent;
color:#fff;
font-size:14px;
font-weight:bold;
cursor:pointer;
transition:all 0.3s;
white-space:nowrap;
border-radius:5px;
&:hover{
background-color:#fff;
color:#000;
}
@media(max-width:1024px){
width:100%;
}
`;

export const BottomSection = styled.div`
display:flex; justify-content:space-between;
align-items:flex-end;
@media (max-width: 1024px) {
${FlexColumn}
align-items:flex-start;
gap:40px;
}
`;
export const CompanyInfo = styled.div`
display:flex; ${FlexColumn}
gap:10px;
`;
export const CompanyName = styled.h2`
font-size:24px; font-weight:900;
margin:0 0 15px 0;
`;
export const InfoText = styled.p`
margin:0; font-size:13px; color:#888;
line-height:1.6;
letter-spacing:-0.3px;

span{
margin:0 8px;
color:#555;
}
`;
export const BottomRight = styled.div`
${FlexColumn}
align-items:flex-end;
gap:20px;
@media (max-width: 1024px) {
align-items: flex-start;
width:100%;
}
`;
export const PolicyButtons = styled.div`
display:flex; gap:10px;
`;
export const PolicyBtn = styled.button`
background-color:#222;
color:#aaa;
border:none;
padding:8px 16px;
font-size:12px;
cursor:pointer;
border-radius:2px;

&:hover{
background-color:#333;
color:#fff;
}
`;
export const FamilySiteTitle = styled.div`
font-size:13px;
font-weight:bold;
color:#fff;
margin-bottom:10px;
`;
export const FamilySiteLogos = styled.div`
display:flex; gap:15px;
align-items:center;
.logo-placeholder{
font-size:11px;
color:#777;
border:1px solid #444;
padding:4px 8px;
border-radius:15px;
}
`;
