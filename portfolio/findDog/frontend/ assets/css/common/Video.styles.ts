import styled, {css} from 'styled-components';
import { Ohidden, Relative,  W100, H100 } from './Common.styles';

//Thumb
export const Thumb = styled.div`
${Relative};
border-radius:8px;
${Relative};
aspect-ratio:16/9;
`;
export const VideoThumb = styled.img`
${W100};
${H100};
object-fit:cover;
`;

export const CampaignMediaWrap = styled.div`
${Relative};
${W100};
aspect-ratio:1 / 1;
border-radius:12px;
${Ohidden};
background-color:#f0f0f0;
`;