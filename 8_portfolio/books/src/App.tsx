import React, {useState} from 'react';
import { Container, Row, Col, Navbar, Nav, FormControl, 
Carousel, Card, Form}from 'react-bootstrap';
import * as S from './assets/css/styles';
import { User, Menu, MessageSquareText, BookOpen,
ChevronRight, ChevronsRight} from 'lucide-react';
//npm install react-icons
//유명한 아이콘들은 폰트어썸에서만 사용됨
import { FaInstagram, FaYoutube } from 'react-icons/fa';

//--Data Mockups ---
const bestSellerData = [
  { id: 1, rank: 1, title: '용돈 잘 쓰는 법', image: 'https://placehold.co/150x200/9575cd/ffffff?text=BOOK+1' },
  { id: 2, rank: 2, title: '뭔말 과학 용어 200 1권', image: 'https://placehold.co/150x200/81d4fa/ffffff?text=BOOK+2' },
  { id: 3, rank: 3, title: '뭔말 과학 용어 200 2권', image: 'https://placehold.co/150x200/f48fb1/ffffff?text=BOOK+3' },
  { id: 4, rank: 4, title: '초등 수능 수학 KICK', image: 'https://placehold.co/150x200/81e6d9/ffffff?text=BOOK+4' },
];

const eventData = [
{ id: 1, type: '채널', title: '“선생님 스트레스 풀어영” 채택 EVENT', date: '2026.07.27 ~ 2026.08.31' },
  { id: 2, type: '해외', title: '그린스터디북스 글로벌 에디션', date: '2026.07.01 ~ 2026.12.31' },
  { id: 3, type: '라인업', title: '그린스터디북스 초중고 국어 참고서 라인업', date: '상시' },
];

const youtubeData =[
{ id: 1, category: '한능검', title: '한능검 끝판왕\n총 제작 기간 4년\n압도적 퀄리티', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+1' },
  { id: 2, category: '초등 한국사', title: '하루 2장, 초등 한능검 30일 완성!\n능력검정시험 기본 완벽 대비', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+2' },
  { id: 3, category: '집밥 백과', title: '평생 소장 클래식 집밥 백과\n박막례 할머니의 손맛 비법', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+3' },
];

function App() {

  const [greenPickTab, setGreenPickTab] = useState('전체');
  const [bestSellerTab, setBestSellerTab] = useState('초등');
 

  return (
    <>
 <S.GlobalStyle/>
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
        <Nav.Link href="">중등</Nav.Link>
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

{/*Main Banner*/}
<Carousel>
  <Carousel.Item>
    <S.BannerSlide $bg="#81e6d9">
      <S.BannerContent>
        <S.BannerText>
          <span className='category-badge'>
            고등
          </span>
          <h1>수능 수학 첫 개념 수업<br/>수능 수학 KICK</h1>
          <p>수능 수학에 꼭 필요한 개념과 유형만 담았다!</p>
          <a href="#" className='view-more'>
            View more <ChevronsRight size={16}/>
          </a>
        </S.BannerText>
        <S.BannerBookImages>
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
        </S.BannerBookImages>
        <S.BannerPerson>
          <img src="" alt=""/>
        </S.BannerPerson>
      </S.BannerContent>
    </S.BannerSlide>
  </Carousel.Item>

<Carousel.Item>
  <S.BannerSlide $bg="#1a1a1a">
    <S.BannerContent className="justify-content-center">
      <div className="">
        <div className="">그린스터디 북스</div>
        <p>이제 스마트 하게 공부 하세요</p>
      </div>
    </S.BannerContent>
  </S.BannerSlide>
</Carousel.Item>

</Carousel>

{/*Quick Menu */}
<S.QuickMenuSection>
  <Container>
    <Row className='justify-content-center'>
      {[
        {icon:BookOpen, text:'정답 및 해설'},
        {icon:MessageSquareText, text:'정오표'},
        {icon:FaYoutube, text:'듣기자료'},
        {icon:BookOpen, text:'교사용 자료'},
        {icon:BookOpen, text:'교사용 이북'},
        {icon:Menu, text:'총판 안내'},
        {icon:MessageSquareText, text:'FAQ'}
      ].map((item, idx) =>(
<Col xs={4} md={3} lg={1} key={idx} className='mb-3'>
<S.QuickMenuItem>
  <div className="icon-box">
    <item.icon/>
  </div>
  <span>{item.text}</span>
</S.QuickMenuItem>
</Col>
      ))}
    </Row>
  </Container>
</S.QuickMenuSection>

{/*creen pick */}
<section style={{padding:'40px 0'}}>
  <Container>
    <S.SectionTitle>그린 PICK</S.SectionTitle>
    <S.HashTagList>
  {['# 해외 수출 도서','# 백점백승', '# 초등공부시작부터끝까지','# 스타강사Pick', 
'# 2022개정교육과정', '# 탄탄한초등기본기', '# 학원쌤의선택' ].map(tag => (
    <span key={tag} className='hashtag'>{tag}</span>
  ))}
    </S.HashTagList>

    <S.TabNav variant="pills"
    activeKey={greenPickTab}
    onSelect={(k) => setGreenPickTab (k || '전체')}
    >
{['전체','초등','중등','고등','단행본'].map(tab =>(
  <Nav.Item key={tab}>
    <Nav.Link eventKey={tab}>
      {tab}
    </Nav.Link>
  </Nav.Item>
))}
    </S.TabNav>

<Row>
  {bestSellerData.slice(0, 3).map(book => (
    <Col xs={12} md={4} key={book.id}>
      <S.BookCard>
        <S.BannerBookImages $bg={book.image}/>
        <Card.Body>
          <S.BookTitle>
            {book.title}
          </S.BookTitle>
        </Card.Body>
      </S.BookCard>
    </Col>
  ))}
</Row>

  </Container>
</section>
    </>
  )
}

export default App
