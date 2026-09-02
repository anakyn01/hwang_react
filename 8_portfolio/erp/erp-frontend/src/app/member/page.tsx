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
checked={formData.gender === "mala"}
onChange={handleChange}/>        
    </S.RadioLabel>
</S.RadioGroup>

</S.Form>
</S.Card>        
    </S.Container>
)

}