
//상태관리를 위해 useState와 useEffect를 추가로 불러옵니다
import React, {useState, useEffect} from "react";
//서치
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import * as S from './Topbar.styled';

export const Topbar:React.FC = () => {
//검색어 상태
const [searchTerm, setSearchTerm] = useState('');
//검색 결과 상태
const [results, setResults] = useState({ users:[], blogs:[], contacts:[]});
//검색을 한 번이라도 했는지 체크하는 상태
const [hasSearched, setHasSearched] = useState(false);

//드롭다운이 열려있는지 닫혀 있는지 기억하는 상태
const[isDropdownOpen, setIsDropdownOpen] = useState(false);

// 🔍 검색 버튼을 눌렀을 때 실행되는 함수
const handleSearch = async () => {
    if(!searchTerm.trim()) {
        alert('검색어를 입력해 주세요..');
        return;
    }
    navigate(`/search?q=${searchTerm}`);
    //setSearchTerm('');
    /*try{
        //백엔드의 /api/search 주소로 검색어(?q=검색어)를 보냅니다
const response = 
await axios.get(`/search?q=${searchTerm}`);
setResults(response.data);//결과저장
setHasSearched(true);//검색 완료 상태로 변경
    } catch(error){
        //to
console.error('검색 중 오류 발생:', error);
alert('검색을 가져오는중 오류가 발생했습니다');
    }*/
};

//⌨️ 엔터키를 눌러도 검색이 되도록 하는 함수
const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === 'Enter'){
        e.preventDefault();
        handleSearch();
    }
}


//페이지 이동 함수를 navigate라는 이름으로 사용할수있게 준비 ..
const navigate = useNavigate();

//1.화면에 보여줄 사용자 이름 상태를 만듭니다.(기본값: Guest)
const [userName, setUserName] = useState('Guest');

//2.화면이 처름 켜질때 딱 한번만 실행
useEffect(() => {
//로그인 할때 저장해둔 'userName'을 브라우저 저장소에서 꺼내옵니다
const storedName = localStorage.getItem('userName');

//만약 저장된 이름이 있다면, 상태를 그이름으로 업데이트 합니다
if(storedName){
    setUserName(storedName);
}
},[]);

//로그아웃 버튼을 눌렀을때 실행되는 함수를 만듭니다
const handleLogout = () => {
    //1.브라우저 금고(localStorage)에서 'userName'데이터를 완전히 지웁니다
    localStorage.removeItem('userName');
    //2.로그인 페이지('/login)로 사용자를 이동시킵니다
    navigate('/login');
}

    return(
        <>
        <S.TopbarContainer 
className="navbar navbar-expand navbar-light topbar static-top">
{/*Sidebar Toggle(Mobile) */}
<button className="btn btn-link d-md-none rounded-circle mr-3">
    <i className="fa fa-bars"></i>
</button>

{/*Topbar Search */}
<S.TopbarSearch 
className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
<div className="input-group">
    <S.TopbarSearchInput
    type="text" 
    className="bg-light border-0 small"
    placeholder="Search for.."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyPress={handleKeyPress}
    />
    <div className="input-group-append">
        <button 
        type="button"
        className="btn btn-primary"
        onClick={handleSearch}
        >
            <i className="fas fa-search fa-sm"></i>Search
        </button>
    </div>
</div>
</S.TopbarSearch>




{/*Topbar Navbar */}
<S.TopbarNavbar className="ml-auto">
    {/*User Information */}
    <li className="nav-item dropdown no-arrow d-flex align-items-center">
<S.UserMenuContainer>
<S.UserProfileToggle
onClick={() => setIsDropdownOpen(!isDropdownOpen)}
>
<span>{userName}</span>
<img src="./img/profile.jpg" alt="프로필이미지"/>
</S.UserProfileToggle>

<S.DropdownMenu $isOpen={isDropdownOpen}>

<S.DropdownItem>
    <i className="fas fa-user fa-sm fa-fw"></i>
    profile
</S.DropdownItem>

<S.DropdownItem>
    <i className="fas fa-cogs fa-sm fa-fw"></i>
    Settings
</S.DropdownItem>

<S.DropdownItem>
    <i className="fas fa-list fa-sm fa-fw"></i>
    Activity
</S.DropdownItem>

<S.DropdownDivider/>

<S.DropdownItem
onClick={handleLogout}
>
<i className="fas fa-sign-out-alt fa-sm fa-fw"></i> 
Logout   
</S.DropdownItem>


</S.DropdownMenu>



</S.UserMenuContainer>       
    </li>
</S.TopbarNavbar>


</S.TopbarContainer>
        </>
    )
}
