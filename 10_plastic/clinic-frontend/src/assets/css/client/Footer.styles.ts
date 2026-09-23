import styled from "styled-components";

//footer
export const SiteFooterWrapper = styled.footer`
background-color:#000;
padding:20px 15px 120px 15px;
display:flex;
justify-content:space-between;
align-items:center;
border-top:1px solid #eee;
`;
export const SiteFooterInner = styled.div`
max-width:1860px;
width:100%;
margin:0 auto;

@media (max-width: 1024px){ padding:0 20px;}
`;
export const SiteFooterTop = styled.div`
display:flex; justify-content:space-between;
align-items:flex-start; padding-bottom:40px;
border-bottom:1px solid #333;
margin-bottom:40px;

@media (max-width:1024px) {
flex-direction:column; gap:30px;
}
`;
export const SiteFooterCs = styled.div`
flex:1;
`;
export const SiteFooterPhone = styled.div`
font-size:32px; font-weight:900; letter-spacing:1px;
margin-bottom:5px;
`;
export const SiteFooterCsTitle = styled.div`
font-size:14px; color:#fff; font-weight:bold;
`;
export const SiteFooterScheduleWrap = styled.div`
flex:2; display:flex; gap:60px;
@media (max-width:768px) {
flex-direction:column; gap:20px;
}
`;
export const SiteFooterScheduleTitle = styled.div`
font-size:14px; font-weight:bold; color:#fff;
margin-bottom:4px;
`;
export const SiteFooterScheduleText = styled.div`
font-size:13px;
font-weight:bold;
color:#999; letter-spacing:-0.5px;
`;
export const SiteFooterScheduleBlock = styled.div`
display:flex;
flex-direction:column;
gap:8px;
`;
export const SiteFooterLocationBtn = styled.button`
flex:0.5; height:48px;
padding:0 30px;
border:1px solid #999;
background:transparent;
color:white; font-size:14px;
font-weight:bold;
cursor:pointer;
transition:all 0.3s;
white-space:nowrap;
border-radius:5px;
&:hover{background-color:rgba(255,255,255,.5); color:#333;}
@media (max-width:1024px){width:100%;}
`;
export const SiteFooterBottom = styled.div`
display:flex; justify-content:space-between;
align-items:flex-end;

@media (max-width:1024px){
flex-direction:column; align-items:flex-start;
gap:40px;
}
`;
export const SiteFooterCompany= styled.div`
display:flex; flex-direction:column;
gap:10px;
`;
export const SiteFooterCompanyName = styled.h2`
font-size:24px; font-weight:900; 
margin:0 0 15px 0;
color:white;
`;
export const SiteFooterInfoText = styled.p`
margin:0;font-size:13px;color:#999; line-height:1.6;
letter-spacing:-0.3px;
`;
export const SiteFooterBottomRight = styled.div`
display:flex;
flex-direction:column;
align-items:flex-end;
gap:20px;

@media (max-width: 1024px){
align-items:flex-start;
width:100%;
}
`;
export const SiteFooterPolicyWrap = styled.div`
display:flex; gap:10px;
`;
export const SiteFooterPolicyBtn = styled.button`
background-color:rgba(255,255,255,.5);
color:white;
border:1px solid #fff;
padding:8px 16px;
font-size:12px;
cursor:pointer;
border-radius:2px;
transition:all .2s;

&:hover{
background-color:#333;
color:#999;
}
`;
export const SiteFooterFamilyTitle = styled.div`
font-size:13px;
font-weight:bold;
color:white;
margin-bottom:60px;
`;
export const SiteFooterFamilyLogos = styled.div`
display:flex;
gap:15px;
align-items:center;
flex-wrap:wrap;
.logo-placeholder{
font-size:11px; color:#999;
border:1px solid #999;
padding:4px 8px;
border-radius:15px;
}
`;
export const FloatingMenuWrapper = styled.div`
position:fixed;
right:30px; bottom:90px;
display:flex;
flex-direction:column;
gap:15px;
z-index:999999;

@media (max-width: 768px){
right:15px; bottom:20px; transform:scale(0.85);
}
`;
export const FloatingMenuItem = styled.div`
display:flex;
flex-direction:column;
align-items:center;
gap:5px;
cusor:pointer;
`;
export const FloatingMenuIcon = 
styled.div<{ $bgColor: string }>`
width:60px;
height:60px;
border-radius:50%;
background-color:${(props) => props.$bgColor};
display:flex;
align-items:center;
justify-content:center;
color:#000;
font-weight:900;
font-size:16px;
box-shadow:0 4px 10px rgba(0,0,0,.3);
transition:transform 0.2s;

&:hover{
transform:translateY(-5px);
}
svg{
width:30px; height:30px; color:#fff;
}
`;
export const FloatingMenuText = styled.span`
background-color: #111;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 10px;
  letter-spacing: -0.5px;
`;