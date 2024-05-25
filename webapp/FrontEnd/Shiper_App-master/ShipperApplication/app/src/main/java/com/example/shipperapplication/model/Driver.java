package com.example.shipperapplication.model;

import java.io.Serializable;

public class Driver implements Serializable {

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    private Integer id;
    private String avatar;
    private String name;
    private String username;
    private String email;
    private String password;
    private String phone;

    private String status;

    public String getToken() {
        return accessToken;
    }

    public void setToken(String token) {
        this.accessToken = token;
    }

    private  String accessToken;

    private  String driver_licenseNumber;

    private  String fcm_token;

    public String getFcm_token() {
        return fcm_token;
    }

    public void setFcm_token(String fcm_token) {
        this.fcm_token = fcm_token;
    }

    private String cicardNumber;

    public String getCicardNumber() {
        return cicardNumber;
    }

    public void setCicardNumber(String cicardNumber) {
        this.cicardNumber = cicardNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getDriver_licenseNumber() {
        return driver_licenseNumber;
    }

    public void setDriver_licenseNumber(String driver_licenseNumber) {
        this.driver_licenseNumber = driver_licenseNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    private String vehicleType;
    private  String experience;



}