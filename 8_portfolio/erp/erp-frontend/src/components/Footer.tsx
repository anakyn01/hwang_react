"use client";
import * as S from "../assets/css/HeaderFooter.style";

export const Footer = () => {
    return(
        <>
<S.FooterContainer>
<p>&copy; {new Date().getFullYear()} ERP System. All Rights Reserved.</p>
</S.FooterContainer>        
        </>
    )
}