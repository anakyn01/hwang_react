import React,{useState, useEffect} from 'react';
import axios from 'axios';

interface CarouselItem {
    id:number; url:string;
}

export const Slider = () => {
//--- [1. 상태 관리] 백엔드에서 불러올 데이터들을 저장할 공간 ---
const [bannerType, setBannerType] = useState<'single' | 'carousel'>('single');
const [singleBanner, setSingleBanner] = useState('');
const[carouselImages, setCarouselImages] = useState<CarouselItem[]>([]);
//현재 몇 번째 슬라이드 이미지를 보여줄지 기억하는 상태 (0부터 시작)
const [currentIndex, setCurerentIndex] = useState(0);

useEffect(() => {
    const fetchBannerSettings = async () => {
        try{
// 백엔드 API에서 배너 설정값을 달라고 요청합니다.
const response = await axios.get('http://localhost:5000/api/settings/banner');
setBannerType(response.data.bannerType);
setSingleBanner(response.data.singleBanner);
setCarouselImages(response.data.carouselImages);
        }catch(error){
console.error('배너 설정을 불러오는 중 에러 발생:', error);
        }
    };
fetchBannerSettings();
},[]);

// '다음' 화살표를 눌렀을 때 실행되는 함수
const nextSlide = () => {
setCurerentIndex((prev) => (prev === carouselImages.length -1 ? 0:prev + 1));
}

// '이전' 화살표를 눌렀을 때 실행되는 함수
const prevSlide = () => {
setCurerentIndex((prev) => (prev === 0? carouselImages.length -1  : prev- 1));
}

    return(
        <article className="slider">
{bannerType === 'single' ? (
    //그냥 이미지 한장만 딱 보여 줍니다
      <img 
            src={singleBanner} 
            alt="슬라이드이미지"
            />
):(
    /* 2) 슬라이드 캐러셀을 선택했을 때 */
    <>
{/* 등록된 이미지가 1장이라도 있을 때만 슬라이드를 보여줍니다. */}
{carouselImages && carouselImages.length > 0 ? (
    <>
          <img 
            src={carouselImages[currentIndex].url}
            alt="슬라이드이미지"
            />
            {/* 이전 버튼 (왼쪽 화살표) */}
            <button
            onClick={prevSlide}
            style={arrowStyleLeft}
            >
            &#10094;
            </button>
            {/* 다음 버튼 (오른쪽 화살표) */}
            <button
            onClick={nextSlide}
            style={arrowStyleRight}
            >
            &#10095;
            </button>
{/* 하단에 현재 몇 번째 슬라이드인지 알려주는 동그라미(인디케이터) 점들 */}   
<div style={indicatorContainerStyle}>
    {carouselImages.map((_, index) => (
        <span
        key={index}
        onClick={() => setCurerentIndex(index)}
        style={index === currentIndex ? activeDotStyle: dotStyle}
        />
    ))}
</div>         
    </>
):(
    // 캐러셀 방식을 선택했는데 등록된 이미지가 없을 때 보여줄 안내문
    <div>
        등록된 슬라이드 이미지가 없습니다. 관리자 페이지에서 이미지를 추가해주세요.
    </div>
)}    
    </>
)}

        </article>
    )
}

const arrowStyleLeft: React.CSSProperties = {
position:'absolute', top:'50%', left:'20px',
transform:'translateY(-50%)',
backgroundColor:'rgba(0,0,0,0.5)',
color:'white', border:'none', fontSize:'24px',
padding:'10px 15px', cursor:'pointer',
borderRadius:'5px'
};

const arrowStyleRight: React.CSSProperties = {
position:'absolute', top:'50%', right:'20px',
transform:'translateY(-50%)',
backgroundColor:'rgba(0,0,0,0.5)',
color:'white', border:'none', fontSize:'24px',
padding:'10px 15px', cursor:'pointer',
borderRadius:'5px'
};

const indicatorContainerStyle: React.CSSProperties ={
position:'absolute', bottom:'20px', width:'100%',
display:'flex', justifyContent:'center',
gap:'10px'
};

const dotStyle: React.CSSProperties ={
width:'12px', height:'12px',
backgroundColor:'rgba(255,255,255,0.5)',
borderRadius:'50%',
cursor:'pointer'
}

const activeDotStyle: React.CSSProperties ={
...dotStyle,
backgroundColor:'white',
}