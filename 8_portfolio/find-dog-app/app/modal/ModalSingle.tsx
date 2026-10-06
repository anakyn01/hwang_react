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
formData:{
title:string;
content:string;
breed:string;
gender:string;
age:string;
weight:string;
color:string;
rescueLocation:string;
mediaUrls:string[];    
};
onChange:(e:React.ChangeEvent<HTMLInputElement | 
    HTMLTextAreaElement | 
    HTMLSelectElement>) => void;
onSubmit:(e: React.FormEvent) => void;    
}

export const ModalSingle = (
{isOpen, onClose, titleText, submitText, formData, onChange, onSubmit }
: ModalProps  
) => {

    if (!isOpen) return null;

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
onSubmit={onSubmit}
>
<S.Input
type="text"
name="title"
placeholder="제목을 입력하세요"
value={formData.title}
onChange={onChange}
required
/>  

<S.Input
type="text"
name="breed"
placeholder="품종"
value={formData.breed}
onChange={onChange}
required
/> 

<S.Select
name="gender"
value={formData.gender}
onChange={onChange}
>
<option value="수컷">수컷</option>
<option value="암컷">암컷</option> 
<option value="미상">미상</option>    
</S.Select>

<S.Input
type="text"
name="age"
placeholder="나이을 입력하세요"
value={formData.age}
onChange={onChange}
required
/> 

<S.Input
type="text"
name="weight"
placeholder="몸무게를 입력하세요"
value={formData.weight}
onChange={onChange}
required
/> 

<S.Input
type="text"
name="color"
placeholder="털색을 입력하세요"
value={formData.color}
onChange={onChange}
required
/> 

<S.Input
type="text"
name="rescueLocation"
placeholder="실종/목격 장소를 입력하세요"
value={formData.rescueLocation}
onChange={onChange}
required
/> 

<S.TextArea
name="content"
placeholder="상세 내용 및 특징을 입력하세요"
value={formData.content}
onChange={onChange}
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