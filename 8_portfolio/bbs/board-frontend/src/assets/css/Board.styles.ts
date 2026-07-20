import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const CustomButton = styled(Link)`
background-color: #6c757d;
color:white;
border-radius:8px;
padding:8px 16px;
text-decoration:none;
font-weight:bold;
&:hover{
background-color:#5a6268;
color:white;
}
`;

export const FromContainer = styled.div`
background-color:#f8f9fa;
padding:20px;
border-radius:10px;
box-shadow: 0 4px 6px rgba(0,0,0, .1);
`;