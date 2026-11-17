"use client";
import { Layout } from "@/components/Layout";
import { SmallCalendar } from "@/components/SmallCalendar";
import {Calendar} from "@/components/Calendar"
import * as S from "@/assets/css/Style.style";

export default function MyPage(){
return(
    <>
    <Layout>
<S.CalendarLayout>
   

  
    
        <Calendar/>
   
</S.CalendarLayout>
    </Layout>
    </>
)
}