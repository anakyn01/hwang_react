package com.hbk.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name="ADOPTION_CAMPAIGN")
@Getter
@Setter
@NoArgsConstructor
public class AdoptionCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="CAMPAIGN_ID")
    private Long id;

    @Column(nullable = false, length=50)
    private String hashtag;

    @Column(nullable = false, length=256)
    private String title;

    @Lob
    //이미지, 동영상, 긴 텍스트 같은 대용량 데이터를
    // 저장하기 위한 가변 길이 데이터 타입
    @Column(name="CONT_BDY")
    private String content;

    @Column(name="THUMBNAIL_URL", length = 1000)
    private String thumbnailUrl;

    @Column(name="MEDIA_TYPE", length = 20)
    private String mediaType;

    @Column(name="MEDIA_URL", length = 1000)
    private String mediaUrl;

    @CreationTimestamp
    @Column(name="INSERT_DT", updatable = false)
    private LocalDateTime insertDt;



}
