'use client'

import React,{useState} from 'react';
import Link from 'next/link';
import * as S from './Shelter.styled';
import * as A from '../../css/style.styles';

//MUI
import {
NotificationsOutlined as NotificationsIcon,
TuneOutlined as FilterIcon,
FmdGood as LocationIcon,
PlayCircleFilled as PlayIcon,
ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

export default function Shelter(){
const[activeTab, setActiveTab] = useState('보호동물');
const[isAlertOn, setIsAlertOn] = useState(false);

return(
    <>
<A.AppWrapper>

<A.Container>
    <S.TabContainer>
        {['보호동물', '보호소 찾기', '추천 입양 동물'].map((tab) =>(
            <S.TabBtn
     key={tab}
     $active={activeTab === tab}
     onClick={() => setActiveTab(tab)}       
            >
    {tab}            
            </S.TabBtn>
        ))}
    </S.TabContainer>
    {/*필터 영역 */}
    <S.FilterContainer>

<S.FilterIconBtn>
<FilterIcon sx={{ fontSize:20, color: '#666'}}/>
</S.FilterIconBtn>

<S.FilterSelect defaultValue="3months">
<option value="3months">최근 3개월</option>
</S.FilterSelect>

<S.FilterSelect defaultValue="allArea">
<option value="allArea">모든 지역</option>
</S.FilterSelect>

<S.FilterSelect defaultValue="allAnimal">
<option value="allAnimal">모든 동물</option>
</S.FilterSelect>

    </S.FilterContainer>

{/*실시간 알림 토글배너 */}
<S.AlertBanner>
    <S.AlertInfo>
        <div className="icon-circle">
<NotificationsIcon sx={{}}/>
        </div>
        <div className="text-group">
            <strong>이지역 실시간 알림</strong>
            <span>새공고가 올라오면 알려드려요</span>
        </div>
    </S.AlertInfo>
    <S.ToggleBtn
    $isOn={isAlertOn}
    onClick={() => setIsAlertOn(!isAlertOn)}
    >
        <div className='handle'/>
    </S.ToggleBtn>
</S.AlertBanner>

<S.Divider/>

<S.RecommendSection>
    <S.SectionHeader>
        <A.H2Size20>이달의 추천 입양 동물</A.H2Size20>
        <Link href="#more" className='more-link'>
        더보기<ChevronRightIcon sx={{fontSize:18}}/>
        </Link>
    </S.SectionHeader>

    <S.RecommendScroll>
        <S.RecommendCard>
            <S.RecommendImgBox>
                <img src="" alt="" />
                <PlayIcon className='play-icon' sx={{}}/>
            </S.RecommendImgBox>
            <S.LocationText>
                <LocationIcon sx={{fontSize:16}}/>
                강원특별자치도..
            </S.LocationText>
        </S.RecommendCard>
    </S.RecommendScroll>
</S.RecommendSection>

<S.Divider/>

<S.ListSection>
    <S.AnimalCard>
        <S.AnimalImgBox>
            <img src="" alt="" />
        </S.AnimalImgBox>
        <S.AnimalInfo>
            <S.BadgeGroup>
                <S.Badge $type="status">완료</S.Badge>
                <S.Badge $type="female">암컷</S.Badge>
            </S.BadgeGroup>
            <S.InfoGrid>
     <span className="label">품종</span>
                  <span className="value">[개] 푸들</span>
                  <span className="label">공고번호</span>
                  <span className="value">충북-청주-2026...</span>
                  <span className="label">등록날짜</span>
                  <span className="value">2026-08-06</span>
                  <span className="label">구조장소</span>
                  <span className="value">용암삼일무지개아파트</span>           
            </S.InfoGrid>
        </S.AnimalInfo>
    </S.AnimalCard>
</S.ListSection>

</A.Container>


</A.AppWrapper>    
    </>
)
}