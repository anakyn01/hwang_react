"use client";
import React,{useRef} from 'react';
import * as S from '@/assets/css/Style.style';

//브이로그 임시 데이터
const VLOG_DATA = [
{id:1, desc:'답답했던 눈매·복코·얼굴살 완벽 개선', img:'/images/main/vlog/vlog1.jpg'}, 
{id:2, desc:'광대·사각턱·이중턱 싹 지우고 여신 등극', img:'/images/main/vlog/vlog2.jpg'},
{id:3, desc:'"성형 어디서 했냐고 DM 폭발" 그 비결은?', img:'/images/main/vlog/vlog3.jpg'},
{id:4, desc:'광대 싹 밀고 눈·가슴까지 다 갈아엎은 썰', img:'/images/main/vlog/vlog4.jpg'},
{id:5, desc:'턱밑 지방이랑 광대 싹 지우고 V라인 완성', img:'/images/main/vlog/vlog5.jpg'},   
]

export const VlogSlider = () => {

//슬라이더(가로 스크롤 영역)의 실제 HTML DOM 요소에 직접 접근하기 위해 useRef 훅을 생성합니다.
const sliderRef = useRef<HTMLDivElement>(null);
//화살표 버튼을 누를때 실행될 스크롤 조작함수('left' 또는 'right'를 인자로 받습니다)
const scroll = (direction :'left' | 'right') => {
//sliderRef.current가 존재 하는지(화면에 슬라이더 요소가 정상적으로 렌더링되어 잡혔는지를 ) 안전하게 확인
    if(sliderRef.current){
/*
클릭한 방향이 'left'면 왼쪽으로 260px(-260), 
'right'면 오른쪽으로 260px(260) 이동하도록 
이동량을 결정합니다.
260인 이유: 카드 1개의 너비(240px) +
+ 카드 사이의 여백(20px)을 합쳐서 
딱 한 칸씩만 정확하게 넘어가도록 계산한 값입니다)
*/   
const scrollAmount = direction === 'left' ? -260 : 260;
/*
자바스크립트 내장 DOM API 인 scrollBy()를 사용해
설정한 이동량(scrollAmount)만큼 스크롤바를 이동시킵니다.
behavior: 'smooth' 옵션을 주어 화면이 딱딱하게 끊기지 않고 
부드럽게 스르륵 넘어가게 만듭니다.
*/ 
sliderRef.current.scrollBy({left:scrollAmount, 
    behavior:'smooth'
});   
    }
}
    return(
        <>
<S.VlogSection>
<S.VlogInner>
    {/*헤더 영역 (타이틀 및 컨트롤 버튼) */}
    <S.VlogHeader>
<S.VlogTitleGroup>
    <S.VlogMainTitle>
      Ahn's VLOG.
    </S.VlogMainTitle>
</S.VlogTitleGroup>

<S.VlogControls>
<S.VlogViewMoreBtn>view more +</S.VlogViewMoreBtn>

<S.VlogArrowBtn
onClick={()=> scroll('left')}
>&lt;</S.VlogArrowBtn>

<S.VlogArrowBtn
onClick={()=> scroll('right')}
>&gt;</S.VlogArrowBtn>

</S.VlogControls>
    </S.VlogHeader>

{/*슬라이더 영역 */}
<S.VlogSliderWrapper ref={sliderRef}>
    {VLOG_DATA.map((item) => (
<S.VlogCard key={item.id}>
    <S.VlogImageWrapper>
<img src={item.img} alt={`브이로그 ${item.id}`}/>        
    </S.VlogImageWrapper>
    <S.VlogInfo>
        <S.VlogDesc>
            {item.desc}
        </S.VlogDesc>
    </S.VlogInfo>
</S.VlogCard>        
    ))}
</S.VlogSliderWrapper>
</S.VlogInner>
</S.VlogSection>        
        </>
    )
}