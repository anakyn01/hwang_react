'use client';

import React,{useState, useEffect} from 'react';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
   MDBCardImage, MDBIcon 
} from 'mdb-react-ui-kit';
import {
  NotificationsNone as NotificationsNoneIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  Campaign as CampaignIcon,
  MenuBook as MenuBookIcon,
  PersonOutlined as PersonOutlineIcon,
  PetsOutlined as PetsOutlinedIcon
} from '@mui/icons-material';

import * as S from '../css/style.styles'

//1. 스프링부트에서 넘어올 동물 데이터의 타입(Interface) 정의
interface Animal {
  id:number;
  region:string;
  noticeNo:string;
  birthYear:string;
  gender:string;
  weight:number;
  imageUrl:string;
}

export default function  HomePage(){
//2. 동물 리스트 상태 관리
const [animals, setAnimals] = useState<Animal[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch('http://localhost:8080/api/animals/recommended')
  .then((res) => {
    if(!res.ok) throw new Error('네트워크 응답이 정상이 아닙니다');
    return res.json();
  }).then((data) => {
    setAnimals(data);
    setIsLoading(false);
  }).catch((error) => {
    console.error('API 호출 에러 :', error);
    setIsLoading(false);
  })
},[]);


  return(
    <>
<S.AppWrapper>    
<S.Container>
<S.Header>
  <S.Logo>어서찾아주개</S.Logo>
  <NotificationsNoneIcon fontSize="large"/>
</S.Header>

<S.Banner>
  <S.BannerTitle>
유기동물 입양자라면<br/>
50%할인 혜택을 받으세요!
  </S.BannerTitle>
  <S.BannerSub>
목줄 | 리드줄 | 물그릇
  </S.BannerSub>
  <S.BannerImage/>
</S.Banner>

<S.QuickMenu>
  {['소개','입양 캠페인','포인기부','지원/혜택','스토어'].map((menu, idx) =>(
<S.MenuIconWrapper key={idx}>
  <S.IconCircle>
    <PetsOutlinedIcon style={{ color:'#F28C28'}}/>
  </S.IconCircle>
  <S.MenuText>{menu}</S.MenuText>
</S.MenuIconWrapper>    
  ))}
</S.QuickMenu>

{/*이달의 추천 입양 동물 */}
<S.Section>
  
  <S.SectionHeader>
    <S.SectionTitle>이달의 추천 입양 동물</S.SectionTitle>
    <S.MoreButton>더보기 &gt;</S.MoreButton>
  </S.SectionHeader>

  <S.HorizontalScroll>
    {['강릉시','양양군','밀양시','마포센터','삼척시','화성','노원구','도봉구'].map((region, idx) =>(
      <S.RegionCircle key={idx}>
        <span>{region}</span>
      </S.RegionCircle>
    ))}
  </S.HorizontalScroll>

<S.HorizontalScroll>
  {isLoading ? (
    <S.StatusText>
      데이터를 불러오는 중입니다...
    </S.StatusText>
  ) : animals.length === 0 ? (
    <S.StatusText>
      추천 동물이 없습니다
    </S.StatusText>
  ) : (
    animals.map((animal) =>(
      <S.AnimalCard key={animal.id}>
        <S.CardImage
        src={animal.imageUrl || "https://via.placeholder.com/160x160"}
        alt={`dog-${animal.id}`}
        />
        <S.CardBody>
<S.CardTitle>{animal.region}{animal.noticeNo}</S.CardTitle>
<S.CardDesc>{animal.birthYear}/{animal.gender}/{animal.weight}Kg</S.CardDesc>
        </S.CardBody>
      </S.AnimalCard>
    ))
  )}
</S.HorizontalScroll>

</S.Section>

{/*통계 */}
<S.Section $bgLight>

<S.SectionHeader>
  <S.SectionTitle>
    2026.유기동물통계
  </S.SectionTitle>
  <S.MoreButton>더보기 &gt;</S.MoreButton>
</S.SectionHeader>

<S.StatBox>

  <S.StatItem>
    <S.StatLabel $color="#198754">구조</S.StatLabel>6마리
  </S.StatItem>

  <S.StatItem>
    <S.StatLabel $color="#0d6efd">입양률</S.StatLabel>25.2%
  </S.StatItem>

  <S.StatItem>
    <S.StatLabel $color="#dc3545">안락사율</S.StatLabel>11.9%
  </S.StatItem>

</S.StatBox>


</S.Section> 



</S.Container>  
</S.AppWrapper>  
    </>
  );
}