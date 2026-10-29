'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store'; // 프로젝트 경로에 맞게 수정
import { fetchMissingAnimals } from '../redux/missingSlice';

import { MapPin, Calendar, Plus } from 'lucide-react';
import { NotificationsNone as NotificationsNoneIcon } from '@mui/icons-material';

import { ModalSingle } from '../modal/ModalSingle';
import * as S from '@/assets/css/style.styles';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function MissingReportPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux Store 상태 조회
  const { animalList, loading } = useSelector((state: RootState) => state.missing);
  
  // 모달 제어 상태 (UI 전용 상태는 로컬 유지)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {  
    dispatch(fetchMissingAnimals());
  }, [dispatch]);

  // 모달에서 글 등록 성공 시 데이터 리프레시
  const handleSuccessUpload = () => {
    dispatch(fetchMissingAnimals());
  };

  return (
    <S.Container>
<Header title="실종 / 제보" />

      {/* 카드 리스트 영역 */}
      <S.CardGrid>
        {loading ? (
          <S.LoadingText>데이터를 불러오는 중입니다...</S.LoadingText>
        ) : animalList.length === 0 ? (
          <S.LoadingText>등록된 실종 신고가 없습니다.</S.LoadingText>
        ) : (
          animalList.map((item) => (
            <S.Card key={item.id}>
              <S.ImageContainer>
                <S.CardImage 
                  src={item.mediaUrls && item.mediaUrls.length > 0 ? item.mediaUrls[0] : 'https://placehold.co/300x300'} 
                  alt={item.breed} 
                />
              </S.ImageContainer>
              <S.CardBody>
                <S.InfoRow>
                  <S.StatusBadge status={item.status}>{item.status}</S.StatusBadge>
                  <S.BreedName>{item.breed}</S.BreedName>
                </S.InfoRow>
                <S.MetaInfo>
                  {item.gender} {item.age ? `| ${item.age}` : ''} {item.weight ? `| ${item.weight}` : ''}
                </S.MetaInfo>
                <S.LocationRow>
                  <MapPin size={14} color="#666" />
                  <S.LocationText>{item.rescueLocation}</S.LocationText>
                </S.LocationRow>
                <S.DateRow>
                  <Calendar size={14} color="#666" />
                  <S.DateText>{item.createdAt ? item.createdAt.substring(0, 10) : ''}</S.DateText>
                </S.DateRow>
              </S.CardBody>
            </S.Card>
          ))
        )}
      </S.CardGrid>

      {/* 글쓰기 플로팅 버튼 */}
      <S.FloatingWriteButton onClick={() => setIsModalOpen(true)}>
        <Plus size={20} color="#fff" />
        <span>글쓰기</span>
      </S.FloatingWriteButton>

      {/* 공통 모달 컴포넌트 연결 */}
      <ModalSingle
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        titleText="실종/제보 글쓰기"
        submitText="등록하기"
        onSuccess={handleSuccessUpload}
      />

      <Footer/>
    </S.Container>      
  );
}