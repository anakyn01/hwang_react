'use client';

import React from 'react';
import * as S from '@/assets/css/style.styles';
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

    // 💡 1. 메인 페이지용 헤더
    if (isMain) {
        return (
            // 만들어두신 S.Header에 이미 sticky와 max-width가 적용되어 있습니다.
            <S.Header>
                <S.Logo>어서찾아주개</S.Logo>
                <NotificationsNoneIcon 
                    sx={{ cursor: 'pointer', color: '#8a4e4b', fontSize: '28px' }} 
                />
            </S.Header>
        );
    }

    // 💡 2. 서브 페이지용 헤더
    // S.Header를 공통으로 씌워서 상단 고정과 480px 레이아웃이 깨지지 않게 잡습니다.
    return (
        <S.Header>
            <S.Back onClick={handleBack} >
                &lt; 뒤로
            </S.Back>
            
            {/* 텍스트 중앙 정렬을 위해 플렉스(flex: 1) 공간 배분만 남겼습니다 */}
            <S.H5Bold >
                {title}
            </S.H5Bold>
            
            <S.None style={{ width: '60px' }} />
        </S.Header>
    );
}