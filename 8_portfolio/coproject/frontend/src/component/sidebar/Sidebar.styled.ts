import styled from 'styled-components';

//add 사이드바와 버튼을 통째로 묶어주는 영역
export const SidebarWrapper = styled.div<{$isOpen: boolean}>`
position:relative;
height:100vh;
width: ${({$isOpen}) => ($isOpen ? '224px' :'0px')};
transition: width .3s ease-in-out;
z-index:1000;
`;

//약간 수정
export const SidebarContainer = styled.ul<{$isOpen:boolean}>`
width:224px;
height:100%;
background-color:#4e73df;
background-image:linear-gradient(180deg, #4e73df 10%, #224abe 100%);
background-size:cover;
margin:0;
padding:0;
list-style:none;
display:flex;
flex-direction:column;
overflow-x:hidden;
/*닫히면 화면 왼쪽 바깥(-100%)으로 밀어내서 숨깁니다.*/
transform:translateX(${({ $isOpen}) => ($isOpen ? '0': '-100%')});
transition:transform .3s ease-in-out;
`;

//화살표 탭 버튼
export const ToggleButton = styled.div`
position:absolute;
top:50%;
right:-20px;
transform:translateY(-50%);
width:20px;
height:60px;
background:#fff;
border:1px solid #ded3e2;
border-left:none;
border-radius:0 5px 5px 0;
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
box-shadow:2px 0 5px rgba(0,0,0,.5);
i{
font-size:12px; color:#858796;
}
&:hover{
background-color:#f8f9fc;
    i{
    color:#4e73df;
    }
}
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