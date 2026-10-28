import styled, {css} from 'styled-components';
import { BgWhite, Fixed, FlexStart } from './Common.styles';

export const ModalBg= styled.div`
${Fixed};
top:0; left:0; right:0; bottom:0;
background-color:rgba(0,0,0,.6);
z-index:999;
${FlexStart};
padding:10vh;
`;

export const Modal = styled.div`
${BgWhite};
border:1px solid #ccc; padding:10px;
margin-top:10px; border-radius:8px;
`;
