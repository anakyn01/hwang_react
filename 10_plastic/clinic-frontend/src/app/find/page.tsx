"use client";
import React,{useState} from 'react';
import { useRouter} from 'next/navigation';
import * as S from '@/assets/css/Style.style';

export default function ChangePwPage(){
    const router = useRouter();

    //add
    const [userId, setUserId] = useState(''); 

    /*패스 워드 변경에 필요한 4가지 상태 값
const [formData, setFormData] = useState({
userId:'', currentPw:'', newPw:'', 
confirmNewPw:''
});   */

//값을 입력 할때..
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
setUserId(e.target.value);  
}

//전송
const handleGotoPass= (e:React.FormEvent) => {
 //새로고침 방지
 e.preventDefault();
 //필수값 체크
 if(!userId) {
    return alert('아이디를 먼저 입력해 주세요');
 }  

 router.push(`/find/pass?userId=${userId}`);
//짝퉁 PASS페이지로 이동하면서 아이디를 몰래 달아보냄

 // 새 비밀번호 일치여부 체크
//  if(formData.newPw !== formData.confirmNewPw) {
//     return alert('새 비밀번호가 서로 일치하지 않습니다');
//  }

//  try {
// const response = await fetch('http://127.0.0.1:4000/api/change-password',{
// method:'POST',
// headers:{'Content-Type':'application/json'},
// body:JSON.stringify(formData)    
// });
// const result = await response.json();
// //성공과 실패로..
// if(response.ok) {
// alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해 주세요.');
// router.push('/admin'); //변경후 로그인 페이지로 보내기    
// } else {
// alert(result.message || '비밀번호 변경에 실패했습니다.');
// }
//  } catch (error) {
// console.error('비밀번호 변경 에러:', error);
// alert('서버와 통신중 오류가 발생 했습니다');
//  }
};

return(
    <S.PwWrapper>
        <S.PwCard>
            <S.PwHeader>
<S.PwTitle>비밀번호 변경</S.PwTitle> 
<S.PwDescription>
계정 보호를 위해 기존 비밀번호와<br />
새롭게 사용할 비밀번호를 입력해 주세요.
</S.PwDescription>               
            </S.PwHeader>

<S.PwForm onSubmit={handleGotoPass}>
<S.PwInput
type="text"
name="userId"
placeholder='아이디 (User ID)'
value={userId}
onChange={handleChange}
/>


<S.PwButton type="submit">
본인인증 진행하기
</S.PwButton>
</S.PwForm>   
<S.PwDivider/>
<S.PwLinkGroup>
<S.PwStyledLink 
onClick={() => router.push('/register/terms')}
>
아직 계정이 없으신가요? 회원가입
</S.PwStyledLink>

<S.PwStyledLink 
onClick={() => router.push('/admin')}
>
이미 계정이 있으신가요? 로그인
</S.PwStyledLink>
</S.PwLinkGroup>         
        </S.PwCard>
    </S.PwWrapper>
)

}