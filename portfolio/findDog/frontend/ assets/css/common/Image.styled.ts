import styled, {css} from 'styled-components';
import { Absolute, FlexCenter, Ohidden, Relative, W100, H100 } from './Common.styles';

export const RecommendImgBox = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 12px;
  ${Ohidden};
  ${Relative};
  background-color: #eee;
  img { 
  ${W100} height: 100%; object-fit: cover; }
  .play-icon {
    ${Absolute};
    bottom: 8px;
    left: 8px;
    color: rgba(255,255,255,0.9);
  }
`;

// 💡 3. 이미지 박스 크기 고정 (좌측 배치)
export const AnimalImgBox = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 10px;
  ${Ohidden};
  background-color: #eee;
  flex-shrink: 0;
  img { 
    ${W100};
    ${H100};
    object-fit: cover; 
  }
`;