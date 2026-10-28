import styled, {css} from 'styled-components';
import { Fw500,Relative,Pointer,TransitionAll,BgWhite,Circle,Absolute,BoxShadow, W100, FlexCenter } from '../common/Common.styles';

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
border-radius:5px;
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
  padding: 0 15px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;
  font-size: 0.9rem;
  color: #333;
  outline: none;
  flex-shrink: 0;
${Pointer};
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