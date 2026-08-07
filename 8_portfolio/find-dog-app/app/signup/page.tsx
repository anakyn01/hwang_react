'use client'

import React, {useState, useRef} from 'react'; 
import * as S from '../../css/style.styles'
//add
import DaumPostcodeEmbed, { Address} from 'react-daum-postcode';


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
    agreeTerms:false,
    agreePrivacy:false,
    agreeAge:false,
    marketingAgreed:false,

    email:'',
    nickname:'',
    password:'',
    passwordConfirm:'',
    name:'',
    phone:'',
    address:'',
    userType:'GENERAL'
});

const [profileFile, setProfileFile] = useState<File | null>(null);

//add
// 💡 [추가 1] 사진 미리보기 URL과 숨겨진 input을 조종할 Ref 생성
const [profilePreview, setProfilePreview] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);
//add
const [isOpenPostcode, setIsOpenPostcode] = useState(false);

//[약관 추가] 약관 내용 슬라이딩(열림/닫힘) 상태 관리
const [showTerms, setShowTerms] = useState(false);
const [showPrivacy, setShowPrivacy]= useState(false);

//[추가 2] 사진을 선택했을 때 실행될 함수
const handleImageChange =(e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (file) {

setProfileFile(file); 
setProfilePreview(URL.createObjectURL(file));
// 파일을 브라우저에서 볼 수 있는 임시 가짜 URL로 변환

// 상태에 저장해서 화면에 그림
}
};
//주소검색
const handleCompletePostcode = (data: Address) => {
let fullAddress = data.address;// 기본 주소
let extraAddress = '';// 추가 주소 (건물명 등)

if (data.addressType === 'R') {//도로명 주소일 경우
if (data.bname !== '') extraAddress += data.bname;
if (data.buildingName !== '') {
extraAddress += extraAddress !== '' ? `,
 ${data.buildingName}` : data.buildingName;
}
fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
};
// 주소를 formData에 업데이트하고 창 닫기
setFormData({ ...formData, address: fullAddress });
setIsOpenPostcode(false);
};

//[약관 추가] 약관 동의 관련 로직
const isAllAgreed =
formData.agreeTerms && formData.agreePrivacy 
&& formData.agreeAge && formData.marketingAgreed;

const handleAllAgree =(e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
        ...prev,
            agreeTerms: isChecked,
            agreePrivacy: isChecked,
            agreeAge: isChecked,
            marketingAgreed: isChecked
    }));
}
const handleStep1Next = () => {
// 필수 약관 검증
if (!formData.agreeTerms || !formData.agreePrivacy || !formData.agreeAge) {
alert('필수 약관에 모두 동의해 주세요.');
return;
}
setStep(3); // 모두 동의했으면 다음 단계로 이동
}

//[추가 3] 회색 박스를 클릭하면 숨겨진 
// 파일 input을 대신 클릭해주는 함수
const handleBoxClick = () => {
fileInputRef.current?.click();
};
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

const handleCheckEmail = async () => {
    // 빈칸 방어 로직
    if (!formData.email.trim()){
alert('이메일을 먼저 입력해 주세요.');  
return;      
    }try{
const res= await 
fetch(`http://localhost:8080/api/members/check-email?email=${formData.email}`);
if (!res.ok) throw new Error('서버응답에러');
const isDuplicate = await res.json();
if(isDuplicate){
alert('이미 사용 중인 이메일입니다. 다른 이메일을 입력해 주세요.');    
}else{
alert('이미 가능한 이메일입니다!');     
}
}catch(error){
console.error('이메일 중복 확인 에러:', error);
alert('서버와 통신하는 중 문제가 발생했습니다.');
    }
};

//3. 닉네임 중복 확인 로직
const handleCheckNickname = async () => {
    // 빈칸 방어 로직
    if (!formData.nickname.trim()){
alert('닉네임을 먼저 입력해 주세요.');  
return;      
}
try{
const res= await 
fetch(`http://localhost:8080/api/members/check-nickname?nickname=${formData.nickname}`);
if (!res.ok) throw new Error('서버응답에러');
const isDuplicate = await res.json();
if(isDuplicate){
alert('이미 누군가 사용 중인 닉네임입니다.');    
}else{
alert('멋진 닉네임이네요! 사용 가능합니다.');     
}
}catch(error){
console.error('닉네임 중복 확인 에러:', error);
alert('서버와 통신하는 중 문제가 발생했습니다.');
    }
};

