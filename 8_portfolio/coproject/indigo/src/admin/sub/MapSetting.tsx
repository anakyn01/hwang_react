import React,{useState, useEffect} from "react";
import axios from 'axios';
import { Layout } from "../../component/layout/Layout"
import * as B from '../css/Sub.styled';

export const MapSetting = () => {
// --- [1. 상태 관리] ---
// 어떤 지도를 사용할지 선택하는 상태입니다. (기본값: 'google')
const [mapType, setMapType] = useState<'google' | 'daum'>('google');
// 관리자가 입력할 지도의 임베드(퍼가기) URL 주소입니다.
const [mapUrl, setMapUrl] = useState('');

//--- [2. 데이터 불러오기] 처음에 딱 한 번 실행 ---
useEffect(() => {
    const fetchMapData = async () => {
        try{

        } catch (error) {

        }
    };
    fetchMapData();
},[]);

// --- [3. 조작 함수들] ---
// 🔘 지도 종류(구글/다음) 라디오 버튼 변경 시 실행
const handleMapTypeChange =(e:React.ChangeEvent<HTMLInputElement>) => {

}
// --- [4. 설정 저장 함수] ---
const handleSave = async () => {

}
    return(
        <>
        <Layout>
            <B.PageWrapper>
                <B.PageTitle>지도(MAP)섹션 환경설정</B.PageTitle>
                <B.Card>
                    <B.SectionTitle>1.지도 서비스 선택</B.SectionTitle>
                    <B.FormGroup>
                        <B.RadioGroup>
<label>
    <input
    type="radio" value="google" checked={mapType === 'google'}
    onChange={handleMapTypeChange}                                
    />구글맵(Google Maps)
</label>

<label>
    <input
    type="radio" 
    value="daum" 
    checked={mapType === 'daum'}
    onChange={handleMapTypeChange}                                
    />다음/구글맵(Kakao Maps)
</label>
                        </B.RadioGroup>
                    </B.FormGroup>
                </B.Card>
{/* --- 2. 지도 주소 입력 카드 --- */}
<B.Card>
    <B.SectionTitle>
        2.지도 퍼가기(Embed) URL입력
    </B.SectionTitle>

    {/* 친절한 관리자용 안내 문구 */}
    <B.BottomInfo>
        <strong> 지도 url입력 방법</strong>
        {mapType === 'google' ? (
<span>구글 맵에서 장소 검색 [공유] 클릭 <strong>[지도 퍼가기]</strong>탭 클릭  HTML복사후 <strong>src=" "</strong>
안의 주소만 추출해서 넣어주세요
</span>
        ):(
<span>카카오맵에서 장소 검색 [공유] 클릭 <strong>[HTML태그복사]</strong>탭 클릭  소스코드안의 <strong>src=" "</strong>
안의 주소만 추출해서 넣어주세요
</span>
        )}
    </B.BottomInfo>

    <B.Input
    type="text" value={mapUrl}
onChange={(e) => setMapUrl(e.target.value)}
placeholder="예 :  https://www.google.com/maps/embed?pb=..."   
    />
</B.Card>

<B.Card>
    <B.SectionTitle>3. 지도미리보기</B.SectionTitle>
    <B.MapPreview>
{mapUrl ? (
<iframe
src={mapUrl} width="100%" height="100%"
style={{}}
></iframe>
) :(
<span style={{color:'#888'}}>
UR을 입력하면 지도가 이곳에 나타납니다    
</span>
)}        
    </B.MapPreview>
</B.Card>

<B.SaveButtonWrap>
    <B.Button
    variant="primary"
    style={{padding:'10px 30px'}}
    >
    지도 설정하기
    </B.Button>
</B.SaveButtonWrap>

            </B.PageWrapper>
        </Layout>
        </>
    )
}