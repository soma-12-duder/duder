package com.duder.api.member.application;

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
    public String token(){
        System.out.println("token call");
        return "hello token";
    }
}
