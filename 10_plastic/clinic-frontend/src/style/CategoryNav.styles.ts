import styled from 'styled-components';

export const NavContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:30px;
padding-bottom:15px;
margin-top:40px;

border-bottom:2px solid #ffd1df;
width:100%;

@media (max-width: 768px) {
justify-content:flex-start;
overflow-x:auto;
padding-left:20px;
padding-right:20px;

&::-webkit-scrollbar{
display:none;
}
}

`;
export const CategoryItem = 
styled.div<{$active:boolean}>`
display:flex;
flex-direction:column;
align-items:center;
cursor:pointer;
position:relative;
min-width:70px;

//선택된 상태일때 하단에서 올라오는 핑크색 삼각형 생성
${({ $active}) => $active &&`
&::after{
content:'';
position:absolute;
bottom:-17px;
left:50%;
transform:translateX(-50%);
border-width:0 10px 10px 10px;
border-style:solid;
border-color:transparent transparent #ffd1df transparent;
}
`}
`;
export const ImageBox = styled.div<{$active:boolean}>`
width:76px; height:76px;
border-radius:50%;
position:relative;
overflow:hidden;
margin-bottom:10px;

border:${({ $active }) => ($active ? '4px solid #ffdidf' : '4px solid transparent')};
box-sizing:border-box;
transition:all .2s ease-in-out;

img{
width:100%; 
height:100%; 
object-fit:cover;
}
`;
export const ActiveOverlay = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background-color:rgba(255, 209, 223, 0.4);
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
`;
export const CategoryText=
styled.span<{$active:boolean}>`
font-size:15px;
color:${({ $active }) => ($active ? '#111' : '#666')};
font-weight:${({ $active }) => ($active ? '700' : '400')};
transition: all 0.2s ease-in-out;
`;
