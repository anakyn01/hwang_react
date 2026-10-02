'use client';

import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { 
  Bell, 
  SlidersHorizontal, 
  ChevronDown, 
  Info, 
  MapPin, 
  Calendar, 
  Plus,
  Home,
  ShieldAlert,
  Search,
  BookOpen,
  User,
} from 'lucide-react';

import {
NotificationsNone as NotificationsNoneIcon,
NotificationsOutlined as NotificationsIcon,
TuneOutlined as FilterIcon,
FmdGood as LocationIcon,
PlayCircleFilled as PlayIcon,
ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import * as S from '@/css/style.styles';
import Footer from '@/app/components/Footer';

// 데이터 타입 정의
interface MissingAnimal {
  id: number;
  status: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  color: string;
  rescueLocation: string;
  regDate: string;
  imageUrl: string;
  content: string;
}

export default function MissingReportPage(){

const [animalList, setAnimalList] = 
useState<MissingAnimal[]>([]);
const [loading, setLoading] =
useState<boolean>(true);
const [isAlertOn, setIsAlertOn] =
useState<boolean>(false);

useEffect(() => {
  const fetchMissingAnimals = async () => {
try{
const response =
await axios.get('http://localhost:8080/api/missing-animals');
setAnimalList(response.data);
setLoading(false);
}catch (error){
console.error('실종/제보 데이터를 불러오는데 실패했습니다.', error);
        // 테스트용 더미 데이터
        setAnimalList([
          {
            id: 1,
            status: '실종',
            breed: '포메라니안',
            gender: '암컷',
            age: '나이 모름',
            weight: '몸무게 모름',
            color: '흰색',
            rescueLocation: '충남 태안군 근흥면 정죽리 지령산...',
            regDate: '2026-10-02',
            imageUrl: 'https://placehold.co/300x300',
            content: '겁이 많고 낯을 가립니다.'
          },
          {
            id: 2,
            status: '실종',
            breed: '포메라니안',
            gender: '수컷',
            age: '3살',
            weight: '6kg',
            color: '흰색',
            rescueLocation: '정왕역 인근 S-oil주유소 마지막 목격',
            regDate: '2026-09-23',
            imageUrl: 'https://placehold.co/300x300',
            content: '결정적 제보 시 사례하겠습니다.'
          }
        ]);
}finally{
setLoading(false);
}
  };
  fetchMissingAnimals();
},[]);
    return(
  <S.Container>
      {/* 상단 헤더 */}
<S.Header>
      <S.Logo>어서찾아주개</S.Logo>
      <NotificationsNoneIcon fontSize="large"/>
</S.Header>

      {/* 필터 바 영역 */}
      <S.FilterBar>
        <S.FilterButton><SlidersHorizontal size={16} /></S.FilterButton>
        <S.FilterButton>최근 1년 <ChevronDown size={14} /></S.FilterButton>
        <S.FilterButton>등록일 기준 <ChevronDown size={14} /></S.FilterButton>
        <S.FilterButton>모든 지역 <ChevronDown size={14} /></S.FilterButton>
        <S.FilterButton>모든 동물 <ChevronDown size={14} /></S.FilterButton>
      </S.FilterBar>

      {/* 실시간 알림 설정 배너 */}
      <S.AlertBanner>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="#555" />
          <div>
            <S.AlertTitle>신고/제보 실시간 알림</S.AlertTitle>
            <S.AlertSub>설정한 지역·품종의 새 글을 알려드려요</S.AlertSub>
          </div>
        </div>
        <S.ToggleSwitch 
          active={isAlertOn} 
          onClick={() => setIsAlertOn(!isAlertOn)}
        >
          <S.ToggleThumb active={isAlertOn} />
        </S.ToggleSwitch>
      </S.AlertBanner>

      {/* 게시판 이용 안내 */}
      <S.GuideBox>
        <Info size={16} color="#666" />
        <S.GuideText>신고/제보 게시판 이용 안내</S.GuideText>
        <ChevronDown size={16} color="#666" />
      </S.GuideBox>

      {/* 카드 그리드 리스트 */}
      <S.CardGrid>
        {loading ? (
          <S.LoadingText>데이터를 불러오는 중입니다...</S.LoadingText>
        ) : (
          animalList.map((item) => (
            <S.Card key={item.id}>
              <S.ImageContainer>
                <S.CardImage src={item.imageUrl} alt={item.breed} />
              </S.ImageContainer>
              <S.CardBody>
                <S.InfoRow>
                  <S.StatusBadge status={item.status}>{item.status}</S.StatusBadge>
                  <S.BreedName>{item.breed}</S.BreedName>
                </S.InfoRow>
                <S.MetaInfo>
                  {item.gender} | {item.age} | {item.weight} | {item.color}
                </S.MetaInfo>
                <S.LocationRow>
                  <MapPin size={14} color="#666" />
                  <S.LocationText>{item.rescueLocation}</S.LocationText>
                </S.LocationRow>
                <S.DateRow>
                  <Calendar size={14} color="#666" />
                  <S.DateText>{item.regDate}</S.DateText>
                </S.DateRow>
              </S.CardBody>
            </S.Card>
          ))
        )}
      </S.CardGrid>

      {/* 글쓰기 플로팅 버튼 */}
      <S.FloatingWriteButton>
        <Plus size={20} color="#fff" />
        <span>글쓰기</span>
      </S.FloatingWriteButton>

<Footer/>

    </S.Container>      
    )
}