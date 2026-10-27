"use client";
import React from "react";
import * as S from '@/assets/css/Style.style';

//공용으로 사용하기에..
interface PopupProps {
isOpen:boolean; //열림  닫힘
title:string; //상단 제목
onClose:() => void; // 닫기 함수
onConfirm?:() => void;//확인 함수(옵션)
children:React.ReactNode;  //팝업 안에 들어갈 내용..  
}

export const Popup = ({ isOpen, title, onClose, onConfirm, children}: PopupProps) => {

//열림 상태가 아니면 렌더링을 하지 않음
    if(!isOpen) return null;

    return(
        <>
<S.PopupOverlay onClick={onClose}>
<S.PopupBox
$top="0" 
                    $left="0"
onClick={(e:React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
    <S.PopupHeader>
<S.PopupTitle>
{title}
</S.PopupTitle> 
<S.CloseIcon
onClick={onClose}
>
    &times;
    </S.CloseIcon>       
    </S.PopupHeader>

<S.PopupBody>
{children}    
</S.PopupBody>

<S.PopupFooter>
<S.CancelButton
onClick={onClose}
>
취소
</S.CancelButton>
{onConfirm && (
<S.ConfirmButton
onClick={onConfirm}
>
확인
</S.ConfirmButton>    
)}    
</S.PopupFooter>

</S.PopupBox>
</S.PopupOverlay>        
        </>
    )
}
