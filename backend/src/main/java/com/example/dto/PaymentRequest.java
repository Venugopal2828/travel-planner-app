package com.example.dto;

public class PaymentRequest {
    private String paymentId;
    private double amount;
    private String currency;
    private String bookingType;
    private Object itemDetails; // Generic object to handle all booking details (flight, bus, train, cab, etc.)

    // Getters and Setters
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getBookingType() {
        return bookingType;
    }

    public void setBookingType(String bookingType) {
        this.bookingType = bookingType;
    }

    public Object getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(Object itemDetails) {
        this.itemDetails = itemDetails;
    }
}
