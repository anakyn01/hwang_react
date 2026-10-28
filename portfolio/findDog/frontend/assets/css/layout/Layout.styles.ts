import styled, {css} from 'styled-components';
import { 
  Relative, BgWhite, BoxShadow, 
  FlexBetween, FlexCenter, W100, Fixed, 
  Ohidden, FlexStart,
  FlexColumn, 
  Grid
} from '../common/Common.styles';



// style.styles.ts 파일 수정

export const AppWrapper = styled.div`
${FlexStart};
  background-color: #333;
  min-height: 100vh;
  ${W100};
 ${Relative};
${Ohidden};
`;

export const Container = styled.div`
${W100};
  max-width: 480px;
  min-height: 100vh;
  background-color: #fff;
${Relative};
  padding-bottom: 70px;
${BoxShadow};
  margin: 0 auto; /* 💡 박스를 항상 정중앙에 위치시킴 */
`;

//플렉스 칸을 중심으로
export const Column = styled.div`
${FlexColumn};
gap:15px;
padding:60px 20px 0px 20px;//상우하좌
`;
export const BasicLayout = styled.div`
width:100%;
padding:15px 10px;
`;
export const AlignItemsCenter = styled.div`
${FlexCenter};
gap:10px;
margin-bottom:15px;
`;

export const TopFlexBasic = styled.div`
${Fixed};
z-index:10000;
top:0;

padding:15px 10px;
${FlexBetween};
border-bottom:1px solid #ccc;
margin-bottom:30px;
left:50%; 
transform: translateX(-50%);
${W100};
box-sizing:border-box;
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

export const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  background-color: #eee;
  ${Ohidden};
`;

export const ContainerColumn = styled.div`
${FlexColumn};
height:100vh;
${BgWhite};
${W100};
max-width:480px;
`;

//패딩
export const LayOutPadding = styled.div`
padding:0px 20px;
`;

export const LoginLayout = styled.div`
padding:10px 20px 30px 20px;
`;
export const LayOutSpaceBetween = styled.div`
${FlexBetween};
gap:10px;
`;

export const Line = styled.div`
width:100%;
height:12px;
background-color:#f5f5f5;
`;

//마이페이지 전용 스타일
export const ListItemWrapper = styled.div`
${FlexBetween};
padding:16px 0;
cursor:pointer;
`;
export const ListItemLeft = styled.div`
${FlexCenter};
gap:15px;
`;
export const ListItemText = styled.span`
font-size:15px; color:#111;
`;
export const Mt70 = styled.div`
margin-top:70px;
`;

export const TabContainer = styled.div`
  display: flex; 
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
`;

//관리자
export const PageWrapper = styled.div`
padding: 20px;
`;

export const GridWrap = styled.div`
${Grid};
grid-template-columns:repeat(4, 1fr);
gap:20px;
`;
export const GridWrap3 = styled.div`
${Grid};
grid-template-columns:repeat(3, 1fr);
gap:30px;
`;

//layout
export const SpaceBetween = styled.div`
display:flex; justify-content:space-between;
align-items:center;  margin-bottom:15px;
`;

export const MenuRow = styled.div`
${FlexCenter};
gap:10px; 
margin-bottom:10px; 
`;

//다음 우편번호 컴포넌트를 감싸는 박스
export const PostcodeWrapper = styled.div`
width:400px; max-width:90%; background:white;
padding:20px; border-radius:8px; 
box-shadow:0 4px 12px rgba(0,0,0, .2);

/*닫기 버튼을 감싸는 영역*/
.close-btn-wrap{
text-align:right;
margin-bottom:10px;
}
`;

export const PageHeader = styled.div`
display:flex; align-items:center;
justify-content:space-between;
margin-bottom:1.5rem;
h1{
font-size:1.75rem;
font-weight:400;
color:#5a5c69;
margin:0;
}
`;

export const GridRow = styled.div`
display:flex; flex-wrap:wrap;
margin-right:-0.75rem; margin-left:-0.75rem;
`;

