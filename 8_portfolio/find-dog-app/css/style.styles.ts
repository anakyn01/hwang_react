import styled, {css} from 'styled-components';




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

export const TopFlexBasic = styled.div`
padding:15px 10px;
display:flex; 
justify-content:space-between;
border-bottom:1px solid #ccc;
margin-bottom:30px;
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
