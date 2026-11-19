"use client";

import { useState } from "react";
import * as S from "@/assets/css/Style.style";
import { AlertModal } from "@/components/modal/AlertModal";
import axios from "axios";
// 🔄 [추가] Render 백엔드 URL 임포트
import { RENDER_API_URL } from "@/config/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    // 💡 알림 모달의 오픈 여부와 메시지 상태
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    // 💡 비밀번호 재설정 이메일 전송 요청 핸들러
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setAlertMessage("이메일 주소를 입력해주세요.");
            setIsAlertOpen(true);
            return;
        }

        try {
            // 🔄 [수정] localhost:4000 -> ${RENDER_API_URL}
            await axios.post(`${RENDER_API_URL}/api/auth/forgot`, { email });

            setAlertMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
            setIsAlertOpen(true);
            setEmail(""); // 입력창 초기화
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.";
            setAlertMessage(errorMessage);
            setIsAlertOpen(true);
        }
    };

    return (
        <S.Container>
            <S.Card>
                {/* 좌측 이미지 영역 */}
                <S.ImageColumn />

                {/* 우측 패스워드 찾기 폼 영역 */}
                <S.FormColumn>
                    <S.Title>Forgot Your Password?</S.Title>

                    <S.Description>
                        We get it, stuff happens. Just enter your email address below
                        and we'll send you a link to reset your password!
                    </S.Description>

                    <S.Form onSubmit={handleSubmit}>
                        <S.Input
                            type="email"
                            id="exampleInputEmail"
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <S.Button type="submit" $variant="primary">
                            Reset Password
                        </S.Button>
                    </S.Form>

                    <S.Divider />

                    <S.StyledLink href="/member">
                        Create an Account!
                    </S.StyledLink>
                    <S.StyledLink href="/">
                        Already have an account? Login!
                    </S.StyledLink>
                </S.FormColumn>
            </S.Card>

            {/* 💡 비밀번호 찾기 요청 성공/실패 시 렌더링될 커스텀 알림 모달 */}
            <AlertModal
                isOpen={isAlertOpen}
                message={alertMessage}
                onClose={() => setIsAlertOpen(false)}
            />
        </S.Container>
    );
}