package com.hbk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="need_help")
@Getter
@Setter
@NoArgsConstructor
public class NeedHelp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=256)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(name="image_url", length=1000)
    private String imageUrl;

    @Column(name="video_url", length=1000)
    private String videoUrl;

    @Column(name="attachment_url", length=1000)
    private String attachmentUrl;

    @CreationTimestamp
    @Column(name = "insert_dt", updatable = false)
    private LocalDateTime insertDt;

}
