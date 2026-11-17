package com.hbk.controller;

import com.hbk.entity.Member;
import com.hbk.repository.MemberRepository;
import com.hbk.security.JwtTokenProvider; // 👈 1. JWT 토큰 Provider 임포트 추가
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor // 👈 2. 생성자 주입을 위해 롬복 어노테이션 추가
public class MemberController {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider; // 👈 3. 토큰 생성 주입

    // 1. 중복 체크 API (이메일)
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email){
        return ResponseEntity.ok(memberRepository.existsByEmail(email));
    }

    // 2. 중복 체크 API (닉네임)
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname){
        return ResponseEntity.ok(memberRepository.existsByNickname(nickname));
    }

    // 3. 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody Member member){
        if(member.getProvider() == null || member.getProvider().isEmpty()){
            member.setProvider("LOCAL");
        }
        Member savedMember = memberRepository.save(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    // 4. 로그인 API (JWT 토큰 발급 구조로 수정)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginData){
        Optional<Member> memberOpt = memberRepository.findByEmail(loginData.getEmail());

        if(memberOpt.isPresent()){
            Member member = memberOpt.get();

            if(member.getPassword().equals(loginData.getPassword())){
                // 💡 5. 로그인이 성공하면 이메일(또는 유저네임)을 기반으로 JWT 토큰을 생성합니다.
                String token = jwtTokenProvider.createToken(member.getEmail());

                // 💡 6. 프론트엔드에서 토큰과 유저 정보를 함께 쓸 수 있도록 Map에 담아 반환합니다.
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("member", member);

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 또는 비밀번호가 일치하지 않습니다");
    }

    // 5. 프로필 이미지 업로드 API
    @PostMapping("/upload-profile")
    public ResponseEntity<String> uploadProfile(@RequestParam("file") MultipartFile file){
        try{
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            Path path = Paths.get(uploadDir + filename);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String imageUrl = "http://localhost:8080/uploads/" + filename;
            return ResponseEntity.ok(imageUrl);

        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패");
        }
    }
}