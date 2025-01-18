package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.annotation.JsonCreator;

public class BusBookingRequest {

    private String fromCity;
    private String toCity;
    private String tripType;
    private String departureDate;
    private String returnDate;
    private int numberOfPersons;
    private String busName;
    private String paymentStatus;
    private double price;
    private Long userId;

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@JsonCreator
    public BusBookingRequest(
        @JsonProperty("fromCity") String fromCity,
        @JsonProperty("toCity") String toCity,
        @JsonProperty("tripType") String tripType,
        @JsonProperty("departureDate") String departureDate,
        @JsonProperty("returnDate") String returnDate,
        @JsonProperty("numberOfPersons") int numberOfPersons,
        @JsonProperty("busName") String busName,
        @JsonProperty("paymentStatus") String paymentStatus) {

        this.fromCity = fromCity;
        this.toCity = toCity;
        this.tripType = tripType;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.numberOfPersons = numberOfPersons;
        this.busName = busName;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters remain unchanged...


    public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getBusName() {
		return busName;
	}

	public void setBusName(String busName) {
		this.busName = busName;
	}

	// Getters and Setters
    public String getFromCity() {
        return fromCity;
    }

    public void setFromCity(String fromCity) {
        this.fromCity = fromCity;
    }

    public String getToCity() {
        return toCity;
    }

    public void setToCity(String toCity) {
        this.toCity = toCity;
    }

    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public int getNumberOfPersons() {
        return numberOfPersons;
    }

    public void setNumberOfPersons(int numberOfPersons) {
        this.numberOfPersons = numberOfPersons;
    }


}
