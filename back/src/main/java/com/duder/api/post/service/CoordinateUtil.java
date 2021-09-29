package com.duder.api.post.service;

public class CoordinateUtil {
    public static double EARTH_RADIUS = 6371; // KM
    public static double RADIAN = Math.PI / 180;

    public static double calculateDistanceTwoPoints(double firstLat, double firstLong, double secondLat, double secondLong) {
        double deltaLat = Math.abs(firstLat - secondLat) * RADIAN;
        double deltaLong = Math.abs(firstLong - secondLong) * RADIAN;

        double sinDeltaLat = Math.sin(deltaLat / 2);
        double sinDeltaLong = Math.sin(deltaLong / 2);

        double squareRoot = Math.sqrt(Math.pow(sinDeltaLat, 2) +
                Math.cos(firstLat * RADIAN) * Math.cos(secondLat * RADIAN) * Math.pow(sinDeltaLong, 2));

        double distance = 2 * EARTH_RADIUS * Math.asin(squareRoot);
        return distance;
    }
}
