import styled from "styled-components";
import { Grid } from "../common/Common.styles";

export const QuickMenu = styled.section`
${Grid};
grid-template-columns:repeat(5, 1fr);
padding:16px;
border-bottom:1px solid #eee;
`;