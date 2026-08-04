package com.hbk.jpa;

import jakarta.persistence.*;
//DB 테이블과 자바 객체를 연결해주는 JPA 관련 기능을 모두 불러옵니다.
import lombok.Data;
//Getter, Setter 등을 자동으로 만들어주는 Lombok 라이브러리를 불러옵니다.

@Entity// 이 클래스가 데이터베이스의 테이블(Animal)과 1:1로 매핑됨을 선언합니다.
@Data//Getter/Setter/toString 메서드를 자동으로 생성
public class Animal {
	
	@Id
	//이 변수를 데이터베이스 테이블의 기본키(Primary Key, PK)로 지정합니다.
	// 데이터가 추가될 때마다 DB가 알아서 번호를 1씩 증가시키도록(Auto Increment) 설정합니다
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;// 동물을 식별하는 고유 번호(예: 1, 2, 3...)를 저장하는 정수형 변수입니다.

	private String region, noticeNo, birthYear, grnder, imageUrl, category;
	
	private Double weight;
	
	
}
