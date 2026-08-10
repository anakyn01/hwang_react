'use client'

import React from 'react';
import Link from 'next/link';
import * as S from '../../css/style.styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 💡 MUI 아이콘 임포트
import {
  NotificationsNone as NotificationsNoneIcon,
  SettingsOutlined as SettingsIcon,
  WorkspacePremiumOutlined as PremiumIcon, // 멤버십
  EditNoteOutlined as EditNoteIcon, // 입양신청
  MailOutline as MailIcon, // 쪽지함
  PersonOutline as PersonIcon, // 로그인
  PetsOutlined as PetsIcon, // 관심 유기동물
  InfoOutlined as InfoIcon, // 공지사항
  HelpOutline as HelpIcon, // 자주하는 질문
  ChatBubbleOutline as ChatIcon, // 문의하기
  CameraAltOutlined as CameraIcon, // 인스타그램 느낌
  CreateOutlined as PenIcon, // 블로그 느낌
  PlayCircleOutline as PlayIcon, // 유튜브 느낌
  ChevronRight as ChevronRightIcon // 우측 화살표
} from '@mui/icons-material';

export default function MyPage(){
    return(
        <>
<S.AppWrapper>
    <Header title="마이메뉴" />
    <S.Container>
        <S.Mt70/>

<S.LoginLayout>

<S.H2Size20>
    <Link href="/login">
    <span>로그인</span>을 해주세요
    </Link>
</S.H2Size20>

<S.LayOutSpaceBetween>
    <TopMenuCard 
    icon={<PremiumIcon sx={{ color: '#ff8c00', fontSize:32}}/>} 
    text="맴버십"
    />
    <TopMenuCard 
    icon={<EditNoteIcon sx={{ color: '#ff8c00', fontSize:32}}/>} 
    text="입양신청"
    />
    <TopMenuCard 
    icon={<MailIcon sx={{ color: '#ff8c00', fontSize:32}}/>} 
    text="쪽지함"
    />
</S.LayOutSpaceBetween>


</S.LoginLayout>

    </S.Container>
    <Footer/>
</S.AppWrapper>        
        </>
    )
}

function TopMenuCard({icon, text} : 
    {icon: React.ReactNode; text: string}){
    return(
        <S.MenuCardBox>
            {icon}
            <S.MenuCardText>{text}</S.MenuCardText>
        </S.MenuCardBox>
    )
}

function ListItem({icon, text, link} :
    { icon: React.ReactNode; text:string; link?:string}){
const content = (
    <S.ListItemWrapper>
        <S.ListItemLeft>
            {icon}
            <S.ListItemText>{text}</S.ListItemText>
        </S.ListItemLeft>
        <ChevronRightIcon sx={{color:'#999'}}/>
    </S.ListItemWrapper>
    );
    // 링크가 있을 때만 <Link>로 감싸주기
    if(link){
        return(
            <Link href={link}>
                {content}
            </Link>
        )
    }
}