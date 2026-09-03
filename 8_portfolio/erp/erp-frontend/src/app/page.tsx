import type { Metadata } from "next";
import * as S from "@/assets/css/Style.style";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Home() {
  return (
    <S.Container>
      <S.Card>
        
        {/* 좌측 이미지 영역 */}
        <S.ImageColumn />

        {/* 우측 로그인 폼 영역 */}
        <S.FormColumn>
          <S.Title>Welcome Back!</S.Title>
          
          <S.Form>
            <S.Input 
              type="email" 
              id="exampleInputEmail" 
              placeholder="Enter Email Address..." 
            />
            
            <S.Input 
              type="password" 
              id="exampleInputPassword" 
              placeholder="Password" 
            />
            
            <S.CheckboxWrapper>
              <input type="checkbox" id="customCheck" />
              <S.CheckboxLabel htmlFor="customCheck">
                Remember Me
              </S.CheckboxLabel>
            </S.CheckboxWrapper>
            
            <S.Button type="submit">
              Login
            </S.Button>

            <S.Divider />
            
            <S.SocialButton type="button" $provider="google">
              <i className="fab fa-google fa-fw"></i> Login with Google
            </S.SocialButton>
            
            <S.SocialButton type="button" $provider="insta">
              <i className="fab fa-facebook-f fa-fw"></i> Login with Insta
            </S.SocialButton>
          </S.Form>
          
          <S.Divider />
          
          {/* Next.js <Link> 컴포넌트로 변경 */}
          <S.StyledLink href="/forgot">
            패스워드가 기억나지 않나요?
          </S.StyledLink>
          <S.StyledLink href="/member">
            회원가입하기
          </S.StyledLink>
          
        </S.FormColumn>
      </S.Card>
    </S.Container>
  );
}