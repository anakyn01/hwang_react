"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as S from "@/assets/css/Style.style";

export default function ForgotPasswordClient() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await axios.post("http://127.0.0.1:8080/api/members/forgot-password", { email });
            alert("이메일로 임시 비밀번호가 발송되었습니다. 확인 후 로그인해주세요.");
            router.push("/"); // 메인 로그인 화면으로 이동
        } catch (error: any) {
            alert(error.response?.data || "메일 발송에 실패했습니다. 이메일을 확인해주세요.");
        }
    };

    return (
        <S.Container>
            <S.Card>
                <S.ImageColumn />
                <S.FormColumn>
                    <S.Title>Forgot Your Password?</S.Title>
                    <S.Description>
                        We get it, stuff happens. Just enter your email address below 
                        and we'll send you a link to reset your password!
                    </S.Description>
                    <S.Form onSubmit={handleResetPassword}>
                        <S.Input
                            type="email"
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <S.Button type="submit" $fullWidth 
                        $variant="primary"
                        >Reset Password</S.Button>
                    </S.Form>
                    <S.Divider />
                    <S.StyledLink href="/member">Create an Account!</S.StyledLink>
                    <S.StyledLink href="/">Already have an account? Login!</S.StyledLink>
                </S.FormColumn>
            </S.Card>
        </S.Container>
    );
}