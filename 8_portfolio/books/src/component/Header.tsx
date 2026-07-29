import React from 'react';
import { Container, Navbar, Nav, FormControl} from 'react-bootstrap';
import { User, Menu, MessageSquareText, BookOpen, ChevronLeft,
ChevronRight, ChevronsRight} from 'lucide-react';
//npm install react-icons
//유명한 아이콘들은 폰트어썸에서만 사용됨
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import * as S from '../assets/css/styles';

export const Header = () => {
    return(
        <>
        <S.StyledHeader>
        <Container>
          <Navbar expand='lg'>
            <S.HeaderLogo href="/">그린스터디북스</S.HeaderLogo>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"
            className='justify-content-center'
            >
              <Nav>
                <Nav.Link href="">초등</Nav.Link>
                <Nav.Link href="/middle">중등</Nav.Link>
                <Nav.Link href="">고등</Nav.Link>
                <Nav.Link href="">단행본</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        
        <div 
        className="d-flex align-items-center gap-3 ms-auto mt-2 mt-lg-0">
          <S.SearchForm
          className="d-none d-lg-block"
          >
            <FormControl type="text" placeholder='검색어 입력'/>
            <S.SearchIcon size={20}/>
          </S.SearchForm>
        
          <User size={24} style={{ cursor: 'pointer'}}/>
          <Menu size={24} style={{ cursor: 'pointer'}}
          className='d-lg-none'
          />
        </div>
        
        {/*모바일 전용 검색바 */}
        <S.SearchForm 
        className="d-lg-none w-100 mt-3"
        >
          <FormControl type="text" placeholder='검색어 입력'/>
          <S.SearchIcon size={20}/>
        </S.SearchForm> 
          </Navbar>
        </Container>
        </S.StyledHeader> 
        
        </>
    )
}