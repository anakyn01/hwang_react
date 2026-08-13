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


