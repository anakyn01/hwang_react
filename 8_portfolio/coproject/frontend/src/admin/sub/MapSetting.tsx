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
// 백엔드에서 지도 데이터를 가져옵니다.
const response = 
await axios.get('http://localhost:5000/api/settings/map');
if (response.data) {
    setMapType(response.data.mapType || 'google');
    setMapUrl(response.data.mapUrl || '');
}
        } catch (error) {
console.error('지도 데이터 불러오기 에러:', error);
        }
    };
    fetchMapData();
},[]);

// --- [3. 조작 함수들] ---
// 🔘 지도 종류(구글/다음) 라디오 버튼 변경 시 실행
const handleMapTypeChange =(e:React.ChangeEvent<HTMLInputElement>) => {
const selectedType =
e.target.value as 'google' | 'daum';
setMapType(selectedType);
// (선택) 서비스 종류를 바꾸면 기존 URL을 싹 지워주면 관리자가 안 헷갈립니다!
setMapUrl('');
};
// --- [4. 설정 저장 함수] ---
const handleSave = async () => {
// 주소를 입력하지 않고 저장하려 할 때 방어
if(!mapUrl.trim()) {
    alert('지도 퍼가기 (Embed) URL을 입력해 주세요');
    return;
}
try{
// 이번엔 이미지가 없으므로 FormData 대신 일반 JSON 객체로 편하게 보냅니다.
await axios.post('http://localhost:5000/api/settings/map',{
    mapType: mapType, mapUrl: mapUrl
})
alert('지도 설정이 성공적으로 저장되었습니다!');
} catch (error) {
console.error('지도 설정 저장 실패:', error);
alert('설정 저장 중 오류가 발생했습니다.');
}

};
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