package com.duder.api.post.service;

import org.assertj.core.data.Offset;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CoordinateUtilTest {

    @DisplayName("거리측정 테스트: 1 (322km)")
    @Test
    public void checkDistance1(){
        double seoulLat = 37.547889; // 서울 위도
        double seoulLong = 126.997128; // 서울 경도

        double busanLat = 35.158874; // 부산 위도
        double busanLong = 129.043846; // 부산 경도

        assertThat(CoordinateUtil.calculateDistanceTwoPoints(seoulLat, seoulLong, busanLat, busanLong))
        .isEqualTo(322.722, Offset.offset(0.001));
    }

    @DisplayName("거리측정 테스트: 2 (0m)")
    @Test
    public void checkDistance2(){
        // 우리 집
        double lat_1 = 37.54972434094374;
        double long_1 = 126.9248854599957;

        // 승범 집
        double lat_2 = 37.54972434094374;
        double long_2 = 126.9248854599957;

        assertThat(CoordinateUtil.calculateDistanceTwoPoints(lat_1, long_1, lat_2, long_2))
                .isEqualTo(0.000, Offset.offset(0.001));
    }

    @DisplayName("거리측정 테스트: 3 (1000m) +- 1 오차")
    @Test
    public void checkDistance3(){
        // 우리 집
        double lat_1 = 37.54893348877547;
        double long_1 = 126.9248857281316;

        // 합정역
        double lat_2 = 37.54892732943174;
        double long_2 = 126.9135262949987;
        assertThat(CoordinateUtil.calculateDistanceTwoPoints(lat_1, long_1, lat_2, long_2))
                .isEqualTo(1.00, Offset.offset(0.01));
    }

}