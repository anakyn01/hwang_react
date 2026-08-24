import styled from 'styled-components';

export const FooterWrapper = styled.footer`
width:100%;
background-color:#000;
color:#fff;
padding:60px 0 80px 0;
position:fixed;
z-index:9999;
bottom:0; right:0;
font-family:'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
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
flex-direction:column; gap:20px;
}
`;
export const ScheduleBlock = styled.div`
display:flex; flex-direction:column;
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
flex-direction:column;
align-items:flex-start;
gap:40px;
}
`;
export const CompanyInfo = styled.div`
display:flex; flex-direction:column;
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
display:flex;
flex-direction:column;
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

//floating
export const FlaotingMenu = styled.div``;
export const FabItem = styled.div``;
export const FabIcon = styled.div<{$bgColor:string}>``;
export const FabText = styled.span``;

