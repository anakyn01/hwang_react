//npm install react-daum-postcode
"use client"
import React,{useState, useEffect} from 'react';
//이동하기 위해서 
import {useRouter} from 'next/navigation';
import * as S from '../../../style/Sub.styles';
import DaumPostcode from 'react-daum-postcode';

export default function TermsPage(){
    const router =useRouter();

    //add
    const [step, setStep] = useState(1);

    const [allAgreed, setAllAgreed] = useState(false);
    const [termsAgreed, setTermsAgreed] =useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);

    //약관 박스 열림/닫힘 토글 상태 (디자인 시안에 맞춰 기본값 true)
    const [isTermsOpen, setIsTermsOpen] = useState(true);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);

//주소검색 팝업 열림 / 닫힘
const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);    

    //폼입력값 관리할 객체 상태추가
const [formData, setFormData] = useState({
userName:'', userId:'', userPw:'', userPwConfirm:'',
email:'', emailDomain:'', isMailAgreed:false,
phone:'', isSnsAgreed:false, gender:'',
residentNumFront:'', residentNumBack:'',
zipcode:'', address1:'', address2:''
    });

// 사용자가 키보드로 입력할 때마다 상태를 업데이트하는 핸들러
const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const {name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

//주민번호 입력시 숫자만 입력되도록 처리(선택사항)
if ((name === 'residentNumFront' || name === 'residentNumBack') 
    && !/^[0-9]*$/.test(value)) {
return;
}


 setFormData(prev => ({
    ...prev,
    [name]:type === 'checkbox' ? checked : value
 }));   
};  

//다음 주소 API완료 핸들러..
const handleCompletePostcode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType === 'R'){
        if(data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
extraAddress += extraAddress !== '' ? `,${data.buildingName}` : data.buildingName;           
        }
fullAddress += extraAddress !== '' ? `(${extraAddress})`:'';
    }
//주소 및 우편번호 상태 업데이트 후 팝업 닫기
setFormData(prev => ({
...prev,
zipcode:data.zonecode,
address1:fullAddress
}));
setIsPostcodeOpen(false);    
};
//국가 공식 알고리즘
const validateResidentNumber = (front:string, back:string) => {
    // 앞 6자리와 뒤 7자리를 하나로 합쳐서 13자리 문자열로 만듭니다.
    const rrn = front + back;
    /*만약 합친 길이가 딱 13자리가 아니라면,
    입력이 덜 된 것이므로 즉시 false(거절)를 반환합니다.*/
    if (rrn.length !== 13) return false;
    //공식을 계산할 합계를 저장할 변수를 0으로 준비합니다.
    let sum = 0;
/*주민번호 검증 공식에 사용되는 
'가중치(각 자리에 곱할 고정 숫자들)' 배열입니다.*/
const weights = [2,3,4,5,6,7,8,9,2,3,4,5];
/*마지막 13번째 자리(검증 번호)를 제외한 앞의 
12자리 숫자를 하나씩 돌면서 계산*/
for(let i =0; i < 12; i++) {
    sum += parseInt(rrn[i]) * weights[i];
}
/*
국가 공식 규칙: 총합(sum)을 11로 나눈 나머지를 11에서 빼고
그 결과를 다시 10으로 나눈 나머지를 구합니다
이것이 진짜 검증용 1자리 숫자!
*/
const checkDigit = (11 -(sum % 11)) % 10;

/*우리가 계산해 낸 검증 숫자(checkDigit)와
사용자가 입력한 마지막 13번째 숫자가 완벽히 똑같은지 비교
*/
return checkDigit === parseInt(rrn[12]);
};

