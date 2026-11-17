'use client';
import React from 'react';
//nextjs에서 바뀌는것..
import Link from 'next/link';

import {
    Home as HomeIcon,
    Pets as PetsIcon,
    Campaign as CampaignIcon,
    MenuBook as MenuBookIcon,
    PersonOutlined as PersonOutlineIcon,
} from '@mui/icons-material';
import * as S from '../../css/style.styles';

export default function Footer(){
    return(
        <>
        <S.BottomNav>
        
        <Link href="/">
          <S.NavItem $active>
            <HomeIcon/>
            <span>홈</span>
          </S.NavItem>
          </Link>
        
        <Link href="/shelter">
          <S.NavItem>
            <PetsIcon/>
            <span>보호소</span>
          </S.NavItem>
        </Link>

        <Link href="/missing">
          <S.NavItem>
            <CampaignIcon/>
            <span>실종/제보</span>
          </S.NavItem>
        </Link>

        <Link href="/story">
          <S.NavItem>
            <MenuBookIcon/>
            <span>스토리</span>
          </S.NavItem>
        </Link>

        <Link href="/mypage">
          <S.NavItem>
            <PersonOutlineIcon/>
            <span>마이메뉴</span>
          </S.NavItem>
        </Link>
        </S.BottomNav>
        
        </>
    )
}