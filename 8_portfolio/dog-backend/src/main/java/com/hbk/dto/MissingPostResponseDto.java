package com.hbk.dto;

import com.hbk.entity.MissingPost;

import lombok.Getter;
import com.hbk.domain.PostStatus;


import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MissingPostResponseDto {
private Long id;
private String title, content, breed, gender, rescueLocation, authorName;
private PostStatus status;
private List<String> mediaUrls;
private LocalDateTime createdAt;

/*
데이터베이스에서 조회한 엔티티 객체(MissingPost)를 전달받아,
프론트엔드가 이해하기 쉬운 DTO 형태로 변환해 주는 생성자(Constructor)입니다.
* */

public MissingPostResponseDto(MissingPost post){
this.id = post.getId();
this.title = post.getTitle();
this.status =post.getStatus();
this.content = post.getContent();
this.breed = post.getBreed();
this.gender = post.getGender();
this.rescueLocation = post.getRescueLocation();
this.authorName = post.getAuthor() != null ? post.getAuthor().getUsername() : " 알수 없음";
this.mediaUrls = post.getMediaUrls();
}
}
