import styled from 'styled-components';

export const AppWrapper = styled.div`
display:flex;
justify-content:center;
background-color:#333;
min-height:100vh;
width:100%;
`;

export const Container = styled.div`
width:100%;
max-width:480px;
min-height:100vh;
background-color:#fff;
position:relative;
padding-bottom:70px;
box-shadow:0 0 15px rgba(0, 0, 0, 0.1);

@media (max-width:480px) {
width:100%;
box-shadow:none;
}
`;
export const Header = styled.header`
display:flex;
justify-content:space-between;
align-items:center;
padding:16px;
`;
export const Logo = styled.h4`
margin:0;
font-weight:700;
color:#f28c28;
`;
export const Banner = styled.section`
background-color:#e9f7f4;
padding:24px;
text-align:center;
`;
export const BannerTitle = styled.h5`
font-weight:bold;
margin-bottom:8px;
`;
export const BannerSub = styled.p`
font-size:12px;
color:#6c757d;
margin:0;
`;
export const BannerImage = styled.div`
margin-top:16px;
height:120px;
background-color:#d1ece5;
border-radius:10px;
`;

export const QuickMenu = styled.section`
display:grid; 
grid-template-columns:repeat(5, 1fr);
padding:16px;
border-bottom:1px solid #eee;
`;
export const MenuIconWrapper = styled.div`
display:flex; flex-direction:column; align-items:center;
gap:4px;
`;
export const IconCircle = styled.div`
width:50px; height:50px; border-radius:50%;
background-color:#f8f9fa;
display:flex; justify-content:center;
align-items:center;
`;
export const MenuText = styled.div`
font-size:11px;
`;
export const Section = styled.section<{$bgLight?:boolean}>`
padding:16px;
background-color:${(props) => (props.$bgLight ? '#f8f9fa':'#fff')};
margin-top:${(props) => (props.$bgLight ? '8px':'0')};
`;
export const SectionHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:12px;
`;
export const SectionTitle = styled.h6`
font-weight:bold; margin:0;
`;
export const MoreButton = styled.span`
font-size:12px; color:#6c757d; cursor:pointer;
`;
export const HorizontalScroll = styled.div`
display:flex; overflow-x : auto; 
white-space:nowrap; padding-bottom:10px;
margin-bottom:8px; 
gap:12px;
    &::-webkit-scrollbar{
    display:none;
    }
`;
export const RegionCircle = styled.div`
width:60px; height:60px;
border-radius:50%; 
border:1px solid #dee2e6;
display:flex;
justify-content:center;
align-items:center;
flex-shrink:0;
span{
font-size:12px;
}
`;
export const AnimalCard = styled.div`
width:160px;
border-radius:15px;
box-shadow:0 2px 8px rgba(0, 0, 0, 0.08);
flex-shrink:0;
display:flex;
flex-direction:column;
background-color:white;
`;
export const CardImage = styled.img`
width:100%; height:160px; object-fit:cover;
border-radius:15px 15px 0 0;
`;
export const CardBody = styled.div`
padding:12px;
`;
export const CardTitle = styled.p`
font-weight:bold;
font-size:13px;
margin:0 0 4px 0;
overflow:hidden;
text-overflow:ellipsis;
`;
export const CardDesc = styled.p`
font-size:11px;
color:#6c757d;
margin:0;
overflow:hidden;
text-overflow:ellipsis;
`;
export const StatusText = styled.div`
width:100%;
text-align:center;
padding:20px;
font-size:14px;
color:#6c757d;
`;
export const StatBox = styled.div`
display:flex;
justify-content:space-between;
background-color:#fff;
padding:16px;
border-radius:8px;
box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;
export const StatItem = styled.div`
font-size:13px;
`;
export const StatLabel = styled.span<{$color:string}>`
font-weight:bold;
color:${(props) => props.$color};
margin-right:4px;
`;
export const BottomNav = styled.nav`
position:fixed;
bottom:0;
width:100%;
max-width:480px;
display:flex;
justify-content:space-around;
align-items:center;
background-color:#fff;
border-top:1px solid #dee2e6;
padding:8px 0;
z-index:1000;
`;
export const NavItem = styled.div<{$active?:boolean}>`
display:flex;
flex-direction:column;
align-items:center;
color:${(props) => (props.$active ? '#f28c28' : '#6c757d')};
cursor:pointer;
span{
font-size:10px;
margin-top:4px;
}
`;
