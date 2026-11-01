"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// 전역 상태 관리를 위한 Redux 훅 및 액션 임포트
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";

import * as S from "@/assets/css/Style.style";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // 입력값 상태 관리 (이메일, 비밀번호)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 💡 S.Alert 접두사 스타일과 연동할 커스텀 모달 상태 관리
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
    nextRoute?: string;
  }>({
    isOpen: false,
    message: "",
    nextRoute: "",
  });

  // 로그인 폼 제출 핸들러
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 백엔드 로그인 API 호출
      const response = await axios.post("http://127.0.0.1:8080/api/members/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        
        // Redux 스토어 및 localStorage에 토큰 저장
        dispatch(setLogin(token));

        // 이후 모든 axios 요청 헤더에 JWT 토큰 자동 포함 설정
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 성공 모달 오픈 및 대시보드 이동 경로 설정
        setAlertModal({
          isOpen: true,
          message: "로그인 성공!",
          nextRoute: "/dashboard",
        });
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      // 실패 모달 오픈
      setAlertModal({
        isOpen: true,
        message: "이메일 또는 비밀번호를 확인해 주세요",
        nextRoute: "",
      });
    }
  };

  // 모달 확인 버튼 클릭 시 닫기 및 페이지 이동 처리
  const handleCloseAlert = () => {
    const route = alertModal.nextRoute;
    setAlertModal({ isOpen: false, message: "", nextRoute: "" });
    if (route) {
      router.push(route);
    }
  };

  return (
    <>
      <S.Container>
        {/* 💡 S.Alert 접두사가 붙은 글래스모피즘 커스텀 알림창 렌더링 */}
        {alertModal.isOpen && (
          <S.AlertOverlay>
            <S.AlertBox>
              <S.AlertMessage>{alertModal.message}</S.AlertMessage>
              <S.AlertButton onClick={handleCloseAlert}>확인</S.AlertButton>
            </S.AlertBox>
          </S.AlertOverlay>
        )}

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
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
              
              <S.Input 
                type="password" 
                id="exampleInputPassword" 
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
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
              
              <S.Button type="button" $fullWidth $variant="kakao">
                <i className="fab fa-google fa-fw"></i> Login with kakao
              </S.Button>
              
              <S.Button type="button" $fullWidth $variant="insta">
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
    </>
  );
}