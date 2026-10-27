"use client";
import {useState} from "react";
import axios from "axios";
import { useRouter} from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";


//import type {Metadata} from "next";
import * as S from "@/assets/css/Style.style";
import { AlertModal } from "@/components/modal/AlertModal"; // 💡 알림 모달 컴포넌트를 불러옵니다.

/*export const metadata: Metadata = {
  title:'로그인',
};*/

export default function Home() {
const router = useRouter();
const dispatch = useDispatch();
//1. 로그인 폼 상태 관리
const [formData, setFormData] = useState({
  email:"", password:"",
});

// 💡 2. 알림 모달의 오픈 여부와 표시할 메시지, 그리고 로그인 성공 시 이동을 위한 후행 처리 상태
const [isAlertOpen, setIsAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [isLoginSuccess, setIsLoginSuccess] = useState(false);

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
  //alert("이메일과 비밀번호를 모두 입력해주세요.");
setAlertMessage("이메일과 비밀번호를 모두 입력해주세요.");
setIsLoginSuccess(false);
setIsAlertOpen(true);
return;
}

try{
  const response =
  await axios.post("http://localhost:4000/api/auth/login",{
    email, password,
  });

  if(response.status === 200){
    //alert("로그인 성공 !");
const token = response.data.token;
    // 서버에서 발급한 JWT 토큰을 로컬 스토리지에 저장
    dispatch(setLogin(token));
axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    //
setAlertMessage("로그인 성공 !");
setIsLoginSuccess(true);
setIsAlertOpen(true);
    //router.push("/admin");
  }

}catch (error:any){
const errorMessage = error.response?.data?.message || "로그인 중 오류가 발생했습니다";
setAlertMessage(errorMessage);
setIsLoginSuccess(false);
setIsAlertOpen(true);

//alert(errorMessage);
}


};

const handleKakaoLogin = () => {

}

const handleInstaLogin = () => {
  
}

//add
// 💡 모달이 닫힐 때 로그인 성공 상태였다면 관리자 페이지로 이동시킵니다.
  const handleModalClose = () => {
    setIsAlertOpen(false);
    if (isLoginSuccess) {
      router.push("/admin");
    }
  };

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


{/* 💡 로그인 성공/실패 시 화면에 렌더링될 커스텀 알림 모달 */}
      <AlertModal 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleModalClose}
      />
   </>
  );
}
