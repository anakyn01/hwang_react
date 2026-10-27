import React from 'react';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { User, Menu, MessageSquareText, BookOpen, ChevronLeft,
ChevronRight, ChevronsRight} from 'lucide-react';
//npm install react-icons
//유명한 아이콘들은 폰트어썸에서만 사용됨
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import * as S from '../assets/css/styles';


export const Footer = () => {
    return(
        <>
        <S.StyledFooter>
  <Container>
    <S.FooterLinkList>
<li>회사 소개</li>
<li>이용 역관</li>
<li>개인정보처리방침</li>
<li>고객센터</li>
<li>제휴문의</li>
<li>투고문의</li>
<li>사이트맵</li>
    </S.FooterLinkList>
    <Row className='align-items-start'>
      <Col md={8}>
      <S.FooterCompanyInfo>
        <div className="footer-log">그린스터디북스</div>
        그린스터디(주) | 대표자: 구레나이 | 개인정보관리책임자: 구레나이린 | 사업자등록번호: 123-45-67890 | 통신판매업신고번호: 2026-서울서초-0000<br/>
                서울 서초구 그린로 304 (서초동) 그린타워 10층 | 팩스: 02-0000-0000 | 고객센터: 1661-0000<br/>
      </S.FooterCompanyInfo>
      </Col>
      <Col md={4} className='text-end d-flex flex-column align-items-end gap-3'>
      <S.FooterSnsIcons>
        <FaInstagram/><FaYoutube/><MessageSquareText/>
      </S.FooterSnsIcons>
      <Form.Select size="sm" style={{width:'150px'}}>
        <option>Family site</option>
        <option>그린스터디</option>
        <option>그린원격평생교육원</option>
      </Form.Select>
      </Col>
    </Row>
  </Container>
</S.StyledFooter>

{/* Floating Button */}
<S.FloatingBtn>
  <BookOpen/>
  <span>맟춤도서</span>
</S.FloatingBtn>
        </>
    )
}