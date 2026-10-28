import styled, {css} from 'styled-components';
import { FlexCenter, Nowrap, Ohidden, Ellipsis, W100, FlexColumn, Grid } from './Common.styles';

export const InfoRow = styled.div`
  ${FlexCenter}
  gap: 0.375rem;
  margin-bottom: 0.25rem;
`;



export const MetaInfo = styled.div`
  font-size: 0.6875rem;
  color: #666;
  margin-bottom: 0.5rem;
  ${Nowrap}
  ${Ohidden}${Ellipsis}
`;

export const MemberInfo = styled.div`
${W100}
margin-top:30px;
`;

// 💡 4. 우측 정보 영역
export const AnimalInfo = styled.div`
${FlexColumn};
  flex: 1;
  min-width: 0;
`;

// 💡 5. 텍스트 그리드 정렬 (라벨과 값이 가로로 깔끔하게 떨어지도록 설정)
export const InfoGrid = styled.div`
  ${Grid};
  grid-template-columns: 60px 1fr;
  gap: 3px 6px;
  font-size: 0.8rem;
  .label { 
    color: #888; 
  }
  .value {
    color: #111;
    font-weight: 500;
${Ohidden};
${Ellipsis};
${Nowrap};
  }
`;

