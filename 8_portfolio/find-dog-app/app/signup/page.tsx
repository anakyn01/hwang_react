'use client';

import React, { useState, useRef } from 'react';
import * as S from '../../css/style.styles';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import Header from '../components/Header';
import { RENDER_API_URL } from '../../config/api';

export default function SignupPage() {
  /*
  step 0: 가입 방법 선택,
  step 1: 약관,
  step 2: 휴대폰,
  step 3: 정보입력
  */
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeAge: false,
    marketingAgreed: false,

    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    userType: 'GENERAL'
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenPostcode, setIsOpenPostcode] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // 주소검색
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
    setFormData({ ...formData, address: fullAddress });
    setIsOpenPostcode(false);
  };

  // 약관 동의 관련 로직
  const isAllAgreed =
    formData.agreeTerms &&
    formData.agreePrivacy &&
    formData.agreeAge &&
    formData.marketingAgreed;

  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      agreeTerms: isChecked,
      agreePrivacy: isChecked,
      agreeAge: isChecked,
      marketingAgreed: isChecked
    }));
  };

  const handleStep1Next = () => {
    if (!formData.agreeTerms || !formData.agreePrivacy || !formData.agreeAge) {
      alert('필수 약관에 모두 동의해 주세요.');
      return;
    }
    setStep(3);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneralSignup = () => {
    setStep(1);
  };

  const handleKakaoSignup = () => {
    alert('카카오 로그인 연동 페이지로 이동합니다. (백엔드 OAuth 세팅 필요)');
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    if (!formData.email.trim()) {
      alert('이메일을 먼저 입력해 주세요.');
      return;
    }
    try {
      const res = await fetch(
        `${RENDER_API_URL}/api/members/check-email?email=${encodeURIComponent(formData.email)}`
      );
      if (!res.ok) throw new Error('서버응답에러');
      const isDuplicate = await res.json();
      if (isDuplicate) {
        alert('이미 사용 중인 이메일입니다. 다른 이메일을 입력해 주세요.');
      } else {
        alert('사용 가능한 이메일입니다!');
      }
    } catch (error) {
      console.error('이메일 중복 확인 에러:', error);
      alert('서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!formData.nickname.trim()) {
      alert('닉네임을 먼저 입력해 주세요.');
      return;
    }
    try {
      const res = await fetch(
        `${RENDER_API_URL}/api/members/check-nickname?nickname=${encodeURIComponent(formData.nickname)}`
      );
      if (!res.ok) throw new Error('서버응답에러');
      const isDuplicate = await res.json();
      if (isDuplicate) {
        alert('이미 누군가 사용 중인 닉네임입니다.');
      } else {
        alert('멋진 닉네임이네요! 사용 가능합니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 에러:', error);
      alert('서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  // 회원가입 제출
  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.nickname ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      alert('이메일, 닉네임, 비밀번호, 이름, 전화번호는 필수 입력 사항입니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }

    try {
      let finalImageUrl = '';

      if (profileFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', profileFile);

        const uploadRes = await fetch(`${RENDER_API_URL}/api/members/upload-profile`, {
          method: 'POST',
          body: imageFormData
        });

        if (uploadRes.ok) {
          finalImageUrl = await uploadRes.text();
        } else {
          alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
          return;
        }
      }

      const fullAddressToSend = formData.detailAddress
        ? `${formData.address} ${formData.detailAddress}`
        : formData.address;

      const res = await fetch(`${RENDER_API_URL}/api/members/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          marketingAgreed: formData.marketingAgreed,
          provider: 'LOCAL',
          profileImageUrl: finalImageUrl,
          name: formData.name,
          phone: formData.phone,
          address: fullAddressToSend,
          userType: formData.userType
        })
      });

      if (res.status === 201 || res.ok) {
        alert('어서찾아주개 회원이 되신 것을 환영합니다! 🎉');
        window.location.href = '/login';
      } else {
        const errorText = await res.text();
        alert(`회원가입에 실패했습니다: ${errorText}`);
      }
    } catch (error) {
      console.error('회원가입 API 에러:', error);
      alert('회원가입 처리 중 서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
    }
  };

  return (
    <>
      <S.AppWrapper>
        <S.Container>
          <Header
            title="회원가입"
            onBackClick={() => (step > 0 ? setStep(step - 1) : window.history.back())}
          />
          <S.Mt70 />

          {/* ================= STEP 0: 가입 방식 선택 ================= */}
          {step === 0 && (
            <S.TextCenter>
              <S.H3Title>어서찾아주개에 오신 것을 환영합니다!</S.H3Title>
              <S.Column>
                <S.BtnBottomWrap>
                  <S.BaseBtn $variant="kakao" onClick={handleKakaoSignup}>
                    카카오로 시작하기
                  </S.BaseBtn>
                  <br />
                  <S.BaseBtn $variant="local" onClick={handleGeneralSignup}>
                    일반회원가입
                  </S.BaseBtn>
                </S.BtnBottomWrap>
              </S.Column>
            </S.TextCenter>
          )}

          {/* ================= STEP 1: 약관동의 ================= */}
          {step === 1 && (
            <S.BasicLayout>
              <S.H3Title>약관에 동의하고 어서찾아주개 회원이 되어주세요 !</S.H3Title>
              <S.MemberInfo>
                <label>
                  <input type="checkbox" checked={isAllAgreed} onChange={handleAllAgree} />
                  전체동의
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  />
                  이용약관 동의(필수)
                </label>
                <S.UpAndDown onClick={() => setShowTerms(!showTerms)}>
                  {showTerms ? '▲ 닫기' : '▼ 보기'}
                </S.UpAndDown>
                <S.Terms>
                  <S.TermsInner>
                    제 1조 (목적) <br />
                    본 약관은 어서찾아주개(이하 &quot;회사&quot;)가 제공하는 서비스의 이용조건 및 절차,
                    권리, 의무 및 책임사항을 규정함을 목적으로 합니다. <br />
                    (여기에 실제 약관 내용을 넣으시면 됩니다.)
                  </S.TermsInner>
                </S.Terms>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                  />
                  개인정보 수집이용 동의(필수)
                </label>
                <S.UpAndDown onClick={() => setShowPrivacy(!showPrivacy)}>
                  {showPrivacy ? '▲ 닫기' : '▼ 보기'}
                </S.UpAndDown>
                <S.Privacy>
                  <S.TermsInner>
                    수집 항목: 이메일, 닉네임, 이름, 연락처, 주소 <br />
                    수집 목적: 서비스 제공 및 회원 관리 <br />
                    보유 기간: 회원 탈퇴 시까지
                  </S.TermsInner>
                </S.Privacy>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.agreeAge}
                    onChange={(e) => setFormData({ ...formData, agreeAge: e.target.checked })}
                  />
                  만14세 이상입니다(필수)
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={formData.marketingAgreed}
                    onChange={(e) =>
                      setFormData({ ...formData, marketingAgreed: e.target.checked })
                    }
                  />
                  마케팅 정보 메일, SMS 수신동의 (선택)
                </label>
                <br />
              </S.MemberInfo>
              <S.BtnBottomWrap>
                <S.BaseBtn $variant="primary" onClick={handleStep1Next}>
                  다음으로
                </S.BaseBtn>
              </S.BtnBottomWrap>
            </S.BasicLayout>
          )}

          {/* ================= STEP 3: 정보 입력 ================= */}
          {step === 3 && (
            <>
              <S.LayOutPadding>
                <S.TextCenter>
                  <S.PhotoUpload onClick={handleBoxClick}>
                    {profilePreview ? (
                      <img src={profilePreview} alt="프로필 미리보기" />
                    ) : (
                      <span>📷</span>
                    )}
                  </S.PhotoUpload>
                  <S.PhotoUploadBottomText className="mt-3">
                    클릭해서 사진을 등록하세요
                  </S.PhotoUploadBottomText>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </S.TextCenter>

                <S.AlignItemsCenter className="mt-5">
                  <S.LabelGroup>
                    <S.Label>
                      <input
                        type="radio"
                        name="userType"
                        value="GENERAL"
                        checked={formData.userType === 'GENERAL'}
                        onChange={handleChange}
                      />
                      일반회원
                    </S.Label>
                    <S.Label>
                      <input
                        type="radio"
                        name="userType"
                        value="BUSINESS"
                        checked={formData.userType === 'BUSINESS'}
                        onChange={handleChange}
                      />
                      업체 (비즈니스)
                    </S.Label>
                  </S.LabelGroup>
                </S.AlignItemsCenter>

                <S.FormControl
                  type="text"
                  name="name"
                  placeholder="이름(실명)을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="mb-5"></div>

                <S.FormControl
                  type="text"
                  name="phone"
                  placeholder="전화번호 입력 (- 제외)"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <S.AlignItemsCenter className="mt-5"></S.AlignItemsCenter>

                <S.AlignItemsCenter className="mt-5">
                  <S.FormControl
                    type="email"
                    name="email"
                    placeholder="이메일 입력"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <S.BaseBtn
                    onClick={handleCheckEmail}
                    $variant="primary"
                    $mainColor="#ccc"
                    $width="25%"
                  >
                    중복확인
                  </S.BaseBtn>
                </S.AlignItemsCenter>

                <S.AlignItemsCenter>
                  <S.FormControl
                    type="text"
                    name="nickname"
                    placeholder="닉네임 입력"
                    value={formData.nickname}
                    onChange={handleChange}
                  />
                  <S.BaseBtn
                    onClick={handleCheckNickname}
                    $variant="primary"
                    $mainColor="#ccc"
                    $width="25%"
                  >
                    중복확인
                  </S.BaseBtn>
                </S.AlignItemsCenter>

                <br />
                <S.FormControl
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                />
                <br />
                <br />
                <S.FormControl
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />

                <S.AlignItemsCenter>
                  <S.FormControl
                    type="text"
                    name="address"
                    placeholder="주소를 검색해주세요"
                    value={formData.address}
                    readOnly
                    onClick={() => setIsOpenPostcode(true)}
                  />
                  <S.BaseBtn
                    onClick={() => setIsOpenPostcode(true)}
                    $variant="primary"
                    $mainColor="#ccc"
                    $width="25%"
                  >
                    주소검색
                  </S.BaseBtn>
                </S.AlignItemsCenter>

                <S.FormControl
                  type="text"
                  name="detailAddress"
                  placeholder="상세 주소를 입력해 주세요"
                  value={formData.detailAddress}
                  onChange={handleChange}
                />

                {isOpenPostcode && (
                  <S.ModalBg>
                    <S.Modal>
                      <S.Exit onClick={() => setIsOpenPostcode(false)}>닫기 X</S.Exit>
                      <DaumPostcodeEmbed onComplete={handleCompletePostcode} />
                    </S.Modal>
                  </S.ModalBg>
                )}

                <S.BtnBottomWrap>
                  <S.BaseBtn $variant="primary" onClick={handleSubmit}>
                    회원가입
                  </S.BaseBtn>
                </S.BtnBottomWrap>
              </S.LayOutPadding>
            </>
          )}
        </S.Container>
      </S.AppWrapper>
    </>
  );
}