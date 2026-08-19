import styled from 'styled-components';

export const Wrapper = styled.div`
width:100%; max-width:800px;
margin:0 auto; padding:40px 20px;
`;

export const StepContainer = styled.div`
display:flex; align-items:center;
justify-content:center; margin-bottom:50px;
`;

export const Step = styled.div<{ $active:boolean}>`
display:flex; align-items:center; gap:8px;
`;
export const StepNumber = styled.div<{ $active?: boolean}>`
width:24px; height:24px; border-radius:50%;
background-color:${(props) => (props.$active ? '#000' :'#f0f0f0')};
color: ${(props) => (props.$active ? '#fff' :'#999')};
display:flex;
align-items:center;
justify-content:center;
font-size:13px;
font-weight:bold;
`;

export const StepText = styled.span<{$active:boolean}>`
font-size:16px; font-weight:${(props) => (props.$active ? 'bold' :'normal')};
color:${(props) => (props.$active ? '#000' :'#999')};
text-decoration: ${(props) => (props.$active ? 'underline' : 'none')};
text-underline-offset:4px;
`;
export const StepDivider = styled.div`
width:40px; height:1px; 
border-bottom:1px dashed #ccc;
margin:0 15px;
`;
export const CheckAllWrapper = styled.div`
border-top:1px solid #e5e5e5;
border-bottom:1px solid #e5e5e5;
padding:20px 0;
margin-bottom:30px;
`;

export const CheckboxLabel = styled.label`
display:flex;
align-items:center;
gap:10px;
cursor:pointer;
`;

/* 커스텀 사각 체크박스 디자인 */
export const CheckboxInput = styled.input`
appearance: none;
width:20px; 
height:20px;
border:1px solid #d1d5db;
border-radius:2px;
background-color:#fff;
cursor:pointer;
position:relative;
&:checked{
border-color:#000;
}
/*체크시 나타나는 v마크*/
&:checked::after{
content:'✔';
position:absolute;
top:50%; left:50%;
transform:translate(-50%, -50%);
color:#000;
font-size:14px;
}
`;
export const CheckAllText = styled.span`
font-size:16px; font-weight:bold;
color:#000;
`;

export const TermSection = styled.div`
margin-bottom:30px;
`;
export const TermHeader = styled.div`
display:flex; justify-content:space-between;
align-items:center;
margin-bottom:15px;
`;
export const TermTitle = styled.span`
font-size:15px; color:#444;
`;
export const ToggleButton = styled.button`
background:none;
border:none;
color:#666;
font-size:14px;
cursor:pointer;
display:flex;
align-items:center;
gap:4px;
`;

export const TermContentBox = styled.div<{$isOpen:boolean}>`
display:${(props) => (props.$isOpen ? 'block':'none')};
width:100%;
height:140px;
overflow-y:auto;
border:1px solid #e5e5e5;
padding:20px;
font-size:13px;
color:#666;
background-color:#fff;
line-height:1.6;
white-space: pre-wrap;
/*
페이지에서 글자의 띄어쓰기, 들여쓰기, 줄바꿈을 코드에 적은 
그대로 유지하면서, 글쓴 내용이 화면 상자 크기를 넘어가면 
자동으로 다음 줄로 넘겨주는 CSS 속성입니다
*/
`;

export const ButtonGroup = styled.div`
display:flex;
justify-content:center;
gap:10px;
margin-top:60px;
`;
export const Button = styled.button<{$variant:'outline' | 'solid'}>`
width:180px;
height:54px;
font-size:16px;
font-weight:bold;
border-radius:4px;
cursor:pointer;
transition:all .2s;

background-color:${(props) => (props.$variant === 'outline' ? '#fff':'#000')};
border: 1px solid;
color:${(props) => (props.$variant === 'outline' ? '#000' : '#fff')};

&:hover{
background-color:${(props) => (props.$variant === 'outline' ? '#f9f9f9' : '#333')};
}

@media (max-width:480px) {
width:100%;
}
`;



export const Container = styled.div``;
export const Title = styled.h2``;
export const Section = styled.div<{ $marginBottom:string}>`

`;
export const SectionTitle = styled.h3``;
export const TermsBox = styled.div<{ $bg:string}>``;

export const Checkbox = styled.input<{$isLarge?:boolean}>``;
export const TotalAgreeText = styled.span``;
export const AgreeText = styled.span``;

