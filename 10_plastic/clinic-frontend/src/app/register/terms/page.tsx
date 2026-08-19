"use client"
import React,{useState, useEffect} from 'react';
import * as S from '../../../style/Sub.styles';

export default function TermsPage(){
    const [allAgreed, setAllAgreed] = useState(false);
    const [termsAgreed, setTermsAgreed] =useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);

    //약관 박스 열림/닫힘 토글 상태 (디자인 시안에 맞춰 기본값 true)
    const [isTermsOpen, setIsTermsOpen] = useState(true);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);

    useEffect(() => {
        if(termsAgreed && privacyAgreed){
setAllAgreed(true);
        }else{
            setAllAgreed(false);
        }
    },[termsAgreed, privacyAgreed]);

    //전체동의 핸들러
    const handleAllAgreed = (e:React.ChangeEvent<HTMLInputElement>) => {
        const isCheked = e.target.checked;
        setAllAgreed(isCheked);
        setTermsAgreed(isCheked);
        setPrivacyAgreed(isCheked);
    }

    return(
        <>
<S.Wrapper>
<S.StepContainer>

    <S.Step $active={true}>
        <S.StepNumber $active={true}>1</S.StepNumber>
        <S.StepText $active={true}>약관동의</S.StepText>
    </S.Step>

    <S.StepDivider/>

    <S.Step $active={false}>
        <S.StepNumber $active={false}>2</S.StepNumber>
        <S.StepText $active={false}>회원가입</S.StepText>
    </S.Step>


</S.StepContainer>

{/* 전체 동의 영역 */}
<S.CheckAllWrapper>
    <S.CheckboxLabel>
<S.CheckboxInput
type="checkbox"
checked={allAgreed}
onChange={handleAllAgreed}
/> 
<S.CheckAllText>
안호범 안스 성형외과의 모든 약관을 확인하고 전체 동의합니다. 
(전체동의, 선택항목도 포함됩니다.)
</S.CheckAllText>      
    </S.CheckboxLabel>
</S.CheckAllWrapper>

{/*이용약관 (필수) */}
<S.TermSection>
    <S.TermHeader>
        <S.CheckboxLabel>
<S.CheckboxInput
type="checkbox"
checked={termsAgreed}
onChange={(e) => setTermsAgreed(e.target.checked)}
/>      
<S.TermTitle>이용약관(필수)</S.TermTitle>      
        </S.CheckboxLabel>
<S.ToggleButton onClick={() => setIsTermsOpen(!isTermsOpen)}>
{isTermsOpen ? '닫기 ∧' : '열기 ∨'}  
</S.ToggleButton>
</S.TermHeader>

<S.TermContentBox $isOpen={isTermsOpen}>
{`[OO성형외과의원 온라인회원 약관]\n이 약관은 OO성형외과의원(이하 '회사')가 제공하는 서비스 이용조건 및 절차에 대한 사항과 기타 필요한 사항을 전기통신사업법 및 동법 시행령이 정하는 대로 준수하고 규정함을 목적으로 합니다.\n\n제 1조 목적\n① OO성형외과의원 이용자 약관(이하 "본 약관"이라 합니다)은 이용자가 OO성형외과의원에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 회원과 OO성형외과의원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제 2조 회원의 정의`}    
</S.TermContentBox>
</S.TermSection>

{/*2개인정보 수집 및 이용 (필수) */}
<S.TermSection>
    <S.TermHeader>
        <S.CheckboxLabel>
            <S.CheckboxInput
            type="checkbox"
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            />
        </S.CheckboxLabel>

<S.ToggleButton onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
{isPrivacyOpen ? '닫기 ∧' : '열기 ∨'}  
</S.ToggleButton>


    </S.TermHeader>

<S.TermContentBox $isOpen={isPrivacyOpen}>
          {`1. - 목적 : 이용자 식별 및 본인여부 확인\n- 항목 : 이름, 아이디, 비밀번호\n- 보유 및 이용기간 : 회원탈퇴 후 5일까지\n\n2. - 목적 : 민원 등 고객 고충처리\n- 항목 : 이메일, 휴대전화번호\n- 보유 및 이용기간 : 회원탈퇴 후 5일까지\n\n3. - 목적 : 만 14세 미만 아동 확인\n- 항목 : 법정 생년월일`}
        </S.TermContentBox>

</S.TermSection>

<S.ButtonGroup>
    <S.Button $variant='outline'>이전단계</S.Button>
    <S.Button $variant='solid'>다음단계</S.Button>
</S.ButtonGroup>


</S.Wrapper>        
        </>
    )

}