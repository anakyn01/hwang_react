package com.hbk.dto;

import lombok.*;

@Getter
@Setter
//프론트엔드에서 캠페인을 등록할 때 서버로 전송할 데이터 구조입니다.
public class AdoptionCampaignRequest {

    private String hashtag, title,
            content, thumbnailUrl,
            mediaType, mediaUrl;
}
