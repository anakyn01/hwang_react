import styled, {css} from 'styled-components';
import { FlexCenter } from './Common.styles';

export const DateRow = styled.div`
  ${FlexCenter}
  gap: 0.25rem;
  margin-top: 0.375rem;
`;

export const DateText = styled.span`
  font-size: 0.625rem;
  color: #999;
`;