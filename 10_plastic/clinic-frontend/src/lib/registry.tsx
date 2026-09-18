"use client";

import React,{useState} from "react";
// 💡 서버에서 수집된 스타일(<style> 태그)을 브라우저 HTML의 
//     <head> 영역에 꽂아 넣어주는 Next.js 전용 훅입니다.
import { useServerInsertedHTML } from "next/navigation";
// 💡 styled-components가 화면을 그리기 전에 스타일을 
// 긁어모을 수 있도록 해주는 핵심 도구들입니다.
import { ServerStyleSheet, StyleSheetManager } 
from "styled-components";

export default function StyledComponentsRegistry({children}:{children:React.ReactNode}){
    const [styledComponentsStyleSheet] = 
    useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = 
        styledComponentsStyleSheet.getStyleElement()
        //메모리 누수를 막고, 이후 렌더링 시 스타일이 중복으로 쌓이는 것을 방지하기 
        // 위해 스타일 바구니를 한 번 비워줍니다(초기화).
        styledComponentsStyleSheet.instance.clearTag()
        return <>{styles}</>
    })

    //브라우저 환경에서는 이미 서버에서 스타일을 다 받아온 상태이므로
    //스타일 수집 과정을 생략하고 하위 요소(children)를 그대로 렌더링합니다.
    if(typeof window !== 'undefined') return <>{children}</>

    return(
        <StyleSheetManager 
        sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    )

}