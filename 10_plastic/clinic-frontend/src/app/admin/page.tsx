"use client";
import React,{useState}from 'react';
import {useRouter} from 'next/navigation';
import * as S from '@/assets/css/Admin.style';

export default function LoginPage(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        userId:'', userPw:''
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;

setFormData(prev => ({
...prev,
[name]: value    
}));
    };

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();//폼 새로고침 방지
        //입력창 비움 방지
        if(!formData.userId || !formData.userPw) {
    return alert('아이디와 비밀번호를 모두 입력해 주세요') ;       
        }

        try {
const response = await fetch('http://127.0.0.1:4000/api/login',{
method:'POST', 
headers:{'Content-Type':'application/json'},
body:JSON.stringify(formData)    
});

const result = await response.json();

//분기
if(response.ok) {
    alert('로그인 성공');
    //관리자 라면
    if (result.isAdmin === 1) {
        router.push('/admin/total');
    }else{
        router.push('/');
    }
}else{
    alert(result.message || '로그인에 실패했습니다');
}
        }catch (error){
console.error('로그인 에러:', error);
alert('서버와 통신중 오류가 발생 했습니다');
        }
    };

    return(
<S.LoginWrapper>
            <S.LoginCard>
                <S.LoginHeader>
                    <S.LoginTitle>Welcome Back!</S.LoginTitle>
                </S.LoginHeader>

                <S.LoginForm onSubmit={handleLogin}>
                    <S.LoginInput 
                        type="text" 
                        name="userId"
                        placeholder="Enter User ID..." 
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    <S.LoginInput 
                        type="password" 
                        name="userPw"
                        placeholder="Password" 
                        value={formData.userPw}
                        onChange={handleChange}
                    />
                    
                    <S.CheckboxGroup>
                        <S.CheckboxInput type="checkbox" id="customCheck" />
                        <S.CheckboxLabel htmlFor="customCheck">
                            Remember Me
                        </S.CheckboxLabel>
                    </S.CheckboxGroup>

                    <S.LoginButton type="submit">
                        Login
                    </S.LoginButton>
                </S.LoginForm>

                <S.Divider />

                <S.LinkGroup>
                    <S.StyledLink>Forgot Password?</S.StyledLink>
                    <S.StyledLink onClick={() => router.push('/register/terms')}>
                        Create an Account!
                    </S.StyledLink>
                </S.LinkGroup>
            </S.LoginCard>
        </S.LoginWrapper>
    );
}