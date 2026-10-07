package com.hbk.security;

//JWT 파싱 및 클레임(Claims) 조작을 위한 JJWT 라이브러리 임포트
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
// HMAC-SHA 알고리즘에 맞는 비밀키(Key) 객체를 생성하기 위한 클래스 임포트
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
/*
Hash-based Message Authentication Code
 비밀 키를 해시 함수에 함께 사용하여 데이터가 위조되지 않았음을 증명하는 코드
Secure Hash Algorithm
데이터를 고정된 길이의 무작위 문자열(해시 값)로 바꾸어 주는 암호화 함수

그래서 뒤에 붙는 숫자에 따라
HMAC-SHA-256, HMAC-SHA-512

동작 원리
1. 송신자: 보낼 메시지와 자신만 알고 있는 비밀 키를 HMAC 알고리즘에
넣어 특수한 인증 코드(서명)를 만듭니다.
2. 전송: 원래 메시지와 함께 이 인증 코드를 수신자에게 보냅니다.
3. 수신자: 받은 메시지와 공유된 비밀 키로 다시 해시값을 계산해 봅니다.
내가 계산한 값과 상대방이 보낸 코드가 일치하면,
중간에 데이터가 변조되지 않았고 보낸 사람이 정상적인 상대방임을 알 수 있습니다.
* */
import jakarta.annotation.PostConstruct;
// application.properties 등의 설정값을 주입받기 위한 어노테이션 임포트
import org.springframework.beans.factory.annotation.Value;
// 스프링 컨테이너가 관리하는 컴포넌트 빈으로 등록하기 위한 어노테이션 임포트
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
//이 클래스를 스프링 빈(Bean)으로 등록하여 다른 곳에서 주입받아 사용할 수 있게 합니다.
public class JwtTokenProvider {
//application.properties(또는 기본값)에 설정된 JWT 비밀키 문자열을 가져옵니다.
    @Value("${jwt.secret:defaultSecretKeyForMissingPetReportProject1234567890defaultSecretKey}")
    private String secretKey;

    //JWT 서명 및 검증에 실제로 사용될 암호화 키(Key) 객체입니다.
    private Key key;

    @PostConstruct//스프링 빈이 생성된 후 의존성 주입이 끝나면 자동으로 실행되는 초기화 메서드입니다.
    protected void init(){
        //설정된 비밀키 문자열을 UTF-8 바이트 배열로 변환합니다.
        byte[] bytes = secretKey.getBytes(StandardCharsets.UTF_8);
        // 변환된 바이트를 바탕으로 안전한 HMAC-SHA 암호화 키 객체를 생성하여 저장합니다.
        this.key = Keys.hmacShaKeyFor(bytes);
    }


    public String createToken(String email) {
        Date now = new Date();
        long validityInMilliseconds = 3600000; // 1시간 (1시간 동안 토큰 유효)
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(email) // 토큰 주체(Subject)로 이메일 저장
                .setIssuedAt(now) // 토큰 발행 시간
                .setExpiration(validity) // 토큰 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) // 비밀키와 알고리즘으로 서명
                .compact();
    }


    //토큰에서 회원 이름(Username/Subject) 추출
    public String getUsernameFromToken(String token){
//1. 전달받은 JWT 토큰을 앞에서 생성한 비밀키(key)로 파싱(해독)합니다.
Claims claims = Jwts.parserBuilder()
.setSigningKey(key).build().parseClaimsJws(token).getBody();
//토큰의 본문(Body)에서 주체(Subject)로 저장해 둔 회원 이름(또는 식별자)을 꺼내 반환
return claims.getSubject();
    }

    //토큰 유효성 검증
    public boolean validateToken(String token){
        try{
Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//예외가 발생하지 않고 정상적으로 파싱되면 유효한 토큰이므로 true를 반환합니다.
return true;
        }catch(Exception e){
return false;
        }
    }
}
