package com.hbk.entity;

/*
기본 회원(Member) 테이블에 데이터가 있고
중 관리자 권한을 부여받은 사람만 어드민(Admin)
테이블에 조인(Join) 시켜서 관리자 전용으로 로그인하게 만들겠다

회원 정보(비밀번호, 이름 등)는 Member에 일원화하고
Admin 테이블은 관리자 등급이나 부서 같은 전용 데이터만
가지면서 Member를 부모로 참조(외래키)하는 것

JPA의 @OneToOne (또는 다대일) 조인을
사용하면 이 구조를 아주 우아하게 구현할 수 있습니다.
*/
//데이터베이스를 쉽게 다룰 수 있게 해주는 도구(JPA)들을 불러옵니다.
import jakarta.persistence.*;
//코드를 획기적으로 줄여주는 마법의 도구(Lombok)들을 불러옵니다.
import lombok.*;

@Entity//"이 자바 코드는 단순한 코드가 아니라,
// 데이터베이스의 '테이블'이야!"라고 컴퓨터에게 알려줍니다.
@Table(name = "admins")
@Data//@Data: Lombok이 제공하는 기능으로, 우리가 직접 안 만들어도 안에서 값을 꺼내고(Getter)
// 넣는(Setter) 코드를 몰래 다 만들어줍니다.
@NoArgsConstructor
//텅 빈 기본 껍데기(생성자)를 자동으로 만들어줍니다.
// (데이터베이스에서 값을 꺼내올 때 JPA가 꼭 필요로 합니다.)
public class Admin {
    @Id//pk
    //번호를 안매겨도 자동생성..
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;//관리자 테이블 전용 고유 번호

    // 💡 핵심: Member 테이블의 id를 외래키(member_id)로
    // 가져와서 완벽하게 조인합니다!
    @OneToOne(fetch = FetchType.LAZY)
    /*
관리자(Admin) 1명은 회원(Member) 1명과 딱 짝꿍이다"라는 1:1 관계를 뜻합니다.
fetch = FetchType.LAZY: '지연 로딩'이라는 뜻인데, 관리자 정보만 필요할 때는 회원 정보까지 무겁게 다 끌고 오지 말고,
진짜 회원 정보가 필요해질 때만 나중에 가져오라는 '성능 최적화' 마법입니다.
    * */
    @JoinColumn(name= "member_id", nullable = false)
    private Member member;

    @Column(length= 20)
    private String adminLevel;

    private String department;


}
