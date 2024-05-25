package com.example.shipperapplication.model;

import java.io.Serializable;

public class OrderDetails implements Serializable {
    private int id;
    private int user_id;
    private String receiver_name;
    private String from_address;
    private String to_address;
    private Item item;
    private String order_status_id;
    private int delivery_id;
    private String price;
    private String order_date;
    private String delivery_fee;
    private String request_delivery_date;
    private String user_driver_rating;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getFrom_address() {
        return from_address;
    }

    public void setFrom_address(String from_address) {
        this.from_address = from_address;
    }

    public String getTo_address() {
        return to_address;
    }

    public void setTo_address(String to_address) {
        this.to_address = to_address;
    }

    public String getOrder_status_id() {
        return order_status_id;
    }

    public void setOrder_status_id(String order_status_id) {
        this.order_status_id = order_status_id;
    }

    public int getDelivery_id() {
        return delivery_id;
    }

    public void setDelivery_id(int delivery_id) {
        this.delivery_id = delivery_id;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public String getDelivery_fee() {
        return delivery_fee;
    }

    public void setDelivery_fee(String delivery_fee) {
        this.delivery_fee = delivery_fee;
    }

    public String getRequest_delivery_date() {
        return request_delivery_date;
    }

    public void setRequest_delivery_date(String request_delivery_date) {
        this.request_delivery_date = request_delivery_date;
    }

    public String getUser_driver_rating() {
        return user_driver_rating;
    }

    public void setUser_driver_rating(String user_driver_rating) {
        this.user_driver_rating = user_driver_rating;
    }

    public String getUser_restaurant_rating() {
        return user_restaurant_rating;
    }

    public void setUser_restaurant_rating(String user_restaurant_rating) {
        this.user_restaurant_rating = user_restaurant_rating;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getRestaurant_id() {
        return restaurant_id;
    }

    public void setRestaurant_id(int restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public String getOrderstatus_id() {
        return Orderstatus_id;
    }

    public void setOrderstatus_id(String orderstatus_id) {
        Orderstatus_id = orderstatus_id;
    }

    private String user_restaurant_rating;
    private String createdAt;
    private String updatedAt;
    private int restaurant_id;
    private String Orderstatus_id;

    // Getters and setters for the above fields

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}