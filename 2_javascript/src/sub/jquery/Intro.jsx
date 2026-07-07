import React,{useEffect, useRef} from 'react';
/*useRef는 React안에서 특정 HTML태그를 꼭 집어내기 위한 이름표
$(document) $('#box') 이런것처럼 jquery에 id나 .클래스가 아닌
useRef를 사용합니다
*/


import $ from 'jquery';
//제이쿼리에서는 선택자라는 개념이 중요합니다

const Intro = () => {

const boxRef = useRef(null);
const buttonRef = useRef(null);

//2.useEffect 화면이 완전히 그려진 다음에 jquery를 실행하도록 보장
useEffect(() => {
   //useRef로 잡아둔 태그를 jQuery객체로 만듭니다
    const $box = $(boxRef.current);
    const $button = $(buttonRef.current);

    //jquery특유의 애니메이션(slideToggle)이벤트 만들기
    $button.on('click', () =>{
        $box.slideToggle('slow');
    })
    /*클린업 정리 함수 컴포넌트가 사라질때 이벤트도 꼭 지워줘야 합니다
화면을 나갔다가 들어올때 마다 클릭 이벤트가 2개 3개씩
    */
    return () => {
        $button.off('click');
    }

},[])

    return(
        <>
<button ref={buttonRef}>토글버튼</button>
<div ref={boxRef}>JQuery Box</div>
<h1>Jquery</h1>  
<pre>
과거 리액트가 생기기전에 아주 훌륭한 대안
그러나
이둘을 같이 쓰면 사공이 두명인 배
jquery : 화면에 잇는 태그를 직접 잡아서 색깔도 바꾸고 애니메이션을 넣어라
React : 데이터(State)만 바꿔
리액트가 화면을 관리하고 있는데 Jquery가 몰래 화면을 바꿔 버리면..
리액트가 헷갈려서 심각한 버그가 발생
Jquery는 과거에 만들어진 아주 훌륭한 Jquery플러그인(달력 슬라이더)을 
사용하는것이 원칙
npm install jquery
</pre>      
        </>
    )
}
export default Intro