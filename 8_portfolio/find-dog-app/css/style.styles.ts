import styled, {css} from 'styled-components';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';



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
export const ContainerColumn = styled.div`
display:flex;
flex-direction:column;
height:100vh;
background-color:white;
width:100%;
max-width:480px;
`;


export const Header = styled.header`

position:fixed;
z-index:99999;
//화면 정중앙 배치공식 (내가 최대치에 크기를 정했을때)
left:50%; 
transform: translateX(-50%);
width:100%;
box-sizing:border-box;
padding:16px 20px;

top:0;
display:flex;
justify-content:space-between;
align-items:center;

background-color:#fff;

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

export const TopFlexBasic = styled.div`
position:fixed;
z-index:10000;
top:0;

padding:15px 10px;
display:flex; 
justify-content:space-between;
border-bottom:1px solid #ccc;
margin-bottom:30px;

left:50%; 
transform: translateX(-50%);
width:100%;
box-sizing:border-box;



display:flex;
justify-content:space-between;
align-items:center;

background-color:#fff;

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
//플렉스 칸을 중심으로
export const Column = styled.div`
display:flex; 
flex-direction:column;
gap:15px;
padding:60px 20px 0px 20px;//상우하좌
`;
export const BasicLayout = styled.div`
width:100%;
padding:15px 10px;
`;
export const AlignItemsCenter = styled.div`
display:flex; 
gap:10px;
align-items:center;
margin-bottom:15px;
`;


export const MemberInfo = styled.div`
width:100%;
margin-top:30px;
`;
export const ModalBg= styled.div`
position:fixed;
top:0; left:0; right:0; bottom:0;
background-color:rgba(0,0,0,.6);
z-index:999;
display:flex;
justify-content:center;
align-items:flex-start;
padding:10vh;
`;

export const Modal = styled.div`
background-color:white;
border:1px solid #ccc; padding:10px;
margin-top:10px; border-radius:8px;
`;


export const Back = styled.span`
cursor:pointer;
color:#999;
transition:all .5s;

&:hover{
color:#333;
}
`;

//title
export const H5Bold = styled.h5`
font-weight:600;
letter-spacing:-0.03rem;
color:#333;
`;
export const H3Title = styled.h3`
font-weight:700;
letter-spacing:-0.03rem;
color:#333;
`;
export const H3Size16 = styled.h3`
font-size:16px; font-weight:bold;
margin-bottom:15px;
`;

export const H2Size20 = styled.h2`
font-size:20px; font-weight:500; 
margin-bottom:25px;
color:#000;
`;
export const NewsTitle = styled.p`
margin-top:6px; font-size:.8rem;
text-align:center;
white-space:no-wrap; 
overflow:hidden;
`;

export const PhotoUploadBottomText = styled.span`
font-size:12px; 
font-weight:400;
letter-spacing:-0.03rem;
color:#333;
`;

export const None = styled.div`
width:40px;
height:auto;
`;

export const TextCenter = styled.div`
text-align:center;
margin-top:30px;
`;

//버튼
//추가
type ButtonVariant = 'kakao' | 'local' | 'primary';
//컴포넌트가 받을 Props 정의
interface BtnProps {
$variant: ButtonVariant;
$mainColor?: string;
$width?:string;
}
// 3. Variant별 스타일 객체 매핑
const variantStyles = {
kakao:css`
background-color: #fee500;
color: #000;
border: 0px solid #fee500;
`,
local:css`
background-color: #fff;
color: #333;
border: 1px solid #ccc;
`,
primary:css<BtnProps>`
background-color: ${({ $mainColor}) => $mainColor || '#28a745'};
color:#fff;
border:1px solid ${({ $mainColor }) => $mainColor || '#28a745'}
`
};

export const BaseBtn = styled.button<BtnProps>`
/* 💡 2. 전달받은 $width가 있으면 그 값을 쓰고, 
안 넘겨주면 기본값 100%를 적용합니다. */
width:${({ $width}) => $width || '100%'};
box-sizing:border-box;
padding:15px;
border-radius:8px;
font-weight:bold;
display:flex;
justify-content:center;
align-items:center;
gap:10px;
cursor:pointer;
opacity:.9;
transition:all .3s;
    &:hover{
    opacity:1;
    }
${({ $variant }) => variantStyles[$variant]}
`;

export const LogOutBtn = styled.span`
font-size:14px; color:#888;
cursor:pointer; text-decoration:underline;
`;


export const BtnBottomWrap = styled.div`
position:fixed;
bottom:3%;
left:50%;
transform:translateX(-50%);

/* 💡 뼈대가 되는 기본 넓이와 양옆 여백 */
  width: 100%;
  padding: 0 20px; 
  box-sizing: border-box;

  /* 💡 PC 화면 기준 최대 크기 */
  max-width: 480px; 

  /* 💡 1. 480px 이하 기기 */
  @media (max-width: 480px) {
    max-width: 480px;
  }
  
  /* 💡 2. 440px 이하 기기 */
  @media (max-width: 440px) {
    max-width: 440px;
  }

  /* 💡 3. 430px 이하 기기 (아이폰 Pro Max 급) */
  @media (max-width: 430px) {
    max-width: 430px;
  }

  /* 💡 4. 390px 이하 기기 (아이폰 일반 급) */
  @media (max-width: 390px) {
    max-width: 390px;
  }

  /* 💡 5. 280px 이하 기기 (초소형 화면, 갤럭시 폴드 커버화면 등) */
  @media (max-width: 280px) {
    max-width: 280px;
  }
`;
export const Exit = styled.div`
text-align:right;
cursor:pointer;
font-weight:bold;
margin-bottom:10px; 
color:#666;
`;
/*
width:460px;
position:fixed;
bottom:3%;
*/

