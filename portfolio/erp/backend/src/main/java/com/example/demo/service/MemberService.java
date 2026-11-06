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

import org.springframework.http.HttpHeaders; // 👈 이 부분이 있어야 합니다!
import org.springframework.http.MediaType;   // 👈 MediaType 사용을 위해 필요합니다!

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;//회원 데이터 베이스 조작
    private final PasswordEncoder passwordEncoder;//비밀번호를 안전하게 암호, 비교하는 인코더
    private final JwtProvider jwtProvider;//JWT토큰 생성 / 검증
    private final JavaMailSender mailSender;// 임시 비밀번로를 전송하기 위한 메일 sender

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

    // 💡 1. 임시 비밀번호 발급 및 메일 전송 로직
    @Transactional
    public void sendTempPassword(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        // 8자리 랜덤 임시 비밀번호 생성 (java.util.UUID 임포트 필요)
        String tempPassword = java.util.UUID.randomUUID().toString().substring(0, 8);

        // DB 비밀번호를 임시 비밀번호로 업데이트 (암호화해서 저장)
        member.setPassword(passwordEncoder.encode(tempPassword));

        // 메일 발송 (org.springframework.mail.SimpleMailMessage 임포트 필요)
        org.springframework.mail.SimpleMailMessage message = new org.springframework.mail.SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[ERP 시스템] 임시 비밀번호 발급 안내");
        message.setText("요청하신 임시 비밀번호는 [" + tempPassword + "] 입니다.\n로그인 후 마이페이지에서 반드시 비밀번호를 변경해 주세요.");

        mailSender.send(message);
    }

    // 💡 2. 마이페이지 비밀번호 변경 로직
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

    //보조 메서드 카카오 인가 코드를 엑세스 토큰으로 요청하는 메서드
    private String getKakaoAccessToken(String code) {
        //외부 API(카카오 서버)로 HTTP 요청을 보내기 위한 스프링 툴을 생성합니다.
        RestTemplate restTemplate = new RestTemplate();
        //액세스 토큰을 발급받기 위한 카카오 공식 인증 서버 주소
        String url = "https://kauth.kakao.com/oauth/token";
        //헤더 (요청 명세)를 설정하기 위한 객체
        HttpHeaders headers = new HttpHeaders();
        //전송할 데이터의 형식을 폼(URL-Encoded) 데이터로 지정합니다.
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        //카카오 서버가 요구한 파라미터(값) 를 담을 맵을 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("","");//인증 방식이 인가 코드 방식임을 명시합니다.
        params.add("","");//카카오 디벨로퍼에서 발급한 REST API
        params.add("redirect_uri","http://localhost:3000/oauth/kakao/callback");//프론트 설정과 일치하는 리다이랙트
        params.add("code",code);//프론트엔드로부터 전달받는 일회용 인가 코드..
//파라미터와 헤더를 하나로 묶어 HTTP 요청 객체를 완성합니다.
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        //RestTemplate을 이용해 카카오 토큰 서버로 POST 요청을 보내고, 응답(JSON 문자열)을 받아옵니다.
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        /*String.class 응답을 String 형태로 받겠다는 의미입니다.*/


        try{
            //JSON 형태의 응답 데이터를 자바 객체나 노드로 다루기 위한 잭슨 라이브러리
            ObjectMapper objectMapper = new ObjectMapper();//파싱객체 생성
            //응답 본문을 트리형태로 읽어옵니다
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            //응답 본문(JSON)을 파싱 트리 구조로 읽어옵니다.
            return rootNode.path("access_token").asText();
            //파싱된 결과 중 엑세스 토큰값만 문자열로
        } catch(Exception e){
throw new RuntimeException("카카오 엑세스 토큰 추출실패", e);
        }
    }


    private KakaoUserInfo getKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();//외부 api 호출
        String url = "https://kapi.kakao.com/v2/user/me";//사용자 정보조회

        //AAA 인증,권한부여,계정 관리
        HttpHeaders headers = new HttpHeaders();//HTTP요청 헤더
        // 인증을 위해 헤더에 "Bearer [액세스 토큰]" 형태로 담아줍니다.
        headers.set("Authorization", "Bearer " + accessToken);
        // 전송 형식 타입을 폼 데이터로 지정합니다.
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//Request Body(본문)가 없고 헤더만 포함된 빈 요청 객체를 생성합니다. (GET/POST 공용)
/* <Void> 본문(Body) 데이터가 없거나 비어 있음을 나타냅니다
*바디는 null이고 헤더만 존재하는 HttpEntity 인스턴스
* */
        HttpEntity<Void> request = new HttpEntity<>(headers);
