package com.example.demo.controller;

import com.example.demo.config.JwtProvider;
import com.example.demo.dto.*;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberRegisterDto requestDto) {
        try {
            memberService.register(requestDto);
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("회원가입 처리 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto requestDto) {
        try {
            String token = memberService.login(requestDto);
            return ResponseEntity.ok(new TokenResponseDto(token));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("로그인 처리 중 오류가 발생했습니다.");
        }
    }

    // 비밀번호 찾기 (임시 비밀번호 발송)
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            memberService.sendTempPassword(request.get("email"));
            return ResponseEntity.ok("임시 비밀번호가 이메일로 발송되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 비밀번호 변경 (마이페이지용)
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String token,
                                            @RequestBody PasswordChangeDto dto) {
        try {
            // "Bearer " 문자열 제거 후 토큰 파싱
            String actualToken = token.substring(7);
            // JwtProvider에 이메일 추출 메서드(getSubject)가 있다고 가정, 없을 경우 추가 필요
            String email = jwtProvider.getEmailFromToken(actualToken);

            memberService.changePassword(email, dto.getOldPassword(), dto.getNewPassword());
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //[추가] 마이페이지 프로필(전화번호, 주소 등) 수정 요청을 처리하는 엔드포인트입니다.
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token,
  @RequestBody MemberUpdateDto dto){
try{
    //요청 헤더(Header)의 "Authorization" 값에서 "Bearer " 문자열(앞 7글자)을 제거하고 순수 JWT 토큰만 추출합니다.
    String actualToken = token.substring(7);
    //순수 토큰으로부터 사용자의 이메일(아이디) 정보를 꺼내옵니다.
    String email = jwtProvider.getEmailFromToken(actualToken);
    memberService.updateProfile(email, dto);
    // 정상적으로 수정이 완료되면 성공 메시지(HTTP 200 OK)를 응답으로 돌려줍니다.
    return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다");
}catch(Exception e){
// 수정 과정에서 에러가 발생하면 에러 메시지와 함께 잘못된 요청(HTTP 400 Bad Request)을 응답합니다.
return ResponseEntity.badRequest().body(e.getMessage());
}
    }
    //[추가] 프론트엔드에서 전달받은 카카오 인가 코드로 로그인을 처리하는 엔드포인트입니다.
    @PostMapping("/kakao-login")
    public ResponseEntity<?> kakaoLogin(@RequestBody KakaoLoginDto dto){
        try {
// 프론트엔드에서 보낸 카카오 인가 코드(dto.getCode())를
// 서비스로 넘겨 카카오 로그인 및 자체 JWT 발급을 처리합니다.
String token = memberService.kakaoLogin(dto.getCode());
// 발급된 자체 JWT 토큰을 TokenResponseDto에 담아
// 성공 상태(HTTP 200 OK)로 프론트엔드에 응답합니다.
return ResponseEntity.ok(new TokenResponseDto(token));
        } catch (Exception e){
return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}