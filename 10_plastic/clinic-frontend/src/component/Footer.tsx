"use client";

//개발후 연동
import React ,{useState, useEffect} from 'react';
import axios from 'axios';


import * as S from '@/assets/css/Style.style';
import Link from 'next/link';


//백앤드에서 받아올 데이터의 형태(타입)를 정의
interface ScheduleData {
  id:number;
  departments:string;
  weekday:string;
  night:string;
  weekend:string;
}

interface FamilySiteData{
id:number; name:string; url:string;
}

export default function Footer(){

//1.서버에서 가져온 데이터를 담아둘 빈 바구니 만들기
const [companyInfo, setCompanyInfo] = useState({
name:"", address:"", clinicName:"", phone:"",
email:"", locationUrl:""
});
const [schedules, setSchedules] = useState<ScheduleData[]>([]);
const [familySites, setFamilySites] = useState<FamilySiteData[]>([]);
const [isLoading, setIsLoading] =useState(true);

useEffect(()=>{
const fetchFooterData = async () => {
try{
const response = await axios.get("http://localhost:4000/api/admin/footer");

if(response.data.success && response.data.data) {
  const { companyInfo, schedules, familySites} = response.data.data;
  //db에서 가져온 데이터로 빈 바구니를 채웁니다
  if(companyInfo) setCompanyInfo(companyInfo);
  if(schedules)setSchedules(schedules);
  if(familySites) setFamilySites(familySites);
}
}catch(error){
console.error("클라이언트 푸터 데이터 로드 실패", error);
}finally{
setIsLoading(false);
}
};
fetchFooterData();
},[]);
//아직 db에서 데이터를 받아오고 있다면..
if(isLoading) {
  return <S.SiteFooterWrapper>
    <S.SiteFooterInner>
      로딩중...
    </S.SiteFooterInner>
  </S.SiteFooterWrapper>
}

    return(
        <>
<S.SiteFooterWrapper>
        <S.SiteFooterInner>
          {/* cs번호 진료시간 오시는길 */}
          <S.SiteFooterTop>
            <S.SiteFooterCs>
              <S.SiteFooterPhone>
{companyInfo.phone || "02. 000. 0000"}                
              </S.SiteFooterPhone>
              <S.SiteFooterCsTitle>CS CENTER</S.SiteFooterCsTitle>
            </S.SiteFooterCs>

            <S.SiteFooterScheduleWrap>

{schedules.map((sch) =>(
  <>
              <S.SiteFooterScheduleBlock key={sch.id}>
                <S.SiteFooterScheduleTitle>{sch.departments}</S.SiteFooterScheduleTitle>
                <S.SiteFooterScheduleText>평일 : {sch.weekday}</S.SiteFooterScheduleText>
 {/*야간은 빈칸이면 깔끔하게 렌더링을 안함 */}
 {sch.night &&<S.SiteFooterScheduleText>야간 : {sch.night}
  </S.SiteFooterScheduleText>}
<S.SiteFooterScheduleText>토요일 : PM 09:00 - PM 03:00</S.SiteFooterScheduleText>
              </S.SiteFooterScheduleBlock>

              <S.SiteFooterScheduleBlock>
                <S.SiteFooterScheduleTitle>스킨케어</S.SiteFooterScheduleTitle>
                <S.SiteFooterScheduleText>평일 : AM 09:00 - PM 06:00</S.SiteFooterScheduleText>
                <S.SiteFooterScheduleText>토요일 : PM 09:00 - PM 03:00</S.SiteFooterScheduleText>
              </S.SiteFooterScheduleBlock>
              </>
))}
            
            
            </S.SiteFooterScheduleWrap>
            
            <S.SiteFooterLocationBtn>오시는길 바로가기</S.SiteFooterLocationBtn>
          </S.SiteFooterTop>

          <S.SiteFooterBottom>
            <S.SiteFooterCompany>
              <S.SiteFooterCompanyName>안호범 안스성형외과</S.SiteFooterCompanyName>
              <S.SiteFooterInfoText>
                서울 노원구 노해로 460 (상계동) 2층 201호
                <br />
                (안호범안스성형외과 건물 주차장 이용)
              </S.SiteFooterInfoText>

              <S.SiteFooterInfoText>
                의료기관 명칭 : 안호범안스성형외과
                <br />
                대표번호 02. 932. 2222
                <br />
                E-mail : test@test.com
              </S.SiteFooterInfoText>
            </S.SiteFooterCompany>

            <S.SiteFooterBottomRight>
              <S.SiteFooterPolicyWrap>
                <S.SiteFooterPolicyBtn>실비보험 안내</S.SiteFooterPolicyBtn>
                <S.SiteFooterPolicyBtn>비급여 진료비용 안내</S.SiteFooterPolicyBtn>
              </S.SiteFooterPolicyWrap>

              <div>
                <S.SiteFooterFamilyTitle>Family</S.SiteFooterFamilyTitle>
                <S.SiteFooterFamilyLogos>
                  <div className="logo-placeholder">Breast Surgery Center</div>
                  <div className="logo-placeholder">Derm</div>
                  <div className="logo-placeholder">Lifting Center</div>
                </S.SiteFooterFamilyLogos>
              </div>
            </S.SiteFooterBottomRight>
          </S.SiteFooterBottom>
        </S.SiteFooterInner>

        {/* 우측 하단 플로팅 퀵 메뉴 */}
        <S.FloatingMenuWrapper>
          <S.FloatingMenuItem>
            <S.FloatingMenuIcon $bgColor="#FEE500">TALK</S.FloatingMenuIcon>
            <S.FloatingMenuText>빠른 상담</S.FloatingMenuText>
          </S.FloatingMenuItem>
          
          <S.FloatingMenuItem>
            <S.FloatingMenuIcon $bgColor="#3b82f6">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
              </svg>
            </S.FloatingMenuIcon>
            <S.FloatingMenuText>전화상담</S.FloatingMenuText>
          </S.FloatingMenuItem>
        </S.FloatingMenuWrapper>

      </S.SiteFooterWrapper>
        </>
    )
}