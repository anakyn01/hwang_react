import type { Metadata } from "next";
// 💡 기존에 만들어둔 스타일 파일을 불러옵니다 (경로/파일명이 다르다면 맞춰주세요)
import * as S from "@/assets/css/Style.style"; 

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function ForgotPassword() {
  return (
    <S.Container>
      <S.Card>
        
        {/* 좌측 이미지 영역 (로그인과 동일하게 사용하거나 다른 이미지를 넣을 수 있습니다) */}
        <S.ImageColumn />

        {/* 우측 패스워드 찾기 폼 영역 */}
        <S.FormColumn>
          <S.Title>Forgot Your Password?</S.Title>
          
          <S.Description>
            We get it, stuff happens. Just enter your email address below 
            and we'll send you a link to reset your password!
          </S.Description>
          
          <S.Form>
            <S.Input 
              type="email" 
              id="exampleInputEmail" 
              placeholder="Enter Email Address..." 
            />
            
            <S.Button type="submit">
              Reset Password
            </S.Button>
          </S.Form>
          
          <S.Divider />
          
          <S.StyledLink href="/member">
            Create an Account!
          </S.StyledLink>
          <S.StyledLink href="/"> {/* 메인(로그인) 경로가 "/" 라면 "/"로 수정하세요 */}
            Already have an account? Login!
          </S.StyledLink>
          
        </S.FormColumn>

      </S.Card>
    </S.Container>
  );
}