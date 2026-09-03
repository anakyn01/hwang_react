"use client";
import React, {useRef} from 'react';
import * as S from "@/assets/css/Style.style";

const EVENT_DATA = [
{id:1, rank:'1', name:'다다코성형',price:'149',
img: './images/main/circular/event1.jpg',
color:'#ffcced', radius:'50%'   
},
{id:2, rank:'2', name:'다다코성형',price:'149',
img: './images/main/circular/event2.jpg',
color:'#ffffcc', radius:'50%'   
},
{id:3, rank:'3', name:'다다코성형',price:'149',
img: './images/main/circular/event3.jpg',
color:'#ffcced', radius:'50%'   
},
{id:4, rank:'4', name:'다다코성형',price:'149',
img: './images/main/circular/event4.jpg',
color:'#ffffcc', radius:'50%'   
},
]

// 🎯 마우스 오버 시 나타날 원형 텍스트 컴포넌트
const CircularOverlay = () => (
  <S.HoverSvg viewBox="0 0 100 100">
    <path 
      id="textCircle" 
      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" 
      fill="none" 
    />
    <text>
      <textPath 
        href="#textCircle" 
        startOffset="0" 
        fill="rgba(255, 255, 255, 0.85)" 
        fontSize="6.5" 
        fontWeight="bold"
        letterSpacing="2.5"
      >
        DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC SURGERY
      </textPath>
    </text>
  </S.HoverSvg>
);

export default function EventRanking() {
const sliderRef = useRef<HTMLDivElement>(null);

const scroll = (direction:'left' | 'right') => {
    if(sliderRef.current){
const scrollAmount = direction === 'left' ? -310 : 310;
sliderRef.current.scrollBy({left:scrollAmount, behavior:'smooth'});        
    }
};

return(
<S.EventSection>
    <S.EventInner>
<S.EventHeader>
    <S.EventTitleGroup>
        <S.EventMainTitle>
            
        </S.EventMainTitle>
    </S.EventTitleGroup>
</S.EventHeader>        
    </S.EventInner>
</S.EventSection>   
)
}