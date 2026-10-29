import styled, {css} from 'styled-components';
import { Absolute, ColorWhite, BorderNone, FlexCenter,Fw600, Fw800, BoxShadow, Pointer, TransitionAll, Relative, Nowrap, Fw700,Fw200, IconColor } from './Common.styles';

type ButtonVariant = 'kakao' | 'local' | 'primary';
//컴포넌트가 받을 Props 정의
interface BtnProps {
$variant: ButtonVariant;
$mainColor?: string;
$width?:string;
}
// 3. Variant별 스타일 객체 매핑
const variantStyles = {
kakao:css`
background-color: #fee500;
color: #000;
border: 0px solid #fee500;
`,
local:css`
background-color: #fff;
color: #333;
border: 1px solid #ccc;
`,
primary:css<BtnProps>`
background-color: ${({ $mainColor}) => $mainColor || '#28a745'};
color:#fff;
border:1px solid ${({ $mainColor }) => $mainColor || '#28a745'}
`
};


export const BaseBtn = styled.button<BtnProps>`
/* 💡 2. 전달받은 $width가 있으면 그 값을 쓰고, 
안 넘겨주면 기본값 100%를 적용합니다. */
width:${({ $width}) => $width || '100%'};
box-sizing:border-box;
padding:15px;
border-radius:8px;
font-weight:bold;
${FlexCenter}
gap:10px;
cursor:pointer;
opacity:.9;
transition:all .3s;
    &:hover{
    opacity:1;
    }
${({ $variant }) => variantStyles[$variant]}
`;


export const LogOutBtn = styled.span`
font-size:14px; color:#888;
cursor:pointer; text-decoration:underline;
`;


export const BtnBottomWrap = styled.div`
position:fixed;
bottom:3%;
left:50%;
transform:translateX(-50%);

/* 💡 뼈대가 되는 기본 넓이와 양옆 여백 */
  width: 100%;
  padding: 0 20px; 
  box-sizing: border-box;

  /* 💡 PC 화면 기준 최대 크기 */
  max-width: 480px; 

  /* 💡 1. 480px 이하 기기 */
  @media (max-width: 480px) {
    max-width: 480px;
  }
  
  /* 💡 2. 440px 이하 기기 */
  @media (max-width: 440px) {
    max-width: 440px;
  }

  /* 💡 3. 430px 이하 기기 (아이폰 Pro Max 급) */
  @media (max-width: 430px) {
    max-width: 430px;
  }

  /* 💡 4. 390px 이하 기기 (아이폰 일반 급) */
  @media (max-width: 390px) {
    max-width: 390px;
  }

  /* 💡 5. 280px 이하 기기 (초소형 화면, 갤럭시 폴드 커버화면 등) */
  @media (max-width: 280px) {
    max-width: 280px;
  }
`;


export const HashtagBtn = styled.button<{$active?:boolean}>`
background:${({$active}) => ($active ? '#eb8a12' : '#faf4f2')};
color:${({ $active}) => ($active ? '#f7f2d8' : '#c1b6b6')};
border:none;
border-radius:20px;
padding:6px 14px;
font-size:0.775rem;
${Fw800};
${Nowrap};
${Pointer};
transition: all .2s ease-in-out;
/*
애니메이션이 트랜지션
Ease In (이즈 인 - 가속) 느리게 시작해서 점점 빨라지는 효과 퇴장용으로 적합
Ease Out (이즈 아웃 - 감속) 빠르게 시작해서 목적지에 가까워질수록 부드럽게 느려지는 효과
등장용으로 적합

느리게 시작해 중간에 가장 빨라졌다가 끝날 때 부드럽게 멈추는 형태
*/
`;

export const FloatingWriteButton = styled.button`
  ${Absolute}
  bottom: 5rem;
  right: 1.25rem;
  background-color: #52c41a;
  ${ColorWhite}${BorderNone}
  border-radius: 1.875rem;
  padding: 0.6rem 1.2rem;
  ${FlexCenter}
  gap: 0.375rem;
  font-size: .875rem;
  ${Fw600}
  ${BoxShadow}${Pointer}
  z-index: 10;
`;

export const MoreButton = styled.span`
font-size:12px; 
${IconColor}; 
${Pointer};
`;

export const TabBtn = styled.button<{$active? : boolean}>`
  background: none;
  border: none;
  padding: 15px 5px;
  margin-right: 20px;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  border-bottom: ${({ $active}) => ($active ? '2px solid #000' : '2px solid transparent')};
  ${Pointer};
  ${TransitionAll};

`;

export const FilterIconBtn = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 38px;
  height: 38px;
${FlexCenter};
  flex-shrink: 0;
  ${Pointer};
`;

export const ToggleBtn = styled.button<{ $isOn: boolean}>`
  width: 48px; 
  height: 26px;
  border-radius: 13px;
  border: none;
  background-color: ${({ $isOn}) => ($isOn ? '#ff8c00' : '#ddd')};
  ${Relative};
  ${Pointer};
  transition: background-color 0.3s;
  .handle {
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    ${Absolute};
    top: 2px;
    left: ${({ $isOn}) => ($isOn ? '24px' : '2px')};
    transition: left 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
padding:8px 15px;
border:none;
border-radius:4px;
color:white;
cursor:pointer;
font-weight:bold;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

export const SaveButtonWrap = styled.div`
text-align:right;
margin-top:20px;
`;

export const ButtonPrimary = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
padding:10px 30px;
font-size:16px;
color:white;
border:none;
border-radius:10px;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

export const Exit = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
top:0; right:0;
padding:5px 10px;
font-size:16px;
color:white;
border:none;
border-radius:10px;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

//버튼
interface ColorBtnProps {
  bgColor?: 'red' | 'yellow' | 'green' | 'purple';
}
// 🎨 선택된 색상에 따라 배경색(Hex 코드)을 반환하는 함수
const getBgColor = (color?: string) => {
  switch(color) {
    case 'red' : return '#dc3545';
    case 'yellow' : return '#ffc107';
    case 'green' : return '#28a745';
    case 'purple':return '#6f42c1';
    default: return '#dc3545';    
  }
}

//Typo
interface StatusProps {
  statusColor?:'blue'|'red'|'green'|'gray';
}

const getStatusColor = (color?: string) => {
  switch(color) {
    case 'red' : return '#f66a78';
    case 'yellow' : return '#fae299';
    case 'green' : return '#a4f9b8';
    case 'purple':return '#d2c1f2';
    default: return '#938d8e';   
  }
}

export const StatusText = styled.span<StatusProps>`
color: ${({ statusColor}) => getStatusColor(statusColor)};
${Fw200};
font-size:0.825rem;
margin:0;
`;

// 🖋️ 선택된 색상에 따라 글자색을 반환하는 함수 
// (노란색 배경에는 검정 글씨가 잘 보입니다)
const getTextColor = (color?: string) => {
  if(color === 'yellow') return '#212529';
  return '#fff';
}

export const ColorButton = styled.button<ColorBtnProps>`
padding:8px 15px;
border:none;
border-radius:4px;
cursor:pointer;
font-weight:bold;
background-color:${({bgColor}) => getBgColor(bgColor)};
color:${({bgColor}) => getTextColor(bgColor)};
transition: opacity 0.2s ease-in-out;
&:hover{
opacity:0.8;
}
`;
