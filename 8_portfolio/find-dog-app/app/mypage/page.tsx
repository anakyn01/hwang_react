'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as S from '../../css/style.styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

// MUI 아이콘 임포트
import {
  NotificationsOutlined as NotificationsNoneIcon,
  SettingsOutlined as SettingsIcon,
  WorkspacePremiumOutlined as PremiumIcon,
  EditNoteOutlined as EditNoteIcon,
  MailOutlined as MailIcon,
  PersonOutlined as PersonIcon,
  PetsOutlined as PetsIcon,
  InfoOutlined as InfoIcon,
  HelpOutlined as HelpIcon,
  ChatBubbleOutlined as ChatIcon,
  CameraAltOutlined as CameraIcon,
  CreateOutlined as PenIcon,
  PlayCircleOutlined as PlayIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

export default function MyPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('회원');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다');
    router.push('/login');
  };

  return (
    <>
      <S.AppWrapper>
        <Header title="마이메뉴" />
        <S.Container>
          <S.Mt70 />

          <S.LoginLayout>
            <S.H2Size20>
              {isLoggedIn ? (
                <S.LayOutSpaceBetween>
                  <span>
                    환영합니다 <span>{nickname}</span>님
                  </span>
                  <S.LogOutBtn onClick={handleLogout}>로그아웃</S.LogOutBtn>
                </S.LayOutSpaceBetween>
              ) : (
                <Link href="/login">
                  <span>로그인</span>을 해주세요
                </Link>
              )}
            </S.H2Size20>

            <S.LayOutSpaceBetween>
              <TopMenuCard
                icon={<PremiumIcon sx={{ color: '#ff8c00', fontSize: 32 }} />}
                text="맴버십"
              />
              <TopMenuCard
                icon={<EditNoteIcon sx={{ color: '#ff8c00', fontSize: 32 }} />}
                text="입양신청"
              />
              <TopMenuCard
                icon={<MailIcon sx={{ color: '#ff8c00', fontSize: 32 }} />}
                text="쪽지함"
              />
            </S.LayOutSpaceBetween>
          </S.LoginLayout>

          <S.Line />

          <S.LoginLayout>
            <S.List>
              <S.H3Size16>마이메뉴</S.H3Size16>
              {!isLoggedIn && (
                <ListItem
                  icon={<PersonIcon sx={{ color: '#666' }} />}
                  text="로그인"
                  link="/login"
                />
              )}
              <ListItem
                icon={<PetsIcon sx={{ color: '#666' }} />}
                text="관심 유기 동물"
              />
            </S.List>
          </S.LoginLayout>

          <S.Line />

          <S.LoginLayout>
            <S.List>
              <S.H3Size16>정보</S.H3Size16>
              <ListItem icon={<InfoIcon sx={{ color: '#666' }} />} text="공지사항" />
              <ListItem icon={<HelpIcon sx={{ color: '#666' }} />} text="자주하는 질문" />
              <ListItem icon={<ChatIcon sx={{ color: '#666' }} />} text="문의하기" />
            </S.List>
          </S.LoginLayout>

          <S.LoginLayout>
            <S.List>
              <S.H3Size16>SNS</S.H3Size16>
              <ListItem
                icon={<CameraIcon sx={{ color: '#666' }} />}
                text="어서찾아주개 인스타그램"
              />
              <ListItem
                icon={<PenIcon sx={{ color: '#666' }} />}
                text="어서찾아주개 블로그"
              />
              <ListItem
                icon={<PlayIcon sx={{ color: '#666' }} />}
                text="어서찾아주개 유튜브"
              />
            </S.List>
          </S.LoginLayout>
        </S.Container>
        <Footer />
      </S.AppWrapper>
    </>
  );
}

function TopMenuCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <S.MenuCardBox>
      {icon}
      <S.MenuCardText>{text}</S.MenuCardText>
    </S.MenuCardBox>
  );
}

function ListItem({
  icon,
  text,
  link
}: {
  icon: React.ReactNode;
  text: string;
  link?: string;
}) {
  const content = (
    <S.ListItemWrapper>
      <S.ListItemLeft>
        {icon}
        <S.ListItemText>{text}</S.ListItemText>
      </S.ListItemLeft>
      <ChevronRightIcon sx={{ color: '#999' }} />
    </S.ListItemWrapper>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }
  return content;
}