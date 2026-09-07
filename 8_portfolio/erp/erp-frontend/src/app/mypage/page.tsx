"use client";
import { Layout } from "@/components/Layout";
import { SmallCalendar } from "@/components/SmallCalendar";
import Calender from "@/components/Calender"
import * as S from "@/assets/css/Style.style";

export default function MyPage(){
return(
    <>
    <Layout>
<S.CalendarLayout>
    <S.LeftPanel>
        <SmallCalendar/>
    </S.LeftPanel>
    <S.RightPanel>
        <Calender/>
    </S.RightPanel>
</S.CalendarLayout>
    </Layout>
    </>
)
}