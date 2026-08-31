import styled from 'styled-components';

export const ShelterHeader = styled.header`
background-color:#fff;
padding:15px 20px;
display:flex;
justify-content:space-between;
align-items:center;
position:sticky;
top:0;
z-index:10;
`;
export const LogoText = styled.h1`
color:#ff8c00;
font-size:1.3rem;
font-weight:900;
margin:0;
letter-spacing:-0.5px;
`;
export const TabContainer = styled.div`
display:flex; padding:0 20px;
border-bottom:1px solid #eee;
background-color:#fff;
`;
export const TabBtn = styled.button<{$active? : boolean}>`
background:none;
border:none;
padding:15px 5px;
margin-right:20px;
font-size:1rem;
font-weight:${({ $active }) => ($active ? '700' : '400')};
color:${({ $active }) => ($active ? '#000' :" #888")};
border-bottom:${({ $active}) => ($active ? '2px solid #000':'2px solid transparent')};
cursor:pointer;
transition:all 0.2s ease;
`;
export const FilterContainer = styled.div`
padding:15px 20px;
display:flex;
gap:10px;
overflow-x:auto;
background-color:#fff;
&::-webkit-scrollbar{
display:none;
}
`;
export const FilterIconBtn = styled.button`
background:#fff;
border:1px solid #ddd;
border-radius:50%;
width:38px;
height:38px;
display:flex;
align-items:center;
justify-content:center;
flex-shrink:0;
cursor:pointer;
`;
export const FilterSelect = styled.select`
padding:0 15px;
height:38px;
border:1px solid #ddd;
border-radius:20px;
background-color:#fff;
font-size:0.9rem;
color:#333;
outline:none;
flex-shrink:0;
cursor:pointer;
`;
export const AlertBanner = styled.div`
background-color:#f8f9fa;
margin:0 20px 20px;
padding:15px;
border-radius:12px;
border:1px solid #eee;
display:flex;
align-items:center;
justify-content:space-between;
`;
export const AlertInfo = styled.div`
display:flex;
align-items:center;
gap:12px;

.icon-circle{
background-color:#e9ecef;
width:38px; height:38px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
}
.text-group{
display:flex; flex-direction:column;
strong{font-size:0.95rem; color:#111;}
span{font-size:0.8rem; color:#888; 
margin-top:3px;
}
}
`;
export const ToggleBtn = styled.button<{ $isOn: boolean}>`
width:48px; height:26px;
border-radius:13px;
border:none;
background-color:${({ $isOn}) =>($isOn ? '#ff8c00':'#ddd')};
position:relative;
cursor:pointer;
transition:background-color 0.3s;
.handle{
width:22px;
height:22px;
background-color:#fff;
border-radius:50%;
position:absolute;
top:2px;
left:${({ $isOn}) => ($isOn ? '24px' : '2px')}
transition:left 0.3s;
box-shadow: 0 2px 4px rgba(0,0,0,.2);
}
`;
export const Divider=styled.div``;
export const RecommendSection = styled.section``;
export const SectionHeader = styled.div``;
export const RecommendScroll = styled.div``;
export const RecommendCard = styled.div``;
export const RecommendImgBox = styled.div``;
export const LocationText = styled.div``;
export const ListSection = styled.section``;
export const AnimalCard = styled.div``;
export const AnimalImgBox = styled.div``;
export const AnimalInfo = styled.div``;
export const BadgeGroup = styled.div``;
export const Badge = styled.span<{ $type?: 'status'|'female' | 'male' | 'unknown' }>`

`;
export const InfoGrid = styled.div``;

