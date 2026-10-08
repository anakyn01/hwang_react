import {css} from 'styled-components';

export const FlexCenter = css`
display:flex;
justify-content:center;
align-items:center;
`;
export const InlineFlex = css`
display:inline-flex;
justify-content:center;
align-items:center;
`;
export const FlexBetween = css`
display:flex;
justify-content:space-between;
align-items:center;
`;
export const FlexColumn = css`
display:flex;
flex-direction:column;
align-items:center;
`;
export const FlexAround = css`
display:flex;
justify-content:space-around;
align-items:center;
`;
export const FlexStart = css`
display:flex;
justify-content:flex-start;
align-items:center;
`;
export const FlexColumnStart = css`
display:flex;
flex-direction:column;
align-items:flex-start;
`;

export const FlexEnd = css`
display:flex;
justify-content:flex-end;
align-items:center;
`;
export const Flex = css`
flex:1;
`;

export const Fixed = css`
position: fixed;
`;
export const Absolute = css`
position:absolute;`;
export const Relative = css`
position:relative;`;

export const BorderNone = css`
border:none;
`;
export const Circle = css`
border-radius:50%;`;

export const MainWhite = css`
background-color: #f1f3f5;
`;
export const Nowrap = css`
white-space:nowrap;
`;
export const Pointer = css`
cursor:pointer;
`;
export const BoxShadow = css`
box-shadow: 0 1px 3px rgba(0,0,0, 0.05);
`;
export const TransitionAll = css`
transition: all 0.2s ease-in-out;`;

export const Ellipsis = css`
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
`;
export const Fw100 = css`
font-weight: 100;
`;
export const Fw400 = css`
font-weight: 400;
`;
export const Fw500 = css`
font-weight: 500;
`;
export const Fw600 = css`
font-weight: 600;
`;
export const Fw700 = css`
font-weight: 700;
`;
export const Fw800 = css`
font-weight: 800;
`;
export const Fw900 = css`
font-weight: 900;
`;

export const W100 = css`
width:100%`;
export const Vw100 = css`
width:100vw`;
export const H100 = css`
height:100%`;
export const Vh100 = css`
height:100vh`;

export const Ohidden = css`
overflow:hidden;`;

export const Grid = css`
display:grid;
`;

export const BgWhite = css`
background-color:#fff;
`;

export const ColorWhite = css`
color:#fff;
`;

export const WebkitBox = css`
display: -webkit-box; //플렉스 박스에 초기버전..
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
`;

export const TextCenter = css`
text-align:center;
`;

export const MainMaxWidth = css`
max-width:480px;
`;

export const Bottom0 = css`
bottom:0; left:0; right:0;
`;
export const Top0 = css`
top:0; left:0; right:0;
`;
export const Mauto = css`
margin:0 auto;
`;