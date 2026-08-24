"use client";
import React from 'react';
import * as S from './QuickConsultBar.styles';

export default function QuickConsultBar(){
    return(
<>
<S.BarWrapper>
    <S.BarInner>
        <S.Title>빠른 상담신청</S.Title>
        <S.Input type="text" placeholder='이름을 작성해주세요'/>
        <S.Input type="tel" placeholder='연락처를 작성해주세요'/>

        <S.Select defaultValue="">
<option value="" disabled hidden>상담분야를 선택해 주세요</option>
<option value="eye">눈 성형</option>
<option value="nose">코 성형</option>
<option value="antiaging">동안 성형</option>
<option value="petit">쁘띠 시술</option>
         </S.Select>

         <S.CheckboxGroup>
            <S.CheckboxLabel>
                <S.Checkbox type="checkbox"/>
                <S.AgreeText>개인정보처리방침 동의</S.AgreeText>
            </S.CheckboxLabel>
            <S.DetailLink>자세히</S.DetailLink>
         </S.CheckboxGroup>

         <S.SubmitBtn>빠른 상담신청하기</S.SubmitBtn>
    </S.BarInner>
</S.BarWrapper>
</>        
    )
}