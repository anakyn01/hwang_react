"use client";

import React,{useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess} from "@/store/authSlice";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import Lay from "@/app/admin/Lay";

export default function Login(){
    const router = useRouter();
    const dispatch = useDispatch();

    //일반 로그인 상태관리
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

const KAKAO_CLIENT_ID = "";
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const GOOGLE_CLIENT_ID = "";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/auth/google/callback";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;


const handleStandardLogin = async () => {

};

//카카오로 로그인
const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
}

//카카오로 로그인
const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
}

return (
        <Lay>
            <div style={{ maxWidth: '400px', margin: '10rem auto', padding: '2rem', textAlign: 'center', border: '1px solid #ddd', borderRadius: '12px', backgroundColor: '#fff' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>로그인</h2>
                
                {/* 🎯 일반 로그인 폼 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <input 
                        type="text" 
                        placeholder="아이디" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }} 
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStandardLogin()} // 엔터키 로그인 지원
                        style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }} 
                    />
                    <button 
                        onClick={handleStandardLogin}
                        style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        로그인
                    </button>
                </div>

                <div style={{ position: 'relative', margin: '2rem 0' }}>
                    <hr style={{ borderTop: '1px solid #ddd' }} />
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '0 10px', color: '#888', fontSize: '0.9rem' }}>
                        또는
                    </span>
                </div>

                {/* 🎯 카카오 소셜 로그인 버튼 */}
                <button 
                    onClick={handleKakaoLogin}
                    style={{ 
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
                        padding: '1rem', backgroundColor: '#FEE500', color: '#000000', 
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' 
                    }}
                >
                    <RiKakaoTalkFill size={24} />
                    카카오로 3초 만에 시작하기
                </button>

                {/* add */}
                {/* 🎯 구글 소셜 로그인 버튼 추가 */}
                    <button 
                        onClick={handleGoogleLogin}
                        style={{ 
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
                            padding: '1rem', backgroundColor: '#ffffff', color: '#333', 
                            border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' 
                        }}
                    >
                        <FcGoogle size={24} />
                        Google 계정으로 계속하기
                    </button>
            </div>
        </Lay>
    );

}
