package com.hbk.dto;

import com.hbk.domain.PostStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class MissingPostRequestDto {
private String title, content, breed, gender, age, weight, color,
    rescueLocation;
private List<String> mediaUrls;


}
