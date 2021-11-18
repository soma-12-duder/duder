package com.duder.api.security.handler;

import lombok.Getter;

@Getter
public class TokenResponse {
    private Long id;
    private String email;
    private String accessToken;
    private boolean existedMember;

    public TokenResponse(){}

    public static TokenResponse of(Long id, String accessToken){
        return new TokenResponse(id, accessToken);
    }

    public static TokenResponse of(Long id, String email, String accessToken, boolean existedMember){
        return new TokenResponse(id, email, accessToken, existedMember);
    }


    public TokenResponse (Long id, String accessToken){
        this.id = id;
        this.accessToken = accessToken;
    }

    public TokenResponse (Long id, String email, String accessToken, boolean existedMember){
        this.id = id;
        this.email = email;
        this.accessToken = accessToken;
        this.existedMember = existedMember;
    }

}
