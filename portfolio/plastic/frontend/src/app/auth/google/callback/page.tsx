"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/authSlice';

export default function GoogleCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const dispatch = useDispatch();
    
    // React StrictMode에서 API가 두 번 호출되는 것을 막기 위한 방어벽
    const isCalled = useRef(false); 

    useEffect(() => {
        if (code && !isCalled.current) {
            isCalled.current = true;

            // 💡 프론트엔드가 받은 인가 코드를 백엔드 서버로 넘겨줍니다.
            axios.post('http://localhost:4000/api/auth/google', { code })
                .then((res) => {
                    if (res.data.success) {
                        // 🎯 백엔드에서 인증 완료 후 Redux 전역 상태 업데이트
                        dispatch(loginSuccess({ 
                            userId: res.data.userId, 
                            isAdmin: res.data.isAdmin 
                        }));
                        
                        router.push('/'); // 메인 페이지로 이동
                    }
                })
                .catch((error) => {
                    console.error('카카오 로그인 에러:', error);
                    alert("카카오 로그인 중 문제가 발생했습니다.");
                    router.push('/login'); // 실패 시 다시 로그인 페이지로
                });
        }
    }, [code, dispatch, router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem', backgroundColor: '#f9f9f9' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e0e0e0', borderTop: '4px solid #FEE500', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: '#555', fontWeight: 'bold' }}>구글 로그인 처리 중입니다. 잠시만 기다려주세요...</p>
            <style>{`
                @keyframes spin { 
                    0% { transform: rotate(0deg); } 
                    100% { transform: rotate(360deg); } 
                }
            `}</style>
        </div>
    );
}