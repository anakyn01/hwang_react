package com.hbk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
//생성자 자동생성
public class AdminResponse {

    // 프론트엔드 화면(Topbar 등)에 띄워줄 관리자의 이름입니다.
    private String name;
    //로그인 성공 시 띄워줄 알림창(alert) 메시지입니다. (예: "관리자 로그인 성공!")
    private String message;
}
