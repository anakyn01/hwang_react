import styled from 'styled-components';

export const SidebarContainer = styled.ul`
width:14rem !important;
min-height:100vh;
background-color:#4e73df;
background-image:linear-gradient(180deg, #4e73df 10%, #224abe 100%);
background-size:cover;
margin:0;
padding:0;
list-style:none;
display:flex;
flex-direction:column;
`;

export const SidebarBrand = styled.a`
height:4.375rem;
text-decoration:none;
font-size:1rem;
font-weight:800;
padding:1.5rem 1rem;
text-align:center;
text-transform:uppercase;
letter-spacing:0.05rem;
z-index:1; color:#fff;
display:flex; align-items:center;
justify-content:center;
&:hover{
color:#fff; text-decoration:none;
}
`;

export const NavItem = styled.li`
position:relative;
`;

export const NavLink = styled.a`
display:block; width:100%; text-align:left;
padding:1rem; width:14rem; 
color:rgba(255, 255, 255, .8);
font-weight:700;
text-decoration:none;
&:hover{color: #fff;}
svg,i{margin-right:0.25rem;}
`;

export const Divider = styled.hr`
margin:0 1rem 1rem;
border-top:1px solid rgba(255,255,255,0.15);
`;