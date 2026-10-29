import styled, {css} from 'styled-components';
import { Relative,Pointer,TransitionAll,BgWhite,Circle,Absolute,BoxShadow, W100, FlexCenter } from '../common/Common.styles';

interface ToggleProps {
  active: boolean;
}

export const ToggleSwitch = styled.div<ToggleProps>`
  width: 2.75rem;
  height: 1.5rem;
  background-color: ${props => (props.active ? '#ff6b00' : '#e4e5e7')};
  border-radius: 0.75rem;
  ${Relative}
  ${Pointer}${TransitionAll}
`;

export const ToggleThumb = styled.div<ToggleProps>`
  width: 1.25rem;
  height: 1.25rem;
  ${BgWhite}
  ${Circle}${Absolute}
  top: 0.125rem;
  left: ${props => (props.active ? '1.375rem' : '0.125rem')};
  ${TransitionAll}${BoxShadow}
`;

export const StatLabel = styled.span<{$color:string}>`
font-weight:bold;
color:${(props) => props.$color};
margin-right:4px;
`;

//input
export const FormControl = styled.input`
${W100};
padding:10px;
border:1px solid #ccc;
border-radius:15px;
`;
export const LabelGroup = styled.div`
${FlexCenter};
${W100};
gap:20px;
margin-bottom:15px;
`;

export const Label = styled.label`
display:flex; 
gap:5px; 
${Pointer}; 
`;

//photo
export const PhotoUpload = styled.div`
width:100px;
height:100px;
background-color:#eee;
border-radius:10px;
margin:0 auto;
${FlexCenter};
`;

export const FilterSelect = styled.select`
  /* flex 대신 일반 블록 레벨의 패딩과 줄간격으로 정렬합니다 */
  padding: 0 30px 0 15px; 
  height: 38px;
  line-height: 36px; /* border 두께를 뺀 높이와 맞춰 수직 중앙 정렬 */
  
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background-color: #fff;
  font-size: 0.9rem;
  color: #333;
  outline: none;
  flex-shrink: 0;
  cursor: pointer;

  /* 💡 브라우저 기본 화살표 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* 💡 커스텀 화살표 이미지 삽입 (SVG) */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center; 
  background-size: 16px; 
`;

export const FormGroup = styled.div`
margin-bottom:15px; 
display:flex;
flex-direction:column;
label{
font-weight:bold;
margin-bottom:8px;
color:#555;
}
`;
export const Input = styled.input`
padding:10px;
border:1px solid #ccc;
border-radius:4px;
font-size:14px;
${W100};
max-width:400px;
`;
export const RadioGroup = styled.div`
${FlexCenter};
gap:15px; 


/* 중첩된 label 지우고 하나로 합침 */
  label {
    font-weight: normal;
    display: flex;
    align-items: center;
    gap: 8px; /* 라디오 버튼과 글씨 사이 간격 */
    cursor: pointer;
    white-space: nowrap; /* 글씨가 좁아져도 밑으로 줄바꿈되지 않게 방지 */
  }

  /* 라디오 버튼이 선처럼 늘어나는 현상 방지 */
  input[type="radio"] {
    width: auto; 
    margin: 0;
  }


}
`;

export const FileUpload = styled.input`
width:100%; font-size:12px;
`

export const TextArea = styled.textarea`
width:100%;
height:80px;
padding:10px;
border:1px solid #ccc;
border-radius:4px; 
resize:none;
`;