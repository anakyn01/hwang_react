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
