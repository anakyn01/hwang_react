import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import styled, {css} from 'styled-components';
import { Absolute, FlexCenter, FlexColumn } from './Common.styles';

export const MenuIconWrapper = styled.div`
${FlexColumn};
gap:4px;
`;

export const PlayIconWrap = styled.div`
${Absolute};
bottom:8px; left:8px;
background:rgba(0,0,0, .6);
border-radius:50%;
${FlexCenter};
width:26px;
height:26px;
color:white;
`;

//icon
export const YoutubePlayIcon = styled(PlayArrowIcon)`
${Absolute};
top:50%;
left:50%;
transform:translate(-50%. -50%);
color:white;
font-size:2.5rem;
opacity:0.9;
`;

export const IconCircle = styled.div`
width:50px; height:50px; border-radius:50%;
background-color:#f8f9fa;
${FlexCenter};
`;

export const RegionCircle = styled.div`
width:60px; 
height:60px;
border-radius:50%; 
border:1px solid #dee2e6;
${FlexCenter};
flex-shrink:0;
span{
font-size:12px;
}
`;