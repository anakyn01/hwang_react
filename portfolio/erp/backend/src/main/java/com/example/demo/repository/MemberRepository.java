package com.example.demo.repository;


import com.example.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    //소셜 로그인(카카오 등) 시 provider와 providerId를 기준으로 회원을 찾기 위한 메서드
    Optional<Member> findByProviderAndProviderId(String provider, String providerId);
}