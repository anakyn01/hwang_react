import React from 'react';
import {Navigate} from 'react-router-dom';
import { Temporal } from '@js-temporal/polyfill';

export const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
// 1. 브라우저 금고(localStorage)에서 로그인 정보(userName)를 꺼내봅니다.
const userName = localStorage.getItem('userName');
const expiryStr = localStorage.getItem('loginExpiry');

//2. 아예 로그인한 적이 없거나, 만료 시간이 없는 경우
if(!userName || !expiryStr){
    alert('관리자 로그인이 필요한 페이지 입니다');
    return <Navigate to="/login" replace/>;
}
try{
    // 3. 🚨 세션 시간 체크 (Temporal 사용)
    const now = Temporal.Now.instant();
    const expiryTime = Temporal.Instant.from(expiryStr);

    if(Temporal.Instant.compare(now, expiryTime) === 1){
        alert('세션이 만료되었습니다. 안전을 위해 다시 로그인해 주세요. ⏱️');

        localStorage.removeItem('userName');
        localStorage.removeItem('loginExpiry');

        return <Navigate to="/login" replace/>
    }
}catch(error){
localStorage.removeItem('userName');
localStorage.removeItem('loginExpiry');
return <Navigate to="/login" replace/>;
    }
    //유효기간이 안 지났다면 무사히 통과
return <>{children}</>
};

