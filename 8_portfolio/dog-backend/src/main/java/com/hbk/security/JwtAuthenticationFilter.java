package com.hbk.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain)
            throws ServletException, IOException{
        try{
            String bearerToken = request.getHeader("Authorization");

            // "Bearer " 뒤에 띄어쓰기가 있어야 정확히 파싱됩니다.
            if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
                String token = bearerToken.substring(7);

                if(tokenProvider.validateToken(token)){
                    String username = tokenProvider.getUsernameFromToken(token);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }catch (Exception ex){
            logger.error("인증정보 설정이 안되어 있습니다", ex);
        }

        // 💡 [가장 중요한 핵심 추가!!!] 검사가 끝났으니 다음 단계(컨트롤러)로 무조건 넘겨줍니다!
        filterchain.doFilter(request, response);
    }
}