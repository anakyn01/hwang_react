import styled, {createGlobalStyle, css} from 'styled-components';
import { Card, Nav, Form, Navbar, Button, Row, Container}
from 'react-bootstrap';
//무료 아이콘 라이브러리 npm install lucide-react
import { Search } from 'lucide-react';

//---1.Global Styles ---
export const GlobalStyle = createGlobalStyle`
:root{
--primary-color: #646cff;
--banner-bg: #81e6d9;
--hover-card-bg: #f8f9fa;
--text-main: #333;
--text-muted: #6c757d;
}
body{
font-family:'Pretendard', -apple-system, BlinkMacSystemFont,
'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
color: var(--text-main);
background-color:#fff;
margin:0;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing:grayscale;
//글자를 화면에 더 부드럽게 렌더링
}
a{ text-decoration:none; color:inherit;}
ul{list-style:none; padding:0; margin:0;}

.carousel-indicators[data-bs-target]{
width:10px; height:10px; border-radius:50%;
background-color:rgba(0,0,0,0.3)
}
.carousel-indicators .active{ backgorund-color:#fff;}
.carousel-control-prev-icon, 
.carousel-control-next-icon { filter: invert(1);}
`;

//-common
export const SectionTitle = styled.h2`
font-size:3rem; font-weight:700;
margin-bottom:30px;
@media (max-width: 768px) { 
font-size:1.5rem; margin-bottom:20px; 
}
`;

export const BookCard = styled(Card)`
border:none; border-radius:12px; overflow:hidden;
transition: transform 0.2s, box-shadow 0.2s;
background-color: var(--hover-card-bg);
height:100%;
&:hover{
transform:translateY(-5px);
box-shadow: 0 10px 20px rgba(0,0,0, 0.05);
}
@media (max-width: 768px) {
margin-bottom:15px;
}
`;

export const BookImage = styled.div<{bg: string}>`
height:250px; 
background-image:url(${props => props.bg});
background-size:contain;
background-position:center;
background-repeat:no-repeat;
margin:20px;
@media (max-width:768px){
height:200px;
}
`;

export const BookTitle = styled(Card.Title)`
font-size:1rem;
 font-weight:600;
  margin-top:10px;
text-align:center;
`;

export const TabNav = styled(Nav)`
margin-bottom:20px; flex-wrap:nowrap;
overflow-x:auto; white-space:nowrap;
&::-webkit-scrollbar{display:none;}

.nav-link{
color: var(--text-muted);
font-weight:500;
padding:8px 16px;
border-radius:20px;
border:1px solid transparent;
&.active{
color:#fff; background-color:#333;
border-color:#333;
}
&:hover:not(.active){background-color:#eee;}
}
`;

//- header
export const StyledHeader = styled.header`
border-bottom:1px solid #eee; padding:10px 0;
`;
export const HeaderLogo = styled(Navbar.Brand)`
font-size:1.5rem; font-weight:800; color:#333;
&:hover{color:#333;}
`;
export const SearchForm = styled(Form)`
position:relative; width:300px;
@media (max-width: 992px) {
width:100%; margin:10px 0;
}
.form-control{
border-radius:20px; padding-right:40px;
}
`;
export const SearchIcon = styled(Search)`
position:absolute; right:12px; top:50%;
transform:translateY(-50%); color:#aaa;
cursor:pointer;
`;

//- Main banner
export const BannerSlide = styled.div<{ $bg: string }>`
background-color:${props => props.$bg};
height:400px; display:flex; align-items:center;
position:relative;

@media (max-width: 992px) {
    height:350px;
}

@media (max-width: 768px) {
    height:300px;
}
`;
export const BannerContent = styled(Container)`
display:flex; align-items:center;
justify-content:space-between;
height:100%;
`;
export const BannerText = styled.div`
max-width:50%; color:#333; z-index:2;
.category-badge{
background-color:#333; color:#fff; padding:5px 10px; 
border-radius:15px; font-size:0.8rem; 
display:inline-block; margin-bottom:15px;
}
h1{ font-size:2.5rem; font-weight:700; 
margin-bottom:15px; line-height:1.2;}
p{ font-size:1.1rem; color:#555;}
.view-more{
font-size:0.9rem; font-weight:600; color:#333;
display:inline-flex; align-items:center;
gap:5px;
&:hover{text-decoration:underline;}
}
@media (max-width: 992px){
max-width:100%; 
h1{ font-size:2rem; }
p{font-size:1rem;}
}
@media (max-width:768px) {
h1 {font-size:1.6rem;}
}
`;
export const BannerBookImages = styled.div`
display:flex;
gap:15px;
height:80%;
img{height:100%; object-fit:contain;}
@media (max-width: 992px) { display:none;}
`;
export const BannerPerson = styled.div`
position:absolute; right:10%; bottom:0;
height:90%; 
img{ height:100%; object-fit:contain;}
@media (max-width: 992px) {
opacity:0.3; right:0; height:100%;
}
`;

//-Quick Menu
export const QuickMenuSection = styled.section`
padding:40px 0;
text-align:center;
@media (max-width: 768px) {padding:20px 0;}
`;
export const QuickMenuItem = styled.div`
display:flex; flex-direction:column;  align-items:center;
gap:10px; color:var(--text-main);
transition:color 0.2s;
cursor:pointer;
margin-bottom:15px; 
`;

// - Green Pick -
export const HashTagList = styled.div`
display:flex; gap:10px; flex-wrap:wrap;
margin-bottom:30px;
.hashtag{
background-color:#333;
color:#fff;
padding:8px 15px;
border-radius:20px;
font-size:0.9rem;
font-weight:500;
cursor:pointer;
transition:background-color 0.2s;
&:hover{background-color:#555;}
@media (max-width: 768px) {
padding:6px 12px; 
font-size:0.8rem;
}
}
`;

// - Best Seller -
export const BestSellerItem = styled(Row)``;
export const BestSellerRank = styled.div``;
export const BestSellerBookTitle = styled.div``;
export const BestSellerTag = styled.div``;

// - YouTube -
export const YoutubeCard = styled(Card)``;
export const YoutubeThumbnail = styled.div<{ bg: string }>``;
export const YoutubeText = styled.div``;
export const YoutubeSectionNav = styled.div``;

// - Event -
export const EventSectionNav = styled.div``;
export const EventItem = styled(Row)``;
export const EventBadge = styled.span<{ type: string }>``;
export const EventTitle = styled.div``;
export const EventDate = styled.div``;

// - Community -
export const CommunityButton = styled(Button)``;

// - Footer -
export const StyledFooter = styled.footer``;
export const FooterLinkList = styled.ul``;
export const FooterCompanyInfo = styled.div``;
export const FooterSnsIcons = styled.div``;

// - Floating Button -
export const FloatingBtn = styled.button``;





