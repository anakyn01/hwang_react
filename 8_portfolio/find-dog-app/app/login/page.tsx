"use client";
import React, { useState } from 'react';
import * as S from '../../css/style.styles';
import Header from '../components/Header';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/members/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                // 백엔드가 보낸 순수 토큰 문자열을 그대로 받습니다.
                const token = await res.text();
                
                console.log('=== 백엔드 로그인 토큰 응답 ===', token);

                if (token && token.length > 10) {
                    localStorage.setItem('token', token);
                    alert('로그인 성공!');
                    window.location.href = "/";
                } else {
                    alert(`로그인 실패: 유효하지 않은 토큰입니다. (응답: ${token})`);
                }

            } else {
                const errorText = await res.text();
                console.error('로그인 실패 응답:', errorText);
                alert(`로그인 실패: ${errorText || '이메일과 비밀번호를 확인해주세요.'}`);
            }

        } catch (error) {
            console.error('로그인 에러:', error);
            alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    };

    return (
        <>
            <S.AppWrapper>
                <S.ContainerColumn>
                    <Header
                        title="로그인"
                        onBackClick={() => window.history.back()}
                    />
                    <S.Mt70></S.Mt70>
                    <S.Column>
                        <S.FormControl
                            type="email"
                            placeholder='이메일'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <S.FormControl
                            type="password"
                            placeholder='비밀번호'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <S.BtnBottomWrap>
                            <S.BaseBtn
                                $variant='primary'
                                onClick={handleLogin}
                            >
                                Login
                            </S.BaseBtn>
                            <br />
                            <S.BaseBtn
                                $variant='kakao'
                                onClick={handleKakaoLogin}
                            >
                                카카오톡으로 간편하게 시작하기    
                            </S.BaseBtn>
                            <br />
                            <S.BaseBtn
                                $variant='local'
                            >
                                Apple로 로그인
                            </S.BaseBtn>
                        </S.BtnBottomWrap>
                    </S.Column>
                </S.ContainerColumn>
            </S.AppWrapper>        
        </>
    );
}