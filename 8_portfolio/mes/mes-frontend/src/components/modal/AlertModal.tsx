"use client";

import { useState, useEffect} from "react";
import * as S from "@/assets/css/Style.style";

interface AlertModalProps{
isOpen: boolean;
message: string;
onClose: () => void;    
}

export const AlertModal = ({isOpen, message, onClose}:AlertModalProps) => {
    // 💡 현재 모달이 '닫히는 중'인지 확인하는 상태
    const [isClosing, setIsClosing] = useState(false);

    //모달이 다시 열릴 때마다 닫히는 상태(isClosing)를 초기화해줌
    useEffect(() => {
        if(isOpen){setIsClosing(false);}
    },[isOpen]);

    //💡 확인 버튼을 눌렀을 때 실행될 함수
    const handleClose = () => {
        setIsClosing(true); // 1. 애니메이션을 fadeOut으로 변경!
        //2. 0.3초(애니메이션 재생 시간) 기다렸다가 진짜로 모달 닫기
        setTimeout(() => {
            onClose();
        },300);
    };

    //css display none 역활
    if (!isOpen) return null;

    return(
<S.ModalOverlay>
    <S.ModalBox>
<S.ModalText>{message}</S.ModalText>
<S.Button
$variant="white"
$size="medium"
onClick={handleClose}
$fullWidth
>확인</S.Button>        
    </S.ModalBox>
</S.ModalOverlay>
    );
}