import styled, {css} from 'styled-components';
import { TextCenter } from './Common.styles';

export const LoadingText = styled.div`
  ${TextCenter}
  grid-column: span 2;
  padding: 2.5rem;
  color: #888;
  font-size: 0.8rem;
`;