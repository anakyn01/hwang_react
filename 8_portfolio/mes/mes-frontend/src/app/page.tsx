"use client";
import {useState} from "react";
import axios from "axios";
import { useRouter} from "next/navigation";


//import type {Metadata} from "next";
import * as S from "@/assets/css/Style.style";

/*export const metadata: Metadata = {
  title:'로그인',
};*/

export default function Home() {
const router = useRouter();

//1. 로그인 폼 상태 관리
const [formData, setFormData] = useState({
  email:"", password:"",
})

//2. 이력값 변경 핸들러
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]:value,
  }));
};

//3. 로그인 폼 제출 핸들러 (백엔드 API 연동)
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

const {email, password} = formData;

if(!email || !password) {
  alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
}

try{
  const response =
  await axios.post("http://localhost:4000/api/auth/login",{
    email, password,
  });

  if(response.data.success){
    alert("로그인 성공 !");

    // 서버에서 발급한 JWT 토큰을 로컬 스토리지에 저장
    localStorage.setItem("token", response.data.token);

    //
    router.push("/admin");
  }

}catch (error:any){
const errorMessage = error.response?.data?.message || "로그인 중 오류가 발생했습니다";
alert(errorMessage);
}


};

const handleKakaoLogin = () => {

}

const handleInstaLogin = () => {
  
}


  return (
   <>
<S.Container>
<S.Card>
  <S.ImageColumn/>
  <S.FormColumn>
    <S.Title>Welcome Back!</S.Title>
    <S.Form onSubmit={handleSubmit}>
      <S.Input
type="email"
id="email" 
name="email"
placeholder="Enter Email Address..." 
value={formData.email}    
onChange={handleChange}
      />
            <S.Input
type="password"
id="password" 
name="password"
placeholder="Password"  
value={formData.password}    
onChange={handleChange}   
      />
<S.CheckboxWrapper>
<input type="checkbox"id="customCheck"/>
<S.CheckboxLabel htmlFor="customCheck">
Remember Me
</S.CheckboxLabel>
</S.CheckboxWrapper>

<S.Button type="submit" $variant="primary"
$fullWidth
$size="large"
>
Login
</S.Button>

<S.Divider/>

<S.Button type="button" $variant="kakao"
$fullWidth
$size="large"
onClick={handleKakaoLogin}
>
<i className="fab fa-google fa-fw"></i>
카카오로 로그인
</S.Button>

<S.Button type="button" $variant="insta"
$size="large"
onClick={handleInstaLogin}
>
<i className="fab fa-facebook-f fa-fw"></i>
Login with Insta  
</S.Button>
    </S.Form>
<S.Divider/>

<S.StyledLink href="/forgot">
패스워드가 기억나지 않나요?
</S.StyledLink>

<S.StyledLink href="/member">
회원가입하기
</S.StyledLink>
  </S.FormColumn>
</S.Card>
</S.Container>   
   </>
  );
}
