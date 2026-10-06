"use client";
import React,{useState} from "react";
import axios from 'axios';
import {X} from 'lucide-react';
import * as S from '@/css/style.styles';

interface ModalProps{
isOpen:boolean;
onClose:() => void;
titleText:string;
submitText:string;
onSuccess:() => void;

}

export const ModalSingle = (
{isOpen, onClose, titleText, submitText,  onSuccess}
: ModalProps  
) => {

    const [formData, setFormData] = useState({

title:'',
content:'',
breed:'',
gender:'수컷',
age:'',
weight:'',
color:'',
rescueLocation:'',
});

const [seletedFile, setSelectedFile] = useState<File | null>(null);

    if (!isOpen) return null;


 //입력값 변경 핸들러
 const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 const {name, value} =e.target;
 setFormData(prev => ({...prev, [name]: value}));  
 };   

  // 파일 선택 핸들러
const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
if(e.target.files && e.target.files[0]){
    setSelectedFile(e.target.files[0])
}
}

//글 등록 API 전송 핸들러
const handleSubmit = async (e:React.FormEvent) => {
  e.preventDefault();
  try{
//💡 파일과 데이터를 함께 보내기 위해 FormData 객체 사용 (multipart/form-data)
const data = new FormData();
data.append('dto', new Blob([JSON.stringify(formData)], 
{ type:'application/json'}));

if(seletedFile){
    data.append('file', seletedFile); //파일이 있다면 추가
}


await axios.post('http://localhost:8080/api/missing-posts', formData, {
 headers:{'Content-Type':'application/json',}, 
 withCredentials:true
});
alert('실종 신고가 등록 되었습니다');
onSuccess();
onClose();
  }catch(error: any){
console.error('등록 실패:', error);
if(error.response && error.response.status === 401 || error.response.status === 403){
alert('로그인이 만료 되었거나 권한이 없습니다. 다시 로그인 해주세요.');
}else{
alert('글 등록에 실패했습니다')    
}
  }
};
    return(
<S.ModalOverlay>
    <S.ModalContent>
<S.HeaderRow>
<h2>{titleText}</h2>
<S.CloseButton
onClick={onClose}
>
<X size={20}/>    
</S.CloseButton>
</S.HeaderRow>

<S.Form
onSubmit={handleSubmit}
>
<S.Input
type="text"
name="title"
placeholder="제목을 입력하세요"
value={formData.title}
onChange={handleChange}
required
/>  

<S.Input
type="text"
name="breed"
placeholder="품종"
value={formData.breed}
onChange={handleChange}
required
/> 

<S.Select
name="gender"
value={formData.gender}
onChange={handleChange}
>
<option value="수컷">수컷</option>
<option value="암컷">암컷</option> 
<option value="미상">미상</option>    
</S.Select>

<S.Input
type="text"
name="age"
placeholder="나이를 입력하세요"
value={formData.age}
onChange={handleChange}
required
/> 

<S.Input
type="text"
name="weight"
placeholder="몸무게를 입력하세요"
value={formData.weight}
onChange={handleChange}
required
/> 

<S.Input
type="text"
name="color"
placeholder="털색을 입력하세요"
value={formData.color}
onChange={handleChange}
required
/> 

<S.Input
type="text"
name="rescueLocation"
placeholder="실종/목격 장소를 입력하세요"
value={formData.rescueLocation}
onChange={handleChange}
required
/> 

<S.FileInputWrapper>
<label>사진/동영상 첨부</label>
<input type="file"
accept="image/*,video/*"
onChange={handleFileChange}
/>   
</S.FileInputWrapper>

<S.TextArea
name="content"
placeholder="상세 내용 및 특징을 입력하세요"
value={formData.content}
onChange={handleChange}
rows={4}
required
></S.TextArea>

<S.SubmitButton
type="submit"
>
{submitText}    
</S.SubmitButton>
</S.Form>
    </S.ModalContent>
</S.ModalOverlay>        
    )
}