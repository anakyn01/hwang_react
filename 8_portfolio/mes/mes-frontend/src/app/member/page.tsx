"use client";

import {useState} from "react";
import axios from "axios";
import { useRouter} from "next/navigation";
import Script from "next/script";
import * as S from "@/assets/css/Style.style";
import { AlertModal } from "@/components/modal/AlertModal";

const handleInstargramLogin = () => {

}

const handleKakaoLogin = () => {

}

interface FormData {
firstName: string;
lastName : string;
email:string;
password:string;
repeatPassword:string;
companyName:string;
position:string;
tel:string;
address:string;
detailAddress:string;
gender:string;
}
declare global{
    interface Window{
        daum: any;
    }
}

export default function Member(){
    const router = useRouter();
const [formData, setFormData] = useState<FormData>({
firstName: "",
lastName : "",
email:"",
password:"",
repeatPassword:"",
companyName:"",
position:"",
tel:"",
address:"",
detailAddress:"",
gender:"",
});

//add
// 💡 알림 모달의 오픈 여부와 메시지, 가입 성공 시 라우팅을 위한 플래그 상태
const [isAlertOpen, setIsAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

const handleChange = 
(e:React.ChangeEvent<HTMLInputElement>) => {
const {name, value} = e.target;
setFormData((prev) => ({
...prev,
[name]: value,
}));
}

const handleAddressSearch = 
(e:React.MouseEvent<HTMLButtonElement>) =>{
//새로고침방지
e.preventDefault();
if(typeof window !== "undefined" && window.daum){
new window.daum.Postcode({
oncomplete:(data: any) => {
// 도로명 주소 또는 지번 주소 선택 시 address 상태 업데이트
const fullAddress = data.roadAddress || data.jibunAddress;
setFormData((prev) => ({
...prev,
address:fullAddress,
}));   
},    
}).open();    
}else{
//alert("주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."); 
setAlertMessage("주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
setIsRegisterSuccess(false);
setIsAlertOpen(true);
}
}
//백앤드 API 연동
const handleSubmit = 
async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //비밀번호 확인 검증
    if(formData.password !== formData.repeatPassword){
        //alert("비밀번호가 일치하지 않습니다");
        setAlertMessage("비밀번호가 일치하지 않습니다");
        setIsRegisterSuccess(false);
        setIsAlertOpen(true);
        return;
    }

    //node로 데이터 전송
    try{
const response =
await axios.post("http://localhost:4000/api/auth/register", formData);
if(response.data.success){
    /*alert("회원가입이 완료되었습니다!");
    router.push("/");*/
setAlertMessage("회원가입이 완료되었습니다!");
setIsRegisterSuccess(true);
setIsAlertOpen(true);
}    

}catch(error: any){
const errorMessage =
error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
//alert(errorMessage);
setAlertMessage(errorMessage);
setIsRegisterSuccess(false);
setIsAlertOpen(true);
}
};

//확인 누른후 추가
// 💡 모달이 닫힐 때 가입 성공 상태였다면 로그인 페이지로 이동시킵니다.
const handleModalClose = () => {
    setIsAlertOpen(false);
    if (isRegisterSuccess) {
        router.push("/");
    }
};

return(
    <S.Container>
{/* Next.js Script 컴포넌트를 사용한 비동기 로드 */}
<Script
src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
strategy="lazyOnload"
/>
<S.Card>
<S.ImageColumn/>
<S.FormColumn>
<S.Title>
    Create an Account!
</S.Title>
<S.Form onSubmit={handleSubmit}>
    
    <S.Row>
<S.Col>
    <S.Input
type="text" placeholder="이름" name="firstName" 
value={formData.firstName}
onChange={handleChange}   
    />
</S.Col> 

<S.Col>
<S.Input
type="text" placeholder="성" name="lastName" 
value={formData.lastName}
onChange={handleChange}   
    />
</S.Col>
    </S.Row>

<S.Input 
type="email"
placeholder="이메일" name="email"
value={formData.email}
onChange={handleChange}
/>

<S.Row>
<S.Col>
    <S.Input
type="password" placeholder="비밀번호" name="password" 
value={formData.password}
onChange={handleChange}   
    />
</S.Col> 

<S.Col>
<S.Input
type="password" placeholder="비밀번호 확인" 
name="repeatPassword" 
value={formData.repeatPassword}
onChange={handleChange}   
    />
</S.Col>
    </S.Row>

<S.RadioGroup>
    <span>성별 :</span>

    <S.RadioLabel>
<input type="radio"
name="gender" value="male"
checked={formData.gender === "male"}
onChange={handleChange}/> 남자       
    </S.RadioLabel>

        <S.RadioLabel>
<input type="radio"
name="gender" value="female"
checked={formData.gender === "female"}
onChange={handleChange}/> 여자      
    </S.RadioLabel>

        <S.RadioLabel>
<input type="radio"
name="gender" value="other"
checked={formData.gender === "other"}
onChange={handleChange}/>the other one       
    </S.RadioLabel>

</S.RadioGroup>

<S.Row>
<S.Col>
    <S.Input
type="text" placeholder="회사명" 
name="companyName" 
value={formData.companyName}
onChange={handleChange}   
    />
</S.Col> 

<S.Col>
<S.Input
type="text" placeholder="직급" 
name="position" 
value={formData.position}
onChange={handleChange}   
/>
</S.Col>

<S.Col>
<S.Input
type="text" placeholder="전화번호" 
name="tel" 
value={formData.tel}
onChange={handleChange}   
/>
</S.Col>
    </S.Row>

<S.AddressWrapper>
<S.Input
type="text"
placeholder="주소"
name="address"
value={formData.address}
readOnly
/>  
<S.Button
type="button"
onClick={handleAddressSearch}
$size="small"
$variant="primary"
>
주소검색</S.Button>  
</S.AddressWrapper>

<S.Input 
type="text"
placeholder="상세주소"
name="detailAddress"
value={formData.detailAddress}
onChange={handleChange}
/>
<S.Button type="submit" $variant="primary">
Register Account
</S.Button>

<S.Divider/>

<S.Button 
$variant="insta"
$fullWidth
onClick={handleInstargramLogin}>
Register with Instargram    
</S.Button>

<S.Button 
$variant="kakao"
$fullWidth
onClick={handleKakaoLogin}>
Register with Instargram    
</S.Button>
</S.Form>

<S.Divider/>

<S.StyledLink href="/forgot">
Forgot password?
</S.StyledLink>

<S.StyledLink href="/login">
Already have an account? Login!
</S.StyledLink>

</S.FormColumn>
</S.Card> 

{/* 💡 회원가입 성공/실패 시 렌더링될 커스텀 알림 모달 */}
<AlertModal 
isOpen={isAlertOpen}
message={alertMessage}
onClose={handleModalClose}
/>

    </S.Container>
)

}