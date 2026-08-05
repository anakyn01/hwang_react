package com.hbk.controller;

import com.hbk.entity.Member;
import com.hbk.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
//내부적으로 @Controller와 @ResponseBody가 합쳐진 형태입니다
// 이 클래스 내의 모든 API 주소는 기본적으로 "/api/members"로 시작하도록 설정
@RequestMapping("/api/members")//모든 API 주소의 '공통 접두사'를 설정
@CrossOrigin(origins = "http://localhost:3000")//교차출처리소스공유
public class MemberController {//외부에서 접근 가능한 컨트롤러 클래스 ㅅ;작
//DB와 소통하는 리포지토리를 담을 불변(final) 객체
    private final MemberRepository memberRepository;//불변성 설정

    //스프링 부트가 실행될 때 자동으로 리포지토리를 연결(의존성 주입)해주는 생성자
    public MemberController(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }//객체를 알아서 메모리에 생성해 두었다가
    // 이컨트롤러가 생성될때 쏙 집어 넣어 줍니다

    //1. 중복 체크 API
    ///api/members/check-email?email=
    @GetMapping("/check-email")
    /*@RequestParam URL 뒤에 쿼리스트링으로 넘어온 값(?email=abc@test.com)을
    뽑아내어 자바의 String email 변수에 담아줍니다.*/
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email){
        return ResponseEntity.ok(memberRepository.existsByEmail(email));
    }

    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody Member member){
        //이앱은 가입시 카카오와 일반을 선택하는데 그에 대한 문제를 먼저 클리어
if(member.getProvider() == null || member.getProvider().isEmpty()){
    member.setProvider("LOCAL");
    /*Oauth이게 아닌 ..프론트엔드에서 provider(가입경로) 데이터를 넘기지 않았거나 비어있다면
    일반적인 자체 회원가입으로 간주하여 "LOCAL"이라는 값을 강제로 세팅해 줍니다.
    데이터베이스 에러를 막기위한 방어 로직
    */
}
Member savedMember = memberRepository.save(member);
/*
복잡한 INSERT INTO ... SQL 쿼리문
부트는 .save() 한 방이면 스프링이 알아서 쿼리를 만들어 DB에 저장하고,
저장된 결과를 savedMember에 다시 담아줍니다.
* */return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
//저장이 성공적으로 완료 되었으면.. 200단순성공 대신 더 명확한 201(새로운 리소스가 생성됨)
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginData){
/*
사용자가 로그인창에 입력한 이메일(loginData.getEmail())로 DB를 검색합니다
만약 가입되지 않은 이메일이면 데이터가 없을 텐데,
이때 에러가 터지지 않도록 Optional이라는 상자에 결과를 담아옵니다.
*/
        Optional<Member> memberOpt = memberRepository.findByEmail(loginData.getEmail());
if(memberOpt.isPresent()){
    Member member = memberOpt.get();
    /*
isPresent() : 상자(Optional) 안에 데이터가 들어있니?"라고 묻습니다
.get(): 데이터가 있다면 상자에서 실제 Member 객체를 꺼냅니다.
    */
    if(member.getPassword().equals(loginData.getPassword())){
        // DB의 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 검사합니다.
        return ResponseEntity.ok(member);
        //비밀번호가 맞다면 로그인 성공 회원 정보를 프론트로 넘겨줌
    }
}
return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 또는 비밀번호가 일치하지 않습니다");
//회원이 없거나 비밀번호가 틀리면 401(인증 실패) 에러 메시지를 보냅니다.
    }
}


