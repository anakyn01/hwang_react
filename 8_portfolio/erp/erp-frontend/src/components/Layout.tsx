"use client";

import React from "react";
import {Top} from "./Top";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import * as S  from "@/assets/css/Layout.styles";

interface LayoutProps {
children: React.ReactNode;
}

export const Layout = ({children} : LayoutProps) => {
return(
    <>
    <S.PageWrapper>
        <S.TopArea>
            <Top/>
            <Header/>
        </S.TopArea>
        <S.MainContent>
            <S.LnbWrapper>
                <SideBar/>
            </S.LnbWrapper>
            <S.ContentArea>
                {children}
            </S.ContentArea>
        </S.MainContent>
        <Footer/>
    </S.PageWrapper>
    </>
)
}