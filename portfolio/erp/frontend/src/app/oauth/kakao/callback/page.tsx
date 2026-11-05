"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams} from "next/navigation";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin} from "@/store/authSlice";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function KakaoCallbackPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    //URL 주소에 포함된 쿼리 스트링(파라미터)
    //Redux 스토어에 상태(로그인 정보 등)를 전달하기 위한 dispatch를 선언
    const dispatch = useDispatch();

    //URL 쿼리 중에서 카카오가 보내준 "code"(=인가 코드)
    const code = searchParams.get("code");
//컴포넌트가 화면에 처음 나타날때 실행되는 훅
useEffect(() => {
if (code) {
    sendCodeToBackend(code);
}
},[code]);

//카카오 인가 코드를 우리 백엔드 서버로 보내고, 
// 최종 JWT 토큰을 받아오는 비동기 함수입니다.
const sendCodeToBackend = async (authCode: string) => {
    try{
const response =
await axios.post("http://127.0.0.1:8080/api/members/kakao-login",{
    code: authCode,
});

//200
if(response.status === 200) {
    // 백엔드가 발급해서 보내준 자체 JWT 토큰을 변수에 담습니다.
    const token = response.data.token;
    // Redux 스토어에 로그인 상태와 토큰을 저장합니다.
    dispatch(setLogin(token));
    // 이후 모든 axios 요청 헤더에 JWT 토큰을 자동으로 포함시키도록 설정합니다.
    axios.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;

    //커스텀 얼럿으로 성공표시
    //대시보드로 이동
    router.push("/dashboard");
}
    } 
    catch (error) {
//로그인 과정에서 에러
// (네트워크 문제, 만료된 코드 등)가 발생했을 때 실행됩니다.
console.error(" 카카오 로그인 연동실패: ", error);
// 커스텀으로 처리중 오류가 발생 했다고 표시
router.push("/");
    }
};

//백앤드가 통신하는 동안 사용자에게 보여줄 로딩 화면
return(
    <div {...stylex.props(styles.loadingWrap)}>
        <p {...stylex.props(styles.loadingText)}>
            카카오 로그인 인증 중 입니다. 잠시만 기다려 주세요....
        </p>
    </div>
)
}
