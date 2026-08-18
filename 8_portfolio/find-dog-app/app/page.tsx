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
  PetsOutlined as PetsOutlinedIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';

import * as S from '../css/style.styles'
import Footer from './components/Footer';

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
//[추가] 2. 백엔드에서 넘어올 캠페인 데이터 타입 정의
interface Campaign{
  id:number; hashtag:string; content:string;
  thumbnailUrl:string; mediaType:string;
  mediaUrl:string;
}

//탭에 보여줄 해시태그 목록(배열관리)
const campaignHashtags = ['#제주입양','#임시보호','#치료지원'];


export default function  HomePage(){
//해시태그 상태 관리 (기본값으로 '#제주입양' 선택)
const [activeHashtag, setAtiveHashtag] = useState('#제주입양');

//2. 동물 리스트 상태 관리
const [animals, setAnimals] = useState<Animal[]>([]);
const [isLoading, setIsLoading] = useState(true);

//✨ [추가] 캠페인 리스트 상태 관리
const [campaigns, setCampaigns] = useState<Campaign[]>([]);
const [isCampaignLoading, setIsCampaignLoading] = useState(true);

useEffect(() => {
  fetch('/api/animals/recommended')
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

//✨ [추가] 캠페인 데이터 불러오기 (activeHashtag가 바뀔 때마다 실행!)
useEffect(() => {
setIsCampaignLoading(true);

const url =`/api/campaigns?hashtag=${encodeURIComponent(activeHashtag)}`;
fetch(url).then((res) => {
  if(!res.ok) throw new Error('캠페인 네트워크 응답이 정상이 아닙니다');
  return res.json();
}).then((data) => {
  setCampaigns(data);
  setIsCampaignLoading(false);
}).catch((error) => {
  console.error('캠페인 API 호출에러: ', error);
  setIsCampaignLoading(false);
})

},[activeHashtag]);


// 💡 2. 사진과 완벽히 똑같이 보일 테스트용 데이터! (나중에는 백엔드에서 받아오게 됩니다)
  //const campaignHashtags = ['#제주입양', '#외부기생충예방', '#사료건강', '#위생'];
  const mockCampaigns = [
    {
      id: 1,
      title: '제주-제주-2026-01786',
      desc: '2026(60일미만)(년생)/암컷/0.6(Kg)',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300', // 임시 강아지 사진
      isVideo: true // 동영상이면 썸네일에 플레이 버튼이 뜹니다!
    },
    {
      id: 2,
      title: '제주-제주-2026-01782',
      desc: '2026(60일미만)(년생)/암컷/1.1(Kg)',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300',
      isVideo: true
    },
    {
      id: 3,
      title: '제주-제주-2026-01789', // 사진 전용 게시물 예시
      desc: '2026(60일미만)(년생)/수컷/0.9(Kg)',
      imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=300',
      isVideo: false // false면 사진이므로 플레이 버튼이 뜨지 않음
    }
  ];


  return(
    <>
<S.AppWrapper>    
<S.Container>
<S.Header>
  <S.Logo>어서찾아주개</S.Logo>
  <NotificationsNoneIcon fontSize="large"/>
</S.Header>
<S.Mt70/>
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

<S.Section>

  <S.SectionHeader>
    <S.SectionTitle>입양 캠페인</S.SectionTitle>
    <S.MoreButton>더보기 &gt;</S.MoreButton>   
  </S.SectionHeader>

  <S.HashtagScroll>
    {campaignHashtags.map((tag, idx) => (
<S.HashtagBtn
key={idx}
$active={activeHashtag === tag}
onClick={() => setAtiveHashtag(tag)}
>
  {tag}
</S.HashtagBtn>      
    ))}
  </S.HashtagScroll>

  <S.HorizontalScroll>
    {/* {mockCampaigns.map((item) => ( */}
    {isCampaignLoading ? (
      <S.StatusText>캠페인을 불러오는 중입니다..</S.StatusText>
    ): campaigns.length === 0 ? (
      <S.StatusText>해당 해시태그의 캠페인이 없습니다</S.StatusText>
    ):(
      campaigns.map((item) => (
<S.CampaignCard key={item.id}>
  <S.CampaignMediaWrap>
    <S.CampaignImg src={item.thumbnailUrl} alt={item.title}/>
    {item.mediaType !== 'IMAGE' && (
      <S.PlayIconWrap>
        <PlayArrowIcon style={{fontSize:'18px'}}/>
      </S.PlayIconWrap>
    )}
  </S.CampaignMediaWrap>
  <S.CampaignTextWrap>
    <S.CampaignCardTitle>
      {item.title}
    </S.CampaignCardTitle>
    <S.CampaignCardDesc>
      {item.content}
    </S.CampaignCardDesc>
  </S.CampaignTextWrap>
</S.CampaignCard>      
    )))}
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

<Footer/>

</S.Container>  
</S.AppWrapper>  
    </>
  );
}