package com.duder.api.form;

public class ApiForm<T> {
    private int status;
    private T data;
    private String message;

    public static <T> ApiForm succeed(T data, String message){
        return new ApiForm(200, data, message);
    }

    public static <T> ApiForm fail(String message) { return new ApiForm(400, null, message); }

    public ApiForm(int status, T data, String message){
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
