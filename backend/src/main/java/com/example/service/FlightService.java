package com.example.service;

import com.example.dto.FlightBookingRequest;
import com.example.entity.Flight;

import java.util.List;

public interface FlightService {
    List<Flight> createBooking(FlightBookingRequest bookingRequest);
}
