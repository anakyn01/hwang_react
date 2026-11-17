"use client";
import { Layout } from "@/components/Layout";
import { SmallCalendar } from "@/components/SmallCalendar";
import {Calender} from "@/components/Calender";
import * as S from "@/assets/css/Style.style";

export default function dash(){
return(
    <>
    <Layout>
<S.CalendarLayout>        
<h1></h1>

    <S.RightPanel>
        <Calender/>
    </S.RightPanel>
</S.CalendarLayout>
    </Layout>
    </>
)
}