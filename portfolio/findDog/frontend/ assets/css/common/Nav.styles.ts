import styled, {css} from 'styled-components';
import { Fixed, MainMaxWidth, Mauto, BgWhite, FlexAround, FlexColumn, Pointer } from './Common.styles';

export const BottomNav = styled.nav`
  ${Fixed}
  ${MainMaxWidth}${Mauto}
  height: 3.75rem;
  ${BgWhite}
  border-top: 1px solid #eee;
  ${FlexAround}
  z-index: 100;
`;

interface NavItemProps {
  active?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  ${FlexColumn}
  gap: 0.125rem;
  ${Pointer}

  span {
    font-size: 0.75rem;
    color: ${props => (props.active ? '#ff7a00' : '#888')};
    font-weight: ${props => (props.active ? '700' : '400')};
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
