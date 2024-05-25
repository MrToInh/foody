package com.example.shipperapplication.model;

public class DriverResponse {
    private Driver driver;
    private Object driverProfile; // Assuming driverProfile is null, or you can define a class for it if needed

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Object getDriverProfile() {
        return driverProfile;
    }

    public void setDriverProfile(Object driverProfile) {
        this.driverProfile = driverProfile;
    }
}