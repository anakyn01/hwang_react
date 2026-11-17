import styled from 'styled-components';

export const TopbarContainer = styled.nav`
height:4.375rem;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 1.5rem;
background-color:#fff;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
margin-bottom:1.5rem;
`;

export const TopbarSearch = styled.form`
display:inline-block;
margin-right:auto;
margin-left:1rem;
`;

export const TopbarNavbar = styled.ul`
display:flex; align-items:center;
list-style:none; margin:0;
padding:0;
`;

export const TopbarSearchInput = styled.input.attrs({type:"text"})`
padding:10px 15px;
width:250px;
border-radius:5px;
border:1px solid #ccc;
outline:none;
`;

export const SearchResultWrap = styled.div`
margin-top:30px;

    h3{
        border-bottom:2px solid #333;
        padding-bottom:10px;
    }
`;

export const SearchUserResultWrap = styled.div`
margin-bottom:20px;

    h5{
        color:#0d6efd;
    }
`;

export const SearchBlogResultWrap = styled.div`
margin-bottom:20px;

    h5{
        color:#198754;
    }
`;

export const DateSpan = styled.span`
color:#888; 
margin-right:10px;
`;

export const SearchQResultWrap = styled.div`
margin-bottom:20px;

    h5{
        color:#dc3545;
    }
`;

//드롭다운
export const UserMenuContainer = styled.div`
position:relative;
display:flex;
align-items:center;
`;

//클릭하는 프로필 영역 (이름 + 사진)
export const UserProfileToggle = styled.div`
display:flex;
align-items:center;
cursor:pointer;
padding:0.5rem;
color:#858796;
 span{
    margin-right:0.75rem; font-size:0.85rem;
    font-weight:400;
 }
 img{
 width:2rem; height:2rem;
 border-radius:50%;
 object-fit:cover;
 }
 &:hover{
color: #5a5c69;
 }
`;

//드롭다운 하얀색 박스
export const DropdownMenu = styled.div<{ $isOpen : boolean}>`
/* $isOpen 이 true일 때만 화면에 보입니다*/
display: ${({ $isOpen}) => ($isOpen ? 'block' : 'none')};
position:absolute;
top:100%;
right:0;
margtin-top:0.5rem;
width:12rem;
background-color:#fff;
border-radius:0.35rem;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
border:1px solid #e336f0;
z-index:1000;
padding:0.5rem 0;
animation: fadeIn .2s ease-in-out;

@keyframes fadeIn{
from {opacity:0; transform: translateY(-10px);}
to{ opacity:1; transform:translateY(0);}
}
`;

// 드롭다운 안의 메뉴 아이템들 (Profile, Logout 등)
export const DropdownItem = styled.div`
display:flex;
align-items:center;
width:100%;
padding:0.5rem 1.5rem;
font-size:0.85rem;
color:#3a3b45;
cursor:pointer;

i{
margin-right:0.75rem;
color: #d1d3e2;
font-size: .85rem;
}

&:hover{
background-color:#f8f9fc;
color:#2e59d9;
i{
color:#2e59d9
}
}
`;

//메뉴 사이의 얇은 실선(구분선)
export const DropdownDivider = styled.div`
height:0; margin:0.5rem 0;
overflow:hidden;
border-top:1px solid #eaecf4;
`;


