"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from '../../css/style.styles';
import Header from '../components/Header';
import { RENDER_API_URL } from '../../config/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`${RENDER_API_URL}/api/members/login`, {
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
        const token = typeof data === 'string' ? data : data.token;

        if (token) {
          const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
          localStorage.setItem('token', cleanToken);

          if (data.nickname) {
            localStorage.setItem('nickname', data.nickname);
          }

          alert('로그인 성공!');
          router.push('/');
        } else {
          alert('로그인 실패: 유효하지 않은 토큰입니다.');
        }
      } else {
        const errorText = await res.text();
        alert(`로그인에 실패했습니다: ${errorText || '이메일 또는 비밀번호를 확인해 주세요.'}`);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = `${RENDER_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <>
      <S.AppWrapper>
        <S.ContainerColumn>
          <Header
            title="로그인"
            onBackClick={() => window.history.back()}
          />
          <S.Mt70 />
          <S.Column>
            <S.FormControl
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <S.FormControl
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.BtnBottomWrap>
              <S.BaseBtn
                $variant="primary"
                onClick={handleLogin}
              >
                Login
              </S.BaseBtn>
              <br />
              <S.BaseBtn
                $variant="kakao"
                onClick={handleKakaoLogin}
              >
                카카오톡으로 간편하게 시작하기
              </S.BaseBtn>
              <br />
              <S.BaseBtn $variant="local">
                Apple로 로그인
              </S.BaseBtn>
            </S.BtnBottomWrap>
          </S.Column>
        </S.ContainerColumn>
      </S.AppWrapper>
    </>
  );
}