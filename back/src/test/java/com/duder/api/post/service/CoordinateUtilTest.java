package com.duder.api.post.service;

import org.assertj.core.data.Offset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.duder.api.post.service.CoordinateUtil.*;
import static org.assertj.core.api.Assertions.*;

class CoordinateUtilTest {

    // 상수역 자취방 집
    private double homeLat;
    private double homeLong;

    @BeforeEach
    public void init(){
        homeLat = 37.54893348877547;
        homeLong =  126.9248857281316;
    }

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
        assertThatThrownBy(() -> CoordinateUtil.validateCoordinate(lat_1, long_1)).isInstanceOf(IllegalArgumentException.class);

        // longitude 초과
        assertThatThrownBy(() -> CoordinateUtil.validateCoordinate(lat_2, long_2)).isInstanceOf(IllegalArgumentException.class);

        // latitude, longitude 둘 다 초과
        assertThatThrownBy(() -> CoordinateUtil.validateCoordinate(lat_3, long_3)).isInstanceOf(IllegalArgumentException.class);
    }

    @DisplayName("거리측정 테스트 1: 좌표거리 322km")
    @Test
    public void checkDistance1() throws  IllegalArgumentException {
        double seoulLat = 37.547889; // 서울 위도
        double seoulLong = 126.997128; // 서울 경도

        double busanLat = 35.158874; // 부산 위도
        double busanLong = 129.043846; // 부산 경도

        assertThat(CoordinateUtil.calculateDistanceTwoPoints(seoulLat, seoulLong, busanLat, busanLong))
        .isEqualTo(322.722, Offset.offset(0.001));
    }

    @DisplayName("거리측정 테스트 2: 좌표 거리 0m")
    @Test
    public void checkDistance2() throws IllegalArgumentException{
        assertThat(CoordinateUtil.calculateDistanceTwoPoints(homeLat, homeLong, homeLat, homeLong))
                .isEqualTo(0.000, Offset.offset(0.001));
    }

    @DisplayName("거리측정 테스트 3: 좌표 거리 1000m +- 1 오차")
    @Test
    public void checkDistance3() throws IllegalArgumentException{
        // 합정역
        double latitude = 37.54892732943174;
        double longitude = 126.9135262949987;
        assertThat(CoordinateUtil.calculateDistanceTwoPoints(homeLat, homeLong, latitude, longitude))
                .isEqualTo(1.00, Offset.offset(0.01));
    }

    @DisplayName("100m 위도 측정 테스트 0.000 ~  ? 까지가 100m 인지")
    @Test
    public void measure100mLat_Test(){
        double distance = measure100mLong(37.0000);
        double distance2 = measure100mLong(36.0000);
        double distance3 = measure100mLong(35.0000);
//
//        System.out.println("distance = " + distance);
//        assertThat(distance).isEqualTo(0.100, Offset.offset(0.001));
//        assertThat(distance2).isEqualTo(0.100, Offset.offset(0.001));
//        assertThat(distance3).isEqualTo(0.100, Offset.offset(0.001));
    }

    @DisplayName("100m 경도 측정 테스트 0.000 ~  ? 까지가 100m 인지")
    @Test
    public void measure100mLong_Test(){
        double distance = measure100mLat(127.0000);
        double distance2 = measure100mLat(126.0000);
        double distance3 = measure100mLat(125.0000);
//
//        assertThat(distance).isEqualTo(0.100, Offset.offset(0.001));
//        assertThat(distance2).isEqualTo(0.100, Offset.offset(0.001));
//        assertThat(distance3).isEqualTo(0.100, Offset.offset(0.001));
    }

    @DisplayName("좌상단, 우상단, 좌하단, 우하단 Cell 값 확인 테스트")
    @Test
    public void checkCell(){
        // 우리 집
        int maxCellValue = findCellValue(BOTTOM_RIGHT_LATITUDE, BOTTOM_RIGHT_LONGITUDE);
        int firstRowMaxCellValue = findCellValue(UPPER_LEFT_LATITUDE, BOTTOM_RIGHT_LONGITUDE);
        int minCellValue = findCellValue(UPPER_LEFT_LATITUDE, UPPER_LEFT_LONGITUDE);
        int lastRowMinCellValue = findCellValue(BOTTOM_RIGHT_LATITUDE, UPPER_LEFT_LONGITUDE);

        assertThat(maxCellValue).isEqualTo(LATITUDE_LENGTH * LONGITUDE_LENGTH -1);
        assertThat(firstRowMaxCellValue).isEqualTo(LONGITUDE_LENGTH - 1);
        assertThat(minCellValue).isEqualTo(0);
        assertThat(lastRowMinCellValue).isEqualTo((LATITUDE_LENGTH -1) * LONGITUDE_LENGTH);
    }

    @DisplayName("현재 셀에서 1KM 내 셀 가져오기 끝점 테스트")
    @Test
    public void findCellByRange_1(){
        List<Integer> cells_first = findCellValueInRange(0, 10);
        List<Integer> cells_second = findCellValueInRange((LATITUDE_LENGTH - 1) * LONGITUDE_LENGTH, 10);
        List<Integer> cells_third = findCellValueInRange(LONGITUDE_LENGTH - 1, 10);
        List<Integer> cells_fourth = findCellValueInRange(LATITUDE_LENGTH * LONGITUDE_LENGTH - 1, 10);

        assertThat(cells_first.size()).isEqualTo(121);
        assertThat(cells_second.size()).isEqualTo(121);
        assertThat(cells_third.size()).isEqualTo(121);
        assertThat(cells_fourth.size()).isEqualTo(121);
    }

    @DisplayName("중앙 점 테스트")
    @Test
    public void findCellByRange_2(){
        int cellValue = findCellValue(homeLat, homeLong);
        List<Integer> cells = findCellValueInRange(cellValue, 10);

        assertThat(cells).contains(cellValue, cellValue - 10, cellValue + 10,
                cellValue + LONGITUDE_LENGTH * 10, cellValue - LONGITUDE_LENGTH * 10);
    }

    @DisplayName("위치 중심으로 range 만큼 좌표 범위 구하기")
    @Test
    public void cell(){
        int range = 10;
        List<Coordinate> rangeValue = findCellCoordinateInRange(homeLat, homeLong, range);

        assertThat(rangeValue.get(1).getRow() - rangeValue.get(0).getRow()).isEqualTo(2 * range);
        assertThat(rangeValue.get(1).getColumn() - rangeValue.get(0).getColumn()).isEqualTo(2 * range);
    }

    @DisplayName("좌표 기준으로 coordiate가 잘 반환 되는지 테스트")
    @Test
    public void cell2(){
        Coordinate coordiateHome = findCellCoordinate(homeLat, homeLong);
        Coordinate far300M = findCellCoordinate(homeLat + ONE_HUNDRED_METER_LATITUDE * 3, homeLong + ONE_HUNDRED_METER_LONGITUDE * 3);


        // 위도는 클 수록 row가 작음
        assertThat(coordiateHome.getRow()).isGreaterThan(far300M.getRow());

        // 경도는 클 수록 column이 큼
        assertThat(coordiateHome.getColumn()).isLessThan(far300M.getColumn());
    }

}