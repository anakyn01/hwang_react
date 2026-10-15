import styled,{createGlobalStyle} from 'styled-components';
import { Card, Nav, Form, Navbar, Button, Row, Container} from 'react-bootstrap';
import {Search} from 'lucide-react';

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
`;

//3.Subpage Specific Styles
export const SubPageContainer = styled(Container)``;
export const PageTitle = styled.h2``;
export const LargeSearchForm = styled(Form)``;
export const SearchIcon = styled(Search)``;
export const FilterBox = styled.div``;
export const FilterRow = styled.div``;
export const FilterLabel = styled.div``;
export const FilterOption = styled.div``;
export const FilterButton = styled.button<{$active?: boolean}>``;
export const FilterToggleBtn = styled.div``;
export const FilterActionArea = styled.div``;
export const ListHeader = styled.div``;
export const TotalCount = styled.div``;
export const SortOptions = styled.div``;
//-Pagination-
export const PaginationContainer = styled.div``;
export const PageNum = styled.button<{ $active?: boolean}>``;