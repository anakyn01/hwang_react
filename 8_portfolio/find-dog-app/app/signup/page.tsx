'use client'

import React, {useState} from 'react';
import * as S from '../../css/style.styles'


export default function SignupPage(){
/*
💡 
step 0: 가입 방법 선택, 
step 1: 약관, 
step 2: 휴대폰, 
step 3: 정보입력
*/
const [step, setStep] = useState(0);
const [formData, setFormData] = useState({
    marketingAgreed:false,
    phone:'',
    email:'',
    nickname:'',
    password:'',
    passwordConfirm:''
})
//폼데이터 세팅
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
}
// 일반 가입 버튼 클릭 시
const handleGeneralSignup = () => {
    setStep(1); //약관동의 화면으로 이동
}
//카카오 가입 버튼 클릭 시
const handleKakaoSignup = () => {
    alert('카카오 로그인 연동 페이지로 이동합니다. (백엔드 OAuth 세팅 필요)');
}

const handleCheckEmail = async () => {};
const handleSubmit = async () => {};

    return(
        <>
        <S.AppWrapper>
            <S.Container>
                <S.TopFlexBasic>
<S.Back
onClick={() => step > 0 ? setStep(step -1) : window.history.back()}
>
&lt; 뒤로
</S.Back>
<S.H5Bold>
회원가입
</S.H5Bold>

<S.None/>
</S.TopFlexBasic>

{/* ================= STEP 0: 가입 방식 선택 (NEW) ================= */}
{step === 0 && (
    <S.TextCenter>
        <S.H3Title>
          어서찾아주개에 오신 것을 환영합니다!  
        </S.H3Title>
        <S.Column>
            <S.KakaoBtn
           
            >
             카카오로 시작하기
            </S.KakaoBtn>
            <S.LocalBtn
onClick={handleGeneralSignup}          
            >
             일반회원가입
            </S.LocalBtn>
        </S.Column>
    </S.TextCenter>
)}

{/*약관동의 */}
{step === 1 && (
    <S.BasicLayout>
        <S.H3Title>
          약관에 동의하고 어서찾아주개 회원이 되어주세요 !
        </S.H3Title> 
        <S.MemberInfo>
<label><input type="checkbox"/>전체동의</label><br/>
<label><input type="checkbox"/>이용약관 동의(필수)</label><br/>
<label><input type="checkbox"/>개인정보 수집이용 동의(필수)</label><br/>
<label><input type="checkbox"/>만14세 이상입니다(필수) </label><br/>
<label><input type="checkbox"
onChange={(e) => setFormData({...formData, marketingAgreed: e.target.checked})}
/>마케팅 정보 메일, SMS 수신동의 (선택)</label><br/>          
        </S.MemberInfo>
        <S.BtnBottomWrap>
            <S.LocalBtn
onClick={() => setStep(2)}          
            >
            다음으로
            </S.LocalBtn>
</S.BtnBottomWrap>
    </S.BasicLayout>
)}

            </S.Container>
        </S.AppWrapper>
        </>
    )
}