"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";
import Script from "next/script";
import { AlertModal } from "@/components/modal/AlertModal";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

const handleInstargramLogin = () => {
    // 인스타그램 로그인 로직
};

const handleKakaoLogin = () => {
    // 카카오 로그인 로직
};

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    companyName: string;
    position: string;
    tel: string;
    address: string;
    detailAddress: string;
    gender: string;
}

declare global {
    interface Window {
        daum: any;
    }
}

export default function Member() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        companyName: "",
        position: "",
        tel: "",
        address: "",
        detailAddress: "",
        gender: "",
    });

    const [focusedField, setFocusedField] = useState<string | null>(null);

    // 💡 애플 스타일 글래스 주소 검색 레이어 팝업 열림/닫힘 상태
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const postcodeRef = useRef<HTMLDivElement>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 💡 애플 글래스모피즘 레이어 방식 주소 검색 오픈 핸들러
    const handleAddressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.daum && window.daum.Postcode) {
            setIsAddressModalOpen(true);
        } else {
            setAlertModal({
                isOpen: true,
                message: "주소 검색 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
            });
        }
    };

    // 💡 모달이 열린 후 다움 포스트코드 레이어를 DOM에 렌더링
    useEffect(() => {
        if (isAddressModalOpen && postcodeRef.current && window.daum && window.daum.Postcode) {
            // 기존 내용 초기화
            postcodeRef.current.innerHTML = "";
            
            new window.daum.Postcode({
                oncomplete: (data: any) => {
                    let fullAddress = data.address;
                    let extraAddress = "";

                    if (data.addressType === "R") {
                        if (data.bname !== "") extraAddress += data.bname;
                        if (data.buildingName !== "")
                            extraAddress +=
                                extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
                        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
                    }

                    setFormData((prev) => ({
                        ...prev,
                        address: fullAddress,
                    }));
                    setIsAddressModalOpen(false); // 주소 선택 시 모달 닫기
                },
                width: "100%",
                height: "100%",
            }).embed(postcodeRef.current);
        }
    }, [isAddressModalOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            setAlertModal({
                isOpen: true,
                message: "비밀번호가 일치하지 않습니다.",
            });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8080/api/members/register", formData);
            
            if (response.status === 200 || response.status === 201) {
                const token = response.data.token;

                setAlertModal({
                    isOpen: true,
                    message: "회원가입이 완료되었습니다!",
                    onConfirm: () => {
                        if (token) {
                            dispatch(setLogin(token));
                            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                            router.push("/dashboard");
                        } else {
                            router.push("/");
                        }
                    },
                });
            }
        } catch (error) {
            console.error("회원가입 에러:", error);
            setAlertModal({
                isOpen: true,
                message: "회원가입에 실패했습니다. 다시 시도해주세요.",
            });
        }
    };

    const getFieldWrapperStyle = (isFocused: boolean) => ({
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "60px",
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${isFocused ? "#0066CC" : "#D2D2D7"}`,
        borderRadius: "18px",
        padding: "0 18px",
        boxSizing: "border-box" as const,
        marginBottom: "18px",
        boxShadow: isFocused ? "0 0 0 4px rgba(0, 102, 204, 0.12)" : "none",
        transition: "all 0.2s ease",
    });

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
            
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="lazyOnload"
            />
            
            {/* 전체 카드 컨테이너 (1400px 대형 화면) */}
            <div {...stylex.props(styles.responsiveLoginCard)} style={{ maxWidth: "1400px", width: "100%" }}>
                
                {/* 좌측 그라데이션 배너 영역 */}
                <div {...stylex.props(styles.responsiveImageColumn)} style={{ flex: "1.2", padding: "64px" }}>
                    <div style={{ fontSize: "20px", fontWeight: "750", letterSpacing: "-0.02em" }}>Smart ERP</div>
                    <div>
                        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.2" }}>
                            새로운 기업 계정을 만드세요
                        </h2>
                        <p style={{ fontSize: "16px", opacity: 0.85, lineHeight: "1.6", margin: 0 }}>
                            스마트 ERP의 모든 통합 관리 기능을 가장 쾌적하고 압도적인 인터페이스에서 경험해 보세요.
                        </p>
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.6 }}>&copy; {new Date().getFullYear()} Heartbreakkid Corp.</div>
                </div>

                {/* 우측 폼 입력 영역 */}
                <div {...stylex.props(styles.formColumn)} style={{ flex: "1.4", padding: "64px 72px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1D1D1F", letterSpacing: "-0.025em", marginBottom: "8px" }}>
                            Create an Account!
                        </h1>
                        <p style={{ fontSize: "15px", color: "#86868B", margin: 0 }}>필수 정보를 입력하여 회원가입을 진행하세요.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        
                        {/* 이름 / 성 */}
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "firstName"), flex: 1 }}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("firstName")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "firstName" || formData.firstName) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    이름
                                </label>
                            </div>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "lastName"), flex: 1 }}>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("lastName")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "lastName" || formData.lastName) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    성
                                </label>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div style={getFieldWrapperStyle(focusedField === "email")}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                required
                                style={cleanInputStyle}
                                placeholder=" "
                            />
                            <label 
                                {...stylex.props(styles.appleFloatingLabel)}
                                style={(focusedField === "email" || formData.email) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                            >
                                이메일
                            </label>
                        </div>

                        {/* 비밀번호 / 비밀번호 확인 */}
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "password"), flex: 1 }}>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "password" || formData.password) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    비밀번호
                                </label>
                            </div>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "repeatPassword"), flex: 1 }}>
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    value={formData.repeatPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("repeatPassword")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "repeatPassword" || formData.repeatPassword) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    비밀번호 확인
                                </label>
                            </div>
                        </div>

                        {/* 성별 선택 라디오 그룹 */}
                        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "18px", padding: "0 4px", fontSize: "15px", color: "#424245" }}>
                            <span style={{ fontWeight: "500" }}>성별 :</span>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                    style={{ accentColor: "#0066CC", width: "16px", height: "16px" }}
                                />
                                남자
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                    style={{ accentColor: "#0066CC", width: "16px", height: "16px" }}
                                />
                                여자
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    onChange={handleChange}
                                    style={{ accentColor: "#0066CC", width: "16px", height: "16px" }}
                                />
                                선택안함
                            </label>
                        </div>

                        {/* 회사명 */}
                        <div style={getFieldWrapperStyle(focusedField === "companyName")}>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("companyName")}
                                onBlur={() => setFocusedField(null)}
                                style={cleanInputStyle}
                                placeholder=" "
                            />
                            <label 
                                {...stylex.props(styles.appleFloatingLabel)}
                                style={(focusedField === "companyName" || formData.companyName) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                            >
                                회사명 (선택)
                            </label>
                        </div>

                        {/* 직급 / 전화번호 */}
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "position"), flex: 1 }}>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("position")}
                                    onBlur={() => setFocusedField(null)}
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "position" || formData.position) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    직급
                                </label>
                            </div>
                            <div style={{ ...getFieldWrapperStyle(focusedField === "tel"), flex: 1 }}>
                                <input
                                    type="text"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("tel")}
                                    onBlur={() => setFocusedField(null)}
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={(focusedField === "tel" || formData.tel) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    전화번호
                                </label>
                            </div>
                        </div>

                        {/* 주소 검색 영역 */}
                        <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
                            <div style={{ ...getFieldWrapperStyle(false), marginBottom: 0, flex: 1 }}>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    readOnly
                                    style={cleanInputStyle}
                                    placeholder=" "
                                />
                                <label 
                                    {...stylex.props(styles.appleFloatingLabel)}
                                    style={formData.address ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                                >
                                    주소
                                </label>
                            </div>
                            <button 
                                type="button"                            
                                onClick={handleAddressSearch}
                                {...stylex.props(styles.unifiedButton)}
                                style={{ width: "130px", height: "60px", backgroundColor: "#86868B", color: "#FFFFFF", borderRadius: "18px", flexShrink: 0, fontSize: "15px" }}
                            >
                                주소검색
                            </button>
                        </div>

                        {/* 상세주소 */}
                        <div style={getFieldWrapperStyle(focusedField === "detailAddress")}>
                            <input
                                type="text"
                                name="detailAddress"
                                value={formData.detailAddress}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("detailAddress")}
                                onBlur={() => setFocusedField(null)}
                                style={cleanInputStyle}
                                placeholder=" "
                            />
                            <label 
                                {...stylex.props(styles.appleFloatingLabel)}
                                style={(focusedField === "detailAddress" || formData.detailAddress) ? { top: "16px", transform: "translateY(0) scale(0.75)", color: "#0066CC" } : {}}
                            >
                                상세주소
                            </label>
                        </div>
                        
                        {/* 회원가입 버튼 */}
                        <button type="submit" {...stylex.props(styles.unifiedButton)} style={{ height: "60px", fontSize: "16px", backgroundColor: "#0066CC", color: "#FFFFFF", boxShadow: "0 4px 14px rgba(0, 102, 204, 0.25)" }}>
                            Register Account
                        </button>

                        <div {...stylex.props(styles.divider)} style={{ margin: "26px 0", height: "1px", backgroundColor: "#E5E5EA", width: "100%" }} />

                        {/* 소셜 가입 버튼들 */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <button 
                                onClick={handleInstargramLogin}
                                type="button" 
                                {...stylex.props(styles.unifiedButton)} 
                                style={{ height: "56px", fontSize: "15px", backgroundColor: "#E1306C", color: "#FFFFFF" }}
                            >
                                Register with Instagram
                            </button>
                            
                            <button 
                                onClick={handleKakaoLogin}
                                type="button" 
                                {...stylex.props(styles.unifiedButton)} 
                                style={{ height: "56px", fontSize: "15px", backgroundColor: "#FEE500", color: "#191919" }}
                            >
                                Register with Kakao
                            </button>
                        </div>
                    </form>

                    <div {...stylex.props(styles.divider)} style={{ margin: "26px 0", height: "1px", backgroundColor: "#E5E5EA", width: "100%" }} />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                        <a href="/forgot" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>Forgot password?</a>
                        <a href="/" style={{ color: "#0066CC", textDecoration: "none", fontWeight: "500" }}>Already have an account? Login!</a>
                    </div>
                    
                </div>
            </div>

            {/* 💡 애플 스타일 글래스모피즘 주소 검색 레이어 팝업 */}
            {isAddressModalOpen && (
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
                        maxWidth: "480px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "24px",
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {/* 팝업 헤더 */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px 24px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                        }}>
                            <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#1D1D1F", margin: 0 }}>주소 검색</h3>
                            <button
                                type="button"
                                onClick={() => setIsAddressModalOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#86868B",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        {/* 팝업 바디 (다음 우편번호 API 임베드 영역) */}
                        <div 
                            ref={postcodeRef} 
                            style={{
                                width: "100%",
                                height: "460px",
                            }}
                        />
                    </div>
                </div>
            )}

            <AlertModal 
                isOpen={alertModal.isOpen}
                message={alertModal.message}
                onClose={handleCloseAlert}
            />
        </div>
    );
}