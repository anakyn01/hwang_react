'use client'

import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import * as S from '../../css/style.styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 💡 MUI 아이콘 임포트
import {
  NotificationsOutlined as NotificationsNoneIcon, // NotificationsNone -> NotificationsOutlined
  SettingsOutlined as SettingsIcon,
  WorkspacePremiumOutlined as PremiumIcon, 
  EditNoteOutlined as EditNoteIcon, 
  MailOutlined as MailIcon,          // 💡 MailOutline -> MailOutlined
  PersonOutlined as PersonIcon,      // 💡 PersonOutline -> PersonOutlined
  PetsOutlined as PetsIcon, 
  InfoOutlined as InfoIcon, 
  HelpOutlined as HelpIcon,          // 💡 HelpOutline -> HelpOutlined
  ChatBubbleOutlined as ChatIcon,    // 💡 ChatBubbleOutline -> ChatBubbleOutlined
  CameraAltOutlined as CameraIcon, 
  CreateOutlined as PenIcon, 
  PlayCircleOutlined as PlayIcon,    // 💡 PlayCircleOutline -> PlayCircleOutlined
  ChevronRight as ChevronRightIcon 
} from '@mui/icons-material';

export default function MyPage(){
//💡 1. 로그인한 유저 정보를 담을 공간을 만듭니다.
//  (초기값은 비어있음)
const [user, setUser] = useState<{nickname:string} | null>(null);
// 💡 2. 화면이 처음 켜질 때 딱 한 번, 로컬 스토리지를 뒤져봅니다.
useEffect(() => {
const storedUser = localStorage.getItem('user');

// 저장된 정보가 있다면, 글자(JSON)를 객체로 바꿔서 상태에 넣습니다.
if(storedUser) {
    setUser(JSON.parse(storedUser) as {nickname:string});
}

},[]);

//로그아웃 기능추가
const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('로그아웃 되었습니다');
    //이걸 해줘야함
    window.location.href="/login";
}

    return(
        <>
<S.AppWrapper>
    <Header title="마이메뉴" />
    <S.Container>
        <S.Mt70/>

<S.LoginLayout>

<S.H2Size20>
{user ? (
<S.LayOutSpaceBetween>
<span>환영합니다 <span>{user.nickname}</span></span> 
<S.LogOutBtn
onClick={handleLogout}
>
로그아웃
</S.LogOutBtn>  
</S.LayOutSpaceBetween>
):(
    //✅ 유저 정보가 없을 때 (비로그인 시)
    <Link href="/login">
    <span>로그인</span>을 해주세요
    </Link>
)}
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

<S.Line/>

<S.LoginLayout>
<S.List>
    <S.H3Size16>마이메뉴</S.H3Size16>
<ListItem 
icon={<PersonIcon sx={{color:'#666'}}/>}
text="로그인" link="/login" />
<ListItem 
icon={<PetsIcon sx={{color:'#666'}}/>}
text="괌심 유기 동물"/>

</S.List>
</S.LoginLayout>

<S.Line/>

<S.LoginLayout>
<S.List>
    <S.H3Size16>정보</S.H3Size16>
<ListItem 
icon={<InfoIcon sx={{color:'#666'}}/>}
text="공지사항"/>
<ListItem 
icon={<HelpIcon sx={{color:'#666'}}/>}
text="자주하는 질문"/>
<ListItem 
icon={<ChatIcon sx={{color:'#666'}}/>}
text="문의하기"/>
</S.List>
</S.LoginLayout>

<S.LoginLayout>
<S.List>
    <S.H3Size16>SNS</S.H3Size16>
<ListItem 
icon={<CameraIcon sx={{color:'#666'}}/>}
text="어서찾아주개 인스타그램"/>
<ListItem 
icon={<PenIcon sx={{color:'#666'}}/>}
text="어서찾아주개 블로그"/>
<ListItem 
icon={<PlayIcon sx={{color:'#666'}}/>}
text="어서찾아주개 유튜브"/>
</S.List>
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
    //이걸 안쓰면 꼭 링트 있는것만 나옴..
    return content;
}