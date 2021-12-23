package com.duder.api.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    public static ObjectMapper objectMapper = new ObjectMapper();

    public static String toJson(Object obj) throws Exception{
        return objectMapper.writeValueAsString(obj);
    }

}
