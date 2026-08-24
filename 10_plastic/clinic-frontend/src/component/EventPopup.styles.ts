import styled from 'styled-components';

export const PopupContainer = styled.div<{ $top:number; $left:number}>`
position:fixed;
top:${(props) => props.$top}px;
left:${(props) => props.$left}px;
width:380px;
background-color:rgba(0,0,0,.8);
box-shadow:0 10px 30px rgba(0, 0, 0, .5);
z-index:1000;
display:flex;
flex-direction:column;
`;
export const ImageWrapper = styled.div`
width:100%;
position:relative;

img{
width:100%; height:auto; display:block;
}
`;
export const FormWrapper = styled.div`
background-color:#000;
padding:15px 15px 20px 15px;

`;
export const InputGroup = styled.div`
display:flex; 
gap:5px; 
margin-bottom:12px;
width:100%; //부모너비에 딱 맟추기
`;
export const Input = styled.input`
flex:1; 
min-width:0;
//인풋에 고집을 꺽고 부모크기에 맞춰 줄어들수 있도록 강제 허용
height:36px; padding:0 8px;
font-size:13px;
border:1px solid #ccc;
outline:none;
background-color:#fff;

&::placeholder{color:#999;}
&:focus{border-color:#000;}
`;
export const SubmitBtn = styled.button`
flex-shrink:0;
//버튼이 다른 애들이 밀어도 절대 크기가 줄어들거나 찌그려 트리지 않게
width:80px;
height:36px;
background-color:#fff176;
color:#000;
font-weight:bold;
font-size:13px;
border:none;
cursor:pointer;
transition:background-color .2s;
&:hover{
background-color:#fce83a;
}
`;
export const PrivacyLabel = styled.label`
display:flex;
align-items:center;
gap:6px;
cursor:pointer;
`;
export const PrivacyCheckbox = styled.input`
appearance:none;
width:14px;
height:14px;
background-color:#fff;
border:1px solid #ddd;
cursor:pointer;
position:relative;
&:checked::after{
content:'✔';
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
color:#000;
font-size:10px;
}
`;
export const PrivacyText = styled.span`
color:#fff;
font-size:11px;
letter-spacing:-0.5px;
span{
color:#aaa;
text-decoration:underline;
margin-left:4px;
cursor:pointer;
}
`;
export const FooterWrapper = styled.div`
background-color:#fff;
padding:10px 15px;
display:flex;
justify-content:space-between;
align-items:center;
`;
export const CloseLabel = styled.label`
display:flex;
align-items:center;
gap:6px;
cursor:pointer;
font-size:13px;
color:#000;
`;
export const CloseCheckbox = styled.input`
appearance:none;
width:14px;
height:14px;
border:1px solid #ccc;
background-color:#fff;
cursor:pointer;
position:relative;

&:checked::after{
content:'✔';
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
color:#000;
font-size:10px;
}
`;
export const CloseBtn = styled.button`
background:none;
border:none;
font-size:18px;
font-weight:300;
cursor:pointer;
color:#000;
display:flex;
align-items:center;
justify-content:center;
padding:0;
`;