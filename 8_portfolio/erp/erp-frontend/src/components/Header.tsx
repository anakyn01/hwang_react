"use client";
import * as S from "../assets/css/HeaderFooter.style";

export const Header = () => {
    return(
        <>
      <S.HeaderContainer>
        <S.Nav>
            <S.StyledLink href="/">
            home
            </S.StyledLink>
        </S.Nav>
      </S.HeaderContainer>
        </>
    )
}