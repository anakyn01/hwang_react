"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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

    // 1. 입력값 변경 핸들러 완성
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 2. 다음 우편번호 검색 API 핸들러 완성
    const handleAddressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    // 도로명 주소의 노출 규칙에 따라 주소를 조합
                    let fullAddress = data.address;
                    let extraAddress = "";

                    if (data.addressType === "R") {
                        if (data.bname !== "") extraAddress += data.bname;
                        if (data.buildingName !== "")
                            extraAddress +=
                                extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
                        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
                    }

                    // 주소 상태 업데이트
                    setFormData((prev) => ({
                        ...prev,
                        address: fullAddress,
                    }));
                },
            }).open();
        } else {
            alert("주소 검색 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    // 3. 폼 제출 및 백엔드 전송 로직 완성
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 유효성 검사 (비밀번호 확인)
        if (formData.password !== formData.repeatPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // Spring Boot 서버로 POST 요청 (CORS 설정 및 포트에 맞게 URL 수정 필요)
            const response = await axios.post("http://127.0.0.1:8080/api/members/register", formData);
            
            if (response.status === 200 || response.status === 201) {
                alert("회원가입이 완료되었습니다!");
                router.push("/"); // 로그인 페이지로 이동
            }
        } catch (error) {
            console.error("회원가입 에러:", error);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <S.Container>
            {/* Next.js Script 컴포넌트를 사용한 비동기 로드 */}
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
                            <S.SearchButton type="button" onClick={handleAddressSearch}>
                                주소검색
                            </S.SearchButton>
                        </S.AddressWrapper>

                        <S.Input
                            type="text"
                            placeholder="상세주소"
                            name="detailAddress"
                            value={formData.detailAddress}
                            onChange={handleChange}
                        />
                        <S.Button type="submit">Register Account</S.Button>

                        <S.Divider />

                        <S.SocialButton $provider="insta" onClick={handleInstargramLogin}>
                            Register with Instagram
                        </S.SocialButton>

                        <S.SocialButton $provider="kakao" onClick={handleKakaoLogin}>
                            Register with Kakao
                        </S.SocialButton>
                    </S.Form>

                    <S.Divider />

                    <S.StyledLink href="/forgot">Forgot password?</S.StyledLink>
                    <S.StyledLink href="/">Already have an account? Login!</S.StyledLink>
                </S.FormColumn>
            </S.Card>
        </S.Container>
    );
}