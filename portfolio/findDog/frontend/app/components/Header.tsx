'use client';

import React from 'react';
import * as S from '../../ assets/css/style.styles';
import { NotificationsOutlined as NotificationsNoneIcon } from '@mui/icons-material';

interface HeaderProps {
    title?: string;           
    onBackClick?: () => void;
    isMain?: boolean;         
}

export default function Header({ title, onBackClick, isMain }: HeaderProps) {
    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            window.history.back();
        }
    };

    if (isMain) {
        return (
            <S.Header style={{ 
                // 💡 상단 고정을 위한 핵심 CSS
                position: 'sticky', 
                top: 0, 
                zIndex: 999, 
                backgroundColor: '#fff', // 스크롤 시 뒤에 글씨가 안 비치도록 하얀 배경 필수

                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 20px',
                borderBottom: '1px solid #f0f0f0' // 스크롤 시 콘텐츠와 구분되도록 연한 선 추가
            }}>
                <S.Logo style={{ 
                    color: '#ff8c00', 
                    fontSize: '22px', 
                    fontWeight: 'bold',
                    margin: 0
                }}>
                    어서찾아주개
                </S.Logo>
                <NotificationsNoneIcon 
                    sx={{ cursor: 'pointer', color: '#222', fontSize: '28px' }} 
                />
            </S.Header>
        );
    }

    return (
        <S.TopFlexBasic style={{ 
            // 💡 상단 고정을 위한 핵심 CSS
            position: 'fixed', 
            top: 0, 
            zIndex: 999, 
            backgroundColor: '#fff', 

            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0'
        }}>
            <S.Back onClick={handleBack} style={{ cursor: 'pointer', width: '60px' }}>
                &lt; 뒤로
            </S.Back>
            
            <S.H5Bold style={{ flex: 1, textAlign: 'center', margin: 0 }}>
                {title}
            </S.H5Bold>
            
            <S.None style={{ width: '60px' }} />
        </S.TopFlexBasic>
    );
}