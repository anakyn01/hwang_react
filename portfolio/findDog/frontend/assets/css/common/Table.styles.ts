import styled from "styled-components";
import { W100 } from "./Common.styles";


export const TList = styled.table`
${W100};
border-collapse:collapse; 
margin-top:10px;

thead{
  tr{
    background-color:#f5f5f5; 
    border-bottom:2px solid #ddd;
    text-align:left;
    th{
      padding:12px 8px;
    }
  }
}

tbody{
  tr{
   border-bottom:1px solid #eee;
    td{
     padding:12px 8px;
     font-size:14px;
     color:#888;
    }
  }
}
`;

export const StyledTable = styled.table`
width:100%; margin-bottom:1rem;
color:#858796; border-collapse:collapse;

th, td {
padding:0.75rem; vertical-align:top;
border:1px solid #e3e6f0;
}

th{
background-color:#f8f9fc; text-align:left;
}

tbody tr:hover {
background-color:#f1f3f6;
}
`;