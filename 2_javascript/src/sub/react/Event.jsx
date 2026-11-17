import React, {useState} from 'react';


const Event = () => {

    const [userId, setUserId] = useState('');
    const [isHoverd, setIsHoverd] = useState(false);

    //1.onSubmit 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); //새로고침 방지(필수!)
        alert(`제출된 아이디: ${ userId}`);
    }

    const shoot = () => {
        alert("Great Shot!")
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('엔터키가 눌렸습니다')
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
<input
type="text" value={userId}
onChange={(e) => setUserId(e.target.value)}
onKeyDown={handleKeyDown}
placeholder='아이디를 입력하세요'
/>

        <h1>리엑트에서 잘 사용하는 이벤트 </h1>
        <p>
(1) onClick (마우스 클릭)
(2) onChange (값 변경) : 사용자가 입력창에 글자를 치거나
체크박스를 누를때 마다 실시간으로 발생   
(3) onSubmit (폼 제출) : 태그 안에서 사용자가 제출(submit)버튼을 누르거나 엔터키를 
쳤을때 발생
(4) onKeyDown(키보드 입력) : 사용자가 키보드를 눌렀을 때 발생
(5) onKeyUp (누르고 땔떼)  
(6) onMouseEnter & onMouseLeave (마우스 호버)  
        </p>
<button onClick={shoot}>take the shot</button>        
        </form>
        </>
    )
}

export default Event