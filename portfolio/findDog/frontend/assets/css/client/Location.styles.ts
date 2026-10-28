import styled from "styled-components";
import { FlexStart, WebkitBox, Ohidden } from "../common/Common.styles";


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