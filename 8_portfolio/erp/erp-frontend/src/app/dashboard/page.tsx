"use client";
import { Layout } from "@/components/Layout";
import { SmallCalendar } from "@/components/SmallCalendar";
import {Calender} from "@/components/Calender";
import * as S from "@/assets/css/Style.style";

<<<<<<< HEAD
export default function dash(){
return(
    <>
    <Layout>
<h1></h1>
=======
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
>>>>>>> 22c3fff17fb57f93f7f021f3b1250f6d651ac4d9
    </Layout>
    </>
)
}