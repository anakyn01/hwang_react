"use client";
import React ,{useState}from 'react';
import axios from 'axios';
import * as S from '@/assets/css/Style.style';

export default function QuickConsultBar(){
 //1 입력값 상태관리
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
const [department, setDepartment] = useState('');
 const [isAgreed, setIsAgreed] = useState(false);

const handleSubmit = async () => {
    //유효성 검사 빈칸방지
    if(!name.trim()) return alert('이름을 입력해 주세요');
    if(!phone.trim()) return alert('연락처를 입력해 주세요');
    if(!department) return alert('상담분야를 입력해 주세요');
    if(!isAgreed) return alert('개인정보처리방침에 동의해 주세요');

    try{
const response = await axios.post('http://localhost:4000/api/consult/quick',{
    name, phone, department
});
if(response.data.success) {
    alert('상담 신청이 성공적으로 완료되었습니다. 곧 연락 드리겠습니다');
    setName('');
    setPhone('');
    setDepartment('');
    setIsAgreed(false);
}
    }catch(error){
console.error('상담 신청 실패:', error);
alert('상담 신청 중 문제가 발생했습니다. 다시 시도해 주세요');
    }
} 
    return(
<>
<S.BarWrapper>
    <S.BarInner>
        <S.Title>빠른 상담신청</S.Title>
        <S.Input type="text" 
        placeholder='이름을 작성해주세요'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <S.Input type="tel" 
        placeholder='연락처를 작성해주세요'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />


        <S.Select 
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        >
<option value=" " disabled hidden>상담분야를 선택해 주세요</option>
<option value="눈 성형">눈 성형</option>
<option value="코 성형">코 성형</option>
<option value="동안 성형">동안 성형</option>
<option value="쁘띠 시술">쁘띠 시술</option>
         </S.Select>

         <S.CheckboxGroup>
            <S.CheckboxLabel>
                <S.Checkbox 
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <S.AgreeText>개인정보처리방침 동의</S.AgreeText>
            </S.CheckboxLabel>
            <S.DetailLink>자세히</S.DetailLink>
         </S.CheckboxGroup>

         <S.SubmitBtn onClick={handleSubmit}>빠른 상담신청하기</S.SubmitBtn>
    </S.BarInner>
</S.BarWrapper>
</>        
    )
}