package com.duder.api.post.service;

import org.assertj.core.data.Offset;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.duder.api.post.service.CoordinateUtil.*;
import static org.assertj.core.api.Assertions.*;

class CoordinateUtilTest {

    @DisplayName("좌표 유효성 체크: 좌표 범위 초과 에러 작동 확인")
    @Test
    public void checkValidateCoordinates(){
        double lat_1 = -90.1;
        double long_1 = 126.9248857281316;

        double lat_2 = 37.54892732943174;
        double long_2 = 180.1;

        double lat_3 = 90.1;
        double long_3 = -180.1;

        // latitude 초과
        assertThat(CoordinateUtil.validateCoordinate(lat_1, long_1)).isFalse();

        // longitude 초과
        assertThat(CoordinateUtil.validateCoordinate(lat_2, long_2)).isFalse();

        // latitude, longitude 둘 다 초과
        assertThat(CoordinateUtil.validateCoordinate(lat_3, long_3)).isFalse();
    }

    @DisplayName("거리측정 테스트 1: 좌표거리 322km")
    @Test
    public void checkDistance1(){
        double seoulLat = 37.547889; // 서울 위도
        double seoulLong = 126.997128; // 서울 경도

        double busanLat = 35.158874; // 부산 위도
        double busanLong = 129.043846; // 부산 경도

        assertThat(CoordinateUtil.calculateDistanceTwoPoints(seoulLat, seoulLong, busanLat, busanLong))
        .isEqualTo(322.722, Offset.offset(0.001));
    }

    @DisplayName("거리측정 테스트 2: 좌표 거리 0m")
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

    @DisplayName("거리측정 테스트 3: 좌표 거리 1000m +- 1 오차")
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

    @DisplayName("100m 위도 측정 테스트 0.000 ~  ? 까지가 100m 인지")
    @Test
    public void measure100mLat_Test(){
        double distance = measure100mLong(37.0000);
        double distance2 = measure100mLong(36.0000);
        double distance3 = measure100mLong(35.0000);

        System.out.println("distance = " + distance);
        assertThat(distance).isEqualTo(0.100, Offset.offset(0.001));
        assertThat(distance2).isEqualTo(0.100, Offset.offset(0.001));
        assertThat(distance3).isEqualTo(0.100, Offset.offset(0.001));
    }

    @DisplayName("100m 경도 측정 테스트 0.000 ~  ? 까지가 100m 인지")
    @Test
    public void measure100mLong_Test(){
        double distance = measure100mLat(127.0000);
        double distance2 = measure100mLat(126.0000);
        double distance3 = measure100mLat(125.0000);

        assertThat(distance).isEqualTo(0.100, Offset.offset(0.001));
        assertThat(distance2).isEqualTo(0.100, Offset.offset(0.001));
        assertThat(distance3).isEqualTo(0.100, Offset.offset(0.001));
    }

    @DisplayName("영역 100m*100m 단위로 나누기 테스트")
    @Test
    public void divide_Test(){
        divideAreaBy100m(37.54893348877547, 126.9135262949987, 37.54972434094374, 126.9248854599957);
    }

}