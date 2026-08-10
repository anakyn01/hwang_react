'use client'

//상태관리를 위해 useState와 useEffect를 추가로 불러옵니다
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import {TopbarContainer, TopbarSearch, 
TopbarNavbar} from './Topbar.styled';

export const Topbar:React.FC = () => {
//페이지 이동 함수를 navigate라는 이름으로 사용할수있게 준비 ..
//const navigate = useNavigate();
const router = useRouter();

//1.화면에 보여줄 사용자 이름 상태를 만듭니다.(기본값: Guest)
const [userName, setUserName] = useState('Guest');

//2.화면이 처름 켜질때 딱 한번만 실행
useEffect(() => {
//로그인 할때 저장해둔 'userName'을 브라우저 저장소에서 꺼내옵니다
const storedName = localStorage.getItem('userName');

//만약 저장된 이름이 있다면, 상태를 그이름으로 업데이트 합니다
if(storedName){
//💡 setTimeout으로 감싸서 
// 리액트의 동기적 렌더링 감시망을 피해갑니다!
    setTimeout(() => {
    setUserName(storedName);
    },0)
}
},[]);

//로그아웃 버튼을 눌렀을때 실행되는 함수를 만듭니다
const handleLogout = () => {
    //1.브라우저 금고(localStorage)에서 'userName'데이터를 완전히 지웁니다
    localStorage.removeItem('userName');
    //2.로그인 페이지('/login)로 사용자를 이동시킵니다
    //navigate('/login');
   router.push('/login');
}

    return(
        <>
        <TopbarContainer 
className="navbar navbar-expand navbar-light topbar static-top">
{/*Sidebar Toggle(Mobile) */}
<button className="btn btn-link d-md-none rounded-circle mr-3">
    <i className="fa fa-bars"></i>
</button>

{/*Topbar Search */}
<TopbarSearch 
className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
<div className="input-group">
    <input type="text" 
    className="form-control bg-light border-0 small"
    placeholder="Search for.."
    />
    <div className="input-group-append">
        <button className="btn btn-primary">
            <i className="fas fa-search fa-sm"></i>Search
        </button>
    </div>
</div>
</TopbarSearch>

{/*Topbar Navbar */}
<TopbarNavbar className="ml-auto">
    {/*User Information */}
    <li className="nav-item dropdown no-arrow d-flex align-items-center">
        <a href="#"
        className="nav-link dropdown-toggle"
        id="userDropdown"
       onClick={(e) => e.preventDefault()}
        > {/*a태그의 기본 클릭이벤트 (페이지 최상단으로 올라가는 현상을 )막기위해 */}
<span className="mr-2 d-none d-lg-inline text-gray-600 small"
>
{userName}
</span>
<img className="img-profile rounded-circle"
src="./img/profile.jpg"
alt="프로필이미지"
/>        
        </a>
        {/*로그아웃 버튼 추가 */}
        <button 
        onClick={handleLogout}
        className="btn btn-sm btn-outline-secondary ml-2"
        >
로그아웃
        </button>
    </li>
</TopbarNavbar>


</TopbarContainer>
        </>
    )
}