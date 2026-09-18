"use client";
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import * as S from '@/assets/css/Style.style';
import { Popup } from "@/component/modal/Popup";

export const AdminLayout = ({children}:{children:React.ReactNode}) =>{

    const router = useRouter();

 //🎯 로그아웃 팝업 열림/닫힘 상태 관리
 const [isLogoutPopupOpen, setIsLogoutPopupOpen] = 
 useState(false);   

    const handleLogoutClick = () => {
setIsLogoutPopupOpen(true);
    }

    //팝업에서 확인을 눌렀을때 진짜 로그아웃 처리
    const confirmLogout = () => {
setIsLogoutPopupOpen(false);   
router.push('/admin');     
    };

    return(
        <>
<S.AdminContainer>
{/*좌측 사이드바 */}
<S.AdminSidebar>

<S.SidebarBrand
onClick={() => router.push('/admin/root')}
>
ADMIN PANEL    
</S.SidebarBrand>

<S.NavItem
onClick={() => router.push('/admin/dashboard')}
>
대시보드    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/consultation')}
>
상담신청관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/tone')}
>
톤앤매너관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/nav')}
>
내비게이션관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/pop')}
>
팝업관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/news')}
>
뉴스티커관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/self')}
>
셀피관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/event')}
>
이벤트랭킹관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/vlog')}
>
vlog관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/safety')}
>
안전마치관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/footer')}
>
푸터관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/users')}
>
회원관리    
</S.NavItem>

<S.NavItem
onClick={() => router.push('/admin/boards')}
>
게시판 관리    
</S.NavItem>

</S.AdminSidebar>



</S.AdminContainer>        
        </>
    )

}