//[회원가입] 버튼을 눌렀을 때 Node.js 서버로 쏴주는 함수
const handleSubmit = async () => {
    //필수 입력값 체크
 if(!formData.userName || !formData.userId || !formData.userPw) {
    return alert('필수 항목을 모두 입력해 주세요');
 }
 if(formData.userPw !== formData.userPwConfirm){
    return alert('필수 항목을 모두 입력해 주세요');
 }
//주민번호 앞자리나 뒷자리가 비어있으면 경고
if(!formData.residentNumFront || !formData.residentNumBack){
    return alert('주민 등록번호를 입력해 주세요');
}
//주민번호 검사 함수실행시..번호가 일치하지 않을경우
if(!validateResidentNumber(formData.residentNumFront,
    formData.residentNumBack)){
    return alert('유효하지 않은 주민등록번호입니다. 다시 확인해 주세요.');
}
//이메일 앞부분(아이디 부분)이 비어있으면 경고창을 띄웁니다.
if(!formData.email){
return alert('이메일을 입력해 주세요');
}

 //이메일 주소 조합
 const fullEmail = formData.emailDomain === '직접입력' || formData.emailDomain ===""
? formData.email
: `${formData.email}@${formData.emailDomain}`;

// 백엔드로 보낼 완전한 13자리 주민등록번호를 앞뒤로 붙여 조립합니다.
const fullResidentNum = 
`${formData.residentNumFront}${formData.residentNumBack}`
try{
const response = await fetch('http://localhost:5000/api/register',{
method:'POST',
headers:{'Content-type':'application/json'},
body  :JSON.stringify({
userName:formData.userName,
userId:formData.userId,
userPw:formData.userPw,
email:fullEmail,
isMailAgreed:formData.isMailAgreed,
phone:formData.phone,
isSnsAgreed:formData.isSnsAgreed,
gender: formData.gender,
residentNum:fullResidentNum,
zipcode:formData.zipcode,
address1:formData.address1, 
address2:formData.address2,  
})  
});

const result = await response.json();

if(response.ok) {
    alert('회원가입이 완료되었습니다');
    router.push('/');
}else{
    alert(result.message);
}

}catch(error){
   console.error(error);
   alert('서버와 통신중에 오류가 발생했습니다') 
}
}

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
        {/*2.회원가입 폼일때 보여줄 상단 타이틀 추가*/}
{step === 2 && <S.PageTitle>회원가입</S.PageTitle>}

<S.StepContainer>
    <S.Step $active={step === 1}>
        <S.StepNumber $active={step === 1}>1</S.StepNumber>
        <S.StepText $active={step === 1}>약관동의</S.StepText>
    </S.Step>

    <S.StepDivider/>

    <S.Step $active={step === 2}>
        <S.StepNumber $active={step === 2}>2</S.StepNumber>
        <S.StepText $active={step === 2}>회원가입</S.StepText>
    </S.Step>


</S.StepContainer>

