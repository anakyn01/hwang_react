package com.hbk.security;

// 서블릿 요청/응답 처리를 위한 Jakarta Servlet API 임포트
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Lombok을 사용하여 final 필드에 대한 생성자를 자동으로 생성합니다.
import lombok.RequiredArgsConstructor;

// Spring Security 인증 토큰 객체 및 시큐리티 컨텍스트 관리 클래스 임포트
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

// 문자열 검증 유틸리티 및 웹 요청 필터 기본 클래스 임포트
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
//모든 HTTP 요청당 단 한 번만 실행되는 시큐리티 필터입니다
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;
    //JWT 토큰을 생성, 검증, 파싱하는 도구 클래스입니다.

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain)
throws ServletException, IOException{//실제 필터링 로직이 수행되는 메서드
        try{
/*
JSON Web Token :  상태가 없는 인증 토큰
HTTP 요청 헤더에서 "Authorization" 값을 가져옵니다.
(클라이언트가 보낸 토큰을 확인하기 위함)

Cross Site Request Forgery Token

Bearer : 이증표를 가지고 있는 사람을 주인으로 인증하겠다..
Bearer 인증은 OAuth 2.0 프레임워크에서 사용하는 토큰 인증 방식
*/
String bearerToken = request.getHeader("Authorization");
// 가져온 헤더 값이 비어있지 않고, "Bearer "로 시작하는지(JWT 표준 형식인지) 확인합니다.
if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
//// "Bearer " 문자열(앞 7글자)을 떼어내고 순수 JWT 토큰 문자열만 추출합니다.
    String token = bearerToken.substring(7);
    //추출한 토큰이 위변조되지 않았고 만료되지 않았는지 유효성을 검증
    if(tokenProvider.validateToken(token)){
        //유효한 토큰이라면, 토큰 내부에서 회원의 이름(Username 또는 Subject)을 꺼내옵니다.
        String username = tokenProvider.getUsernameFromToken(token);
        //스프링 시큐리티가 인증되었다고 인식할 수 있도록 인증 객체(Token)를 생성
        // (사용자 이름, 비밀번호(null), 권한 목록(빈 리스트)을 담아 생성합니다.)
        // *이 객체가 나중에 컨트롤러의 Principal 파라미터로 주입됩니다!
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
        //생성한 인증 객체를 현재 요청의 시큐리티 컨텍스트(SecurityContext)에 등록합니다.
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
        }catch (Exception ex){
logger.error("인증정보 설정이 안되어 있습니다", ex);
        }
    }
}
