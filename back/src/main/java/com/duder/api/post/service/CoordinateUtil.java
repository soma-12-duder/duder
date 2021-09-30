package com.duder.api.post.service;

public class CoordinateUtil {
    public static double MIN_LATITUDE = -90;
    public static double MAX_LATITUDE = 90;
    public static double MIN_LONGITUDE = -180;
    public static double MAX_LONGITUDE = 180;


    public static double EARTH_RADIUS = 6371; // KM
    public static double RADIAN = Math.PI / 180;

    public static double AVG_LATITUDE = 37.0000;
    public static double AVG_LONGITUDE = 127.0000;

    public static double ONE_HUNDRED_METER_LONGITUDE;
    public static double ONE_HUNDRED_METER_LATITUDE;

    // 100m 위도 수치 초기화
    static {
        measure100mLong(AVG_LATITUDE);
        measure100mLat(AVG_LONGITUDE);
        System.out.println("ONE_HUNDRED_METER_LATITUDE = " + ONE_HUNDRED_METER_LATITUDE);
        System.out.println("ONE_HUNDRED_METER_LONGITUDE = " + ONE_HUNDRED_METER_LONGITUDE);
    }

    public static String INVALID_COORDINATE = "위도는 " + MIN_LATITUDE + "이상 " + MAX_LATITUDE + "이하 이고, 경도는 " +
            MIN_LONGITUDE + "이상 " + MAX_LONGITUDE + "이하 이어야 합니다.";

    public static double calculateDistanceTwoPoints(double firstLat, double firstLong, double secondLat, double secondLong) {

        if (!validateCoordinate(firstLat, firstLong) || !validateCoordinate(secondLat, secondLong)){
            throw new IllegalArgumentException(INVALID_COORDINATE);
        }

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
            return false;
        }

        return true;
    }

    // 해당 위도에서 100m를 측정하는 함수. (위도 : 적도기준)
    public static double measure100mLong(double latitude){
        double zero = 0.0000000;
        double measureValue = 0.0000000;

        double distance = 0;

        while (Math.floor(distance * 1000)/1000 < 0.100){
            distance = CoordinateUtil.calculateDistanceTwoPoints(latitude, zero, latitude, measureValue);
            measureValue += 0.0000001;
        }

//        System.out.println("distance = " + distance);
        ONE_HUNDRED_METER_LONGITUDE = Math.floor(measureValue * 1000000) / 1000000;
        return distance;
    }

    // 해당 경도에서 100m가 어느 정도 인지를 측정하는 함수. (경도: 본초자오선 기준)
    public static double measure100mLat(double longitude){
        double zero = 0.0000000;
        double measureValue = 0.0000000;

        double distance = 0;

        while (Math.floor(distance * 1000)/1000 < 0.100){
            distance = CoordinateUtil.calculateDistanceTwoPoints(zero, longitude, measureValue, longitude);
            measureValue += 0.0000001;
        }

//        System.out.println("measureValue = " + measureValue + " distance = " + distance);
        ONE_HUNDRED_METER_LATITUDE = Math.floor(measureValue * 1000000)/1000000;
        return distance;
    }

    public static void divideAreaBy100m(double startLat, double startLong, double endLat, double endLong){
        System.out.println("startLat = " + startLat);
        System.out.println("farFrom100m = " + startLat + ONE_HUNDRED_METER_LATITUDE);

        System.out.println("startLong = " + startLong);
        System.out.println("farFrom100m = " + startLong + ONE_HUNDRED_METER_LONGITUDE);
    }

}
