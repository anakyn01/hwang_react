"use client";

import { useEffect, useRef, Suspense } from "react"; // 👈 Suspense 추가
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/authSlice";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

// 1️⃣ 실제 로직과 UI를 렌더링하는 하위 컴포넌트
function KakaoCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const code = searchParams.get("code");

    // 💡 중복 요청 방지를 위한 락(Ref) 생성
    const hasRequested = useRef(false);

    useEffect(() => {
        if (code && !hasRequested.current) {
            hasRequested.current = true; // 👈 한 번 실행되면 잠금
            sendCodeToBackend(code);
        }
    }, [code]);

    const sendCodeToBackend = async (authCode: string) => {
        try{
            const response = await axios.post("http://localhost:8080/api/members/kakao-login",{
                code: authCode,
            });

            if(response.status === 200) {
                const token = response.data.token;
                dispatch(setLogin(token));
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                router.push("/dashboard");
            }
        } 
        catch (error) {
            console.error("카카오 로그인 연동실패: ", error);
            router.push("/");
        }
    };

    return(
        <div {...stylex.props(styles.loadingWrap)}>
            <p {...stylex.props(styles.loadingText)}>
                카카오 로그인 인증 중 입니다. 잠시만 기다려 주세요....
            </p>
        </div>
    );
}

// 2️⃣ 메인 페이지는 Suspense로 하위 컴포넌트를 감싸서 내보냄
export default function KakaoCallbackPage(){
    return (
        <Suspense fallback={
            <div {...stylex.props(styles.loadingWrap)}>
                <p {...stylex.props(styles.loadingText)}>
                    카카오 로그인 인증 중 입니다. 잠시만 기다려 주세요....
                </p>
            </div>
        }>
            <KakaoCallbackContent />
        </Suspense>
    );
}