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