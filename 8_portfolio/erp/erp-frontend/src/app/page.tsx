"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertModal } from "@/components/modal/AlertModal";

import type { Metadata } from "next";
import * as S from "@/assets/css/Style.style";

/*export const metadata: Metadata = {
  title: "로그인",
};*/

export default function Home() {

  const router = useRouter();
  
  // 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //모달 상태관리 추가
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMessage, setModalMessage] = useState("");
// 확인 버튼을 눌렀을 때 이동할 경로를 저장 (로그인 성공 시 대시보드로 가기 위함)
const [nextRoute, setNextRoute] = useState("");  

// 로그인 폼 제출 핸들러
const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try{
// 백엔드 로그인 API 호출
const response = await axios.post("http://127.0.0.1:8080/api/members/login", {
email,
password,
});

if (response.status === 200) {
        // 1. 백엔드에서 발급한 JWT 토큰을 localStorage에 저장
        const token = response.data.token;
        localStorage.setItem("token", token);

        // 2. 이후 모든 axios 요청 헤더에 JWT 토큰을 자동 포함하도록 설정
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        //alert("로그인 성공!");
        setModalMessage("로그인 성공");
        setNextRoute("/dashboard"); // 로그인 성공 후 이동할 메인 페이지 (필요에 따라 수정)
        setIsModalOpen(true);
      }
  }catch (error){
console.error("로그인 에러:", error);
        setModalMessage("이메일 또는 비밀번호를 확인해 주세요");
        setNextRoute(""); // 로그인 성공 후 이동할 메인 페이지 (필요에 따라 수정)
        setIsModalOpen(true);
  }
};

const handleCloseModal = () => {
        setIsModalOpen(false);
    if(nextRoute){
      router.push(nextRoute);
    }    
};

  return (
    <>
<S.Container>
      <S.Card>
        <S.ImageColumn />
        <S.FormColumn>
          <S.Title>Welcome Back!</S.Title>
          
          <S.Form onSubmit={handleLogin}>
            <S.Input 
              type="email" 
              id="exampleInputEmail" 
              placeholder="Enter Email Address..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <S.Input 
              type="password" 
              id="exampleInputPassword" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <S.CheckboxWrapper>
              <input type="checkbox" id="customCheck" />
              <S.CheckboxLabel htmlFor="customCheck">
                Remember Me
              </S.CheckboxLabel>
            </S.CheckboxWrapper>
            
            <S.Button type="submit" $fullWidth $variant="primary">
              Login
            </S.Button>

            <S.Divider />
            
            <S.Button type="button" $fullWidth $variant="kakao" >
              <i className="fab fa-google fa-fw"></i> Login with kakao
            </S.Button>
            
            <S.Button type="button" $fullWidth $variant="insta" >
              <i className="fab fa-facebook-f fa-fw"></i> Login with Insta
            </S.Button>
          </S.Form>
          
          <S.Divider />
          
          <S.StyledLink href="/forgot">
            패스워드가 기억나지 않나요?
          </S.StyledLink>
          <S.StyledLink href="/member">
            회원가입하기
          </S.StyledLink>
          
        </S.FormColumn>
      </S.Card>
    </S.Container>

    <AlertModal
    isOpen={isModalOpen}
    message={modalMessage}
    onClose={handleCloseModal}
    />
    </>
  );
}