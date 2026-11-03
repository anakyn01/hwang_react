"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modal/AlertModal";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function ForgotPasswordClient() {
    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const router = useRouter();

    const [alertModal, setAlertModal] = useState<{
        isOpen: boolean;
        message: string;
        onConfirm?: () => void;
    }>({
        isOpen: false,
        message: "",
    });

    const handleCloseAlert = () => {
        if (alertModal.onConfirm) {
            alertModal.onConfirm();
        }
        setAlertModal({ isOpen: false, message: "" });
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await axios.post("http://127.0.0.1:8080/api/members/forgot-password", { email });
            setAlertModal({
                isOpen: true,
                message: "이메일로 임시 비밀번호가 발송되었습니다. 확인 후 로그인해주세요.",
                onConfirm: () => {
                    router.push("/"); // 메인 로그인 화면으로 이동
                },
            });
        } catch (error: any) {
            setAlertModal({
                isOpen: true,
                message: error.response?.data || "메일 발송에 실패했습니다. 이메일을 확인해주세요.",
            });
        }
    };

    // 둥근 알약형 인풋 래퍼 스타일
    const fieldWrapperStyle = {
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "60px",
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${isEmailFocused ? "#0066CC" : "#D2D2D7"}`,
        borderRadius: "18px",
        padding: "0 18px",
        boxSizing: "border-box" as const,
        marginBottom: "20px",
        boxShadow: isEmailFocused ? "0 0 0 4px rgba(0, 102, 204, 0.12)" : "none",
        transition: "all 0.2s ease",
    };

    const cleanInputStyle = {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        fontSize: "16px",
        color: "#1D1D1F",
        boxSizing: "border-box" as const,
        paddingTop: "8px",
    };

    return (
        <div {...stylex.props(styles.loginPageWrapper)} style={{ backgroundColor: "#FBFBFD", minHeight: "100vh", padding: "40px 20px" }}>
            
            {/* 전체 대형 카드 컨테이너 (1400px 폭 확장) */}
            <div {...stylex.props(styles.responsiveLoginCard)} style={{ maxWidth: "1400px", width: "100%" }}>
                
                {/* 좌측 그라데이션 배너 영역 */}
                <div {...stylex.props(styles.responsiveImageColumn)} style={{ flex: "1.2", padding: "64px" }}>
                    <div style={{ fontSize: "20px", fontWeight: "750", letterSpacing: "-0.02em" }}>Smart ERP</div>
                    <div>
                        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.2" }}>
                            비밀번호를 잊으셨나요?
                        </h2>
                        <p style={{ fontSize: "16px", opacity: 0.85, lineHeight: "1.6", margin: 0 }}>
                            등록하신 이메일 주소를 입력하시면 임시 비밀번호를 안전하게 발송해 드립니다.
                        </p>
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.6 }}>&copy; {new Date().getFullYear()} Heartbreakkid Corp.</div>
                </div>

                {/* 우측 폼 입력 영역 */}
                <div {...stylex.props(styles.formColumn)} style={{ flex: "1.4", padding: "64px 72px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1D1D1F", letterSpacing: "-0.025em", marginBottom: "12px" }}>
                            Forgot Your Password?
                        </h1>
                        <p style={{ fontSize: "15px", color: "#86868B", lineHeight: "1.5", margin: 0 }}>
                            We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!
                        </p>
                    </div>
                    
                    <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
                        
                        {/* 둥근 알약형 이메일 입력 필드 */}
                        <div style={fieldWrapperStyle}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                required
                                style={cleanInputStyle}
                                placeholder=" "
                            />
                            <label 
                                {...stylex.props(styles.appleFloatingLabel)}
                                style={(isEmailFocused || email) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                            >
                                Enter Email Address...
                            </label>
                        </div>
                        
                        {/* 리셋 버튼 */}
                        <button 
                            type="submit" 
                            {...stylex.props(styles.unifiedButton)} 
                            style={{ height: "60px", fontSize: "16px", backgroundColor: "#0066CC", color: "#FFFFFF", boxShadow: "0 4px 14px rgba(0, 102, 204, 0.25)" }}
                        >
                            Reset Password
                        </button>
                    </form>

                    <div {...stylex.props(styles.divider)} style={{ margin: "26px 0", height: "1px", backgroundColor: "#E5E5EA", width: "100%" }} />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                        <a href="/member" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>Create an Account!</a>
                        <a href="/" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>Already have an account? Login!</a>
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