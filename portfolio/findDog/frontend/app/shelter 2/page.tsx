'use client'

import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';

import * as A from '../../css/style.styles';

import Footer from '../components/Footer';

//MUI
import {
NotificationsNone as NotificationsNoneIcon,
NotificationsOutlined as NotificationsIcon,
TuneOutlined as FilterIcon,
FmdGood as LocationIcon,
PlayCircleFilled as PlayIcon,
ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Topbar } from '../components/topbar/Topbar';

//백앤드에서 받아올 데이터 타입정의
interface Animal{
id:number;
status:'ACTIVE' | 'COMPLETED';
gender:'MALE' | 'FEMALE' | 'UNKNOWN';
breed:string;
noticeNo:string;
regDate:string;
rescueLocation:string;
imageUrl:string;    
}

export default function Shelter(){
const[activeTab, setActiveTab] = useState('보호동물');
const[isAlertOn, setIsAlertOn] = useState(false);

//백엔드에서 가져온 동물 리스트를 담을 상태
const [animals,setAnimals] = useState<Animal[]>([]);

//생명주기
 useEffect(() => {
    const fetchAnimals = async () => {

        try{
const response = await axios.get('http://localhost:8080/api/shelter-animals');
setAnimals(response.data);
        }catch(error){
console.error('동물 데이터를 불러오는데 실패했습니다', error);
        }
    };
    fetchAnimals();
 }, []);

//이미지 주소 변환함수
const getFullImageUrl = (url: string) => {
if (!url) return 'http://via.placeholder.com/110';
if (url.startsWith('/uploads/')){
return `http://localhost:8080${url}`;
}
return url;
} 
return(
    <>
    
<A.AppWrapper>


<A.Container>
<A.Header>
      <A.Logo>어서찾아주개</A.Logo>
      <NotificationsNoneIcon fontSize="large"/>
</A.Header>
 
    <A.TabContainer>
        {['보호동물', '보호소 찾기', '추천 입양 동물'].map((tab) =>(
            <A.TabBtn
     key={tab}
     $active={activeTab === tab}
     onClick={() => setActiveTab(tab)}       
            >
    {tab}            
            </A.TabBtn>
        ))}
    </A.TabContainer>
    {/*필터 영역 */}
    <A.FilterContainer>

<A.FilterIconBtn>
<FilterIcon sx={{ fontSize:20, color: '#666'}}/>
</A.FilterIconBtn>

<A.FilterSelect defaultValue="3months">
<option value="3months">최근 3개월</option>
</A.FilterSelect>

<A.FilterSelect defaultValue="allArea">
<option value="allArea">모든 지역</option>
</A.FilterSelect>

<A.FilterSelect defaultValue="allAnimal">
<option value="allAnimal">모든 동물</option>
</A.FilterSelect>

    </A.FilterContainer>

{/*실시간 알림 토글배너 */}
<A.AlertBanner>
    <A.AlertInfo>
        <div className="icon-circle">
<NotificationsIcon sx={{}}/>
        </div>
        <div className="text-group">
            <strong>이지역 실시간 알림</strong>
            <span>새공고가 올라오면 알려드려요</span>
        </div>
    </A.AlertInfo>
    <A.ToggleBtn
    $isOn={isAlertOn}
    onClick={() => setIsAlertOn(!isAlertOn)}
    >
        <div className='handle'/>
    </A.ToggleBtn>
</A.AlertBanner>

<A.Divider/>

<A.RecommendSection>
    <A.SectionHeader>
        <A.H2Size20>이달의 추천 입양 동물</A.H2Size20>
        <Link href="#more" className='more-link'>
        더보기<ChevronRightIcon sx={{fontSize:18}}/>
        </Link>
    </A.SectionHeader>

    <A.RecommendScroll>
        <A.RecommendCard>
            <A.RecommendImgBox>
<img src="https://via.placeholder.com/140" 
alt="추천동물" />
                <PlayIcon className='play-icon' sx={{}}/>
            </A.RecommendImgBox>
            <A.LocationText>
                <LocationIcon sx={{fontSize:16}}/>
                강원특별자치도..
            </A.LocationText>
        </A.RecommendCard>
    </A.RecommendScroll>
</A.RecommendSection>

<A.Divider/>

<A.ListSection>
    {animals.length === 0 ? (
        <div className="">
            등록된 보호 동물이 없습니다
        </div>
    ):(
animals.map((animal) => (        
    <A.AnimalCard key={animal.id}>
        <A.AnimalImgBox>
<img 
src={getFullImageUrl(animal.imageUrl)} 
alt={animal.breed}
/>
        </A.AnimalImgBox>
        <A.AnimalInfo>
            <A.BadgeGroup>
<A.Badge $type="status">
{animal.status === 'COMPLETED' ? '완료' : '공고중'}
</A.Badge>
<A.Badge $type={animal.gender === 'FEMALE' ? 'female' : animal.gender === 'MALE' ? 'male' : 'unknown'}>
{animal.gender === 'MALE' ? '수컷' : animal.gender === 'FEMALE' ? '암컷' : '미상'}
</A.Badge>
            </A.BadgeGroup>
            <A.InfoGrid>
<span className="label">품종</span>
<span className="value">{animal.breed}</span>
<span className="label">공고번호</span>
<span className="value">{animal.noticeNo}</span>
<span className="label">등록날짜</span>
<span className="value">{animal.regDate}</span>
<span className="label">구조장소</span>
<span className="value">{animal.rescueLocation}</span>
            </A.InfoGrid>
        </A.AnimalInfo>
    </A.AnimalCard>
))
    )}
</A.ListSection>

</A.Container>
<Footer/>

</A.AppWrapper>    
    </>
)
}