import styled from 'styled-components';

export const WorkSection = styled.section`
padding:80px 0;
background-color:#fff;
`;
export const Container = styled.div`
max-width:1200px; margin:0 auto; padding:0 20px;
`;
export const SectionTitle = styled.h2`
font-size:2rem; color:#3f51b5;
margin-bottom:40px;
font-weight:bold;
`;
export const GridWrap = styled.div`
display:grid;
grid-template-columns:repeat(4, 1fr);
gap:0;
`;
export const GridItem = styled.div`
width:100%; aspect-ratio:1 / 1;
`;

export const Workimg = styled.img`
width:100%;
height:100%;
object-fit:cover;
display:block;
`;
export const EmptyState = styled.div`
grid-column: span 4;
text-align:center;
padding:50px;
color:#999;
`;