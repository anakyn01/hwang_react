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
                const text = await res.text();
                let data: any = {};
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    data = text;
                }

                // data가 객체면 data.token을, 순수 문자열이면 data 자체를 토큰으로 사용
                let token = typeof data === 'string' ? data : data.token;

                if (token) {
                    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
                    localStorage.setItem('token', cleanToken);
                    
                    // 💡 백엔드에서 받아온 닉네임도 따로 저장해줍니다!
                    if (data.nickname) {
                        localStorage.setItem('nickname', data.nickname);
                    }
                    
                    alert('로그인 성공!');
                    window.location.href = "/";
                } else {
                    alert('로그인 실패: 유효하지 않은 토큰입니다.');
                }
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