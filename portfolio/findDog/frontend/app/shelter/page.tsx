'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchShelterAnimals, setActiveTab, toggleAlert } from '../redux/shelterSlice';

import * as A from '@/assets/css/style.styles';
import Footer from '../components/Footer';

//MUI
import {
  NotificationsNone as NotificationsNoneIcon,
  NotificationsOutlined as NotificationsIcon,
  TuneOutlined as FilterIcon,
  FmdGood as LocationIcon,
  PlayCircleFilled as PlayIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

export default function Shelter(){
  const dispatch = useDispatch<AppDispatch>();

  // Redux Store 상태 조회
  const { activeTab, isAlertOn, animals, loading } = useSelector((state: RootState) => state.shelter);

  useEffect(() => {
    dispatch(fetchShelterAnimals());
  }, [dispatch]);

  // 이미지 주소 변환함수
  const getFullImageUrl = (url: string) => {
    if (!url) return 'http://via.placeholder.com/110';
    if (url.startsWith('/uploads/')){
      return `http://localhost:8080${url}`;
    }
    return url;
  };

  return(
    <>
      <A.AppWrapper>
        <A.Container>
          <A.Header>
            <A.Logo>어서찾아주개</A.Logo>
            <NotificationsNoneIcon fontSize="large"/>
          </A.Header>
           
          <A.TabContainer>
            {['보호동물', '보호소 찾기', '추천 입양 동물'].map((tab) =>(
              <A.TabBtn
                key={tab}
                $active={activeTab === tab}
                onClick={() => dispatch(setActiveTab(tab))}       
              >
                {tab}            
              </A.TabBtn>
            ))}
          </A.TabContainer>

          {/*필터 영역 */}
          <A.FilterContainer>
            <A.FilterIconBtn>
              <FilterIcon sx={{ fontSize:20, color: '#666'}}/>
            </A.FilterIconBtn>

            <A.FilterSelect defaultValue="3months">
              <option value="3months">최근 3개월</option>
            </A.FilterSelect>

            <A.FilterSelect defaultValue="allArea">
              <option value="allArea">모든 지역</option>
            </A.FilterSelect>

            <A.FilterSelect defaultValue="allAnimal">
              <option value="allAnimal">모든 동물</option>
            </A.FilterSelect>
          </A.FilterContainer>

          {/*실시간 알림 토글배너 */}
          <A.AlertBanner>
            <A.AlertInfo>
              <div className="icon-circle">
                <NotificationsIcon sx={{}}/>
              </div>
              <div className="text-group">
                <strong>이 지역 실시간 알림</strong>
                <span>새 공고가 올라오면 알려드려요</span>
              </div>
            </A.AlertInfo>
            <A.ToggleBtn
              $isOn={isAlertOn}
              onClick={() => dispatch(toggleAlert())}
            >
              <div className='handle'/>
            </A.ToggleBtn>
          </A.AlertBanner>

          <A.Divider/>

          <A.RecommendSection>
            <A.SectionHeader>
              <A.H2Size20>이달의 추천 입양 동물</A.H2Size20>
              <Link href="#more" className='more-link'>
                더보기<ChevronRightIcon sx={{fontSize:18}}/>
              </Link>
            </A.SectionHeader>

            <A.RecommendScroll>
              <A.RecommendCard>
                <A.RecommendImgBox>
                  <img src="https://via.placeholder.com/140" alt="추천동물" />
                  <PlayIcon className='play-icon' sx={{}}/>
                </A.RecommendImgBox>
                <A.LocationText>
                  <LocationIcon sx={{fontSize:16}}/>
                  강원특별자치도..
                </A.LocationText>
              </A.RecommendCard>
            </A.RecommendScroll>
          </A.RecommendSection>

          <A.Divider/>

          <A.ListSection>
            {loading ? (
              <div>데이터를 불러오는 중입니다...</div>
            ) : animals.length === 0 ? (
              <div>등록된 보호 동물이 없습니다</div>
            ) : (
              animals.map((animal) => (        
                <A.AnimalCard key={animal.id}>
                  <A.AnimalImgBox>
                    <img 
                      src={getFullImageUrl(animal.imageUrl)} 
                      alt={animal.breed}
                    />
                  </A.AnimalImgBox>
                  <A.AnimalInfo>
                    <A.BadgeGroup>
                      <A.Badge $type="status">
                        {animal.status === 'COMPLETED' ? '완료' : '공고중'}
                      </A.Badge>
                      <A.Badge $type={animal.gender === 'FEMALE' ? 'female' : animal.gender === 'MALE' ? 'male' : 'unknown'}>
                        {animal.gender === 'MALE' ? '수컷' : animal.gender === 'FEMALE' ? '암컷' : '미상'}
                      </A.Badge>
                    </A.BadgeGroup>
                    <A.InfoGrid>
                      <span className="label">품종</span>
                      <span className="value">{animal.breed}</span>
                      <span className="label">공고번호</span>
                      <span className="value">{animal.noticeNo}</span>
                      <span className="label">등록날짜</span>
                      <span className="value">{animal.regDate}</span>
                      <span className="label">구조장소</span>
                      <span className="value">{animal.rescueLocation}</span>
                    </A.InfoGrid>
                  </A.AnimalInfo>
                </A.AnimalCard>
              ))
            )}
          </A.ListSection>
        </A.Container>
        <Footer/>
      </A.AppWrapper>    
    </>
  );
}