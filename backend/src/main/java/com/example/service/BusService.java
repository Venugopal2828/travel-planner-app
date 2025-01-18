package com.example.service;


import java.util.List;

import com.example.dto.BusBookingRequest;

import com.example.entity.Bus;



public interface BusService {
    List<Bus> createBooking(BusBookingRequest bookingRequest);
}
