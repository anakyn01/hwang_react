"use client"
import React,{useState} from 'react';
import * as S from '../../css/style.styles';
import Header from '../components/Header';

export default function LoginPage(){
/*💡 사용자가 입력할 '이메일'을 저장할 공간(email)과, 
그 값을 바꿔줄 리모컨(setEmail)을 만듭니다. 
초기값은 빈 칸('')입니다.*/   
    const[email, setEmail] = useState('');
/*
💡 사용자가 입력할 '비밀번호'를 저장할 공간(password)과 
 리모컨(setPassword)을 만듭니다.
*/
    const[password,setPassword] = useState('');

//일반 로그인
const handleLogin = async () => {
// 💡 이메일이나 비밀번호 둘 중 하나라도 
// 입력하지 않았다면 (!email 또는 !password)  
if(!email || !password)  {
    alert('이메일과 비밀번호를 입력해주세요.')
    //💡 함수를 즉시 종료시켜서(return) 
    // 백엔드로 헛된 요청이 가지 않게 막습니다.
    return;
}

try{
//백엔드(Spring Boot)의 로그인 API 주소로 데이터를 보냅니다.
// (결과가 올 때까지 await로 기다립니다)
const res = await fetch('http://localhost:8080/api/members/login',{
method:'POST',// 💡 데이터를 숨겨서 안전하게 보내는 POST 방식을 사용합니다.
headers:{'Content-Type':'application/json'},
body:JSON.stringify({email, password}),
});
// 💡 만약 서버에서 '로그인 성공(200 OK)'이라는 응답이 왔다면!
if(res.ok) {
// 💡 서버가 보내준 회원 정보(데이터)를 
// JSON 형태로 뜯어서 userData에 담습니다.
const userData = await res.json();
//추가
localStorage.setItem('user', JSON.stringify(userData));

/*
💡 백엔드에서 받아온 회원의 닉네임(userData.nickname)을
환영 인사를 띄웁니다.
*/ 
alert(`환영합니다,${userData.nickname}님! `);
/*
💡 로그인이 성공했으니 
웹사이트의 첫 화면(메인 페이지 '/')으로 강제 이동시킵니다.
*/
window.location.href="/";
} else {
/* 💡 서버 응답이 200 OK가 아니라면 
(아이디/비번이 틀렸다면) 에러 메시지를 띄웁니다.*/  
alert('이메일 또는 비밀번호가 일치하지 않습니다');  
}
}catch (error) {
console.error('로그인 에러:', error);
alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
}
// 2. 카카오 로그인 연동
const handleKakaoLogin = () => {
    window.location.href = 
    'http://localhost:8080/oauth2/authorization/kakao';
};

}

    return(
        <>
<S.AppWrapper>
<S.ContainerColumn>
<Header
title="로그인"
onBackClick={ () => window.history.back()}
/>
<S.Mt70></S.Mt70>
<S.Column>
<S.FormControl
type="email"
placeholder='이메일'
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<S.FormControl
type="password"
placeholder='비밀번호'
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<S.BtnBottomWrap>
<S.BaseBtn
$variant='primary'
onClick={handleLogin}
>
Login
</S.BaseBtn>
<br/>
<S.BaseBtn
$variant='kakao'
>
카카오톡으로 간편하게 시작하기    
</S.BaseBtn>
<br/>
<S.BaseBtn
$variant='local'
>
Apple로 로그인
</S.BaseBtn>
</S.BtnBottomWrap>
</S.Column>
</S.ContainerColumn>
</S.AppWrapper>        
        </>
    )
}