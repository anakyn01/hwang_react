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

export const BlogImgWrap = styled.div`
border:1px solid #ddd;
padding:10px; 
text-align:center;
position:relative;
`;

export const NoneImage = styled.div`
width:100%; height:150px; background-color:#f5f5f5;
display:flex; align-items:center;
justify-content:center; 
margin-bottom:10px;
color:#999;
`;

export const BlogImg = styled.img`
width:100%; height:200px;
object-fit:cover;
`;

export const MapPreview = styled.div`
width:100%; height:400px; background-color:#eaeaea;
display:flex; align-items:center; 
justify-content:center; 
border-radius:5px; 
overflow:hidden;
`;