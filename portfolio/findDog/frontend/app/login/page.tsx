'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setEmail, setPassword, submitLogin } from '../redux/loginSlice';
import * as S from '../../css/style.styles';
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
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                        />

                        <S.FormControl
                            type="password"
                            placeholder='비밀번호'
                            value={password}
                            onChange={(e) => dispatch(setPassword(e.target.value))}
                        />
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
                    </S.Column>
                </S.ContainerColumn>
            </S.AppWrapper>        
        </>
    );
}