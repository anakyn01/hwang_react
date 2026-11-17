"use client";

import React from "react";
import * as S from "@/assets/css/Style.style";

interface ModalLayoutProps {
isOpen : boolean;
onClose : () => void;
title:string;
children:React.ReactNode;   
}

export default function ModalLayout({isOpen, onClose, title, children} : ModalLayoutProps){

    if(!isOpen) return null;

    return(
        <S.ModalOverlay onClick={onClose}>
<S.ModalContainer onClick={(e) => e.stopPropagation()}>
<S.ModalHeader>
<S.ModalTitle>{title}</S.ModalTitle>  
<S.CloseButton onClick={onClose}>
+
</S.CloseButton>  
</S.ModalHeader>
<S.ModalBody>
{children}
</S.ModalBody>
</S.ModalContainer>            
        </S.ModalOverlay>
    )
}