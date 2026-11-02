"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";
import { AlertModal } from "@/components/modal/AlertModal";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
    nextRoute?: string;
  }>({
    isOpen: false,
    message: "",
    nextRoute: "",
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
        });
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setAlertModal({
        isOpen: true,
        message: "이메일 또는 비밀번호를 확인해 주세요.",
        nextRoute: "",
      });
    }
  };

  const handleCloseAlert = () => {
    const route = alertModal.nextRoute;
    setAlertModal({ isOpen: false, message: "", nextRoute: "" });
    if (route) {
      router.push(route);
    }
  };

  // 💡 평상시에도 완벽하게 적용되는 공통 인풋 래퍼 인라인 스타일
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

  // 💡 테두리와 배경이 없는 순수 내부 인풋 스타일
  const cleanInputStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "15px",
    color: "#1D1D1F",
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
              Apple Store에 로그인하세요
            </h1>
            <p style={{ fontSize: "13px", color: "#86868B", margin: 0 }}>Smart ERP 통합 계정을 사용합니다.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            
            {/* 💡 1. 이메일 입력 래퍼 박스 (테두리 및 둥근 모서리 강제 적용) */}
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
            
            {/* 💡 2. 비밀번호 입력 래퍼 박스 (테두리 및 둥근 모서리 강제 적용) */}
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
              <button type="button" {...stylex.props(styles.unifiedButton)} style={{ backgroundColor: "#FEE500", color: "#191919" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.83 5.32 4.57 6.74-.15.56-.56 2.03-.64 2.34-.1.38.14.38.29.28.12-.08 1.92-1.3 2.7-1.83.74.11 1.5.17 2.28.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
                카카오로 시작하기
              </button>
              
              <button type="button" {...stylex.props(styles.unifiedButton)} style={{ backgroundColor: "#1D1D1F", color: "#FFFFFF" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.57-.69.96-1.65.86-2.61-.84.04-1.87.56-2.47 1.25-.53.6-1 1.57-.88 2.52.94.07 1.92-.47 2.49-1.16z"/>
                </svg>
                애플 계정으로 로그인
              </button>
            </div>
          </form>
          
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "#86868B" }}>
            <span>Apple 계정이 없으십니까? </span>
            <a href="/member" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>
              Apple 계정 생성 &rarr;
            </a>
          </div>
          
        </div>
      </div>

      <AlertModal 
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={handleCloseAlert}
      />
    </div>
  );
}