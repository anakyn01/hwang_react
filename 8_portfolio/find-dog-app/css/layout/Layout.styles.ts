import styled from 'styled-components';
import { Relative, TransitionAll,Pointer, BgWhite, Circle, Absolute, BoxShadow, FlexBetween, Flex, Fw500, Grid, FlexCenter ,
H100, Vw100, TextCenter, 
Vh100,
W100,
Fixed,
Ohidden,
Ellipsis,
ColorWhite,
Fw700,
Nowrap,
FlexStart,
WebkitBox,
BorderNone,
Fw600,
MainMaxWidth,
Mauto,
FlexAround,
FlexColumn
} from '../common/Common.styles';

export const AppWrapper = styled.div`
${FlexCenter}
background-color:#333;
${Vh100}
${W100}
`;



export const Container = styled.div`
${W100}
max-width:480px;
min-height:100vh;
background-color:#fff;
${Relative}
padding-bottom:70px;
${BoxShadow}

@media (max-width:480px) {
width:100%;
box-shadow:none;
}
`;

export const Header = styled.header`

${Fixed}
z-index:99999;
//화면 정중앙 배치공식 (내가 최대치에 크기를 정했을때)
left:50%; 
transform: translateX(-50%);
${W100}
box-sizing:border-box;
padding:16px 20px;

top:0;
${FlexBetween}

${BgWhite}

max-width:480px;

@media (max-width: 480px) {
  max-width: 480px;
}
@media (max-width: 440px) {
  max-width: 440px;
}
@media (max-width: 430px) {
  max-width: 430px;
}
@media (max-width: 390px) {
  max-width: 390px;
}
@media (max-width: 280px) {
  max-width: 280px;
}
`;
export const Logo = styled.h4`
margin:0;
${Fw500}
color:#f28c28;
`;

export const CardImage = styled.img`
${W100}
height:160px; 
object-fit:cover;
border-radius:15px 15px 0 0;
`;
export const CardBody = styled.div`
padding:12px;
`;
export const CardTitle = styled.p`
font-weight:bold;
font-size:13px;
margin:0 0 4px 0;
${Ohidden}
${Ellipsis}
`;
export const CardDesc = styled.p`
font-size:11px;
color:#6c757d;
margin:0;
${Ohidden}
${Ellipsis}
`;

export const CardGrid = styled.div`
${Grid}
grid-template-columns:1fr 1fr;
gap:12px;
padding:0 16px;
`;

interface ToggleProps{active:boolean;}
export const ToggleSwitch = styled.div<ToggleProps>`
width:2.75rem;
height:1.5rem;
background-color:${props => (props.active ? '#ff6b00':'#e4e5e7')};
border-radius:0.75rem;
${Relative}
${Pointer}
${TransitionAll}
`;

export const ToggleThumb = styled.div<ToggleProps>`
width:1.25rem;
height:1.25rem;
${BgWhite}
${Circle}
${Absolute}
top:0.125rem;
left:${props => (props.active ? '1.375rem':'0.125rem')};
${TransitionAll}
${BoxShadow}
`;

export const GuideBox = styled.div`
${FlexBetween}
${BgWhite}
${Pointer}
padding:0.75rem 1rem;
border-radius:10px;
margin:0 1rem 1rem 1rem;
`
;
export const GuideText = styled.span`
${Flex}
font-size:0.875rem;
color:#444;
margin-left:0.5rem;
${Fw500}
`;

export const InfoRow = styled.div`
${FlexCenter}
gap:0.375rem;
margin-bottom:0.25rem;
`;

interface StatusProps{ status:string;}

export const StatusBadge = styled.span<StatusProps>`
background-color:${(props) => (props.status === '실종'? '#ff4d4f' :'#52c41a')}
${ColorWhite}
${Fw700}
padding:0.125rem 0.375rem;
border-radius:0.25rem;
`;

export const MetaInfo = styled.div`
font-size:0.6875rem;
color:#666;
margin-bottom:0.5rem;
${Nowrap}
${Ohidden}
${Ellipsis}
`;

export const LocationRow = styled.div`
${FlexStart}
gap:0.25rem;
margin-bottom:0.25rem;
`;
export const LocationText = styled.span`
font-size:0.6875rem;
color:#555;
line-height:1.2;
${WebkitBox}
${Ohidden}
`;
export const DateRow = styled.div`
${FlexCenter}
gap:0.25rem;
margin-top:0.375rem;
`;

export const DateText = styled.span`
font-size:0.625rem;
color:#999;
`;

export const LoadingText = styled.div`
${TextCenter}
grid-column:span 2;
padding: 2.5rem;
color:#888;
font-size:0.8rem;
`;

export const FloatingWriteButton = styled.button`
${Fixed}
bottom:5rem;
right:1.25rem;
background-color:#52c41a;
${ColorWhite}
${BorderNone}
border-radius:1.875rem;
padding:0.6rem 1.2rem;
${FlexCenter}
gap:0.375rem;
font-size:.875rem;
${Fw600}
${BoxShadow}
${Pointer}
z-index:10;
`;

export const BottomNav = styled.nav`
${Fixed}
${MainMaxWidth}
${Mauto}
height:3.75rem;
${BgWhite}
border-top:1px solid #eee;
${FlexAround}
z-index:100;
`;

interface NavItemProps{active?:boolean}
export const NavItem = styled.div<NavItemProps>`
${FlexColumn}
gap:0.125rem;
${Pointer}

span{
font-size:0.75rem;
color:${props => (props.active ? '#ff7a00':'#888')};
font-weight:${props =>(props.active ? '700':'400')};
}
`;