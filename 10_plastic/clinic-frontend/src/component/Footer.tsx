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
        <S.ScheduleText>평일:</S.ScheduleText>
        <S.ScheduleText>야간:</S.ScheduleText>
        <S.ScheduleText>토요일:</S.ScheduleText>
    </S.ScheduleBlock>

    <S.ScheduleBlock>
        <S.ScheduleTitle>스킨케어</S.ScheduleTitle>
        <S.ScheduleText>평일:</S.ScheduleText>
        <S.ScheduleText>토요일:</S.ScheduleText>
    </S.ScheduleBlock>

    

</S.ScheduleWrapper>
<S.LocationButton>오시는길 바로가기</S.LocationButton>
</S.TopSection>

<S.BottomSection>
    <S.CompanyInfo>
    <S.CompanyName>안효범 안스성형외과</S.CompanyName>
    <S.InfoText>
    서울 노원구..
    <br/>
    (도로명주소 : )
    </S.InfoText>    

<S.InfoText>
    의료기관 명칭 :
    <br/>
    대표번호 02. 932. 2222
    <br/>
    E-mail : 
</S.InfoText>
</S.CompanyInfo>

<S.BottomRight>
    <S.PolicyButtons>
        <S.PolicyBtn>
            실비
        </S.PolicyBtn>
        <S.PolicyBtn>
            비급여
        </S.PolicyBtn>
    </S.PolicyButtons>

    <div className="">
        <S.FamilySiteTitle>
            Family
        </S.FamilySiteTitle>
        <S.FamilySiteLogos>
            lorem
        </S.FamilySiteLogos>
                <S.FamilySiteLogos>
            lorem
        </S.FamilySiteLogos>
                <S.FamilySiteLogos>
            lorem
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