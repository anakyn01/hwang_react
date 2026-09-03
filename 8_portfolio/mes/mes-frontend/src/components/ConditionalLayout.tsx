/*
현재 URL(pathname)을 읽어와서 숨겨야 할 페이지 목록에 포함되어 있는지 확인한 뒤, 
헤더와 푸터를 껐다 켰다 해주는 똑똑한 컴포넌트를 만듭니다.
*/
"use client";
import {usePathname} from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import * as S from "@/assets/css/LayoutWrapper.style";

export default function ConditionalLayout(
    {children}:{children:React.ReactNode}){
// 현재 URL 경로를 가져옵니다 (예: "/login")
const pathname = usePathname();
// 💡 헤더와 푸터를 숨기고 싶은 URL 경로들을 배열에 적어줍니다.
const hiddenPaths =["/", "/member", "/find-id", "/forgot"];

const isHidden = hiddenPaths.includes(pathname);

return(
    <S.PageWrapper>
        {/*isHidden이 false일때만 Header를 보여줍니다 */}
        {!isHidden && <Header/>}
        
        <S.MainContent>
            {children}
        </S.MainContent>

        {!isHidden && <Footer/>}
    </S.PageWrapper>
);

}