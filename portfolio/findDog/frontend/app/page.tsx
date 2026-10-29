'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { 
  fetchAnimals, 
  fetchCampaigns, 
  fetchHomeExtras, 
  setActiveHashtag 
} from './redux/homeSlice';

import SplashScreen from './components/SplashScreen'; // 💡 스플래시 컴포넌트 임포트

import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {
  NotificationsNone as NotificationsNoneIcon,
  PetsOutlined as PetsOutlinedIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import { Dog, Cat, Rabbit, MapPin, Heart } from 'lucide-react';

import * as S from '@/assets/css/style.styles';
import Header from './components/Header';
import Footer from './components/Footer';

import BannerCarousel from './components/content/BannerCarousel';
import ConnectsCarousel from './components/content/ConnectCarousel';

// 1. 필요한 MUI 아이콘들을 상단에 import 합니다.
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // 소개
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined'; // 입양 캠페인 (손 위에 하트)
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'; // 포인기부 (저금통)
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined'; // 지원/혜택 (선물상자)
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'; // 스토어 (상점)

// 2. 렌더링할 메뉴 데이터를 객체 배열로 분리하여 정의합니다.
const quickMenus = [
  { name: '소개', icon: <InfoOutlinedIcon style={{ color: '#b5a196' }} /> },
  { name: '입양 캠페인', icon: <VolunteerActivismOutlinedIcon style={{ color: '#b5a196' }} /> },
  { name: '어서찾아주개 기부', icon: <SavingsOutlinedIcon style={{ color: '#b5a196' }} /> },
  { name: '지원/혜택', icon: <CardGiftcardOutlinedIcon style={{ color: '#b5a196' }} /> },
  { name: '스토어', icon: <StorefrontOutlinedIcon style={{ color: '#b5a196' }} /> },
];

const campaignHashtags = ['#제주입양', '#임시보호', '#치료지원'];

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  // 💡 스플래시 노출 여부를 관리하는 상태 (초기값 false로 설정 후 useEffect에서 판별)
  const [showSplash, setShowSplash] = useState(false);

  // Redux Store 상태 조회
  const {
    animals,
    isAnimalsLoading,
    campaigns,
    isCampaignsLoading,
    activeHashtag,
    youtubePosts,
    fellowNews,
    needHelps,
  } = useSelector((state: RootState) => state.home);

  // 💡 컴포넌트 마운트 시 세션 스토리지 확인하여 스플래시 제어
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (!hasSeenSplash) {
      // 최초 접속 시: 스플래시 보여주고, 세션 스토리지에 기록 남기기
      setShowSplash(true);
      sessionStorage.setItem('hasSeenSplash', 'true');
      
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // 2초 후 스플래시 종료
      
      return () => clearTimeout(timer); // 언마운트 시 클리어
    }
    // 이미 본 경우 (hasSeenSplash === 'true') 에는 showSplash 상태가 false 그대로 유지됨
  }, []);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    dispatch(fetchAnimals());
    dispatch(fetchHomeExtras());
  }, [dispatch]);

  // activeHashtag가 바뀔 때마다 캠페인 데이터 재조회
  useEffect(() => {
    dispatch(fetchCampaigns(activeHashtag));
  }, [dispatch, activeHashtag]);

  const handleHashtagClick = (tag: string) => {
    dispatch(setActiveHashtag(tag));
  };

  // 💡 showSplash가 true일 때는 스플래시 화면만 렌더링
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <S.AppWrapper>    
        <Header isMain={true}/>
        <S.Container>

          <S.Mt70/>

          <BannerCarousel/>
          
          <S.QuickMenu>
            {quickMenus.map((menu, idx) => (
              <S.MenuIconWrapper key={idx}>
                <S.IconCircle>
                  {menu.icon}
                </S.IconCircle>
                <S.MenuText>{menu.name}</S.MenuText>
              </S.MenuIconWrapper>
            ))}
          </S.QuickMenu>

          <S.Divider/>

          <ConnectsCarousel/>

          {/* 이달의 추천 입양 동물 */}
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
              {isAnimalsLoading ? (
                <S.StatusText>데이터를 불러오는 중입니다...</S.StatusText>
              ) : animals.length === 0 ? (
                <S.StatusText>추천 동물이 없습니다</S.StatusText>
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

          <S.Divider/>

          {/* 입양 캠페인 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>입양 캠페인</S.SectionTitle>
              <S.MoreButton>더보기  &gt;</S.MoreButton>   
            </S.SectionHeader>

            <S.HashtagScroll>
              {campaignHashtags.map((tag, idx) => (
                <S.HashtagBtn
                  key={idx}
                  $active={activeHashtag === tag}
                  onClick={() => handleHashtagClick(tag)}
                >
                  {tag}
                </S.HashtagBtn>      
              ))}
            </S.HashtagScroll>

            <S.HorizontalScroll>
              {isCampaignsLoading ? (
                <S.StatusText>캠페인을 불러오는 중입니다..</S.StatusText>
              ) : campaigns.length === 0 ? (
                <S.StatusText>해당 해시태그의 캠페인이 없습니다</S.StatusText>
              ) : (
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
                      <S.CampaignCardTitle>{item.title}</S.CampaignCardTitle>
                      <S.CampaignCardDesc>{item.content}</S.CampaignCardDesc>
                    </S.CampaignTextWrap>
                  </S.CampaignCard>      
                ))
              )}
            </S.HorizontalScroll>
          </S.Section>

          <S.Divider/>
          
          {/* 유튜브 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>어서찾아주개 유튜브</S.SectionTitle>
            </S.SectionHeader>
            <MDBRow className='g-2'>
              {youtubePosts.map((video) => (
                <MDBCol size="6" key={video.id} className='mb-3'>
                  <S.Thumb>
                    <S.VideoThumb src={video.thumbnailUrl} alt={video.title}/>
                    <S.YoutubePlayIcon/>
                  </S.Thumb>
                  <p>{video.title}</p>
                </MDBCol>
              ))}    
            </MDBRow>
          </S.Section>

          <S.Divider/>
          
          {/* 펠로우 소식 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>펠로우 소식</S.SectionTitle>
              <S.MoreButton>더보기 &gt</S.MoreButton>
            </S.SectionHeader>
            <MDBRow className='g-2'>
              {fellowNews.map((news) => (
                <MDBCol size="4" key={news.id} className="mb-2">
                  <S.Thumb>
                    <S.VideoThumb src={news.imageUrl} alt={news.title}/>
                  </S.Thumb>
                  <S.NewsTitle>{news.title}</S.NewsTitle>
                </MDBCol>
              ))}
            </MDBRow>
          </S.Section>

          <S.Divider/>
          
          {/* 도움이 필요해요 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>도움이 필요해요</S.SectionTitle>
              <S.MoreButton>더보기 &gt;</S.MoreButton>
            </S.SectionHeader>
            <MDBRow className='g-1'>
              {needHelps.map((help) => (
                <MDBCol size="3" key={help.id} className='mb-1'>
                  <S.Thumb>
                    <S.VideoThumb src={help.imageUrl} alt="도움이 필요해요"/>
                  </S.Thumb>        
                </MDBCol>
              ))}
            </MDBRow>
          </S.Section>

          {/* 통계 */}
          <S.Section $bgLight>
            <S.SectionHeader>
              <S.SectionTitle>2026.유기동물통계</S.SectionTitle>
              <S.MoreButton>더보기 &gt;</S.MoreButton>
            </S.SectionHeader>
            <S.StatBox>
              <S.StatItem><S.StatLabel $color="#198754">구조</S.StatLabel>6마리</S.StatItem>
              <S.StatItem><S.StatLabel $color="#0d6efd">입양률</S.StatLabel>25.2%</S.StatItem>
              <S.StatItem><S.StatLabel $color="#dc3545">안락사율</S.StatLabel>11.9%</S.StatItem>
            </S.StatBox>
          </S.Section> 

          <Footer/>
        </S.Container>  
      </S.AppWrapper>  
    </>
  );
}