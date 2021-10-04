package com.duder.api.member.application;

import com.duder.api.member.domain.Member;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        System.out.println("index.html call");
        return "index.html";
    }

    @GetMapping("/login-success")
    public String loginSuccess(){
        System.out.println("login-success.html call");
        return "login-success.html";
    }

    @GetMapping("/login-failure")
    public String loginFailure(){
        System.out.println("login-fail.html call");
        return "login-failure.html";
    }

    @ResponseBody
    @PostMapping("/api/token")
    public String token(@AuthenticationPrincipal OAuth2User oAuth2User){
        System.out.println(oAuth2User.getName());
        System.out.println((Member) oAuth2User.getAttribute("member"));
        System.out.println("token call");
        return "hello token";
    }
}
