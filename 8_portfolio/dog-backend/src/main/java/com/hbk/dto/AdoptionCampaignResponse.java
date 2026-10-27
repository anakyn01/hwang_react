package com.hbk.dto;

import com.hbk.entity.AdoptionCampaign;

//등록 성공/실패 여부 메시지를 프론트엔드로 전달하기 위한 응답 객체입니다.
public class AdoptionCampaignResponse {

    private String message;

    //빨간 줄의 원인 해결! (글자 하나를 받아주는 생성자를 직접 만들어 줍니다)
    public AdoptionCampaignResponse(String message){
        this.message = message;
    }
}
