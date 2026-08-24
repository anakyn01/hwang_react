"use client";
import React from 'react';
import * as S from './Footer.styles';
import Link from 'next/link';

export default function Footer(){
    return(
        <>
<S.FooterWrapper>
<S.FooterInner>

{/*cs번호 진료시간 오시는길 */}
<S.TopSection>
    <S.CsInfo>
        <S.PhoneNumber>02. 932. 2222</S.PhoneNumber>
        <S.CsTitle>CS CENTER</S.CsTitle>
    </S.CsInfo>

<S.ScheduleWrapper>

    <S.ScheduleBlock>
        <S.ScheduleTitle>성형외과</S.ScheduleTitle>
        <S.ScheduleText>평일 : AM 09:00 - PM 06:00</S.ScheduleText>
        <S.ScheduleText>야간 : </S.ScheduleText>
        <S.ScheduleText>토요일 : PM 09:00 - PM 03:00</S.ScheduleText>
    </S.ScheduleBlock>

    <S.ScheduleBlock>
        <S.ScheduleTitle>스킨케어</S.ScheduleTitle>
        <S.ScheduleText>평일 : AM 09:00 - PM 06:00</S.ScheduleText>
        <S.ScheduleText>토요일 : PM 09:00 - PM 03:00</S.ScheduleText>
    </S.ScheduleBlock>

    

</S.ScheduleWrapper>
<S.LocationButton>오시는길 바로가기</S.LocationButton>
</S.TopSection>

<S.BottomSection>
    <S.CompanyInfo>
    <S.CompanyName>안효범 안스성형외과</S.CompanyName>
    <S.InfoText>
    서울 노원구 노해로 460 (상계동) 2층 201호
    <br/>
    (안호범안스성형외과 건물 추차장 이용)
    </S.InfoText>    

<S.InfoText>
    의료기관 명칭 : 안호범안스성형외과
    <br/>
    대표번호 02. 932. 2222
    <br/>
    E-mail : test@test.com
</S.InfoText>
</S.CompanyInfo>

<S.BottomRight>
    <S.PolicyButtons>
        <S.PolicyBtn>
            실비보험 안내
        </S.PolicyBtn>
        <S.PolicyBtn>
            비급여 진료비용 안내
        </S.PolicyBtn>
    </S.PolicyButtons>

    <div className="">
        <S.FamilySiteTitle>
            Family
        </S.FamilySiteTitle>

        <S.FamilySiteLogos>
<div className="logo-placeholder">Breast Surgery Center</div>
<div className="logo-placeholder">Derm</div>
<div className="logo-placeholder">Lifting Center</div>
        </S.FamilySiteLogos>
        
    </div>
</S.BottomRight>




</S.BottomSection>


</S.FooterInner>

<S.FlaotingMenu>
    <S.FabItem>
        <S.FabIcon $bgColor='#FEE500'>TALK</S.FabIcon>
        <S.FabText>빠른 상담</S.FabText>
    </S.FabItem>
<S.FabItem>
    <S.FabIcon $bgColor='#3b82f6'>

    </S.FabIcon>
    <S.FabText>전화상담</S.FabText>
</S.FabItem>

</S.FlaotingMenu>

</S.FooterWrapper>        
        </>
    )
}