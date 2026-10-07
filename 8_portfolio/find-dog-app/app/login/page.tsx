"use client"
import React, { useState } from 'react';
import * as S from '../../css/style.styles';
import Header from '../components/Header';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 1. 일반 로그인 핸들러
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
                const text = await res.text();
                const userData = text ? JSON.parse(text) : {};
                
                // 💡 백엔드가 보낸 구조: { token: "...", member: { id, email, nickname, ... } }
                if (userData.token) {
                    localStorage.setItem('token', userData.token);
                }
                
                // 💡 회원 정보 객체(member)만 따로 저장합니다.
                if (userData.member) {
                    localStorage.setItem('user', JSON.stringify(userData.member));
                    alert(`환영합니다, ${userData.member.nickname || '회원'}님!`);
                } else {
                    alert('환영합니다!');
                }
                
                window.location.href = "/";
            }


        } catch (error) {
            console.error('로그인 에러:', error);
            alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
        }
    };

    // 💡 핵심 수정 2: handleLogin 함수 바깥으로 올바르게 분리했습니다!
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