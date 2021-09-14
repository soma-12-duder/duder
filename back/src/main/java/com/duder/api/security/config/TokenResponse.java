package com.duder.api.security.config;

import lombok.Getter;

@Getter
public class TokenResponse {
    private Long id;
    private String accessToken;

    public TokenResponse(){}

    public static TokenResponse of(Long id, String accessToken){
        return new TokenResponse(id, accessToken);
    }

    public TokenResponse (Long id, String accessToken){
        this.id = id;
        this.accessToken = accessToken;
    }

}
