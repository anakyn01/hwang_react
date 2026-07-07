import styled from 'styled-components';

export const ProductGrid = styled.div`
display:grid;
grid-template-columns:repeat(2, 1fr);
gap:16px;
`;

export const ProductCard = styled.div`
display:flex; flex-direction:column;
background:#fff; border-radius:8px;
overflow:hidden;
box-shadow:0 2px 4px rgba(0,0,0,0.05);
`;

export const ProductImage = styled.div`
height:150px; background-color:#e9ecef;
display:flex; align-items:center;
color:#adb5bd;
`;

export const ProductInfo = styled.div`
display:flex;
flex-direction:column;
padding:12px;
gap:4px;
.brand{
font-size:0.75rem; color:#6c757d; font-weight:600;
}
.name{
font-size:0.9rem; font-weight:bold; color:#212529;
}
.price{
font-size:0.85rem; color:#0d6efd; margin-top:8px;
}
`;