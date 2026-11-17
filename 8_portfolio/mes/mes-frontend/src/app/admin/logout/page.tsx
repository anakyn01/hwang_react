"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import { Layout } from "@/components/Layout";
import * as S from "@/assets/css/Style.style";

export default function LogoutPage(){
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/");
    }, [router]);

    return(
<Layout>
<p>로그아웃 중입니다...</p>
</Layout>
    )
}