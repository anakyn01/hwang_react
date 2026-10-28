"use client";
import React, { useState } from "react";
import axios from 'axios';
import { X } from 'lucide-react';
import * as S from '@/assets/css/style.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleText: string;
  submitText: string;
  onSuccess: () => void;
}

export const ModalSingle = ({
  isOpen, onClose, titleText, submitText, onSuccess
}: ModalProps) => {

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

  // 💡 오타 수정 (seletedFile -> selectedFile)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));  
  };   

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. 토큰 존재 여부 확실히 체크
  const token = localStorage.getItem('token');
  if (!token) {
    alert('로그인이 필요합니다. 다시 로그인해주세요.');
    return;
  }

  try {
    const data = new FormData();
    data.append('dto', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    if (selectedFile) {
      data.append('file', selectedFile);
    }

    // 2. 백엔드로 명시적인 주소와 헤더 전달
    const response = await axios.post('http://localhost:8080/api/missing-posts', data, {
      headers: {
        'Authorization': `Bearer ${token}`
        // 주의: multipart/form-data는 Content-Type을 직접 적지 않아야 브라우저가 boundary를 잡아줍니다.
      },
      withCredentials: true
    });

    console.log('등록 성공 응답:', response.data);
    alert('실종 신고가 등록되었습니다.');
    onSuccess();
    onClose();
  } catch (error: any) {
    console.error('등록 상세 실패 에러:', error);
    // 백엔드에서 날려준 구체적인 에러 메시지가 있다면 출력
    const errorMsg = error.response?.data || error.message;
    alert(`글 등록에 실패했습니다: ${errorMsg}`);
  }
};
  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.HeaderRow>
          <h2>{titleText}</h2>
          <S.CloseButton onClick={onClose}>
            <X size={20}/>    
          </S.CloseButton>
        </S.HeaderRow>

        <S.Form onSubmit={handleSubmit}>
          <S.Input type="text" name="title" placeholder="제목을 입력하세요" value={formData.title} onChange={handleChange} required />  
          <S.Input type="text" name="breed" placeholder="품종" value={formData.breed} onChange={handleChange} required /> 
          <S.Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="수컷">수컷</option>
            <option value="암컷">암컷</option> 
            <option value="미상">미상</option>    
          </S.Select>
          <S.Input type="text" name="age" placeholder="나이를 입력하세요" value={formData.age} onChange={handleChange} required /> 
          <S.Input type="text" name="weight" placeholder="몸무게를 입력하세요" value={formData.weight} onChange={handleChange} required /> 
          <S.Input type="text" name="color" placeholder="털색을 입력하세요" value={formData.color} onChange={handleChange} required /> 
          <S.Input type="text" name="rescueLocation" placeholder="실종/목격 장소를 입력하세요" value={formData.rescueLocation} onChange={handleChange} required /> 

          <S.FileInputWrapper>
            <label>사진/동영상 첨부</label>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} />   
          </S.FileInputWrapper>

          <S.TextArea name="content" placeholder="상세 내용 및 특징을 입력하세요" value={formData.content} onChange={handleChange} rows={4} required />

          <S.SubmitButton type="submit">{submitText}</S.SubmitButton>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>        
  );
};