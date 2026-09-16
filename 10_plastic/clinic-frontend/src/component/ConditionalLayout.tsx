"use client";
import styled from 'styled-components';
//브라우저의 현재 주소(URL)을 읽어야 하므로 이 파일은 클라이언트 컴포넌트로 선언합니다
import {usePathname} from 'next/navigation';
//nextjs에서 현재 접속 중인 주소를 가져오는 전용 도구(훅)를 불러옵니다.
import React from 'react';

//조건부로 사라져야 하는 컴포넌트를 불러옴
import Header from './Header';
import Footer from './Footer';
import EventPopup from './EventPopup';
import QuickConsultBar from "./QuickConsultBar";

/*메인 내용(children)을 받아서 
화면에 그려주는 껍데기(Layout) 함수를 만듭니다.
*/
export default function ConditinalLayout({ children}:{children:React.ReactNode}){
//pathname 변수에 현재 주소를 저장합니다.
const pathname = usePathname();

// 현재 주소가 '/admin' 이라는 글자로 시작하는지 검사해서 
// 맞으면 true, 아니면 false를 저장합니다.
const isAdminPage = 
pathname.startsWith('/admin');

//헤더에 크기때문에 픽스했을때 잘리는 크기만큼..패딩 or 마진
const MainWrapper = styled.main<{$isAdmin: boolean}>`
padding-top:${(props) => (props.$isAdmin ? '0' : '91px')};
min-height:100vh;
`;

return(
<>
{/* 💡 isAdminPage가 
false(관리자 페이지가 아님)일 때만 팝업을 
화면에 보여줍니다
*/}
{!isAdminPage && <EventPopup/>}
{/*
💡 관리자 페이지가 아닐 때만 
헤더(상단 메뉴)를 보여줍니다.
*/}
{!isAdminPage && <Header/>}
{/*
💡 사용자가 보려고 하는 진짜 페이지의 내용(회원가입 창, 로그인 창 등)은 무조건 가운데에 보여줍니다.
*/}
<MainWrapper $isAdmin={isAdminPage}>
{children}    
</MainWrapper>
{/* 관리자 페이지가 아닐 때만 푸터를 보여줍니다 */}
{!isAdminPage && <Footer/>}
{!isAdminPage && <QuickConsultBar/>}
</>
)
}