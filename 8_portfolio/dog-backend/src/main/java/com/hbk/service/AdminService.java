package com.hbk.service;

//이 주방장(Service)이 요리할 때 필요한 재료(클래스, DTO, 인터페이스)들을 다른 폴더에서 불러옵니다.
import com.hbk.dto.AdminResponse;
import com.hbk.entity.Admin;
import com.hbk.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
//@Service: 스프링 부트에게 "이 클래스는 핵심 비즈니스 로직(요리)을 담당하는 주방장이야!
//네가 관리해 줘!"라고 알려줍니다.
@RequiredArgsConstructor
public class AdminService {
//주방장(Service)이 DB에서 데이터를 꺼낼 때 사용할 전용 냉장고(Repository)입니다.
// (final이라 중간에 다른 냉장고로 바꿀 수 없습니다.)
    private final AdminRepository adminRepository;

    public AdminResponse authenticate(String email, String password){

        Admin admin = adminRepository.findByMemberEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("관리자 권한이 없거나 존재 하지 않습니다"));
        //첫번쩨 관문을 통과 하면 넥스트
        if (!admin.getMember().getPassword().equals(password)){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        //모든 검증을 통과하면..로그인 하는것
        return new AdminResponse(admin.getMember().getName(), "관리자 로그인 성공!");
    }

}