{/* 전체 동의 영역 */}
{step === 1 ? (
    <>
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

{/* 👇 이 부분이 통째로 빠져 있었습니다! 추가해 주세요. */}
<S.TermTitle>개인정보 수집 및 이용 (필수)</S.TermTitle>

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
<S.Button $variant='solid'
onClick={() => {
    if (!termsAgreed || !privacyAgreed){
        return alert('필수 약관에 모두 동의해 주세요');
    }
    setStep(2);    
}}
>다음단계</S.Button>
</S.ButtonGroup>
</>
) : (
   <>
<S.FormContainer>

<S.FormGroup>
    <S.Label>이름 (필수)</S.Label>
    <S.Input type="text" placeholder='이름을 입력해주세요'
    name="userName" value={formData.userName}
    onChange={handleChange}
    />
</S.FormGroup>

<S.FormGroup>
    <S.Label>아이디 (필수)</S.Label>
    <S.Input type="text" placeholder='아이디를 입력해주세요'
        name="userId" value={formData.userId}
    onChange={handleChange}
    />
</S.FormGroup>

<S.FormGroup>
    <S.Label>비밀번호 (필수)</S.Label>
    <S.Input type="password" placeholder='비밀번호를 입력해주세요'
    name="userPw" value={formData.userPw}
    onChange={handleChange}
    />
</S.FormGroup>



<S.FormGroup>
    <S.Label>비밀번호 확인(필수)</S.Label>
    <S.Input type="password" placeholder='비밀번호를 한번더 입력해주세요'
    name="userPwConfirm" value={formData.userPwConfirm}
    onChange={handleChange}
    />
</S.FormGroup>

{/*주민등록번호 */}
<S.FormGroup>
    <S.Label>주민등록번호 (필수)</S.Label>
    <div 
className="d-flex align-items-center justify-content-between">
<S.Input
type="text" maxLength={6}
placeholder='앞6자리'
name="residentNumFront"
value={formData.residentNumFront}
onChange={handleChange}
/>
<span>-</span>
<S.Input
type="password" maxLength={7}
placeholder='뒤 7자리'
name="residentNumBack"
value={formData.residentNumBack}
onChange={handleChange}
/>
    </div>
</S.FormGroup>

<S.FormGroup>
    <S.Label>이메일 (필수)</S.Label>
    <S.EmailWrapper>
    <S.Input type="text" placeholder='이메일 주소를 입력해주세요'
    name="email" value={formData.email}
    onChange={handleChange}
    />
    <S.Select 
    name="emailDomain" value={formData.emailDomain}
    onChange={handleChange}
    >
        <option>직접입력</option>
        <option value="naver.com">naver.com</option>
        <option value="gmail.com">gmail.com</option>
        <option value="daum.net">daum.net</option>
    </S.Select>
    </S.EmailWrapper>

    <S.SubCheckboxLabel>
        <input type="checkbox" 
name="isMailAgreed" checked={formData.isMailAgreed}  
onChange={handleChange}      
        /> 
        정보/이벤트 메일 수신에 동의합니다.
    </S.SubCheckboxLabel>
</S.FormGroup>

{/*주소 넣기 추가 */}
<S.FormGroup>
    <S.Label>주소</S.Label>
    <S.Dflex>
<S.Input
type="text"
placeholder='우편번호'
name="zipcode"
value={formData.zipcode}
readOnly
/>
<S.Button
$variant='outline'
onClick={() => setIsPostcodeOpen(true)}
>
우편번호 찾기
</S.Button>        
    </S.Dflex>

<S.Input
type="text" placeholder='기본주소'
name="address1"
value={formData.address1}
readOnly
className='mb-2'
/>

<S.Input
type="text" placeholder='상세주소를 입력해 주세요'
name="address2"
value={formData.address2}
className='mb-2'
onChange={handleChange}
/>
</S.FormGroup>

{/* 다음 우편버호 팝업 모달 */}
{isPostcodeOpen && (
    <S.ModalBG>
        <S.ModalContent>
            <S.RightBtn>
                <button onClick={() => setIsPostcodeOpen(false)}>
                    닫기 X
                </button>
            </S.RightBtn>
            <DaumPostcode onComplete={handleCompletePostcode}/>
        </S.ModalContent>
    </S.ModalBG>
)}

<S.FormGroup>
    <S.Label>휴대폰번호</S.Label>
    <S.Input type="tel" placeholder='-없이 입력하세요'
    name="phone" value={formData.phone}  
    onChange={handleChange} 
    />
    <S.SubCheckboxLabel>
        <input type="checkbox" 
name="isSnsAgreed" checked={formData.isSnsAgreed}  
onChange={handleChange} 
        /> 
        정보/이벤트 SNS 수신에 동의합니다.
    </S.SubCheckboxLabel>
</S.FormGroup>

<S.FormGroup>
    <S.Label>성별</S.Label>
    <S.RadioWrapper>
        <S.RadioLabel>
            <S.RadioInput type="radio" 
            name="gender" value="male"
            checked={formData.gender === 'male'}  
            onChange={handleChange} 
            />남자
        </S.RadioLabel>
        <S.RadioLabel>
            <S.RadioInput type="radio" 
            name="gender" value="female"
            checked={formData.gender === 'female'}  
            onChange={handleChange} 
            />여자
        </S.RadioLabel>
    </S.RadioWrapper>
</S.FormGroup>
</S.FormContainer> 

<S.ButtonGroup>
<S.Button $variant='outline'
onClick={() => setStep(1)}
>취소</S.Button>
<S.Button $variant='solid'
onClick={handleSubmit}
>회원가입</S.Button>
</S.ButtonGroup>

   </> 
)}
</S.Wrapper>        
        </>
    )

}