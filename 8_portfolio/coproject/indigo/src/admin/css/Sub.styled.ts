import styled from 'styled-components';
//헤더
export const HeaderWrapper = styled.header``;
//로고
export const LogoArea = styled.div``;
//글씨로고 스타일
export const TextLogo = styled.span``;
//이미지로고스타일
export const ImageLogo = styled.img``;
//네비게이션 영역
export const NavMenu = styled.nav``;
export const MenuList = styled.ul``;
export const MenuItem = styled.li``;
//서브메뉴 링크 스타일
export const MenuLink = styled.a``;

//관리자
export const PageWrapper = styled.div`
padding: 20px;
`;
export const PageTitle=styled.h1`
font-size:1.5rem; color:#333;
margin-bottom:20px;
`;
export const Card=styled.div`
background:#fff;
border:1px solid #e3e6f0;
border-radius:8px;
padding:20px;
margin-bottom:20px;
box-shadow:0 4px 6px rgba(0,0,0,0.05);
`;
export const SectionTitle=styled.h3`
font-size:1.2rem; color:#4e73df;
margin-bottom:15px; border-bottom:1px solid #eee;
padding-bottom:10px;
`;
export const FormGroup = styled.div`
margin-bottom:15px; 
display:flex;
flex-direction:column;
label{
font-weight:bold;
margin-bottom:8px;
color:#555;
}
`;
export const Input = styled.input`
padding:10px;
border:1px solid #ccc;
border-radius:4px;
font-size:14px;
width:100%;
max-width:400px;
`;
export const RadioGroup = styled.div`
display:flex;
gap:15px; 
align-items:center;

/* 중첩된 label 지우고 하나로 합침 */
  label {
    font-weight: normal;
    display: flex;
    align-items: center;
    gap: 8px; /* 라디오 버튼과 글씨 사이 간격 */
    cursor: pointer;
    white-space: nowrap; /* 글씨가 좁아져도 밑으로 줄바꿈되지 않게 방지 */
  }

  /* 라디오 버튼이 선처럼 늘어나는 현상 방지 */
  input[type="radio"] {
    width: auto; 
    margin: 0;
  }


}
`;
export const MenuRow = styled.div`
display:flex; gap:10px; 
margin-bottom:10px; 
align-items:center;
`;
export const Button = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
padding:8px 15px;
border:none;
border-radius:4px;
color:white;
cursor:pointer;
font-weight:bold;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

export const SaveButtonWrap = styled.div`
text-align:right;
margin-top:20px;
`;

export const GridWrap = styled.div`
display:grid;
grid-template-columns:repeat(4, 1fr);
gap:20px;
`;
export const GridWrap3 = styled.div`
display:grid;
grid-template-columns:repeat(3, 1fr);
gap:30px;
`;

export const BlogImgWrap = styled.div`
border:1px solid #ddd;
padding:10px; 
text-align:center;
position:relative;
`;


export const DivKey = styled.div`
border:1px solid #ddd;
padding:10px; 
text-align:center;
`;
export const BlogKey = styled.div`
display:flex; 
flex-direction:column;
gap:10px;
`;

export const Relative = styled.div`
position:relative;
`;

export const NoneImage = styled.div`
width:100%; height:150px; background-color:#f5f5f5;
display:flex; align-items:center;
justify-content:center; 
margin-bottom:10px;
color:#999;
`;
export const BottomInfo = styled.div`
width:100%; height:200px;
background-color:#f5f5f5;
display:flex; 
align-items:center;
justify-content:center;
color:#999;
`;
export const MapPreview = styled.div`
width:100%; height:400px; background-color:#eaeaea;
display:flex; align-items:center; 
justify-content:center; 
border-radius:5px; 
overflow:hidden;
`;

export const BlogImg = styled.img`
width:100%; height:200px;
object-fit:cover;
`;

export const FileUpload = styled.input`
width:100%; font-size:12px;
`
export const ButtonPrimary = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
padding:10px 30px;
font-size:16px;
color:white;
border:none;
border-radius:10px;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

export const Exit = styled.button<{ variant?: 'primary' | 'danger' | 'success'}>`
top:0; right:0;
padding:5px 10px;
font-size:16px;
color:white;
border:none;
border-radius:10px;

background-color: ${({variant}) => variant === 'danger' ? '#e74a3b' : variant === 'success' ? '#1cc88a' :'#4e73df'};
&:hover{
opacity:0.9;
}
`;

export const TList = styled.table`
width:100%; border-collapse:collapse; margin-top:10px;

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

export const TextArea = styled.textarea`
width:100%;
height:80px;
padding:10px;
border:1px solid #ccc;
border-radius:4px; 
resize:none;
`;