import {useState, useEffect} from 'react'; //상태관리 훅 불러움
import axios from 'axios';

//관리자에서 설정한 메뉴타입을 정의합니다
interface MenuItem{
    id:number; title:string; link:string;
}

const Header = () => {

//메뉴가 열려있는지 확인하는 상태 (false)
const [isOpen, setIsOpen] = useState(false); 

//-add 
const [logoType, setLogoType]  = useState<'text' | 'image'>('text');
const [logoText, setLogoText]  = useState('INDIGO');
const [logoImage, setLogoImage]  = useState('');
const [menus, setMenus]  = useState<MenuItem[]>([]);//메뉴 배열

//버튼 클릭시 상태 반전 이런걸 전부 함수로 사용함 (모든 개발언어에서)
const toggleMenu = () => {
    setIsOpen(!isOpen);
}

//화면이 처음 그려질 때 백엔드에서 헤더 설정값 불러오기
useEffect(() => {
    const fetchHeaderSettings = async () => {
        //아까 만드 백앤드..

        try{
const response = await axios.get('http://localhost:5000/api/settings/header');  
//성공적으로 받아 오면 상태를 업데이트
setLogoType(response.data.logoType); 
setLogoText(response.data.logoText);  
setLogoImage(response.data.logoImage);   
setMenus(response.data.menus);  
        }catch (error){
console.error('헤더설정을 불러오는 중 에러가 발생했습니다', error);
        }
    }
    fetchHeaderSettings();
}, []);


//아래 랜더 함수
    return(
        <>
<header className="header">{/* cfixed */}
    
    <h1 className="logo">
    <a href="/">
        {logoType === 'text' ? (
            //글시 로고 선택시
            logoText
        ):(
            //이미지 로고 선택시
            <img src={logoImage}
            alt={logoText}
            style={{maxHeight:"40px"}}
            />
        )}    
    </a>
    </h1>
    
    <nav>
        <ul 
        className={`gnb ${isOpen ? 'active' : ''}`}
        >
{menus && menus.length > 0 ? (
    menus.map((menu) => (
<li key={menu.id}>
                                    <a href={menu.link}>{menu.title}</a>
                                </li>
    ))
):(
<>
            <li><a href="">HOME</a></li>
            <li><a href="">WE ARE</a></li>
            <li><a href="">WORK</a></li>
            <li><a href="">BLOG</a></li>
            <li><a href="">CONTACT US</a></li>
</>
)}
        </ul>
    </nav>

    <span className="menu-toggle-btn" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
    </span>
</header>
        </>
    )
}
export default Header

/*
리액트 심장
useState 는
컴포넌트가 자신만의 기억력(상태)을 갖게 해주는 도구
리액트는 기본적으로 한번 화면을 그리고 나면
변수를 바꿔도 화면이 새로 고쳐지지 않는다

이 값이 바뀌면 화면을 다시 그려줘
라고 특별히 요정하는 도구가 바로 useState 입니다
이를 훅(Hook)
*/