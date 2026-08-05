package com.hbk.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	/*카카오 가입자는 이메일이 없을 수도 있으므로 nullable = true 로 변경하거나,
	소셜 로그인 아이디(고유번호)를 저장할 컬럼을 추가합니다.
	*/
	@Column(unique = true)
	private String email;
	
	// 카카오 회원은 비밀번호가 없으므로 null 허용으로 변경합니다.
	private String password;
	
	@Column(unique = true, nullable = false)
	private String nickname, phone, profileImageUrl;
	private boolean marketingAgreed;
	
	//가입 경로 (LOCAL: 일반가입, KAKAO: 카카오가입)
	@Column(nullable = false)
	private String provider;
	//카카오에서 넘겨주는 고유 회원번호
	private String providerId;
	
	
	
	
	
	
	
	

}
