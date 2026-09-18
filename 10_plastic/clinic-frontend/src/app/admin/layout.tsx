"use client";
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import * as S from '@/assets/css/Style.style';
import { Popup } from "@/component/modal/Popup";

//아이콘
import { 
    FiMessageSquare, 
    FiFeather, 
    FiCompass, 
    FiLayers, 
    FiRadio, 
    FiCamera, 
    FiAward, 
    FiVideo, 
    FiShield, 
    FiLayout, 
    FiUsers, 
    FiClipboard 
} from "react-icons/fi";


export const AdminLayout = ({children}:{children:React.ReactNode}) =>{

    const router = useRouter();

 //🎯 로그아웃 팝업 열림/닫힘 상태 관리
 const [isLogoutPopupOpen, setIsLogoutPopupOpen] = 
 useState(false);   

 //🎯 사이드바 접힘/펼침 상태 관리 (기본값 false = 펼침)
 const [isCollapsed, setIsCollapsed] = useState(false);

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
<S.AdminSidebar $isCollapsed={isCollapsed}>

<S.AdminSidebarBrand
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/root')}
>
{isCollapsed ? 'ADMIN' :'ADMIN PANEL'}    
</S.AdminSidebarBrand>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/dashboard')}
>
<span></span>{!isCollapsed && <span>대시보드</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/consultation')}
>
<FiMessageSquare size={20} />{!isCollapsed && <span>상담신청관리</span>}   
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/tone')}
>
<FiFeather size={20} />{!isCollapsed && <span>톤앤매너관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/nav')}
>
<FiCompass size={20} />{!isCollapsed && <span>내비게이션관리</span>}   
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/pop')}
>
<FiLayers size={20} />{!isCollapsed && <span>팝업관리</span>}   
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/news')}
>
<FiRadio size={20} />{!isCollapsed && <span>뉴스티커관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/self')}
>
<FiCamera size={20} />{!isCollapsed && <span>셀피관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/event')}
>
<FiAward size={20} />{!isCollapsed && <span>이벤트랭킹관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/vlog')}
>
<FiVideo size={20} />{!isCollapsed && <span>vlog관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/safety')}
>
<FiShield size={20} />{!isCollapsed && <span>안전마치관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/footer')}
>
<FiLayout size={20} />{!isCollapsed && <span>푸터관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/users')}
>
<FiUsers size={20} />{!isCollapsed && <span>회원관리</span>}    
</S.AdminNavItem>

<S.AdminNavItem
$isCollapsed={isCollapsed}
onClick={() => router.push('/admin/boards')}
>
<FiClipboard size={20} />{!isCollapsed && <span>게시판 관리</span>}    
</S.AdminNavItem>

<S.SidebarTogglerWrapper>
    <S.SidebarToggler
onClick={() => setIsCollapsed(!isCollapsed)}    
    >
{isCollapsed ? '▶' : '◀'}        
    </S.SidebarToggler>
</S.SidebarTogglerWrapper>

</S.AdminSidebar>


<S.AdminContentWrapper>

<S.AdminTopbar>
    <div className="">
        <span>성형외과 관리시스템</span>
    </div>

    <div className="">
        <span>최고관리자님</span>
        <S.Button
        $variant="outline"
        onClick={handleLogoutClick}
        >
        로그아웃
        </S.Button>
    </div>
</S.AdminTopbar>

<S.AdminMain>
    {children}
</S.AdminMain>


</S.AdminContentWrapper>



</S.AdminContainer>        
        </>
    )

}