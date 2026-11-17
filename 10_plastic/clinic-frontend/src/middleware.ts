import { NextResponse} from 'next/server';
import type { NextRequest } from 'next/server';

//이 함수는 사용자가 페이지를 이동할 때마다 서버에서 먼저 실행됩니다.
export function middleware(request: NextRequest) {

const { pathname } = request.nextUrl;

const token = 
request.cookies.get('admin_token')?.value;

//1. 사용자가 접속하려는 주소가 '/admin' 으로 시작하는지 확인
if(pathname === '/admin' || pathname === '/admin/login'){
//토큰 있다면 (로그인 된 상태) 대시 보드로 튕김
    if(token){
return NextResponse.redirect(new URL('/admin/root', request.url));     
    }
    return NextResponse.next();
}

//'/admin/' 뒤에 하위 주소가 붙은 진짜 관리자 페이지들만 깐깐하게 검사
if(pathname.startsWith('/admin/')) {
    if(!token){
return NextResponse.redirect(new URL('/admin', request.url));        
    }
}


//토큰이 있거나 관리자 페이지가 아니라면 그대로 통과
return NextResponse.next();
}

//🎯 성능 최적화: 미들웨어가 /admin 경로에서만 작동하도록 범위를 지정합니다.
export const config = {
matcher:['/admin/:path*'],    
};