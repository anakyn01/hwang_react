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
export const Divider=styled.div`
height:8px; background-color:#f4f5f7;
width:100%;
`;
export const RecommendSection = styled.section`
background-color:#fff;
padding:25px 0 25px 20px;
`;
export const SectionHeader = styled.div`
display:flex; justify-content:space-between;
align-items:center;
padding-right:20px;
margin-bottom:15px;
.more-link{
display:flex;
align-items:center;
font-size:0.85rem;
color:#888;
text-decoration:none;
}
`;
export const RecommendScroll = styled.div`
display:flex;
gap:15px;
overflow-x:auto;
padding-right:20px;
&::-webkit-scrollbar{display:none;}
`;
export const RecommendCard = styled.div`
width:140px;
flex-shrink:0;
`;
export const RecommendImgBox = styled.div`
width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-color: #eee;
  img { width: 100%; height: 100%; 
  object-fit: cover; }
  .play-icon {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: rgba(255,255,255,0.9);
  }
`;
export const LocationText = styled.div`
font-size:.85rem;
color:#111;
margin-top:10px;
font-weight:600;
display:flex;
align-items:center;
gap:2px;
`;
export const ListSection = styled.section`
padding:20px;
display:flex;
flex-direction:column;
gap:15px;
background-color:#f4f5f7;
`;
export const AnimalCard = styled.div`
padding:20px;
display:flex;
flex-direction:column;5
gap:15px;
`;
export const AnimalImgBox = styled.div`
width:110px;
height:110px;
border-radius:8px;
overflow:hidden;
background-color:#eee;
flex-shrink:0;
img{width:100%; height:100%; object-fit:cover;}
`;
export const AnimalInfo = styled.div`
display:flex;
flex-direction:column;
width:100%;
`;
export const BadgeGroup = styled.div`
display:flex;
gap:6px;
margin-bottom:10px;
`;
export const Badge = styled.span<{ $type?: 'status'|'female' | 'male' | 'unknown' }>`
font-size:0.75rem;
padding:3px 8px;
border-radius:4px;
border:1px solid;
${({ $type}) => {
    switch($type){
case 'status':return 'color:#555; border-color:#ccc;';
case 'female':return 'color:#ff6b6b; border-color:#ff6b6b;';  
case 'male':return 'color:#4a90e2; border-color:#4a90e2;';  
case 'unknown':return 'color:#555; border-color:#ccc;';  
default:return 'color: #555; boder-color:#ccc;';        
    }
}}
`;
export const InfoGrid = styled.div`
display:grid;
grid-template-columns:60px 1fr;
row-gap:60px;
font-size:0.85rem;
.label{color:#888;}
.value{
color:#111;
font-weight:500;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
}
`;

