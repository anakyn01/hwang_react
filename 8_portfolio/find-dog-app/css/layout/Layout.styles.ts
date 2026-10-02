import styled, {css} from 'styled-components';
import { 
  Relative, TransitionAll, Pointer, BgWhite, Circle, Absolute, BoxShadow, 
  FlexBetween, Flex, Fw500, Grid, FlexCenter, TextCenter, W100, Fixed, 
  Ohidden, Ellipsis, ColorWhite, Fw700, Nowrap, FlexStart, WebkitBox, 
  BorderNone, Fw600, MainMaxWidth, Mauto, FlexAround, FlexColumn 
} from '../common/Common.styles';



// style.styles.ts 파일 수정

export const AppWrapper = styled.div`
  display: flex;
  justify-content: center; /* 💡 가로 중앙 정렬 */
  align-items: flex-start;
  background-color: #333;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
  padding-bottom: 70px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  margin: 0 auto; /* 💡 박스를 항상 정중앙에 위치시킴 */
`;

export const Header = styled.header`
  position: sticky; /* 💡 fixed 대신 sticky를 사용하여 컨테이너 내부 상단에 딱 붙게 함 */
  top: 0;
  z-index: 9999;
  width: 100%;
  max-width: 480px; /* 💡 컨테이너 최대 크기와 일치시킴 */
  box-sizing: border-box;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.h4`
  margin: 0;
  ${Fw500}
  color: #f28c28;
`;

export const Card = styled.div`
  ${BgWhite}
  border-radius: 0.75rem;
  ${Ohidden}${BoxShadow}
`;

export const CardImage = styled.img`
  ${W100}
  height: 160px; 
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;

export const CardBody = styled.div`
  padding: 12px;
`;

export const CardTitle = styled.p`
  font-weight: bold;
  font-size: 13px;
  margin: 0 0 4px 0;
  ${Ohidden}${Ellipsis}
`;

export const CardDesc = styled.p`
  font-size: 11px;
  color: #6c757d;
  margin: 0;
  ${Ohidden}${Ellipsis}
`;

export const CardGrid = styled.div`
  ${Grid}
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 16px;
`;

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

export const GuideBox = styled.div`
  ${FlexBetween}
  ${BgWhite}${Pointer}
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin: 0 1rem 1rem 1rem;
`;

export const GuideText = styled.span`
  ${Flex}
  font-size: 0.875rem;
  color: #444;
  margin-left: 0.5rem;
  ${Fw500}
`;

export const InfoRow = styled.div`
  ${FlexCenter}
  gap: 0.375rem;
  margin-bottom: 0.25rem;
`;

interface StatusProps {
  status: string;
}

export const StatusBadge = styled.span<StatusProps>`
  background-color: ${(props) => (props.status === '실종' ? '#ff4d4f' : '#52c41a')};
  ${ColorWhite}${Fw700}
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
`;

export const MetaInfo = styled.div`
  font-size: 0.6875rem;
  color: #666;
  margin-bottom: 0.5rem;
  ${Nowrap}
  ${Ohidden}${Ellipsis}
`;

export const LocationRow = styled.div`
  ${FlexStart}
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const LocationText = styled.span`
  font-size: 0.6875rem;
  color: #555;
  line-height: 1.2;
  ${WebkitBox}${Ohidden}
`;

export const DateRow = styled.div`
  ${FlexCenter}
  gap: 0.25rem;
  margin-top: 0.375rem;
`;

export const DateText = styled.span`
  font-size: 0.625rem;
  color: #999;
`;

export const LoadingText = styled.div`
  ${TextCenter}
  grid-column: span 2;
  padding: 2.5rem;
  color: #888;
  font-size: 0.8rem;
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

export const BreedName = styled.div`
font-size:0.8rem;
${Fw700}
color:#222;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  background-color: #eee;
  overflow: hidden;
`;