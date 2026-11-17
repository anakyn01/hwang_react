package com.hbk.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recommended_animals")
@Data
@NoArgsConstructor
public class RecommendedAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
// DIRECT(직접등록), FACEBOOK(페북),
// INSTAGRAM(인스타) 중 하나를 저장합니다.
    @Column(nullable = false, length =20)
    private String sourceType;

// 외부 링크 주소를 저장합니다.
// (직접 등록일 경우 비어있을 수 있으므로 nullable=true)
@Column(length = 500)
private String sourceUrl;

    @Column(nullable = false, length =20)
    private String region;

    @Column(nullable = false, length =100)
    private String noticeNo;

    @Column(nullable = false, length =10)
    private String birthYear;

    @Column(nullable = false, length =5)
    private String gender;

    @Column(nullable = false, length =20)
    private Double weight;

    @Column(nullable = false, length =1000)
    private String imageUrl;
}
