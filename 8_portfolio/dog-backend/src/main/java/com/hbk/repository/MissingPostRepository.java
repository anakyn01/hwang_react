package com.hbk.repository;

import com.hbk.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
//Member 데이터를 다루고, PK(고유번호) 타입은 Long인 리포지토리 인터페이스를 생성합니다.
    //1. 회원가입 중복 체크용 메서드
    boolean existsByEmail(String email);
    //프론트에서 입력한 닉네임이 이미 DB에 존재하는지(true/false) 확인합니다.
    boolean existsByNickname(String nickname);

    //2.실제 로그인 처리를 위한 조회용 메서드
    //[일반 로그인] 사용자가 입력한 이메일로 DB에서 회원 정보를 찾아옵니다.
    Optional<Member> findByEmail(String email);
    // [카카오 로그인] 가입 경로("KAKAO")와 카카오에서 넘겨준 '고유 ID 번호'를 조합해서
    // 기존에 가입한 적이 있는 카카오 회원인지 찾아옵니다
    Optional<Member> findByProviderAndProviderId(String provider, String providerId);


}
