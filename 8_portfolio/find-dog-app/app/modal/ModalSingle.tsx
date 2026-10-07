"use client";
import React, { useState } from "react";
import axios from 'axios';
import { X } from 'lucide-react';
import * as S from '@/css/style.styles';

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

  // 글 등록 API 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      
      // 💡 JSON 문자열이 제대로 만들어졌는지 확인
      const jsonString = JSON.stringify(formData);
      console.log("프론트에서 보낼 JSON:", jsonString);

      data.append('dto', new Blob([jsonString], { type: 'application/json' }));

      if (selectedFile) {
        console.log("프론트에서 보낼 파일:", selectedFile.name);
        data.append('file', selectedFile); 
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await axios.post('http://localhost:8080/api/missing-posts', data, {
        withCredentials: true,

        headers: {
          // 💡 인증 토큰을 헤더에 반드시 포함해야 합니다!
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      console.log("서버 응답 성공:", response.data);
      alert('실종 신고가 등록되었습니다.');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('등록 실패 상세 에러:', error.response || error);
      alert('글 등록에 실패했습니다');
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