'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setEmail, setPassword, submitLogin } from '../redux/loginSlice';
import * as S from '@/assets/css/style.styles';
import Header from '../components/Header';

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    
    // Redux 상태 조회
    const { email, password, isLoading } = useSelector((state: RootState) => state.login);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        const resultAction = await dispatch(submitLogin({ email, password }));

        if (submitLogin.fulfilled.match(resultAction)) {
            alert('로그인 성공!');
            window.location.href = "/";
        } else {
            alert(`로그인 실패: ${resultAction.payload}`);
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    };

    return (
        <>
            <S.AppWrapper>
                {/* 💡 1. ContainerColumn 대신 Container를 사용하여 480px 중앙 프레임 안에 맞춥니다. */}
                <S.Container>
                    <Header
                        title="로그인"
                        onBackClick={() => window.history.back()}
                    />
                    <S.Mt70></S.Mt70>
                    
                    {/* 💡 2. Column 대신 LayOutPadding으로 감싸서 인풋창 양옆에 예쁜 여백을 줍니다. */}
                    <S.LayOutPadding>
                        <S.FormControl
                            type="email"
                            placeholder='이메일'
                            value={email}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                        />

                        <br /> {/* 인풋창 사이 간격 */}

                        <S.FormControl
                            type="password"
                            placeholder='비밀번호'
                            value={password}
                            onChange={(e) => dispatch(setPassword(e.target.value))}
                        />
                    </S.LayOutPadding>

                    {/* 버튼 영역은 레이아웃 패딩 밖으로 빼거나 하단에 고정되게 둡니다 */}
                    <S.BtnBottomWrap>
                        <S.BaseBtn
                            $variant='primary'
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : 'Login'}
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
                </S.Container>
            </S.AppWrapper>        
        </>
    );
}