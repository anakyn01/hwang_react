package com.hbk.dto;

import lombok.Data;

@Data
public class SignupRequest {
private String email, nickname, password, provider, providerId, profileImageUrl,
    name, phone, address, userType;
private boolean marketingAgreed;
}
