"use client";

import {useState} from "react";
import axios from "axios";
import { useRouter} from "next/navigation";
import Script from "next/script";
import * as S from "@/assets/css/Member.style";

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

const handleChange = 
(e:React.ChangeEvent<HTMLInputElement>) => {

}

const handleAddressSearch = 
(e:React.MouseEvent<HTMLButtonElement>) =>{

}

const handleSubmit = 
async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}
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
<S.SearchButton
type="button"
onClick={handleAddressSearch}
>
주소검색</S.SearchButton>  
</S.AddressWrapper>

<S.Input 
type="text"
placeholder="상세주소"
name="detailAddress"
value={formData.detailAddress}
onChange={handleChange}
/>
<S.Button type="submit">
Register Account
</S.Button>

<S.Divider/>

<S.SocialButton 
$provider="insta"
onClick={handleInstargramLogin}>
Register with Instargram    
</S.SocialButton>

<S.SocialButton 
$provider="kakao"
onClick={handleKakaoLogin}>
Register with Instargram    
</S.SocialButton>
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
    </S.Container>
)

}