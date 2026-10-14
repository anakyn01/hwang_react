package com.hbk.controller;

import com.hbk.dto.MemberResponseDto;
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

    // 4. 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginData){
        Optional<Member> memberOpt = memberRepository.findByEmail(loginData.getEmail());

        if(memberOpt.isPresent()){
            Member member = memberOpt.get();

            if(member.getPassword().equals(loginData.getPassword())){
                String token = jwtTokenProvider.createToken(member.getEmail());

                // 💡 객체 직렬화 에러를 완벽하게 피하기 위해 단순한 키-값 구조로 전달합니다.
                Map<String, String> responseData = new HashMap<>();
                responseData.put("token", token);

                // 닉네임이 비어있을 경우를 대비한 안전 장치
                String nickname = (member.getNickname() != null && !member.getNickname().isEmpty())
                        ? member.getNickname()
                        : "회원";
                responseData.put("nickname", nickname);

                return ResponseEntity.ok(responseData);
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