import React,{useState} from 'react';
import { Row, Col, FormControl, Form, Button
    } from 'react-bootstrap';
import { ChevronRight, ChevronsRight} from 'lucide-react';
import * as S from '../assets/css/styles';

//Mock Data(서브페이지용 도서 데이터)
const mockBooks = [
{id:1, title:'백신 N제 중학 과학 1-1 659제', subject:'과학', grade:'중1', image:'https://placehold.co/180x240/f8d7da/dc3545?text=Science+1-1' },
{ id: 2, title: '백신 N제 중학 과학 2-2 793제', subject: '과학', grade: '중2', image: 'https://placehold.co/180x240/d1e7dd/198754?text=Science+2-2' },
  { id: 3, title: '문해력 진단 평가 중급', subject: '국어', grade: '중1, 중2', image: 'https://placehold.co/180x240/cff4fc/0dcaf0?text=Korean' },
  { id: 4, title: '풀어영 : 풀어서 외우는 영단어 중2', subject: '영어', grade: '중2', image: 'https://placehold.co/180x240/f8f9fa/212529?text=English+2' },
  { id: 5, title: '풀어영 : 풀어서 외우는 영단어 중3', subject: '영어', grade: '중3', image: 'https://placehold.co/180x240/f8f9fa/212529?text=English+3' },
  { id: 6, title: '풀어영 : 풀어서 외우는 영단어 중1', subject: '영어', grade: '중1', image: 'https://placehold.co/180x240/f8f9fa/212529?text=English+1' },
  { id: 7, title: '풀어영 : 풀어서 외우는 영단어 예비고', subject: '영어', grade: '중3, 예비고', image: 'https://placehold.co/180x240/f8f9fa/212529?text=Eng+Pre-High' },
  { id: 8, title: '풀어영 : 풀어서 외우는 영단어 예비중', subject: '영어', grade: '초6, 예비중', image: 'https://placehold.co/180x240/f8f9fa/212529?text=Eng+Pre-Mid' },
];


export const Middle =() => {
    //필터 상태 관리
    const [activeClass, setActiveClass] = useState('중등');
    const [activeSubject, setActiveSubject] = useState('전체');
    const [activeGrade, setActiveGrade] = useState('전체');
    const [activeTerm, setActiveTerm] = useState('전체');

    return(
        <>
        <S.SubPageContainer>
            <S.PageTitle>중등도서</S.PageTitle>

            <S.LargeSearchForm>
                <FormControl type="text"
                placeholder='제목 ,저자, 과목, 키워드로 도서를 검색할수 있습니다'
                />
                    <S.SearchIcon size={24}/>
                
            </S.LargeSearchForm>

            {/*필터 섹션 */}
            <S.FilterBox>
                <S.FilterRow>
                    <S.FilterLabel>분류</S.FilterLabel>
                    <S.FilterOption>
{['전체','초등','고등','중등','단행본'].map(opt =>(
    <S.FilterButton 
    key={opt} 
    $active={activeClass === opt}
    onClick={() => setActiveClass(opt)}>
        {opt}
    </S.FilterButton>
))}
                    </S.FilterOption>
                </S.FilterRow>

<S.FilterRow>
    <S.FilterLabel>과목</S.FilterLabel>
    <S.FilterOption>
        { ['전체','국어','영어','수학','과학', '사회/한국사'].map(opt => (
<S.FilterButton
key={opt}
$active={activeSubject === opt}
onClick={() => setActiveSubject(opt)}
>
{opt}   
</S.FilterButton>
        ))}
    </S.FilterOption>
</S.FilterRow>

<S.FilterRow>
    <S.FilterLabel>학년</S.FilterLabel>
    <S.FilterOption>
        {/*과제 */}
    </S.FilterOption>
</S.FilterRow>

<S.FilterRow>
    <S.FilterLabel>학기</S.FilterLabel>
    <S.FilterOption>
        {/*과제 */}
    </S.FilterOption>
</S.FilterRow>

<S.FilterToggleBtn>필터 더보기</S.FilterToggleBtn>


            </S.FilterBox>

<S.FilterActionArea>
    <Button variant="light"
    style={{border:'1px solid #ddd', borderRadius:'20px', padding:'8px 25px'}}
    >
        초기화
    </Button>
    <Button variant="dark"
    style={{borderRadius:'20px', padding:'8px 25px'}}
    >
        필터 적용
    </Button>
</S.FilterActionArea>

{/* 리스트 헤더 (총건수 및 정렬) */}
<S.ListHeader>
    <S.TotalCount>총<span>104</span>건</S.TotalCount>
    <div className='d-flex align-items-center gap-4'>
        <S.SortOptions>
            <span className='active'>최신순</span>
            <span>인기순</span>
        </S.SortOptions>
        <Form.Check
        type="switch"
        id="series-switch"
        label="시리즈로보기"
        style={{fontWeight:500, color:'#555', fontSize:'0.95rem'}}
        />
    </div>
</S.ListHeader>

{/*도서 목록 그리드 */}
<Row>
    {mockBooks.map(book => (
<Col xs={6} md={4} lg={3} key={book.id}>
<S.BookCard>
    <S.BookImgBox>
        <img src={book.image} alt=""/>
    </S.BookImgBox>
</S.BookCard>
</Col>       
    ))}
</Row>

{/*페이징 (Pagination) */}
<S.PaginationContainer>
    <S.PageNum $active>1</S.PageNum>
    <S.PageNum>2</S.PageNum>
    <S.PageNum>3</S.PageNum>
    <S.PageNum>4</S.PageNum>
    <S.PageNum>5</S.PageNum>
    <S.PageNum>
        <ChevronRight size={16}/>
        <ChevronsRight size={16}/>
    </S.PageNum>
</S.PaginationContainer>


        </S.SubPageContainer>
        </>
    )
}