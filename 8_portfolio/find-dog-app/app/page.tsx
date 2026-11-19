'use client';

import React, { useState, useEffect } from 'react';
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

import * as S from '../css/style.styles';
import Footer from './components/Footer'; // 경로가 app/components/Footer라면 './components/Footer'로 유지하세요.
import { RENDER_API_URL } from '../config/api';

// 1. 스프링부트에서 넘어올 동물 데이터의 타입(Interface) 정의
interface Animal {
  id: number;
  region: string;
  noticeNo: string;
  birthYear: string;
  gender: string;
  weight: number;
  imageUrl: string;
}

// 2. 백엔드에서 넘어올 캠페인 데이터 타입 정의
interface Campaign {
  id: number;
  title: string;
  hashtag: string;
  content: string;
  thumbnailUrl: string;
  mediaType: string;
  mediaUrl: string;
}

interface YoutubePost {
  id: number;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
}

interface FellowNews {
  id: number;
  title: string;
  imageUrl: string;
}

interface NeedHelp {
  id: number;
  imageUrl: string;
}

// 탭에 보여줄 해시태그 목록(배열관리)
const campaignHashtags = ['#제주입양', '#임시보호', '#치료지원'];

export default function HomePage() {
  // 해시태그 상태 관리 (기본값으로 '#제주입양' 선택)
  const [activeHashtag, setAtiveHashtag] = useState('#제주입양');

  // 동물 리스트 상태 관리
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 캠페인 리스트 상태 관리
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isCampaignLoading, setIsCampaignLoading] = useState(true);

  // 3개 상태관리 추가
  const [youtubePosts, setYoutubePosts] = useState<YoutubePost[]>([]);
  const [fellowNews, setFellowNews] = useState<FellowNews[]>([]);
  const [needHelps, setNeedHelps] = useState<NeedHelp[]>([]);

  useEffect(() => {
    fetch(`${RENDER_API_URL}/api/animals/recommended`)
      .then((res) => {
        if (!res.ok) throw new Error('네트워크 응답이 정상이 아닙니다');
        return res.json();
      })
      .then((data) => {
        setAnimals(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API 호출 에러 :', error);
        setIsLoading(false);
      });

    fetch(`${RENDER_API_URL}/api/youtube`)
      .then((res) => res.json())
      .then((data) => setYoutubePosts(data))
      .catch((error) => console.error('유튜브 데이터 호출에러:', error));

    fetch(`${RENDER_API_URL}/api/fellow-news`)
      .then((res) => res.json())
      .then((data) => setFellowNews(data))
      .catch((error) => console.error('펠로우 소식 데이터 호출에러:', error));

    fetch(`${RENDER_API_URL}/api/need-help`)
      .then((res) => res.json())
      .then((data) => setNeedHelps(data))
      .catch((error) => console.error('도움이 필요해요 데이터 호출에러:', error));
  }, []);

  // 캠페인 데이터 불러오기 (activeHashtag가 바뀔 때마다 실행)
  useEffect(() => {
    setIsCampaignLoading(true);

    const url = `${RENDER_API_URL}/api/campaigns?hashtag=${encodeURIComponent(activeHashtag)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('캠페인 네트워크 응답이 정상이 아닙니다');
        return res.json();
      })
      .then((data) => {
        setCampaigns(data);
        setIsCampaignLoading(false);
      })
      .catch((error) => {
        console.error('캠페인 API 호출에러: ', error);
        setIsCampaignLoading(false);
      });
  }, [activeHashtag]);

  return (
    <>
      <S.AppWrapper>
        <S.Container>
          <S.Header>
            <S.Logo>어서찾아주개</S.Logo>
            <NotificationsNoneIcon fontSize="large" />
          </S.Header>
          <S.Mt70 />
          <S.Banner>
            <S.BannerTitle>
              유기동물 입양자라면<br />
              50%할인 혜택을 받으세요!
            </S.BannerTitle>
            <S.BannerSub>
              목줄 | 리드줄 | 물그릇
            </S.BannerSub>
            <S.BannerImage />
          </S.Banner>

          <S.QuickMenu>
            {['소개', '입양 캠페인', '포인기부', '지원/혜택', '스토어'].map((menu, idx) => (
              <S.MenuIconWrapper key={idx}>
                <S.IconCircle>
                  <PetsOutlinedIcon style={{ color: '#F28C28' }} />
                </S.IconCircle>
                <S.MenuText>{menu}</S.MenuText>
              </S.MenuIconWrapper>
            ))}
          </S.QuickMenu>

          {/* 이달의 추천 입양 동물 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>이달의 추천 입양 동물</S.SectionTitle>
              <S.MoreButton>더보기 &gt;</S.MoreButton>
            </S.SectionHeader>

            <S.HorizontalScroll>
              {['강릉시', '양양군', '밀양시', '마포센터', '삼척시', '화성', '노원구', '도봉구'].map((region, idx) => (
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
                animals.map((animal) => (
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

          {/* 입양 캠페인 */}
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
              {isCampaignLoading ? (
                <S.StatusText>캠페인을 불러오는 중입니다..</S.StatusText>
              ) : campaigns.length === 0 ? (
                <S.StatusText>해당 해시태그의 캠페인이 없습니다</S.StatusText>
              ) : (
                campaigns.map((item) => (
                  <S.CampaignCard key={item.id}>
                    <S.CampaignMediaWrap>
                      <S.CampaignImg src={item.thumbnailUrl} alt={item.title} />
                      {item.mediaType !== 'IMAGE' && (
                        <S.PlayIconWrap>
                          <PlayArrowIcon style={{ fontSize: '18px' }} />
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
                ))
              )}
            </S.HorizontalScroll>
          </S.Section>

          {/* 어서찾아주개 유튜브 (2단 그리드) */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>
                어서찾아주개 유튜브
              </S.SectionTitle>
            </S.SectionHeader>

            <MDBRow className='g-2'>
              {youtubePosts.map((video) => (
                <MDBCol size="6" key={video.id} className='mb-3'>
                  <S.Thumb>
                    <S.VideoThumb
                      src={video.thumbnailUrl}
                      alt={video.title}
                    />
                    <S.YoutubePlayIcon />
                  </S.Thumb>
                  <p>{video.title}</p>
                </MDBCol>
              ))}
            </MDBRow>
          </S.Section>

          {/* 펠로우 소식 3단 그리드 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>
                펠로우 소식
              </S.SectionTitle>
              <S.MoreButton>더보기 &gt;</S.MoreButton>
            </S.SectionHeader>
            <MDBRow className='g-2'>
              {fellowNews.map((news) => (
                <MDBCol size="4" key={news.id} className="mb-2">
                  <S.Thumb>
                    <S.VideoThumb
                      src={news.imageUrl} alt={news.title}
                    />
                  </S.Thumb>
                  <S.NewsTitle>
                    {news.title}
                  </S.NewsTitle>
                </MDBCol>
              ))}
            </MDBRow>
          </S.Section>

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
                    <S.VideoThumb
                      src={help.imageUrl}
                      alt="도움이 필요해요" />
                  </S.Thumb>
                </MDBCol>
              ))}
            </MDBRow>
          </S.Section>

          {/* 통계 */}
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

          <Footer />
        </S.Container>
      </S.AppWrapper>
    </>
  );
}