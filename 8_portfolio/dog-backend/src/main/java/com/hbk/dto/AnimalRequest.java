package com.hbk.dto;

import lombok.Data;



@Data
public class AnimalRequest {
private String sourceType, sourceUrl, region, noticeNo, birthYear, gender,imageUrl;
private Double weight;
}
