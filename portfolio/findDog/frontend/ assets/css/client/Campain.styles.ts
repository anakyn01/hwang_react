import styled from "styled-components";
import { FlexColumn, W100 } from "../common/Common.styles";

export const CampaignTextWrap = styled.div`
${FlexColumn};
gap:2px;
`;

export const CampaignImg = styled.img`
${W100};
height:100%;
object-fit:cover;
`;