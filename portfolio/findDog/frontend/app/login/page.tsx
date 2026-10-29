'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setEmail, setPassword, submitLogin } from '../redux/loginSlice';
import styled, { keyframes } from 'styled-components';
import * as S from '@/assets/css/style.styles';
import Header from '../components/Header';
import { CustomAlert } from '../components/CustomAlert';

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

const AnimItem = styled.div<{ $delay: number; $isSlideDown?: boolean }>`
  opacity: 0;
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
  top: ${(props) => (props.$isActive ? '0' : '50%')};
  transform: translateY(-50%);
  background-color: #ffffff;
  padding: 0 4px;
  font-size: ${(props) => (props.$isActive ? '12px' : '15px')};
  color: ${(props) => (props.$isActive ? '#8a4e4b' : '#999')};
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  z-index: 2;
`;

const FloatingInput = styled(S.FormControl)`
  width: 100%;
  padding: 14px 15px; 
  background-color: transparent; 
  
  &::placeholder {
    color: transparent;
  }
  
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #8a4e4b !important;
  }
`;

// 💡 AnimatedInput 컴포넌트에 onKeyDown 프롭스 추가 허용
const AnimatedInput = ({ type, label, value, onChange, onKeyDown }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <InputWrapper>
      <FloatingLabel $isActive={isActive}>{label}</FloatingLabel>
      <FloatingInput
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown} // 💡 onKeyDown 이벤트 연결
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label}
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

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    onConfirm: () => {},
  });

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertConfig({
        isOpen: true,
        message: '이메일과 비밀번호를 입력해주세요.',
        type: 'error',
        onConfirm: closeAlert,
      });
      return;
    }

    const resultAction = await dispatch(submitLogin({ email, password }));

    if (submitLogin.fulfilled.match(resultAction)) {
      setAlertConfig({
        isOpen: true,
        message: '로그인 성공!',
        type: 'success',
        onConfirm: () => {
          closeAlert();
          router.push('/');
        },
      });
    } else {
      setAlertConfig({
        isOpen: true,
        message: `로그인 실패: ${resultAction.payload}`,
        type: 'error',
        onConfirm: closeAlert,
      });
    }
  };

  // 💡 Enter 키 입력 감지 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  return (
    <S.AppWrapper>
      <S.Container>
        <AnimItem $delay={0} $isSlideDown={true}>
          <Header title="로그인" onBackClick={() => router.back()} />
        </AnimItem>

        <S.Mt70 />

        <S.LayOutPadding>
          <AnimItem $delay={0.1}>
            <AnimatedInput
              type="email"
              label="이메일"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))}
              onKeyDown={handleKeyDown} // 💡 Enter 입력 감지
            />
          </AnimItem>

          <S.HB10 />

          <AnimItem $delay={0.2}>
            <AnimatedInput
              type="password"
              label="비밀번호"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value))}
              onKeyDown={handleKeyDown} // 💡 Enter 입력 감지
            />
          </AnimItem>
        </S.LayOutPadding>

        <S.BtnBottomWrap>
          <AnimItem $delay={0.3}>
            <S.BaseBtn $variant="primary" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? '로그인 중...' : 'Login'}
            </S.BaseBtn>
          </AnimItem>
          <br />

          <AnimItem $delay={0.4}>
            <S.BaseBtn $variant="kakao" onClick={handleKakaoLogin}>
              카카오톡으로 간편하게 시작하기
            </S.BaseBtn>
          </AnimItem>
          <br />

          <AnimItem $delay={0.5}>
            <S.BaseBtn $variant="local">Apple로 로그인</S.BaseBtn>
          </AnimItem>

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

      <CustomAlert 
        isOpen={alertConfig.isOpen} 
        message={alertConfig.message} 
        type={alertConfig.type} 
        onConfirm={alertConfig.onConfirm} 
      />
    </S.AppWrapper>
  );
}