const handleSubmit = async () => {
//validation
if (!formData.email || !formData.nickname || !formData.password
|| !formData.name || !formData.phone    ) {
alert('이메일, 닉네임, 비밀번호는 필수 입력 사항입니다.');
return;
}

// 2단계: 비밀번호 더블 체크
if (formData.password !== formData.passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
    return;
}
try {
let finalImageUrl = ''; // DB에 들어갈 이미지 주소

      // 💡 2단계: 사용자가 올린 사진 파일이 있다면 먼저 백엔드로 쏩니다!
      if (profileFile) {
        // 이미지는 JSON이 아니라 FormData라는 택배 상자에 담아서 보내야 합니다.
        const imageFormData = new FormData();
        imageFormData.append('file', profileFile);

        const uploadRes = await fetch('http://localhost:8080/api/members/upload-profile', {
          method: 'POST',
          body: imageFormData, // 헤더에 Content-Type을 적지 않아야 브라우저가 알아서 세팅합니다.
        });

        if (uploadRes.ok) {
          finalImageUrl = await uploadRes.text(); // 백엔드가 돌려준 이미지 URL (예: http://.../uploads/123.jpg)
} else { alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');return; }// 사진 업로드 실패 시 가입을 멈춥니다.
      }
const res = await fetch('http://localhost:8080/api/members/signup', {
method: 'POST',
headers: {'Content-Type': 'application/json',},
body: JSON.stringify({
email: formData.email,
nickname: formData.nickname,
password: formData.password,
marketingAgreed: formData.marketingAgreed,
provider: 'LOCAL', // 명시적으로 일반 가입임을 백엔드에 알려줌
profileImageUrl: finalImageUrl,
name: formData.name,
phone: formData.phone,
address: formData.address,
userType: formData.userType
}),
});
// 4단계: 결과 처리
if (res.status === 201 || res.ok) {
alert('어서찾아주개 회원이 되신 것을 환영합니다! 🎉');
window.location.href = '/login';
} else {
// 백엔드에서 400 등 에러를 뱉었을 경우
const errorText = await res.text();
alert(`회원가입에 실패했습니다: ${errorText}`);    
}
} catch (error) {
console.error('회원가입 API 에러:', error);
alert('회원가입 처리 중 서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
}
};

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
            <S.BtnBottomWrap>
            <S.BaseBtn 
            $variant='kakao' 
            onClick={handleKakaoSignup}        
            >
             카카오로 시작하기
            </S.BaseBtn>
            <br/>
            <S.BaseBtn
            $variant='local'
            onClick={handleGeneralSignup}          
            >
             일반회원가입
            </S.BaseBtn>
            </S.BtnBottomWrap>
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
            <S.BaseBtn
            $variant='primary'
            onClick={() => setStep(3)}          
            >
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
        <S.PhotoUpload
        onClick={handleBoxClick}
        >
{profilePreview ? (
<img src={profilePreview} alt="프로필 미리보기" />
) : (
<span>📷</span>
)}        
        </S.PhotoUpload>
        <S.PhotoUploadBottomText
        className='mt-3'
        >클릭해서 사진을 등록하세요</S.PhotoUploadBottomText>

<input 
type="file"
accept="image/*"
ref={fileInputRef}
onChange={handleImageChange}
/>



    </S.TextCenter>

    <S.AlignItemsCenter className='mt-5'>
        <S.FormControl
        type="email"
        name="email"
        placeholder='이메일 입력'
        value={formData.email}
        onChange={handleChange}
        />
        <S.BaseBtn
        onClick={handleCheckEmail}
        $variant="primary"
        $mainColor='#ccc'
        $width="25%"
        >
         중복확인
        </S.BaseBtn>
    </S.AlignItemsCenter>

    <S.AlignItemsCenter>
        <S.FormControl
        type="text"
        name="nickname"
        placeholder='닉네임 입력'
        value={formData.nickname}
        onChange={handleChange}
        />
        <S.BaseBtn
        onClick={handleCheckNickname}
        $variant="primary"
        $mainColor='#ccc'
        $width="25%"
        >
         중복확인
        </S.BaseBtn>
    </S.AlignItemsCenter>

       <br/>
        <S.FormControl
        type="password"
        name="password"
        placeholder='비밀번호를 입력하세요'
        value={formData.password}
        onChange={handleChange}
        />
        <br/>
 <br/>
        <S.FormControl
        type="password"
        name="passwordConfirm"
        placeholder='비밀번호를 입력하세요'
        value={formData.passwordConfirm}
        onChange={handleChange}
        />



        <S.BtnBottomWrap>
            <S.BaseBtn
            $variant='primary'
            onClick={handleSubmit}          
            >
            회원가입
            </S.BaseBtn>
        </S.BtnBottomWrap>

    </S.LayOutPadding>
    </>
)}
            </S.Container>
        </S.AppWrapper>
        </>
    )
}