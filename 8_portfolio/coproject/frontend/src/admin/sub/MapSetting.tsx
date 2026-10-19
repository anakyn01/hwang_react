import React,{useState, useEffect, useRef} from "react";
import axios from 'axios';
import { Layout } from "../../component/layout/Layout"
import * as B from '../css/Sub.styled';
// TypeScript에서 전역 kakao 객체를 인식하도록 선언
declare global {
    interface Window {
        kakao:any;
    }
}

export const MapSetting = () => {
// --- [1. 상태 관리] ---
// 어떤 지도를 사용할지 선택하는 상태입니다. (기본값: 'google')
const [mapType, setMapType] = useState<'google' | 'daum'>('google');
// 관리자가 입력할 지도의 임베드(퍼가기) URL 주소입니다.
//const [mapUrl, setMapUrl] = useState('');
//구글맵일 때는 URL을, 카카오맵일 때는 위도,경도(예: 37.656,127.062)를 저장하는 용도로 씁니다.
const [mapValue, setMapValue] = useState('');
// 카카오 지도를 담을 div를 가리키는 래퍼런스
const kakaoMapRef = useRef<HTMLDivElement>(null);

//--- [2. 데이터 불러오기] 처음에 딱 한 번 실행 ---
useEffect(() => {
    const fetchMapData = async () => {
        try{
// 백엔드에서 지도 데이터를 가져옵니다.
const response = 
await axios.get('http://localhost:5000/api/settings/map');
if (response.data) {
    setMapType(response.data.mapType || 'google');
    setMapValue(response.data.mapUrl || '');
}
        } catch (error) {
console.error('지도 데이터 불러오기 에러:', error);
        }
    };
    fetchMapData();
},[]);

// 💡 카카오맵을 렌더링하는 핵심 함수
useEffect(() => {
    //카카오맵이 선택되었고, 스크립트가 로드되었으며, 입력값이 있을 때만 실행
    if (mapType === 'daum' && window.kakao && window.kakao.maps 
        && kakaoMapRef.current) {
const [lat, lng] = mapValue.split(',').map(Number);

// 위도, 경도 값이 숫자로 잘 변환되었는지 체크
if (!isNaN(lat) && !isNaN(lng)) {
    const container = kakaoMapRef.current;
    const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level:3 //확대 수준
    };
    //지도생성
    const map = new window.kakao.maps.Map(container, options);
    //마커생성 표시
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({position:markerPosition});
    marker.setMap(map);
}
        }
},[mapType, mapValue]);

// --- [3. 조작 함수들] ---
// 🔘 지도 종류(구글/다음) 라디오 버튼 변경 시 실행
const handleMapTypeChange =(e:React.ChangeEvent<HTMLInputElement>) => {
setMapType(e.target.value as 'google' | 'daum');
// (선택) 서비스 종류를 바꾸면 기존 URL을 싹 지워주면 관리자가 안 헷갈립니다!
setMapValue('');//타입 변경시 입력창 초기화
};
// --- [4. 설정 저장 함수] ---
const handleSave = async () => {
// 주소를 입력하지 않고 저장하려 할 때 방어
if(!mapValue.trim()) {
    alert('지도 정보를 입력해 주세요');
    return;
}
try{
// 이번엔 이미지가 없으므로 FormData 대신 일반 JSON 객체로 편하게 보냅니다.
await axios.post('http://localhost:5000/api/settings/map',{
    mapType: mapType, mapUrl: mapValue
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
    />구글맵(URL 퍼가기 방식)
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
        2.지도 정보 입력
    </B.SectionTitle>

    {/* 친절한 관리자용 안내 문구 */}
    <B.BottomInfo>
        <strong> 지도 url입력 방법</strong>
        {mapType === 'google' ? (
<span>구글 맵에서 <strong>[지도 퍼가기]</strong>탭 클릭  HTML복사후 <strong>src=" "</strong>
안의 주소만 추출해서 넣어주세요
</span>
        ):(
<span>카카오맵은 <strong>위도, 경도</strong>를 쉼표(,)로 구분하여 입력해 주세요<br/>
(노원 그린텀퓨터 아카데미 예시: <strong>37.65651, 127.0631</strong>)
</span>
        )}
    </B.BottomInfo>

    <B.Input
        type="text" value={mapValue}
        onChange={(e) => setMapValue(e.target.value)}
        placeholder="예 :  https://www.google.com/maps/embed?pb=..."   
    />
</B.Card>

<B.Card>
    <B.SectionTitle>3. 지도미리보기</B.SectionTitle>
    <B.MapPreview>
{mapType === 'google' && mapValue && (
<iframe
src={mapValue} 
width="100%" 
height="100%"
style={{ border:0}}
allowFullScreen={true}
loading="lazy"
></iframe>
)}

{mapType === 'daum' && (
    <div
ref={kakaoMapRef}  
style={{width:'100%', height:'100%', display:mapValue ? 'block' : 'none'}}  
    />
)}
{!mapValue && (
    <div style={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
color:'#888'
    }}>
정보를 입력하면 지도가 나타납니다  
</div>
)}        
    </B.MapPreview>
</B.Card>

<B.SaveButtonWrap>
    <B.Button
    variant="primary"
    style={{padding:'10px 30px'}}
    onClick={handleSave}
    >
    지도 설정하기
    </B.Button>
</B.SaveButtonWrap>

            </B.PageWrapper>
        </Layout>
        </>
    )
}