//카카오 API 서버로 요청을 보내고 사용자 정보가 담긴 응답을 받아옵니다
ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        try{
            //JSON 형태의 응답 데이터를 자바 객체나 노드로 다루기 위한 잭슨 라이브러리
            ObjectMapper objectMapper = new ObjectMapper();//파싱객체 생성
            //응답 본문을 트리형태로 읽어옵니다
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            //응답 본문(JSON)을 파싱 트리 구조로 읽어옵니다.

            //카카오 회원의 고유번호 id를 추출합니다
            String id = rootNode.path("id").asText();
            String email = rootNode.path("kakao_account").path("email").asText();
            String nickname = rootNode.path("properties").path("nickname").asText();
//추출한 정보를 DTO객체에 담아 리턴
            return new KakaoUserInfo(id,email, nickname);
        } catch(Exception e){
            throw new RuntimeException("카카오 사용자 정보 조회 실패", e);
        }
    }

    //마이페이지에서 전달받은 정보(전화번호, 주소 등)를 바탕으로 회원 프로필을 수정하는 메서드입니다.
    @Transactional
    public void updateProfile(String email, MemberUpdateDto dto) {
        // 토큰에서 추출한 이메일을 기준으로 데이터베이스에서 회원 정보를 조회합니다. 없으면 예외를 발생시킵니다.
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을수 없습니다"));

        // 회원 엔티티(Member)에 만들어 둔 updateProfile 편의 메서드를 호출하여 새로운 값으로 변경합니다.
        member.updateProfile(dto.getTel(), dto.getAddress(), dto.getDetailAddress());
    }


    @Getter
    @AllArgsConstructor //모든 필드를 포함하는 생성자를 자동으로 만들어주는
    private static class KakaoUserInfo{
        private String id, email, nickname;
    }


    //구글 인가 코드
    @Transactional
    public String googleLogin(String code) {
//1)  리액트에서 넘어온 인가코드 -> 구글서버 토큰 받아옴
        String googleAccessToken = getGoogleAccessToken(code);
//2) 발급받은 엑세스 토큰이용 -> 사용자 정보를 조회
        GoogleUserInfo userInfo = getGoogleUserInfo(googleAccessToken);
//3) 이메일로 확인해 보고 없으면 실행
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
        //최종적으로 해당 회원 정보에 대한 자체 JWT 토큰을 생성하여 반환
        return jwtProvider.generateToken(member.getEmail());
        /*
        *빌더 패턴(Builder Pattern)을 쓰는 이유
        * ① 가독성과 명확성 (어떤 값에 무엇이 들어가는지 한눈에 보임)
        * ② 파라미터 순서 실수를 원천 방지[함수는 파라값이 순서를 지겨야 하는데..빌더패턴은 순서와 상관이 없다]
        * ③ 필요한 값만 골라서 유연하게 생성 (오버로딩 지옥 탈출)
        * - 빌더를 쓰지 않을 경우
        * ❌ 1) 코드의 가독성 저하로 인한 '인지 비용(Time Waste)' 낭비
        * ❌ 2) 불필요한 생성자 오버로딩으로 인한 '코드 자원' 낭비
        * ❌ 3) 불변성(Immutability) 확보 실패로 인한 '안전성' 낭비
        * */
    }

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;


    //구글 인가 코드를 이용해 구글 인증 서버에 액세스 토큰 발급을 요청하는 메서드
    private String getGoogleAccessToken(String code){
//HTTP 요청을 쉽게 처리할 수 있는 객체
        RestTemplate restTemplate = new RestTemplate();
        //구글에서 액세스 토큰을 발급해 주는 공식 인증 서버 주소
        String url = "https://oauth2.googleapis.com/token";
        //HTTP 요청 헤더(Header)를 설정하기 위한 객체생성
        HttpHeaders headers = new HttpHeaders();
        //폼(URL-Encoded) 데이터 형식으로 지정
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);



        //필수 파라미터 를 담을 맵 객체를 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);         // 👈 변수로 대체
        params.add("client_secret", googleClientSecret); // 👈 변수로 대체
        params.add("redirect_uri", "http://localhost:3000/oauth/google/callback");
        params.add("grant_type", "authorization_code");

        //파라미터(몸체)와 헤더를 하나로 묶어 HTTP 요청 객체
        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(params, headers);
        //구글 토큰 서버로 POST 요청을 보내고, 응답 결과를 문자열(String) 형태
        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);
    try{
        //SON 응답 문자열을 자바 객체로 쉽게 다루기 위한 잭슨(Jackson) 라이브러리 객체
        ObjectMapper objectMapper = new ObjectMapper();
        //응답 본문(Body)을 트리 구조의 노드로 파싱(해체)합니다.
        JsonNode rootNode = objectMapper.readTree(response.getBody());
        //파싱된 JSON 데이터에서 순수 'access_token' 값만 골라내어 문자열로 변환한 뒤 반환합니다.
        return rootNode.path("access_token").asText();
    }catch (Exception e) {
//토큰을 추출하는 과정에서 에러가 나면 런타임 예외를 발생시킵니다.
        throw new RuntimeException("구글 액세스 토큰 추출 실패",e);
    }

    }
    //구글 액세스 토큰을 헤더에 담아 구글 API 서버로부터 사용자 프로필 정보를 조회하는 메서드
    private GoogleUserInfo getGoogleUserInfo(String accessToken){
RestTemplate restTemplate = new RestTemplate();
//액세스 토큰을 쿼리 파라미터로 붙여 구글 사용자 정보 조회 주소를 호출
String url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken;
ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

try{
ObjectMapper objectMapper = new ObjectMapper();
JsonNode rootNode = objectMapper.readTree(response.getBody());

//응답 JSON에서 사용자의 고유 ID, 이메일, 이름을 각각 꺼냅니다
    String id= rootNode.path("id").asText();
    String email= rootNode.path("email").asText();
    String name= rootNode.path("name").asText();

    return  new GoogleUserInfo(id, email, name);
        }catch (Exception e) {
            throw new RuntimeException("구글 사용자 정보 조회 실패", e);
        }
    }
    //구글 사용자 정보를 담기위한 내부 DTO 클래스
    @Getter
    @AllArgsConstructor
    private static class GoogleUserInfo {
        private  String id, email, name;
    }

    // 💡 [비동기 적용] 구글 인가 코드를 받아 토큰 교환 및 로그인을 처리하고 JWT를 발급하는 비즈니스 로직입니다.
    @Async
    @Transactional
    public CompletableFuture<String> googleLoginAsync(String code) {
        // 1. 구글 서버에서 액세스 토큰 받아오기
        String googleAccessToken = getGoogleAccessToken(code);

        // 2. 액세스 토큰으로 구글 사용자 정보(이메일, 이름 등) 조회하기
        GoogleUserInfo userInfo = getGoogleUserInfo(googleAccessToken);

        // 3. 이메일 기준으로 가입 여부 확인 후 자동 회원가입 또는 조회
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

        // 4. 자체 JWT 토큰 생성
        String token = jwtProvider.generateToken(member.getEmail());

        // 5. 비동기 작업의 결과(토큰)를 CompletableFuture에 담아 반환합니다.
        return CompletableFuture.completedFuture(token);
    }
}