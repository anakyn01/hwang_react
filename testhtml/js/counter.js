let count = 0; //숫자를 담을 그릇을 만들고 0이라는 값을 넣음
//let은 바꿀수 있는 변수에 선언문

//2 html요소 가져오기 => 화면에 있는 태그들을 자바스크립트가 제어하게 데려오겠음
const display = document.getElementById('number')
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

//3.이벤트 설정 대상.addEventListener("이벤트 종류", 실행할 함수)
//웹페이지에서 우리가 하는 모든 행동(클릭,키보드입력,마우스 움직임등)
//컴퓨터가 알수 있게 해주는 귀에 역활
upBtn.addEventListener('click', () =>{
    count++; //값 증가
    display.textContent = count;//화면에 출력
})

downBtn.addEventListener('click', () =>{
    count--; //값 감소
    display.textContent = count;//화면에 출력
})
