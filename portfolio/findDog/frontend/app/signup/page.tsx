'use client';

import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setStep, updateFormField, setAllAgreed, submitSignup } from '../redux/signupSlice';
import styled, { keyframes } from 'styled-components';
import * as S from '@/assets/css/style.styles';

import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import Header from "../components/Header";
import { CustomAlert } from '../components/CustomAlert'; // 💡 커스텀 알럿 임포트

// ==========================================
// 💡 1. 애니메이션 Keyframes 및 래퍼 정의
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
  flex: 1;
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
  
  &::placeholder { color: transparent; }
  
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #8a4e4b !important; 
  }
`;

const AnimatedInput = ({ type, name, label, value, onChange, readOnly, onClick }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <InputWrapper onClick={onClick}>
      <FloatingLabel $isActive={isActive}>{label}</FloatingLabel>
      <FloatingInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label} 
        readOnly={readOnly}
      />
    </InputWrapper>
  );
};

// ==========================================
// 💡 3. 메인 회원가입 페이지 컴포넌트
// ==========================================
export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { step, formData, isLoading } = useSelector((state: RootState) => state.signup);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenPostcode, setIsOpenPostcode] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // 💡 커스텀 알럿 상태 관리
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    onConfirm: () => {},
  });

  const closeAlert = () => setAlertConfig(prev => ({ ...prev, isOpen: false }));

  // 알럿 띄우기 공통 함수
  const showAlert = (message: string, type: 'success' | 'error' | 'info' = 'info', customConfirm?: () => void) => {
    setAlertConfig({
      isOpen: true,
      message,
      type,
      onConfirm: customConfirm || closeAlert,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCompletePostcode = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    dispatch(updateFormField({ field: 'address', value: fullAddress }));
    setIsOpenPostcode(false);
  };

  const isAllAgreed = formData.agreeTerms && formData.agreePrivacy && formData.agreeAge && formData.marketingAgreed;

  const handleAllAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAllAgreed(e.target.checked));
  };

  const handleBoxClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormField({ field: e.target.name as any, value: e.target.value }));
  };

  const handleGeneralSignup = () => dispatch(setStep(1));
  const handleKakaoSignup = () => showAlert('카카오 로그인 연동 페이지로 이동합니다.', 'info');

  const handleCheckEmail = async () => {
    if (!formData.email.trim()) return showAlert('이메일을 먼저 입력해 주세요.', 'error');
    try {
      const res = await fetch(`http://localhost:8080/api/members/check-email?email=${formData.email}`);
      if (!res.ok) throw new Error('서버응답에러');
      if (await res.json()) showAlert('이미 사용 중인 이메일입니다.', 'error');
      else showAlert('사용 가능한 이메일입니다!', 'success');
    } catch (error) {
      showAlert('서버와 통신하는 중 문제가 발생했습니다.', 'error');
    }
  };

  const handleCheckNickname = async () => {
    if (!formData.nickname.trim()) return showAlert('닉네임을 먼저 입력해 주세요.', 'error');
    try {
      const res = await fetch(`http://localhost:8080/api/members/check-nickname?nickname=${formData.nickname}`);
      if (!res.ok) throw new Error('서버응답에러');
      if (await res.json()) showAlert('이미 누군가 사용 중인 닉네임입니다.', 'error');
      else showAlert('멋진 닉네임이네요! 사용 가능합니다.', 'success');
    } catch (error) {
      showAlert('서버와 통신하는 중 문제가 발생했습니다.', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.nickname || !formData.password || !formData.name || !formData.phone) {
      return showAlert('필수 입력 사항을 모두 입력해 주세요.', 'error');
    }
    if (formData.password !== formData.passwordConfirm) {
      return showAlert('비밀번호가 일치하지 않습니다.', 'error');
    }

    const resultAction = await dispatch(submitSignup({ formData, profileFile }));
    if (submitSignup.fulfilled.match(resultAction)) {
      showAlert('어서찾아주개 회원이 되신 것을 환영합니다! 🎉', 'success', () => {
        closeAlert();
        window.location.href = '/login';
      });
    } else {
      showAlert(`회원가입에 실패했습니다: ${resultAction.payload}`, 'error');
    }
  };

  return (
    <>
      <S.AppWrapper>
        <S.Container>
          <Header
            title="회원가입"
            onBackClick={() => (step > 0 ? dispatch(setStep(step - 1)) : window.history.back())}
          />
          <S.Mt70 />

          {/* STEP 0: 가입 방식 선택 */}
          {step === 0 && (
            <S.TextCenter>
              <S.H3Title>어서찾아주개에 오신 것을 환영합니다!</S.H3Title>
              <S.Column>
                <S.BtnBottomWrap>
                  <S.BaseBtn $variant='kakao' onClick={handleKakaoSignup}>카카오로 시작하기</S.BaseBtn><br />
                  <S.BaseBtn $variant='primary' onClick={handleGeneralSignup}>일반회원가입</S.BaseBtn>
                </S.BtnBottomWrap>
              </S.Column>
            </S.TextCenter>
          )}

          {/* STEP 1: 약관동의 */}
          {step === 1 && (
            <S.BasicLayout>
              <S.H3Title>약관에 동의하고 어서찾아주개 회원이 되어주세요 !</S.H3Title>
              <S.MemberInfo>
                <label><input type="checkbox" checked={isAllAgreed} onChange={handleAllAgreeChange} />전체동의</label><br />
                <label>
                  <input type="checkbox" checked={formData.agreeTerms} onChange={(e) => dispatch(updateFormField({ field: 'agreeTerms', value: e.target.checked }))} />
                  이용약관 동의(필수)
                </label>
                <S.UpAndDown onClick={() => setShowTerms(!showTerms)}>{showTerms ? '▲ 닫기' : '▼ 보기'}</S.UpAndDown>
                <S.Terms><S.TermsInner>제 1조 (목적) ...</S.TermsInner></S.Terms>
                
                <label>
                  <input type="checkbox" checked={formData.agreePrivacy} onChange={(e) => dispatch(updateFormField({ field: 'agreePrivacy', value: e.target.checked }))} />
                  개인정보 수집이용 동의(필수)
                </label>
                <S.UpAndDown onClick={() => setShowPrivacy(!showPrivacy)}>{showPrivacy ? '▲ 닫기' : '▼ 보기'}</S.UpAndDown>
                <S.Privacy><S.TermsInner>수집 항목: 이메일... </S.TermsInner></S.Privacy>

                <label>
                  <input type="checkbox" checked={formData.agreeAge} onChange={(e) => dispatch(updateFormField({ field: 'agreeAge', value: e.target.checked }))} />
                  만 14세 이상입니다(필수)
                </label><br />
                <label>
                  <input type="checkbox" checked={formData.marketingAgreed} onChange={(e) => dispatch(updateFormField({ field: 'marketingAgreed', value: e.target.checked }))} />
                  마케팅 정보 메일, SMS 수신동의 (선택)
                </label><br />
              </S.MemberInfo>
              <S.BtnBottomWrap>
                <S.BaseBtn $variant='primary' onClick={() => {
                  if (!formData.agreeTerms || !formData.agreePrivacy || !formData.agreeAge) {
                    return showAlert('필수 약관에 모두 동의해 주세요.', 'error');
                  }
                  dispatch(setStep(3));
                }}>다음으로</S.BaseBtn>
              </S.BtnBottomWrap>
            </S.BasicLayout>
          )}

          {/* STEP 3: 정보 입력 */}
          {step === 3 && (
            <S.LayOutPadding>
              <AnimItem $delay={0} $isSlideDown>
                <S.TextCenter>
                  <S.PhotoUpload onClick={handleBoxClick}>
                    {profilePreview ? <img src={profilePreview} alt="프로필" /> : <span>📷</span>}
                  </S.PhotoUpload>
                  <S.PhotoUploadBottomText className='mt-3'>클릭해서 사진을 등록하세요</S.PhotoUploadBottomText>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </S.TextCenter>
              </AnimItem>

              <AnimItem $delay={0.1}>
                <S.AlignItemsCenter className='mt-5 mb-4'>
                  <S.LabelGroup>
                    <S.Label><input type="radio" name="userType" value="GENERAL" checked={formData.userType === 'GENERAL'} onChange={handleChange} />일반회원</S.Label>
                    <S.Label><input type="radio" name="userType" value="BUSINESS" checked={formData.userType === 'BUSINESS'} onChange={handleChange} />업체 (비즈니스)</S.Label>
                  </S.LabelGroup>
                </S.AlignItemsCenter>
              </AnimItem>

              <AnimItem $delay={0.2} className='mb-4'>
                <AnimatedInput type="text" name="name" label="이름(실명)" value={formData.name} onChange={handleChange} />
              </AnimItem>

              <AnimItem $delay={0.3} className='mb-4'>
                <AnimatedInput type="text" name="phone" label="전화번호 (- 제외)" value={formData.phone} onChange={handleChange} />
              </AnimItem>

              <AnimItem $delay={0.4} className='mb-4'>
                <S.AlignItemsCenter style={{ gap: '8px' }}>
                  <AnimatedInput type="email" name="email" label="이메일" value={formData.email} onChange={handleChange} />
                  <S.BaseBtn onClick={handleCheckEmail} $variant="primary" $mainColor='#ccc' $width="80px">중복확인</S.BaseBtn>
                </S.AlignItemsCenter>
              </AnimItem>

              <AnimItem $delay={0.5} className='mb-4'>
                <S.AlignItemsCenter style={{ gap: '8px' }}>
                  <AnimatedInput type="text" name="nickname" label="닉네임" value={formData.nickname} onChange={handleChange} />
                  <S.BaseBtn onClick={handleCheckNickname} $variant="primary" $mainColor='#ccc' $width="80px">중복확인</S.BaseBtn>
                </S.AlignItemsCenter>
              </AnimItem>

              <AnimItem $delay={0.6} className='mb-4'>
                <AnimatedInput type="password" name="password" label="비밀번호" value={formData.password} onChange={handleChange} />
              </AnimItem>

              <AnimItem $delay={0.7} className='mb-4'>
                <AnimatedInput type="password" name="passwordConfirm" label="비밀번호 확인" value={formData.passwordConfirm} onChange={handleChange} />
              </AnimItem>

              <AnimItem $delay={0.8} className='mb-4'>
                <S.AlignItemsCenter style={{ gap: '8px' }}>
                  <AnimatedInput type="text" name="address" label="주소 검색" value={formData.address} readOnly onClick={() => setIsOpenPostcode(true)} />
                  <S.BaseBtn onClick={() => setIsOpenPostcode(true)} $variant="primary" $mainColor='#ccc' $width="80px">주소검색</S.BaseBtn>
                </S.AlignItemsCenter>
              </AnimItem>

              <AnimItem $delay={0.9} className='mb-5'>
                <AnimatedInput type="text" name="detailAddress" label="상세 주소" value={formData.detailAddress} onChange={handleChange} />
              </AnimItem>

              {isOpenPostcode && (
                <S.ModalBg>
                  <S.Modal>
                    <S.Exit onClick={() => setIsOpenPostcode(false)}>닫기 X</S.Exit>
                    <DaumPostcodeEmbed onComplete={handleCompletePostcode} />
                  </S.Modal>
                </S.ModalBg>
              )}

              <AnimItem $delay={1.0}>
                <S.BtnBottomWrap>
                  <S.BaseBtn $variant='primary' onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? '처리 중...' : '회원가입 완료'}
                  </S.BaseBtn>
                </S.BtnBottomWrap>
              </AnimItem>
            </S.LayOutPadding>
          )}
        </S.Container>

        {/* 💡 커스텀 알럿 컴포넌트 렌더링 */}
        <CustomAlert 
          isOpen={alertConfig.isOpen} 
          message={alertConfig.message} 
          type={alertConfig.type} 
          onConfirm={alertConfig.onConfirm} 
        />
      </S.AppWrapper>
    </>
  );
}