import styled, {css} from 'styled-components';
import { Fixed, MainMaxWidth, Mauto, BgWhite, FlexAround, FlexColumn, Pointer, W100, MainBg } from './Common.styles';

export const BottomNav = styled.nav`
${W100};
${Fixed};
bottom:0;
left:50%;
transform:translateX(-50%);

  ${MainMaxWidth};
  ${Mauto};
  height: 3.75rem;
  ${MainBg};
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

color: ${(props) => (props.$active ? '#8c524d' : '#795c59')};

    svg {
        font-size: 20px;
        margin-bottom: 0.05px;
    }

  span {
    font-size: 0.65rem;
    color: ${props => (props.$active ? '#8c524d' : '#795c59')};
    font-weight: ${props => (props.$active ? '700' : '400')};
  }
`;

export const MenuText = styled.div`
font-size:11px;
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
