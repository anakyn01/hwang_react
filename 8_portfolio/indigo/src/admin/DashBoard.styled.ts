import styled from 'styled-components';

export const PageHeader = styled.div`
display:flex; align-items:center;
justify-content:space-between;
margin-bottom:1.5rem;
h1{
font-size:1.75rem;
font-weight:400;
color:#5a5c69;
margin:0;
}
`;

export const GridRow = styled.div`
display:flex; flex-wrap:wrap;
margin-right:-0.75rem; margin-left:-0.75rem;
`;

export const CardColumn = styled.div`
flex: 0 0 25%;
/*
flex-grow: 0; 여유 공간이 있어도 커지지 않음
flex-shrink: 0; 공간이 부족해도 줄어들지 않음
flex-basis: 25%; 기본 너비는 부모의  25%
*/
max-width:25%;
padding-right:0.75rem;
padding-left:0.75rem;
margin-bottom:1.5rem;

@media (max-width: 1200px) {flex:0 0 50%; max-width:50%;}
@media (max-width: 768px) {flex:0 0 100%; max-width:100%;}
`;

export const StatCard = styled.div<{borderColor:string}>`
position:relative;
display:flex;
flex-direction:column;
min-width:0;
word-wrap:break-word;
background-color:#fff;
background-clip:border-box;
border:1px solid #e3e6f0;
border-radius:0.35rem;
border-left:0.25rem solid ${props => props.borderColor};
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
height:100%;
padding:0.5rem 0;
`;

export const CardBody = styled.div`
flex: 1 1 auto;
padding:1.25rem;
display:flex;
align-items:center;
justify-content:space-between;
`;