import { useState } from "react";
import { createPortal} from 'react-dom';
/*
BOM : 창문틀, 닫기 버튼, 주소창, 뒤로가기 버튼등 브라우저창 자체를 제어
- 다른주소로 이동하기 window.location.href
- 사용자 화면 크기 알아내기 window.screen

DOM : 웹페이지 문서 내용물 전체를 제어하는 도구 
예시 로그인 버튼을 눌렀을때 경고창 뛰우기
버튼 색상 빨간색으로 바꾸기
글자 내용 바꾸기

Bom > Dom
*/
const Modal = ({isOpen, onClose, children}) => {
     if (!isOpen) return null;

     return createPortal(
    <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0,
        backgroundColor:'rgba(0,0,0, .8)',
        display:'flex', alignItems:'center',
        justifyContent:'center'
    }}>
        <div style={{
        background:'white', padding:'20px', borderRadius:'8px'
        }}>
        {children}
        <button onClick={onClose}>Close</button>
        </div>
    </div>,
    document.body
     );
}

const Portals = () => {

    //상태관리가 되려면..
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
<h1>모달[popup,팝업,모달창,modal, modallayer]창 뛰우기</h1> 
<button onClick={ () => setIsOpen(true)}>
Open Modal
</button> 

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <h2>모달창</h2>
    <p>예전에는 없던 기능 포털</p>
</Modal>
        </>
    )
}
export default Portals