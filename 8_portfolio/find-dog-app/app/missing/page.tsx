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

import { ModalSingle } from '../modal/ModalSingle';

import * as S from '@/css/style.styles';
import Footer from '@/app/components/Footer';

export default function MissingReportPage(){

const [animalList, setAnimalList] = useState<any[]>([]);
const [loading, setLoading] =useState<boolean>(true);
const [isAlertOn, setIsAlertOn] =useState<boolean>(false);

//모달 제어 및 폼 데이터 상태 (하나의 모달 틀을 공유)
const [isModalOpen, setIsModalOpen] =useState<boolean>(false);
const [formData, setFormData] = useState({
title: '',
    content: '',
    breed: '',
    gender: '수컷',
    age: '',
    weight: '',
    color: '',
    rescueLocation: '',
});

//파일 상태추가
const [selectedFile, setSelectedFile] = 
useState<File | null>(null);

  const fetchMissingAnimals = async () => {
try{
const response =
await axios.get('http://localhost:8080/api/missing-posts',{
  withCredentials:true
});
setAnimalList(response.data);
}catch (error){
console.error('실종/제보 데이터를 불러오는데 실패했습니다.', error);
}finally{
setLoading(false);
}
  };

useEffect(() => {  
  fetchMissingAnimals();
},[]);

//입력값 변경 핸들러
const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
const {name, value} =e.target;
setFormData(prev => ({...prev, [name]: value}));  
};



useEffect(() => {
  fetchMissingAnimals();
},[]);



  // 파일 선택 핸들러
const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
if(e.target.files && e.target.files[0]){
    setSelectedFile(e.target.files[0])
}
}

// 글 등록 API 전송 핸들러 (FormData 및 withCredentials 적용)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // 백엔드 구조에 맞춰 JSON 데이터와 파일을 함께 구성하여 전송
      data.append('dto', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
      
      if (selectedFile) {
        data.append('file', selectedFile);
      }

      await axios.post('http://localhost:8080/api/missing-posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // 💡 세션/쿠키 인증 필수 전송 (principal null 방지)
      });

      alert('실종 신고가 등록되었습니다.');
      fetchMissingAnimals(); // 목록 새로고침
      setIsModalOpen(false); // 모달 닫기
    } catch (error: any) {
      console.error('등록 실패:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('로그인이 만료되었거나 권한이 없습니다.');
      } else {
        alert('글 등록에 실패했습니다.');
      }
    }
  };
 return(
    <S.Container>
      <S.Header>
        <S.Logo>어서찾아주개</S.Logo>
        <NotificationsNoneIcon fontSize="large"/>
      </S.Header>

      {/* 카드 리스트 영역 (기존 유지) */}
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
      <S.FloatingWriteButton onClick={() => {
        setFormData({
          title: '', content: '', breed: '', gender: '수컷',
          age: '', weight: '', color: '', rescueLocation: '',
        });
        setSelectedFile(null);
        setIsModalOpen(true);
      }}>
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