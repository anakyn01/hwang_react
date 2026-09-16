"use client";
import React,{useState} from 'react';
import { useRouter} from 'next/navigation';
import * as S from '@/assets/css/Style.style';

export default function ChangePwPage(){
    const router = useRouter();

    //패스 워드 변경에 필요한 4가지 상태 값
const [formData, setFormData] = useState({
userId:'', currentPw:'', newPw:'', 
confirmNewPw:''
});   

//값을 입력 할때..
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
const {name, value} = e.target;
    setFormData(prev => ({
        ...prev,
        [name]:value
    }));    
}

//전송
const handleSubmit = async (e:React.FormEvent) => {
 //새로고침 방지
 e.preventDefault();
 //필수값 체크
 if(!formData.userId || !formData.currentPw || 
    !formData.newPw || !formData.confirmNewPw) {
    return alert('모든 항목을 입력해 주세요');
 }  

 // 새 비밀번호 일치여부 체크
 if(formData.newPw !== formData.confirmNewPw) {
    return alert('새 비밀번호가 서로 일치하지 않습니다');
 }

 try {
const response = await fetch('http://127.0.0.1:4000/api/change-password',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(formData)    
});
const result = await response.json();
//성공과 실패로..
if(response.ok) {
alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해 주세요.');
router.push('/admin'); //변경후 로그인 페이지로 보내기    
} else {
alert(result.message || '비밀번호 변경에 실패했습니다.');
}
 } catch (error) {
console.error('비밀번호 변경 에러:', error);
alert('서버와 통신중 오류가 발생 했습니다');
 }
};

return(
    <S.Wrapper>
        <S.Card>
            <S.Header>
<S.Title>비밀번호 변경</S.Title> 
<S.Description>
계정 보호를 위해 기존 비밀번호와<br />
새롭게 사용할 비밀번호를 입력해 주세요.
</S.Description>               
            </S.Header>

<S.Form onSubmit={handleSubmit}>
<S.PwInput
type="text"
name="userId"
placeholder='아이디 (User ID)'
value={formData.userId}
onChange={handleChange}
/>
<S.PwInput
type="password"
name="newPw"
placeholder='새 비밀번호 (New Password)'
value={formData.newPw}
onChange={handleChange}
/>
<S.PwInput
type="password"
name="confirmNewPw"
placeholder='새 비밀번호 (Conform New Password)'
value={formData.confirmNewPw}
onChange={handleChange}
/>

<S.PwButton type="submit">
비밀번호 변경하기
</S.PwButton>
</S.Form>   
<S.Divider/>
<S.LinkGroup>
<S.StyledLink 
onClick={() => router.push('/register/terms')}
>
아직 계정이 없으신가요? 회원가입
</S.StyledLink>

<S.StyledLink 
onClick={() => router.push('/admin')}
>
이미 계정이 있으신가요? 로그인
</S.StyledLink>
</S.LinkGroup>         
        </S.Card>
    </S.Wrapper>
)

}