"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
// * as S 임포트 유지
import * as S from "@/assets/css/Style.style";

export default function MyPageClient() {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/");
            return;
        }

        try {
            await axios.post(
                "http://127.0.0.1:8080/api/members/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } } // JWT 토큰을 헤더에 담아 전송
            );
            alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
            
            // 보안을 위해 기존 토큰 파기 후 로그인 화면으로 이동
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            router.push("/");
            
        } catch (error: any) {
            alert(error.response?.data || "비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <Layout>

            <S.TitleStart>마이페이지  <small>- 비밀번호 변경</small></S.TitleStart>
            <form onSubmit={handleChangePassword}>
                <S.Mt1>
                    <S.Label>기존(또는 임시) 비밀번호: </S.Label>
                    <S.Input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        required 
                    />
                </S.Mt1>
                <S.Mt1>
                    <S.Label>새 비밀번호: </S.Label>
                    <S.Input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </S.Mt1>
                <S.BtnCenterWrap>
                <S.Button type="submit" 
                $variant="primary"
                $fullWidth
                >비밀번호 변경하기</S.Button>
                </S.BtnCenterWrap>
            </form>

        </Layout>
    );
}