//photo
export const PhotoUpload = styled.div`
width:100px;
height:100px;
background-color:#eee;
border-radius:10px;
margin:0 auto;
display:flex;
align-items:center;
justify-content:center;
`;
// 레이아웃
export const LoginLayout = styled.div`
padding:10px 20px 30px 20px;
`;
export const LayOutSpaceBetween = styled.div`
display:flex; justify-content:space-between;
align-items:center; gap:10px;
`;
export const List = styled.div`
padding:0 20px 20px 20px;
`;
export const Line = styled.div`
width:100%;
height:12px;
background-color:#f5f5f5;
`;

// 레이아웃 끝


//패딩
export const LayOutPadding = styled.div`
padding:0px 20px;
`;

//input
export const FormControl = styled.input`
width:100%;
padding:10px;
border:1px solid #ccc;
border-radius:5px;
`;
export const LabelGroup = styled.div`
display:flex; gap:20px; width:100%;
justify-content:center; margin-bottom:15px;
`;

export const Label = styled.label`
display:flex; gap:5px; cursor:pointer; 
`;

export const UpAndDown = styled.span`
cursor:pointer; font-size:12px; 
color:#888;
`;
export const Terms = styled.div`
max-height: showTerms ? '150px' : '0';
overflow:hidden;
transition:max-height 0.3s ease-in-out;
background-color:#f9f9f9;
border-radius:4px;
`;
export const Privacy = styled.div`
max-height: showPrivacy ? '150px' : '0';
overflow:hidden;
transition:max-height 0.3s ease-in-out;
background-color:#f9f9f9;
border-radius:4px;
`;

export const TermsInner = styled.div`
margin:10px 0px;
padding:10px;
font-size:12px;
color:#666;
`;

export const Mt70 = styled.div`
margin-top:70px;
`;

//마이페이지 전용 스타일
export const ListItemWrapper = styled.div`
display:flex; justify-content:space-between;
align-items:center;
padding:16px 0;
cursor:pointer;
`;
export const ListItemLeft = styled.div`
display:flex; align-items:center;
gap:15px;
`;
export const ListItemText = styled.span`
font-size:15px; color:#111;
`;
export const MenuCardBox = styled.div`
flex:1; 
display:flex; 
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#fff7ed;
padding:20px 0;
border-radius:12px;
cursor:pointer;
`;
export const MenuCardText = styled.span`
font-size:14px;
font-weight:500;
color:#333;
margin-top:8px;
`;

//입양 캠페인 전용 스타일
export const HashtagScroll = styled.div`
display:flex;
gap:8px;
overflow-x:auto;
padding-bottom:12px;
margin-bottom:10px;
&::-webkit-scrollbar{
display:none;
}
`;
export const HashtagBtn = styled.button<{$active?:boolean}>`
background:${({$active}) => ($active ? '#f6931d' : '#eaecee')};
color:${({ $active}) => ($active ? '#fff' : '#555')};
border:none;
border-radius:20px;
padding:6px 14px;
font-weight:700;
white-space:nowrap;
cursor:pointer;
transition: all .2s ease-in-out;
/*
애니메이션이 트랜지션
Ease In (이즈 인 - 가속) 느리게 시작해서 점점 빨라지는 효과 퇴장용으로 적합
Ease Out (이즈 아웃 - 감속) 빠르게 시작해서 목적지에 가까워질수록 부드럽게 느려지는 효과
등장용으로 적합

느리게 시작해 중간에 가장 빨라졌다가 끝날 때 부드럽게 멈추는 형태
*/
`;

export const CampaignCard  = styled.div`
min-width:150px; max-width:150px;
display:flex;
flex-direction:column;
gap:8px;
`;

export const CampaignMediaWrap = styled.div`
position:relative;
width:100%;
aspect-ratio:1 / 1;
border-radius:12px;
overflow:hidden;
background-color:#f0f0f0;
`;

export const CampaignImg = styled.img`
width:100%; height:100%;
object-fit:cover;
`;

export const PlayIconWrap = styled.div`
position:absolute;
bottom:8px; left:8px;
background:rgba(0,0,0, .6);
border-radius:50%;
align-items:center;
justify-content:center;
width:26px;
height:26px;
color:white;
`;

export const CampaignTextWrap = styled.div`
display:flex;
flex-direction:column;
gap:2px;
`;

export const CampaignCardTitle = styled.div`
font-size:15px; font-weight:bold;
color:#111;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis; 
`;

export const CampaignCardDesc = styled.div`
font-size:13px; color:#888;
white-space:nowrap;
overflow:hidden;
etxt-overflow:ellipsis;
`;

//Thumb
export const Thumb = styled.div`
position:relative;
border-radius:8px;
overflow:hidden;
aspect-ratio:16/9;
`;
export const VideoThumb = styled.img`
width:100%; height:100%;
object-fit:cover;
`;

//icon
export const YoutubePlayIcon = styled(PlayArrowIcon)`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%. -50%);
color:white;
font-size:2.5rem;
opacity:0.9;
`;

//motion
