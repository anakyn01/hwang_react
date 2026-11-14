"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

//
import { KakaoIcon } from "@/components/svg/KakaoIcon";
import { AppleIcon } from "@/components/svg/AppleIcon";
import { GoogleIcon } from "@/components/svg/GoogleIcon";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // 💡 커스텀 글래스모피즘 모달 상태 관리
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
    nextRoute?: string;
    isSuccess?: boolean;
  }>({
    isOpen: false,
    message: "",
    nextRoute: "",
    isSuccess: false,
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/members/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        dispatch(setLogin(token));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAlertModal({
          isOpen: true,
          message: "로그인에 성공하였습니다.",
          nextRoute: "/dashboard",
          isSuccess: true,
        });
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setAlertModal({
        isOpen: true,
        message: "이메일 또는 비밀번호를 확인해 주세요.",
        nextRoute: "",
        isSuccess: false,
      });
    }
  };

  const handleCloseAlert = () => {
    const route = alertModal.nextRoute;
    const isSuccess = alertModal.isSuccess;
    setAlertModal({ isOpen: false, message: "", nextRoute: "", isSuccess: false });
    if (isSuccess && route) {
      router.push(route);
    }
  };

  // 평상시에도 완벽하게 적용되는 공통 인풋 래퍼 인라인 스타일
  const wrapperStyle = {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "56px",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #D2D2D7",
    borderRadius: "16px",
    padding: "0 16px",
    boxSizing: "border-box" as const,
    marginBottom: "16px",
  };

  // 테두리와 배경이 없는 순수 내부 인풋 스타일
  const cleanInputStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "15px",
    color: "#1D1D1F",
  };

  const handleKakaoLogin = () => {
    const REST_API_KEY = "43b4bfa2d77a904f4321f38325c03f09";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

    const kakaoURL = 
    `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href= kakaoURL;
  }

// 구글 로그인
  const handleGoogleLogin = () => {
    const clientId = "1057151604719-8mor691610vpisojiec4h9n3rd10g964.apps.googleusercontent.com";
    // 💡 구글 콘솔에 등록된 리디렉션 URI와 완벽히 일치해야 합니다.
    const redirectUri = "http://localhost:3000/oauth/google/callback";
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    
    window.location.href = googleAuthUrl;
  };

  return (
    <div {...stylex.props(styles.loginPageWrapper)}>
      
      <div {...stylex.props(styles.responsiveLoginCard)}>
        
        {/* PC 전용 좌측 그라데이션 배너 (모바일 자동 숨김) */}
        <div {...stylex.props(styles.responsiveImageColumn)}>
          <div style={{ fontSize: "18px", fontWeight: "750", letterSpacing: "-0.02em" }}>Smart ERP</div>
          <div>
            <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "12px", lineHeight: "1.25" }}>
              스마트한 기업 운영의 기준
            </h2>
            <p style={{ fontSize: "14px", opacity: 0.85, lineHeight: "1.5", margin: 0 }}>
              생산, 재고, 인사 관리를 하나의 매끄러운 플랫폼에서 통합 관리하세요.
            </p>
          </div>
          <div style={{ fontSize: "11px", opacity: 0.6 }}>&copy; {new Date().getFullYear()} Heartbreakkid Corp.</div>
        </div>

        {/* 우측 폼 입력 영역 */}
        <div {...stylex.props(styles.formColumn)} style={{ padding: "44px 40px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1D1D1F", letterSpacing: "-0.025em", marginBottom: "6px" }}>
              Smart ERP 에 로그인하세요
            </h1>
            <p style={{ fontSize: "13px", color: "#86868B", margin: 0 }}>Smart ERP 통합 계정을 사용합니다.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            
            {/* 1. 이메일 입력 래퍼 박스 */}
            <div style={wrapperStyle}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
                style={cleanInputStyle}
                placeholder="이메일 또는 전화번호"
              />
              {(isEmailFocused || email) && (
                <button type="button" {...stylex.props(styles.arrowButtonBase)} aria-label="이메일 다음">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              )}
            </div>
            
            {/* 2. 비밀번호 입력 래퍼 박스 */}
            <div style={wrapperStyle}>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
                style={cleanInputStyle}
                placeholder="암호"
              />
              {(isPasswordFocused || password) && (
                <button type="submit" {...stylex.props(styles.arrowButtonBase)} aria-label="로그인 제출">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              )}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div {...stylex.props(styles.checkboxWrapper)}>
                <input type="checkbox" id="customCheck" style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "#0066CC" }} />
                <label htmlFor="customCheck" {...stylex.props(styles.checkboxLabel)} style={{ fontSize: "14px", color: "#424245" }}>
                  계정 저장
                </label>
              </div>
              <a href="/forgot" style={{ fontSize: "13px", color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>
                암호를 잊으셨습니까? &rarr;
              </a>
            </div>
            
            {/* 로그인 버튼 */}
            <button type="submit" {...stylex.props(styles.unifiedButton)} style={{ backgroundColor: "#0066CC", color: "#FFFFFF", boxShadow: "0 4px 14px rgba(0, 102, 204, 0.25)" }}>
              로그인
            </button>

            <div {...stylex.props(styles.divider)} style={{ margin: "20px 0" }} />
            
            {/* 소셜 로그인 버튼 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button type="button" 
              {...stylex.props(styles.unifiedButton)} 
              style={{ backgroundColor: "#FEE500", color: "#191919" }}
              onClick={handleKakaoLogin}
              >
                <KakaoIcon/>
                카카오로 시작하기
              </button>
              
{/*<button type="button" {...stylex.props(styles.unifiedButton)} style={{ backgroundColor: "#1D1D1F", color: "#FFFFFF" }}>
<AppleIcon/>
애플 계정으로 로그인
</button>*/}

<button type="button" 
{...stylex.props(styles.unifiedButton)} 
style={{ backgroundColor: "#fff", color: "#1d1d1f", border:"1px solid #ccc !important" }}
onClick={handleGoogleLogin}
>
  <GoogleIcon/>
  <span>구글 계정으로 로그인</span>
</button>
            </div>
          </form>
          
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "#86868B" }}>
            <span>smartErp 계정이 없으십니까? </span>
            <a href="/member" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>
              smartErp 계정 생성 &rarr;
            </a>
          </div>
          
        </div>
      </div>

      {/* 💡 애플 스토어 공홈 감성의 완벽한 글래스모피즘 알림 팝업 창 */}
      {alertModal.isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          animation: "fadeIn 0.2s ease-out",
        }}>
          <div style={{
            width: "100%",
            maxWidth: "380px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "32px 28px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}>
            {/* 성공 아이콘 또는 심볼 */}
            {alertModal.isSuccess ? (
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "rgba(52, 199, 89, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#34C759",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : (
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 59, 48, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#FF3B30",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            )}

            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1D1D1F", marginBottom: "8px", letterSpacing: "-0.01em" }}>
              {alertModal.isSuccess ? "알림" : "오류"}
            </h3>
            <p style={{ fontSize: "14px", color: "#424245", lineHeight: "1.5", marginBottom: "24px", margin: "0 0 24px 0" }}>
              {alertModal.message}
            </p>

            <button
              type="button"
              onClick={handleCloseAlert}
              style={{
                width: "100%",
                height: "48px",
                backgroundColor: "#0066CC",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 102, 204, 0.25)",
                transition: "background-color 0.15s ease",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}