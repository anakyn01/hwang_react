import styled, {css} from 'styled-components';
import { BgWhite, Ohidden, BoxShadow, W100, Ellipsis,Grid, Fw900, FlexColumn, Nowrap } from './Common.styles';

export const Card = styled.div`
  ${BgWhite}
  border-radius: 0.75rem;
  ${Ohidden}${BoxShadow}
`;

export const CardImage = styled.img`
  ${W100}
  height: 160px; 
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;

export const CardBody = styled.div`
  padding: 12px;
`;

export const CardTitle = styled.p`
  ${Fw900};
  font-size: 13px;
  margin: 0 0 4px 0;
  ${Ohidden}${Ellipsis}
`;

export const CardDesc = styled.p`
  font-size: 11px;
  color: #6c757d;
  margin: 0;
  ${Ohidden}${Ellipsis}
`;

export const CardGrid = styled.div`
  ${Grid}
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 16px;
`;

export const CampaignCard  = styled.div`
min-width:150px; 
max-width:150px;
${FlexColumn};
gap:8px;
`;

export const CampaignCardDesc = styled.div`
font-size:13px; color:#888;
${Nowrap};
${Ohidden};
etxt-overflow:ellipsis;
`;

export const CampaignCardTitle = styled.div`
font-size:15px; 
font-weight:bold;
color:#111;
${Nowrap};
${Ohidden};
text-overflow:ellipsis; 
`;

export const MenuCardText = styled.span`
font-size:14px;
font-weight:500;
color:#333;
margin-top:8px;
`;

export const MenuCardBox = styled.div`
flex:1; 
${FlexColumn};
align-items:center;
background-color:#fff7ed;
padding:20px 0;
border-radius:12px;
cursor:pointer;
`;

// 💡 2. 개별 카드: 좌우(row) 배치로 설정하여 사진과 텍스트를 나란히 둠
export const AnimalCard = styled.div`
display: flex !important;
  flex-direction: row !important; /* 💡 세로 배치를 강제로 가로(row) 배치로 변경 */
  align-items: flex-start !important;
  gap: 14px !important;
  width: 100% !important;        /* 💡 160px 고정 너비를 강제로 풀고 꽉 채움 */
  max-width: 100% !important;
  min-width: 0 !important;
  flex-shrink: 1 !important;     /* 💡 0으로 고정된 것을 풀어줌 */
  background-color: #fff !important;
  border-radius: 12px !important;
  padding: 14px !important;
  box-sizing: border-box !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06) !important;
`;

export const RecommendCard = styled.div`
  width: 140px;
  flex-shrink: 0;
`;

export const CardHeader = styled.div`
padding:0.75rem 1.25rem;
margin-bottom:0; 
background-color:#f8f9fc;
border-bottom:1px solid #e3e6f0;
h6{
margin:0; font-weight:bold;
color:#4e73df;
}
`;

export const StatCard = styled.div<{$borderColor?:string}>`
position:relative;
display:flex;
flex-direction:column;
min-width:0;
word-wrap:break-word;
background-color:#fff;
background-clip:border-box;
border:1px solid #e3e6f0;
border-radius:0.35rem;
border-left:
0.25rem solid ${(props) => props.$borderColor || '#e3e6f0'};
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
height:100%;
padding:0.5rem 0;
`;


export const CardColumn = styled.div`
flex: 0 0 25%;
/*
flex-grow: 0; 여유 공간이 있어도 커지지 않음
flex-shrink: 0; 공간이 부족해도 줄어들지 않음
flex-basis: 25%; 기본 너비는 부모의  25%
*/
max-width:25%;
padding-right:0.75rem;
padding-left:0.75rem;
margin-bottom:1.5rem;

@media (max-width: 1200px) {flex:0 0 50%; max-width:50%;}
@media (max-width: 768px) {flex:0 0 100%; max-width:100%;}
`;


