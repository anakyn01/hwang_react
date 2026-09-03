import type{Metadata} from "next";

import * as S from "@/assets/css/Style.style";

export const metadata: Metadata = {
    title:"비밀번호 찾기",
};

export default function ForgotPassword(){
    return(
        <>
<S.Container>
<S.Card>
<S.ImageColumn/>
<S.FormColumn>
<S.Title>Forgot Your Passwod?</S.Title>
<S.Description>
We get it, stuff happens. Just enter your email address below 
and we'll send you a link to reset your password!    
</S.Description>
<S.Form>
<S.Input
type="email"
id=""
placeholder="Enter Email Address..."
/> 
<S.Button type="submit">
Reset Password
</S.Button>   
</S.Form>

<S.Divider/>

<S.StyledLink href="/member">
Create an Account!
</S.StyledLink>

<S.StyledLink href="/">
Already hava an account? Login!
</S.StyledLink>
</S.FormColumn>    
</S.Card>
</S.Container>        
        </>
    )
}