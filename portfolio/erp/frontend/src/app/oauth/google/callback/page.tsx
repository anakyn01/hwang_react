"use client";

import { useEffect, useRef, Suspense } from "react"; // 👈 Suspense 추가
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";

// 1️⃣ 기존 로직을 처리하는 하위 컴포넌트 생성
function GoogleCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const code = searchParams.get("code");

    // 💡 중복 요청 방지 락 (리액트 렌더링으로 인한 두 번 호출 차단)
    const hasRequested = useRef(false);

    useEffect(() => {
        if (code && !hasRequested.current) {
            hasRequested.current = true; // 👈 최초 1회만 실행
            sendCodeToBackend(code);
        }
    }, [code]);

    const sendCodeToBackend = async (authCode: string) => {
        try {
            const response = await axios.post("http://localhost:8080/api/members/google-login", {
                code: authCode,
            });

            if (response.status === 200) {
                const token = response.data.token;
                dispatch(setLogin(token));
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("구글 로그인 연동실패: ", error);
            router.push("/");
        }
    };

    return (
        <div>
            <p>구글 로그인 인증 중 입니다. 잠시만 기다려 주세요....</p>
        </div>
    );
}

// 2️⃣ 메인 페이지는 Suspense로 하위 컴포넌트를 감싸기만 수행
export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<div>인증 정보를 불러오는 중입니다...</div>}>
            <GoogleCallbackContent />
        </Suspense>
    );
}