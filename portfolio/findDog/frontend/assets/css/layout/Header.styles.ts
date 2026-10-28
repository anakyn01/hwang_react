import styled, {css} from 'styled-components';
import { Fixed, FlexBetween, FlexCenter, Fw500, Pointer, Sticky, W100 } from '../common/Common.styles';

export const Header = styled.header`
${Fixed};

  top: 0;
  left:50%;
  transform:translateX(-50%);

  
  margin: 0 auto;
  z-index: 9999;
  ${W100};
  max-width: 480px; /* 💡 컨테이너 최대 크기와 일치시킴 */
  box-sizing: border-box;
  padding: 16px 20px;
  ${FlexBetween};
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.h4`
  margin: 0;
  ${Fw500}
  color: #f28c28;
`;



export const Back = styled.span`
${Pointer};
color:#999;
transition:all .5s;

&:hover{
color:#333;
}
`;

export const ShelterHeader = styled.header`
  background-color: #fff;
  padding: 15px 20px;
${FlexBetween};
${Sticky};
  top: 0;
  z-index: 10;
`;

export const SectionHeader = styled.div`
${FlexBetween};
  padding-right: 20px;
  margin-bottom: 15px;
  .more-link {
${FlexCenter};
    font-size: 0.85rem;
    color: #888;
    text-decoration: none;
  }
`;