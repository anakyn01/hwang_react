'use client';

import React from 'react';
import * as S from '../../css/style.styles';

// 💡 1. 밖에서 받아올 데이터(Props)의 타입을 정의합니다.
interface HeaderProps {
    title: string;
    onBackClick?: () =>  void;
}

export default function Header({title, onBackClick} : HeaderProps){
    // 💡 2. 뒤로가기 버튼을 눌렀을 때 실행될
    const handleBack = () => {
        if(onBackClick){
            onBackClick();
        }else{
            window.history.back();
        }
    }

    return(
        <>
        <S.TopFlexBasic>
        <S.Back onClick={handleBack}>
        &lt; 뒤로
        </S.Back>
        
        <S.H5Bold>
        {title}
        </S.H5Bold>
        
        <S.None/>
        </S.TopFlexBasic>
        </>
    )
}