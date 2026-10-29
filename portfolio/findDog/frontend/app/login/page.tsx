'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setEmail, setPassword, submitLogin } from '../redux/loginSlice';
import styled, { keyframes } from 'styled-components';
import * as S from '@/assets/css/style.styles';
import Header from '../components/Header';

// ==========================================
// 💡 1. 애니메이션 Keyframes 정의
// ==========================================
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 순차적 등장을 위한 래퍼 컴포넌트
const AnimItem = styled.div<{ $delay: number; $isSlideDown?: boolean }>`
  opacity: 0; /* 초기 상태 투명 */
  animation: ${(props) => (props.$isSlideDown ? slideDown : fadeUp)} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => props.$delay}s;
  width: 100%;
`;

// ==========================================
// 💡 2. 플로팅 라벨(애니메이션 인풋) 스타일 정의
// ==========================================
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FloatingLabel = styled.label<{ $isActive: boolean }>`
  position: absolute;
  left: 12px;
  
  /* 💡 핵심 1: 포커스 시 완전히 top: 0으로 올려서 테두리에 걸치게 함 */
  top: ${(props) => (props.$isActive ? '0' : '50%')};
  transform: translateY(-50%);
  
  /* 💡 핵심 2: 라벨 뒤의 인풋 테두리 선을 가리기 위해 흰색 배경 추가 */
  background-color: #ffffff;
  padding: 0 4px;
  
  font-size: ${(props) => (props.$isActive ? '12px' : '15px')};
  color: ${(props) => (props.$isActive ? '#8a4e4b' : '#999')};
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  z-index: 2; /* 테두리보다 위로 올라오도록 z-index 부여 */
`;

const FloatingInput = styled(S.FormControl)`
  width: 100%;
  padding: 14px 15px; 
  background-color: transparent; 
  
  &::placeholder {
    color: transparent; /* CSS로 투명 처리 */
  }
  
  /* 💡 핵심 3: 클릭(포커스) 시 파란색 테두리 방지 */
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #8a4e4b !important; /* 기본 파란색 대신 브랜드 컬러(브라운) 적용 */
  }
`;

// 플로팅 인풋 재사용 컴포넌트
const AnimatedInput = ({ type, label, value, onChange }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <InputWrapper>
      <FloatingLabel $isActive={isActive}>{label}</FloatingLabel>
      <FloatingInput
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label} // 웹 접근성을 위해 남겨두되 CSS로 투명 처리됨
      />
    </InputWrapper>
  );
};

// ==========================================
// 💡 3. 메인 로그인 페이지 컴포넌트
// ==========================================
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { email, password, isLoading } = useSelector((state: RootState) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const resultAction = await dispatch(submitLogin({ email, password }));

    if (submitLogin.fulfilled.match(resultAction)) {
      alert('로그인 성공!');
      router.push('/');
    } else {
      alert(`로그인 실패: ${resultAction.payload}`);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  return (
    <S.AppWrapper>
      <S.Container>
        {/* 1번: 헤더 (위에서 아래로 슬라이드 다운) */}
        <AnimItem $delay={0} $isSlideDown={true}>
          <Header title="로그인" onBackClick={() => router.back()} />
        </AnimItem>

        <S.Mt70 />

        <S.LayOutPadding>
          {/* 2번: 이메일 창 (아래서 위로 페이드 업) */}
          <AnimItem $delay={0.1}>
            <AnimatedInput
              type="email"
              label="이메일"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))}
            />
          </AnimItem>

          <S.HB10 />

          {/* 3번: 비밀번호 창 */}
          <AnimItem $delay={0.2}>
            <AnimatedInput
              type="password"
              label="비밀번호"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value))}
            />
          </AnimItem>
        </S.LayOutPadding>

        <S.BtnBottomWrap>
          {/* 4번: 로그인 버튼 */}
          <AnimItem $delay={0.3}>
            <S.BaseBtn $variant="primary" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? '로그인 중...' : 'Login'}
            </S.BaseBtn>
          </AnimItem>
          <br />

          {/* 5번: 카카오 로그인 버튼 */}
          <AnimItem $delay={0.4}>
            <S.BaseBtn $variant="kakao" onClick={handleKakaoLogin}>
              카카오톡으로 간편하게 시작하기
            </S.BaseBtn>
          </AnimItem>
          <br />

          {/* 6번: 애플 로그인 버튼 */}
          <AnimItem $delay={0.5}>
            <S.BaseBtn $variant="local">Apple로 로그인</S.BaseBtn>
          </AnimItem>

          {/* 7번: 회원가입 유도 영역 */}
          <AnimItem $delay={0.6}>
            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' }}>
              아직 계정이 없으시다고요?{' '}
              <span
                style={{ fontWeight: 'bold', color: '#8a4e4b', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => router.push('/signup')}
              >
                회원가입
              </span>
            </div>
          </AnimItem>
        </S.BtnBottomWrap>
      </S.Container>
    </S.AppWrapper>
  );
}