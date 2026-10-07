'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Calendar, Plus } from 'lucide-react';
import { NotificationsNone as NotificationsNoneIcon } from '@mui/icons-material';

import { ModalSingle } from '../modal/ModalSingle';
import * as S from '@/css/style.styles';
import Footer from '@/app/components/Footer';

export default function MissingReportPage() {
  const [animalList, setAnimalList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // 모달 제어 상태만 남기고 내부 불필요한 formData/handleSubmit은 제거
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchMissingAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/missing-posts', {
        withCredentials: true
      });
      setAnimalList(response.data);
    } catch (error) {
      console.error('실종/제보 데이터를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  // 💡 중복된 useEffect를 하나로 정리
  useEffect(() => {  
    fetchMissingAnimals();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Logo>어서찾아주개</S.Logo>
        <NotificationsNoneIcon fontSize="large"/>
      </S.Header>

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
        onSuccess={fetchMissingAnimals}
      />

      <Footer/>
    </S.Container>      
  );
}