import styled, {css} from 'styled-components';
import { Fixed, MainMaxWidth, Mauto, BgWhite, FlexAround, FlexColumn, Pointer, W100, MainBg, IconColor, Fw600, MainBottomBg } from './Common.styles';

export const BottomNav = styled.nav`
${W100};
${Fixed};
bottom:0;
left:50%;
transform:translateX(-50%);

  ${MainMaxWidth};
  ${Mauto};
  height: 3.75rem;
  ${MainBottomBg};
  border-top: 1px solid #eee;
  ${FlexAround};
  z-index: 999999;
`;

interface NavItemProps {
  $active?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  ${FlexColumn};
  gap: 0.0005rem;
  ${Pointer};

color: ${(props) => (props.$active ? '#805c59' : '#ae948f')};

    svg {
        font-size: 20px;
        margin-bottom: 0.05px;
    }

  span {
    font-size: 0.65rem;
    color: ${props => (props.$active ? '#805c59' : '#ae948f')};
    font-weight: ${props => (props.$active ? '700' : '400')};
  }
`;

export const MenuText = styled.div`
${IconColor};
font-size:0.6875rem;
${Fw600};
`;

export const FilterContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
`;
