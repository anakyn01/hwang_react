"use client"
import React,{useState, useEffect} from 'react';
import axios from 'axios';

import Link from 'next/link';
import * as S from '@/assets/css/Style.style';
import GlobeIcon from './icons/GlobeIcon';
import UserIcon from './icons/UserIcon';

//메뉴 데이터 타입을 정의
interface MenuItem{
id:number; name:string; url:string;
}

export default function Header(){

//상태관리
const[logoType, setLogoType] = useState<"TEXT" | "IMAGE">("TEXT");
const[logoText, setLogoText] = useState<string>("Ahn's");
const[logoFileName, setLogoFileName] = useState<string>("");
const[menus, setMenus] = useState<MenuItem[]>([]);

//톤앤매너
const [themeColor, setThemColor] = useState<string>("#fecbec")
const [isDark, setIsDark] = useState<boolean>(false);//기본라이트

useEffect(() => {
const fetchNavSettings = async () => {
try{
const response =
await axios.get("http://localhost:4000/api/admin/nav");   
if(response.data.success){
    const dbData = response.data.data;
    //로고 설정 적용
    if(dbData.LOGO_TYPE)setLogoType(dbData.LOGO_TYPE);
    if(dbData.LOGO_TEXT)setLogoText(dbData.LOGO_TEXT);
    if(dbData.LOGO_FILE)setLogoFileName(dbData.LOGO_FILE);

    if(dbData.MENUS && dbData.MENUS !== "[]"){
setMenus(JSON.parse(dbData.MENUS));        
    }else{
           setMenus([
       { id: 1, name: "병원소개", url: "/" },
        { id: 2, name: "눈성형", url: "/" },
        { id: 3, name: "코성형", url: "/" },
        { id: 4, name: "동안성형", url: "/" },
        { id: 5, name: "쁘띠시술", url: "/" },
        { id: 6, name: "커뮤니티", url: "/" }
   ]); 
    }
}
}catch(error){
console.error("헤더 내비게이션 로드 실패:", error);
}   
};

const fetchThemeSettings = async () => {
    try{
const response =
await axios.get("http://localhost:4000/api/admin/tone");
if(response.data.success){
    const dbData = response.data.data;
    //DB설정에 따라 색상과 다크모드 적용
setThemColor(dbData.PRIMARY_TONE === "PINK" ? "#e83e8c" : "#4e73df");
setIsDark(dbData.IS_DARK_MODE === 'Y');    
}
    }catch(error){
console.error("테마 설정 로드 실패:", error);
    }
}


fetchNavSettings();
fetchThemeSettings();
},[]);

// 💡 다크모드에 따른 배경색과 글자색 변수 선언
    const bgColor = isDark ? "#1a1a1a" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#333333";

    return(
        <>
<S.HeaderWraper style={{ backgroundColor: bgColor, color: textColor }}>
<S.HeaderInner>

{/*로고영역 */}
<S.LogoGroup>
    <Link href="/" >
        {logoType === "TEXT" ? (
//텍스트 로고일 경우 테마포인트 컬러 적용            
            <S.Logo style={{color:themeColor}}>{logoText}</S.Logo>
        ):(
        <S.LogoImg
        src={`http://localhost:4000/images/${logoFileName}`}
        alt="성형외과 웹사이트 로고"
        />            
        )}
    </Link>
</S.LogoGroup>

{/*메인 네비게이션 영역 */}
<S.NavGroup>
{menus.map((menu, index) =>(
    <Link href={menu.url || "/" } key={menu.id}>
<S.NavItem $active={index === 1} style={{ color:textColor}}>{menu.name}</S.NavItem>        
    </Link>
))}
    {/*<S.NavItem>병원소개</S.NavItem>
    <S.NavItem $active>눈 성형</S.NavItem>
    <S.NavItem>코 성형</S.NavItem>
    <S.NavItem>동안 성형</S.NavItem>
    <S.NavItem>쁘띠 시술</S.NavItem>
    <S.NavItem>커뮤니티</S.NavItem>*/}
</S.NavGroup>

{/*유틸리티 영역 */}
<S.UtilGroup>
    
<S.DesktopOnly>
    <S.PhoneButton href="tel:02-932-2222" 
    style={{ 
backgroundColor: isDark ? '#2a2a2a' : '#fff',
borderColor:isDark ? '#444' : '#ddd',
color:textColor
    }}>
        TEL.<span style={{color:themeColor}}>02.932.2222</span>
    </S.PhoneButton>
    <S.CtaButton style={{backgroundColor:themeColor, color:'#fff', border:'none'}}>상담예약</S.CtaButton>

    <S.IconButton aria-label='Language' 
    style={{
backgroundColor: isDark ? '#2a2a2a' : '#fff',
borderColor:isDark ? '#444' : '#ddd',        
color:textColor}}>
        <GlobeIcon/>
    </S.IconButton>

    <S.IconButton aria-label='My page' 
    style={{
backgroundColor: isDark ? '#2a2a2a' : '#fff',
borderColor:isDark ? '#444' : '#ddd',         
        color:textColor}}>
        <Link href="http://localhost:3000/register/terms">
        <UserIcon/>
        </Link>
    </S.IconButton>
</S.DesktopOnly>

{/*모바일 화면일때만 나타나는 요소들 */}
<S.MobilePillButton 
style={{backgroundColor:themeColor, color:'#fff'}}>
    Men's</S.MobilePillButton>
<S.MobilePillButton
style={{backgroundColor:themeColor, color:'#fff'}}
>breast</S.MobilePillButton>

<S.HamburgerButton aria-label="Mobile Menu">
    <span style={{backgroundColor:textColor}}></span>
    <span style={{backgroundColor:textColor}}></span>
    <span style={{backgroundColor:textColor}}></span>
</S.HamburgerButton>

</S.UtilGroup>

</S.HeaderInner>
</S.HeaderWraper>        
        </>
    )
}