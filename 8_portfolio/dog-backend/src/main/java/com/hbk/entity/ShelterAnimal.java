package com.hbk.entity;

import com.hbk.domain.Gender;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name= "shelter_animals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShelterAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private String breed;

    @Column(name="notice_no", nullable = false)
    private String noticeNo;

    @Column(name="rescue_location", nullable = false)
    private String rescueLocation;

    @Column(name="image_url", length = 1000)
    private String imageUrl;

    @Column(columnDefinition="TEXT", nullable = false)
    private String content;

    @CreationTimestamp
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="updated_at")
    private LocalDateTime updateAt;



}
