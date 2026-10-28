import styled, {css} from 'styled-components';
import { Nowrap, TextCenter } from './Common.styles';

export const HorizontalScroll = styled.div`
display:flex; 
overflow-x : auto; 
${Nowrap};
padding-bottom:10px;
margin-bottom:8px; 
gap:12px;
    &::-webkit-scrollbar{
    display:none;
    }
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

export const RecommendScroll = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-right: 20px;
  &::-webkit-scrollbar { display: none; }
`;