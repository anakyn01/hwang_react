import styled, {css} from 'styled-components';
import { FlexBetween, FlexColumn, TextCenter, W100 } from './Common.styles';


export const Section = styled.section<{$bgLight?:boolean}>`
padding:16px;
background-color:${(props) => (props.$bgLight ? '#f8f9fa':'#fff')};
margin-top:${(props) => (props.$bgLight ? '8px':'0')};
`;


export const SectionTitle=styled.h3`
font-size:1.2rem; color:#4e73df;
margin-bottom:15px; border-bottom:1px solid #eee;
padding-bottom:10px;
`;

export const RecommendSection = styled.section`
  background-color: #fff;
  padding: 25px 0 25px 20px;
`;

// 💡 1. 목록 전체 영역: 세로 방향으로 1개씩 쌓이도록 변경
export const ListSection = styled.section`
  ${FlexColumn};
  ${W100};
  background-color: #f4f5f7;
  gap: 8px;
  padding: 12px;
  box-sizing: border-box;
`;