package com.duder.api.post.service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CoordinateUtil {
    public static final double MIN_LATITUDE = -90;
    public static final double MAX_LATITUDE = 90;
    public static final double MIN_LONGITUDE = -180;
    public static final double MAX_LONGITUDE = 180;


    public static final double EARTH_RADIUS = 6371; // KM
    public static final double RADIAN = Math.PI / 180;

    public static final double AVG_LATITUDE = 37.0000;
    public static final double AVG_LONGITUDE = 127.0000;

    // 좌 상단 좌표
    public static final double UPPER_LEFT_LATITUDE = 43.000000;
    public static final double UPPER_LEFT_LONGITUDE = 124.000000;

    // 우 하단 좌표
    public static final double BOTTOM_RIGHT_LATITUDE = 33.000000;
    public static final double BOTTOM_RIGHT_LONGITUDE = 132.000000;

    public static final double ONE_HUNDRED_METER_LONGITUDE;
    public static final double ONE_HUNDRED_METER_LATITUDE;

    public static final int LONGITUDE_LENGTH;
    public static final int LATITUDE_LENGTH;

    // 100m 위도 수치 초기화
    static {
        ONE_HUNDRED_METER_LONGITUDE = measure100mLong(AVG_LATITUDE);
        ONE_HUNDRED_METER_LATITUDE = measure100mLat(AVG_LONGITUDE);

        LATITUDE_LENGTH = calculateLength(UPPER_LEFT_LATITUDE, BOTTOM_RIGHT_LATITUDE, ONE_HUNDRED_METER_LATITUDE) + 1;
        LONGITUDE_LENGTH = calculateLength(UPPER_LEFT_LONGITUDE, BOTTOM_RIGHT_LONGITUDE, ONE_HUNDRED_METER_LONGITUDE) + 1;

        System.out.println("ONE_HUNDRED_METER_LATITUDE = " + ONE_HUNDRED_METER_LATITUDE);
        System.out.println("ONE_HUNDRED_METER_LONGITUDE = " + ONE_HUNDRED_METER_LONGITUDE);
    }

    public static String INVALID_COORDINATE = "위도는 " + MIN_LATITUDE + "이상 " + MAX_LATITUDE + "이하 이고, 경도는 " +
            MIN_LONGITUDE + "이상 " + MAX_LONGITUDE + "이하 이어야 합니다.";

    public static double calculateDistanceTwoPoints (double firstLat, double firstLong, double secondLat, double secondLong)
            throws IllegalArgumentException{

        validateCoordinate(firstLat, firstLong);
        validateCoordinate(secondLat, secondLong);

        double deltaLat = Math.abs(firstLat - secondLat) * RADIAN;
        double deltaLong = Math.abs(firstLong - secondLong) * RADIAN;

        double sinDeltaLat = Math.sin(deltaLat / 2);
        double sinDeltaLong = Math.sin(deltaLong / 2);

        double squareRoot = Math.sqrt(Math.pow(sinDeltaLat, 2) +
                Math.cos(firstLat * RADIAN) * Math.cos(secondLat * RADIAN) * Math.pow(sinDeltaLong, 2));

        double distance = 2 * EARTH_RADIUS * Math.asin(squareRoot);

        return distance;
    }

    public static boolean validateCoordinate(double latitude, double longitude){
        if (latitude < MIN_LATITUDE || latitude > MAX_LATITUDE || longitude > MAX_LONGITUDE || longitude < MIN_LONGITUDE){
            throw new IllegalArgumentException(INVALID_COORDINATE);
        }

        return true;
    }

    // 해당 위도에서 100m를 측정하는 함수. (위도 : 적도기준)
    public static double measure100mLong(double latitude){
        double measureValue = 0.0000000;

        double distance = 0;

        while (Math.floor(distance * 1000)/1000 < 0.100){
            distance = CoordinateUtil.calculateDistanceTwoPoints(latitude, 0.0000000, latitude, measureValue);
            measureValue += 0.0000001;
        }

//        System.out.println("distance = " + distance);
        return Math.floor(measureValue * 1000000) / 1000000;
    }

    // 해당 경도에서 100m가 어느 정도 인지를 측정하는 함수. (경도: 본초자오선 기준)
    public static double measure100mLat(double longitude){
        double measureValue = 0.0000000;

        double distance = 0;

        while (Math.floor(distance * 1000)/1000 < 0.100){
            distance = CoordinateUtil.calculateDistanceTwoPoints(0.0000000, longitude, measureValue, longitude);
            measureValue += 0.0000001;
        }

//        System.out.println("measureValue = " + measureValue + " distance = " + distance);
        return Math.floor(measureValue * 1000000)/1000000;
    }

    public static int calculateLength(double start, double end, double divideNumber){
        double remain = Math.abs(end - start) / divideNumber;
        System.out.println("remain = " + remain);
        return (int) remain;
    }

    // 해당 위치에서 알맞은 Cell 값 반환
    public static int findCellValue(double latitude, double longitude) throws IllegalArgumentException {
        validateCoordinate(latitude, longitude);
        int row = calculateLength(UPPER_LEFT_LATITUDE, latitude, ONE_HUNDRED_METER_LATITUDE);
        int column = calculateLength(UPPER_LEFT_LONGITUDE, longitude, ONE_HUNDRED_METER_LONGITUDE);
        return LONGITUDE_LENGTH * row + column;
    }

    public static Coordinate findCellCoordinate(double latitude, double longitude) throws IllegalArgumentException {
        validateCoordinate(latitude, longitude);
        int row = calculateLength(UPPER_LEFT_LATITUDE, latitude, ONE_HUNDRED_METER_LATITUDE);
        int column = calculateLength(UPPER_LEFT_LONGITUDE, longitude, ONE_HUNDRED_METER_LONGITUDE);
        return new Coordinate(row, column);
    }

    public static List<Coordinate> findCellCoordinateInRange(double latitude, double longitude, int range) throws IllegalArgumentException {
        Coordinate coordinate = findCellCoordinate(latitude, longitude);
        Integer row = coordinate.getRow();
        Integer column = coordinate.getColumn();
        return Arrays.asList(new Coordinate(Math.max(row-range,0), Math.max(column-range, 0)),
                new Coordinate(Math.min(row+range, LONGITUDE_LENGTH), Math.min(column+range, LATITUDE_LENGTH)));
    }

    public static List<Integer> findCellValueInRange(int cellId, int range) {
        // cellId 주변 탐색할 때 cellId의 좌 상단
        int row = (int) (cellId / LONGITUDE_LENGTH) - range;
        int column = (int) (cellId % LONGITUDE_LENGTH) - range;

        System.out.println("row = " + row);
        System.out.println("column = " + column);
        ArrayList<Integer> cells = new ArrayList<>();

        // 좌 상단부터 2 * range 만큼 순회 범위 초과 시 담지 않음.
        for (int i = 0; i < 2 * range + 1; i++) {
            for (int j = 0; j < 2 * range + 1; j++) {
                int cellRow = row + i;
                int cellColumn = column + j;
                if (!validateCellCoordinate(cellRow, cellColumn))
                    continue;

                cells.add(cellRow * LONGITUDE_LENGTH + cellColumn);
            }
        }
        return cells;
    }

    public static boolean validateCellCoordinate(int row, int column){
        if (row >= LATITUDE_LENGTH || row < 0 || column < 0 || column >= LONGITUDE_LENGTH){
            return false;
        }
        return true;
    }

}
