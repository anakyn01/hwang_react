import styled from 'styled-components';

export const CarouselSection = styled.section`
margin-top:99px;
position:relative;
width:100%;
max-width:2440px;
margin:0 auto;
overflow:hidden;
`;
export const EmblaViewport = styled.div`
width:100%;
overflow:hidden;
`;
export const EmblaContainer = styled.div`
display:flex;
flex-direction:row;
width:100%;
`;
export const EmblaSlide = styled.div`
flex: 0 0 100%; /*flex-grow, flex-shrink  부모너비의 100%*/
min-width:0;
width:100%;
position:relative;
`;
export const SlideImage = styled.img`
width:100%;
height:600px;
object-fit:cover;
display:block;

@media (max-width: 768px) {
height:400px;
}
`;

export const FormOverlay = styled.div``;
export const FormTitle = styled.h3``;
export const InputGroup = styled.div``;
export const Input = styled.input``;
export const SubmitBtn = styled.button``;
export const PrivacyWrapper = styled.div``;

export const NavButton = styled.button<{ $direction: 'left' | 'right'}>`
position:absolute;
top:50%;
transform: translateY(-50%);
${(props) => (props.$direction === 'left' ? 'left:20px;' : 'right:20px;')}
width:50px;
height:50px;
border-radius:50%;
background-color:rgba(255, 255, 255, .3);
color:#fff;
border:none;
font-size:24px;
cursor:pointer;
z-index:20;
display:flex;
align-items:center;
justify-content:center;
transition:background-color .2s;

&:hover{
background-color:rgba(255, 255, 255, .7);
color:#000;
}

@media (max-width:768px) {
width:40px; height:40px;
font-size:18px;
${(props) => (props.$direction === 'left' ?'left:10px' : 'right:10px')}
}
`;



