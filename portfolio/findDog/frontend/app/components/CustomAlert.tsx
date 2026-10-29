"use client";
import React from "react";
import * as S from '@/assets/css/style.styles';
import { CheckCircle2, AlertCircle } from 'lucide-react'; // 아이콘 활용

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onConfirm: () => void;
}

export const CustomAlert = ({ isOpen, message, type = 'info', onConfirm }: CustomAlertProps) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      {/* 알림창 크기에 맞게 maxWidth를 줄이고 가운데 정렬 적용 */}
      <S.ModalContent style={{ maxWidth: '320px', textAlign: 'center', padding: '30px 24px' }}>
        <S.AlertInfo style={{ marginBottom: '24px', flexDirection: 'column' }}>
          <div className="icon-circle" style={{ width: '48px', height: '48px', backgroundColor: type === 'error' ? '#ffeeee' : '#f8f5f4' }}>
            {type === 'error' ? (
              <AlertCircle color="#ff6b6b" size={24} />
            ) : (
              <CheckCircle2 color="#8a4e4b" size={24} />
            )}
          </div>
          <div className="text-group" style={{ marginTop: '12px', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem', wordBreak: 'keep-all', lineHeight: '1.4' }}>
              {message}
            </strong>
          </div>
        </S.AlertInfo>
        
        {/* 버튼 색상을 브랜드 컬러(브라운)로 맞추거나 필요시 기본 스타일 사용 */}
        <S.SubmitButton 
          onClick={onConfirm} 
          style={{ backgroundColor: '#8a4e4b', margin: 0, padding: '12px' }}
        >
          확인
        </S.SubmitButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};