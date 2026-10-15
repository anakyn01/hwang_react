"use client";
import React,{useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import * as S from '@/assets/css/Style.style';

export default function ResetPwPage(){

    const router = useRouter();
    const searchParams = useSearchParams();

    //
    const userId =
    searchParams.get('userId');

    const [pwData, setPwData] =
    useState({ newPw:'', confirmNewPw:''});

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
const {name, value} = e.target;
setPwData(prev => ({...prev, [name]:value})); 
}

const handleResetPassword = async(e:React.FormEvent) => {
e.preventDefault();

if (!userId) return alert('잘못된 접근입니다. 이메일 링크를 다시 확인해 주세요.');
if (!pwData.newPw || !pwData.confirmNewPw) return alert('비밀번호를 모두 입력해 주세요.');
if (pwData.newPw !== pwData.confirmNewPw) return alert('비밀번호가 서로 일치하지 않습니다.');

try{
const response = await fetch('http://127.0.0.1:4000/api/reset-password',{
method:'POST', headers:{'Content-type':'application/json'},
body:JSON.stringify({userId:userId, newPw:pwData.newPw})    
})
const result = await response.json();

if(response.ok) {
alert('비밀번호가 성공적으로 변경되었습니다! 새 비밀번호로 로그인해 주세요.');
router.push('/admin');
}else{
alert(result.message || '비밀번호 변경에 실패했습니다.');
}
}catch(error){
console.error('재설정 에러:', error);
alert('서버 오류가 발생했습니다.');
}

}

    return(
<S.PwWrapper>
            <S.PwCard>
                <S.PwHeader>
                    <S.PwTitle>새 비밀번호 설정</S.PwTitle> 
                    <S.PwDescription>
                        앞으로 사용할 새로운 비밀번호를 입력해 주세요.
                    </S.PwDescription>               
                </S.PwHeader>

                <S.PwForm onSubmit={handleResetPassword}>
                    <S.PwInput
                        type="password"
                        name="newPw"
                        placeholder='새 비밀번호'
                        value={pwData.newPw}
                        onChange={handleChange}
                    />
                    <S.PwInput
                        type="password"
                        name="confirmNewPw"
                        placeholder='새 비밀번호 확인'
                        value={pwData.confirmNewPw}
                        onChange={handleChange}
                    />

                    <S.PwButton type="submit">
                        비밀번호 변경 완료
                    </S.PwButton>
                </S.PwForm>   
            </S.PwCard>
        </S.PwWrapper>
    )
}