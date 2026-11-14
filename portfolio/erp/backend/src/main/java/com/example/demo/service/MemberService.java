package com.example.demo.service;

import com.example.demo.dto.MemberLoginDto;
import com.example.demo.dto.MemberRegisterDto;
import com.example.demo.dto.MemberUpdateDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.config.JwtProvider;
import org.springframework.web.client.RestTemplate; // 카카오 API 호출용
import org.springframework.http.*; // HTTP 요청 설정용
import org.springframework.util.LinkedMultiValueMap; // 파라미터 전달용
import org.springframework.util.MultiValueMap; // 파라미터 전달용
import com.fasterxml.jackson.databind.JsonNode; // JSON 파싱용
import com.fasterxml.jackson.databind.ObjectMapper; // JSON 파싱용

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;//회원 데이터 베이스 조작
    private final PasswordEncoder passwordEncoder;//비밀번호를 안전하게 암호, 비교하는 인코더
    private final JwtProvider jwtProvider;//JWT토큰 생성 / 검증
    private final JavaMailSender mailSender;// 임시 비밀번로를 전송하기 위한 메일 sender

    // 💡 설정 파일에서 구글/카카오 클라이언트 정보 주입
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;


    //회원가입 로직 처리
    @Transactional
    public void register(MemberRegisterDto dto) {
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        // 비밀번호 암호화 후 엔티티 생성
        Member member = Member.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword())) // 암호화
                .companyName(dto.getCompanyName())
                .position(dto.getPosition())
                .tel(dto.getTel())
                .address(dto.getAddress())
                .detailAddress(dto.getDetailAddress())
                .gender(dto.getGender())
                .build();

        memberRepository.save(member);
    }

    //일반 로그인  로직 (성공시 JWT 토큰 리턴)
    public String login(MemberLoginDto dto) {
        //이메일을 기준으로 없으면 예외 발생
        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));
        //패스워드가 같은지 비교
        if (!passwordEncoder.matches(dto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        // 비밀번호가 일치하면 JWT 토큰 생성 및 반환
        return jwtProvider.generateToken(member.getEmail());
    }

    // 임시 비밀번호 발급 및 메일 전송 로직
    @Transactional
    public void sendTempPassword(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        // 8자리 랜덤 임시 비밀번호 생성
        String tempPassword = java.util.UUID.randomUUID().toString().substring(0, 8);

        // DB 비밀번호를 임시 비밀번호로 업데이트 (암호화해서 저장)
        member.setPassword(passwordEncoder.encode(tempPassword));

        // 메일 발송
        org.springframework.mail.SimpleMailMessage message = new org.springframework.mail.SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[ERP 시스템] 임시 비밀번호 발급 안내");
        message.setText("요청하신 임시 비밀번호는 [" + tempPassword + "] 입니다.\n로그인 후 마이페이지에서 반드시 비밀번호를 변경해 주세요.");

        mailSender.send(message);
    }

    // 마이페이지 비밀번호 변경 로직
    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 기존(또는 임시) 비밀번호가 맞는지 확인
        if (!passwordEncoder.matches(oldPassword, member.getPassword())) {
            throw new IllegalArgumentException("기존 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호로 변경
        member.setPassword(passwordEncoder.encode(newPassword));
    }

    @Async
    @Transactional
    public CompletableFuture<String> kakaoLoginAsync(String code){
        //1. 카카오 서버로부터 액세스 토큰을 받아옵니다.
        String kakaoAccessToken = getKakaoAccessToken(code);
        //2. 액세스 토큰으로 카카오 사용자 정보를 조회합니다.
        KakaoUserInfo userInfo = getKakaoUserInfo(kakaoAccessToken);
        //3. 이메일 기준으로 가입여부를 확인하고 없으면 자동 회원가입을 진행
        Member member = memberRepository.findByEmail(userInfo.getEmail()).orElseGet(() ->{
            Member newMember = Member.builder()
                    .firstName(userInfo.getNickname())
                    .lastName("카카오")
                    .email(userInfo.getEmail())
                    .password(passwordEncoder.encode("KAKAO_SOCIAL_USER"))
                    .provider("KAKAO")
                    .providerId(userInfo.getId())
                    .build();
            return memberRepository.save(newMember);
        });
        String token = jwtProvider.generateToken(member.getEmail());
        return CompletableFuture.completedFuture(token);
    }

    //카카오 로그인 인가 코드를 처리하고 JWT를 발급하는 핵심 비즈니스 로직
    @Transactional
    public String kakaoLogin(String code) {
        //1. 카카오 서버로부터 액세스 토큰(Access Token)을 받아옵니다.
        String KakaoAccessToken = getKakaoAccessToken(code);

        //2. 발급받은 액세스 토큰을 이용해 카카오 API 서버에서 사용자 정보를 조회합니다.
        KakaoUserInfo userInfo = getKakaoUserInfo(KakaoAccessToken);

        //3. 이메일 기준으로 이미 가입된 회원인지 확인합니다.
        Member member = memberRepository.findByEmail(userInfo.getEmail()).orElseGet(() -> {
            //가입되지 않은 경우 카카오 정보로 자동회원가입 진행
            Member newMember = Member.builder()
                    .firstName(userInfo.getNickname())
                    .lastName("카카오")
                    .email(userInfo.getEmail())
                    .password(passwordEncoder.encode("KAKAO_SOCIAL_USER"))
                    .provider("KAKAO")
                    .providerId(userInfo.getId())
                    .build();
            return memberRepository.save(newMember);
        });
        //4. 최종적으로 해당 회원 정보에 대한 자체 JWT 토큰을 생성해 반환
        return jwtProvider.generateToken(member.getEmail());
    }

    // 💡 [수정 완료] 카카오 인가 코드를 엑세스 토큰으로 요청하는 메서드
    private String getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); // 👈 수정: 인증 방식 추가
        params.add("client_id", "43b4bfa2d77a904f4321f38325c03f09");         // 👈 수정: 카카오 REST API 키 주입
        params.add("client_secret", "cbg11djCLVm1AAcalhUoFjr7PrT4Fesk"); // 👈 수정: 카카오 시크릿 키 주입
        params.add("redirect_uri", "http://localhost:3000/oauth/kakao/callback");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try{
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            return rootNode.path("access_token").asText();
        } catch(Exception e){
            throw new RuntimeException("카카오 엑세스 토큰 추출 실패", e);
        }
    }

    private KakaoUserInfo getKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            String id = rootNode.path("id").asText();

            // 💡 이메일 권한이 없으므로, 카카오 고유 ID를 이용해 가짜 이메일을 생성합니다!
            String email = id + "@kakao.local";

            String nickname = rootNode.path("properties").path("nickname").asText();

            return new KakaoUserInfo(id, email, nickname);
        } catch(Exception e){
            throw new RuntimeException("카카오 사용자 정보 조회 실패", e);
        }
    }

    @Transactional
    public void updateProfile(String email, MemberUpdateDto dto) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을수 없습니다"));
        member.updateProfile(dto.getTel(), dto.getAddress(), dto.getDetailAddress());
    }

    @Getter
    @AllArgsConstructor
    private static class KakaoUserInfo {
        private String id, email, nickname;
    }

    //구글 인가 코드
    @Transactional
    public String googleLogin(String code) {
        String googleAccessToken = getGoogleAccessToken(code);
        GoogleUserInfo userInfo = getGoogleUserInfo(googleAccessToken);

        Member member = memberRepository.findByEmail(userInfo.getEmail()).orElseGet(() -> {
            Member newMember = Member.builder()
                    .firstName(userInfo.getName())
                    .lastName("구글")
                    .email(userInfo.getEmail())
                    .password(passwordEncoder.encode("GOOGLE_SOCIAL_USER"))
                    .provider("GOOGLE")
                    .providerId(userInfo.getId())
                    .build();
            return memberRepository.save(newMember);
        });
        return jwtProvider.generateToken(member.getEmail());
    }

    private String getGoogleAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", "http://localhost:3000/oauth/google/callback"); // 👈 이 부분이 콘솔과 100% 똑같아야 합니다!
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            return rootNode.path("access_token").asText();
        }catch (Exception e) {
            throw new RuntimeException("구글 액세스 토큰 추출 실패", e);
        }
    }

    private GoogleUserInfo getGoogleUserInfo(String accessToken){
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            String id= rootNode.path("id").asText();
            String email= rootNode.path("email").asText();
            String name= rootNode.path("name").asText();

            return new GoogleUserInfo(id, email, name);
        }catch (Exception e) {
            throw new RuntimeException("구글 사용자 정보 조회 실패", e);
        }
    }

    @Getter
    @AllArgsConstructor
    private static class GoogleUserInfo {
        private String id, email, name;
    }

    @Async
    @Transactional
    public CompletableFuture<String> googleLoginAsync(String code) {
        String googleAccessToken = getGoogleAccessToken(code);
        GoogleUserInfo userInfo = getGoogleUserInfo(googleAccessToken);

        Member member = memberRepository.findByEmail(userInfo.getEmail()).orElseGet(() -> {
            Member newMember = Member.builder()
                    .firstName(userInfo.getName())
                    .lastName("구글")
                    .email(userInfo.getEmail())
                    .password(passwordEncoder.encode("GOOGLE_SOCIAL_USER"))
                    .provider("GOOGLE")
                    .providerId(userInfo.getId())
                    .build();
            return memberRepository.save(newMember);
        });

        String token = jwtProvider.generateToken(member.getEmail());
        return CompletableFuture.completedFuture(token);
    }
}