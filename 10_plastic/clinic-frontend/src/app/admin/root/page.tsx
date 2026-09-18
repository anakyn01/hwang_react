"use client";
import React from "react";

import { Layout } from "../Layout";
import * as S from "@/assets/css/Style.style";
import {
FiUserPlus, FiPhoneCall, FiSearch, FiAlertOctagon    
} from "react-icons/fi";

export default function Root(){
    return(
        <>
        <Layout>
<S.DashboardContainer>

    <S.DashboardPageTitle>
        대시보드 종합 통계
    </S.DashboardPageTitle>

<S.DashboardCardGrid>
<S.DashboardCardInfo>
    <S.DashboardCardLabel $textColor="#4e73df">
회원가입 현황(일일)   
    </S.DashboardCardLabel>   
    <S.DashboardCardMainValue>
125명
    </S.DashboardCardMainValue>
    <S.DashboardCardSubGrid>
        <S.DashboardCardSubItem>
<span>주간:</span>
<strong>840명</strong>            
        </S.DashboardCardSubItem>
        <S.DashboardCardSubItem>
<span>월간:</span>
<strong>3,210명</strong>            
        </S.DashboardCardSubItem>       
    </S.DashboardCardSubGrid>
    </S.DashboardCardInfo>
</S.DashboardCardGrid>


</S.DashboardContainer>            
        </Layout>
        </>
    )
}