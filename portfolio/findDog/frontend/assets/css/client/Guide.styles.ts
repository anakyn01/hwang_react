import styled from "styled-components";
import { FlexBetween, BgWhite, Pointer, Flex, Fw500 } from "../common/Common.styles";


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