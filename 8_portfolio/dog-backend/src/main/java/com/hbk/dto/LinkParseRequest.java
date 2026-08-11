package com.hbk.dto;

import lombok.Data;

@Data
public class LinkParseRequest {
    private String url;  // 프론트엔드에서 보낸 SNS 주소
    private String type; // FACEBOOK 또는 INSTAGRAM
}