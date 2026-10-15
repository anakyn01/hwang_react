package com.example.demo.service;

import com.example.demo.dto.MemberLoginDto;
import com.example.demo.dto.MemberRegisterDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.config.JwtProvider;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final JavaMailSender mailSender;


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

    public String login(MemberLoginDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

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

}