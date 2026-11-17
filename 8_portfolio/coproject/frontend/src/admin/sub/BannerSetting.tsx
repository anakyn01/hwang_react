import React,{useState} from 'react';
import axios from 'axios';
import { Layout} from '../../component/layout/Layout';
import * as B from "../css/Sub.styled";

// 캐러셀 이미지 데이터 타입 정의
interface CarouselItem{
    id:number; url:string;
}

export const BannerSetting = () => {
// --- 🌟 메인 배너 설정 상태 (단일 이미지 vs 캐러셀) ---
const [bannerType, setBannerType ] = useState<'single' | 'carousel'>('single');
const [singleBanner, setSingleBanner] = useState('/assets/images/p-images/slide01.jpg');
const [carouselImages, setCarouselImages] = useState<CarouselItem[]>([
{ id:1, url:'/assets/images/slide/banner1.jpg'}
]);

// --- 캐러셀 이미지 추가/삭제/수정 로직 ---
const handleAddCarouselImage = () => {
    const newImage: CarouselItem = {id:Date.now(), url:''};
    setCarouselImages([...carouselImages, newImage]);
}

//❌ '삭제' 버튼을 눌렀을 때 실행되는 함수입니다. 삭제할 항목의 고유 id를 받아옵니다.
const handleRemoveCarouselImage = (id:number) => {
    //배열을 쭉 돌면서(filter), 
    //방금 누른 id와 다른 것들만 남겨서 새로운 배열을 만듭니다.
    setCarouselImages(carouselImages.filter(img => img.id !== id));
}

//✏️ 이미지 URL 입력칸에 글씨를 칠 때마다 실행되는 함수입니다.
const handleChangeCarouselImage = (id:number, url:string) =>{
    //배열을 돌면서(map), 
    // 내가 지금 글씨를 치고 있는 칸(id가 일치함)의 url값만 쏙 바꿔줍니다.
    setCarouselImages(carouselImages.map(img =>
        img.id === id ? {...img, url} : img
    ));
}

/*
--- 최종 설정 저장 함수 ---
'설정 저장하기' 버튼을 누르면 실행되는 함수
*/
const handleSave = async () => {
    //백엔드로 보낼 데이터를 하나의 상자로 포장
    const settingData = {
        bannerType,
        singleBanner,
        carouselImages
    };
    try{
// 백엔드 주소로 방금 포장한 데이터(settingData)를 전송(POST)합니다.
await axios.post('http://localhost:5000/api/settings/banner', settingData)
console.log('저장될 데이터: ', settingData);
alert('배너 설정이 성공적으로 저장되었습니다');
}catch(error){
console.error('설정 저장 실패: ',error);
alert('설정 저장 중 오류가 발생했습니다');
    }
};


    return(
        <>
        <Layout>
<B.PageWrapper>
    <B.PageTitle>
        메인 배너 환경설정
    </B.PageTitle>
    <B.Card>
        <B.SectionTitle>
            1. 메인 배너 이미지 설정
        </B.SectionTitle>

        <B.FormGroup>
            <label>배너 노출방식</label>
            <B.RadioGroup>
                <label>
                    <input
                        type="radio" name='bannerType' value="single" 
                        checked={bannerType === 'single'}
                        onChange={() => setBannerType('single')}       
                    />단일 이미지 (1장 고정)
                </label>

                <label>
                    <input
                        type="radio" name='bannerType' value="carousel" 
                        checked={bannerType === 'carousel'}
                        onChange={() => setBannerType('carousel')}       
                    />슬라이드 캐러셀 (여러 장)
                </label>
            </B.RadioGroup>
        </B.FormGroup>
{/*
[조건부 렌더링 영역] 만약 사용자가 '단일 이미지'를 선택했다면 아래 폼(UI)을 보여주고,
*/}
{bannerType === 'single' ? (
<B.FormGroup>
    <label>메인 배너 이미지 경로</label>
    <B.Input
    type="text"
    value={singleBanner}
    onChange={(e) => setSingleBanner(e.target.value)}
    placeholder='이미지넣어주세요'
    />
    {/*입력칸 밑에 띄우는 작은 안내글입니다. */}
    <small style={{ color: '#888', marginTop: '5px' }}>
     * 메인 화면에 1장의 이미지만 고정으로 노출합니다.   
    </small>
</B.FormGroup>
//'단일 이미지'가 아니라면(즉, '캐러셀'을 선택했다면) 아래 UI를 보여줍니다.
):(
   <>
<label htmlFor=""
style={{ fontWeight: 'bold', color: '#555', 
marginBottom: '8px', display: 'block' }}
>
캐러셀 이미지 목록
</label>  
{carouselImages.map((img, index) => (
   // 항상 반복문 최상위 태그에는 고유한 key를 줘야 리액트가 헷갈리지 않습니다. 
   <B.MenuRow key={img.id}>
<span style={{ minWidth: '60px', fontWeight: 'bold', color: '#888' }}>
슬라이드 {index + 1}    
</span>   
<B.Input
type="text"
placeholder='이미지 URL (예: /assets/images/banner1.jpg)'
value={img.url}
onChange={(e) => handleChangeCarouselImage(img.id, e.target.value)}
/> 
{/*이 행을 지우는 빨간색 삭제 버튼 */}
<B.Button variant="danger"
onClick={() => handleRemoveCarouselImage(img.id)}
>
삭제
</B.Button>
{/*새로운 빈 입력칸을 한줄 추가하는 초록색버튼 */}

   </B.MenuRow>
))} 
<div>
    <B.Button
    variant="success"
    onClick={handleAddCarouselImage}
    >
    이미지추가
    </B.Button>
</div>
   </> 
)}
    </B.Card>
{/* 최종 저장 버튼을 감싸는 영역입니다 (오른쪽 정렬). */}
<B.SaveButtonWrap>
    <B.Button variant='primary'
    style={{padding:'10px 30px', fontSize:'16px'}}
    onClick={handleSave}
    >
    설정 저장하기
    </B.Button>
</B.SaveButtonWrap>

</B.PageWrapper>
        </Layout>
        </>
    )
}