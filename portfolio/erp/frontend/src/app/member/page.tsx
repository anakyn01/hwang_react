"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";
import Script from "next/script";
import * as S from "@/assets/css/Style.style";

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

    // 💡 Alert 스타일 컴포넌트와 연동할 커스텀 알림 모달 상태 관리
    const [alertModal, setAlertModal] = useState<{
        isOpen: boolean;
        message: string;
        onConfirm?: () => void;
    }>({
        isOpen: false,
        message: "",
    });

    // 모달 확인 버튼 클릭 시 실행될 닫기 및 콜백 핸들러
    const handleCloseAlert = () => {
        if (alertModal.onConfirm) {
            alertModal.onConfirm();
        }
        setAlertModal({ isOpen: false, message: "" });
    };

    // 1. 입력값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 2. 다음 우편번호 검색 API 핸들러
    const handleAddressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
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
                },
            }).open();
        } else {
            setAlertModal({
                isOpen: true,
                message: "주소 검색 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
            });
        }
    };

    // 3. 폼 제출 및 백엔드 전송 로직
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 비밀번호 유효성 검사
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

                // 성공 메시지와 함께 모달 확인 클릭 시 리디렉션 처리 연동
                setAlertModal({
                    isOpen: true,
                    message: "회원가입이 완료되었습니다!",
                    onConfirm: () => {
                        if (token) {
                            dispatch(setLogin({ token }));
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

    return (
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

            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="lazyOnload"
            />
            <S.Card>
                <S.ImageColumn />
                <S.FormColumn>
                    <S.Title>Create an Account!</S.Title>
                    <S.Form onSubmit={handleSubmit}>
                        <S.Row>
                            <S.Col>
                                <S.Input
                                    type="text"
                                    placeholder="이름"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </S.Col>
                            <S.Col>
                                <S.Input
                                    type="text"
                                    placeholder="성"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </S.Col>
                        </S.Row>

                        <S.Input
                            type="email"
                            placeholder="이메일"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <S.Row>
                            <S.Col>
                                <S.Input
                                    type="password"
                                    placeholder="비밀번호"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </S.Col>
                            <S.Col>
                                <S.Input
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    name="repeatPassword"
                                    value={formData.repeatPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </S.Col>
                        </S.Row>

                        <S.RadioGroup>
                            <span>성별 :</span>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                />{" "}
                                남자
                            </S.RadioLabel>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                />{" "}
                                여자
                            </S.RadioLabel>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    onChange={handleChange}
                                />{" "}
                                선택안함
                            </S.RadioLabel>
                        </S.RadioGroup>

                        <S.Row>
                            <S.Col>
                                <S.Input
                                    type="text"
                                    placeholder="회사명"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </S.Col>
                            <S.Col>
                                <S.Input
                                    type="text"
                                    placeholder="직급"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                />
                            </S.Col>
                            <S.Col>
                                <S.Input
                                    type="text"
                                    placeholder="전화번호"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                />
                            </S.Col>
                        </S.Row>

                        <S.AddressWrapper>
                            <S.Input
                                type="text"
                                placeholder="주소"
                                name="address"
                                value={formData.address}
                                readOnly
                            />
                            <S.Button 
                                type="button"                            
                                onClick={handleAddressSearch}
                                $variant="primary"
                                $width="small"
                            >
                                주소검색
                            </S.Button>
                        </S.AddressWrapper>

                        <S.Input
                            type="text"
                            placeholder="상세주소"
                            name="detailAddress"
                            value={formData.detailAddress}
                            onChange={handleChange}
                        />
                        
                        <S.Button type="submit" $fullWidth $variant="primary">
                            Register Account
                        </S.Button>

                        <S.Divider />

                        <S.Button 
                            $fullWidth
                            $variant="insta"
                            onClick={handleInstargramLogin}
                            type="button"
                        >
                            Register with Instagram
                        </S.Button>

                        <S.Button 
                            onClick={handleKakaoLogin}
                            $fullWidth
                            $variant="kakao"
                            type="button"
                        >
                            Register with Kakao
                        </S.Button>
                    </S.Form>

                    <S.Divider />

                    <S.StyledLink href="/forgot">Forgot password?</S.StyledLink>
                    <S.StyledLink href="/">Already have an account? Login!</S.StyledLink>
                </S.FormColumn>
            </S.Card>
        </S.Container>
    );
}