package com.example.service;


import java.util.List;

import com.example.dto.CabBookingRequest;


import com.example.entity.Cab;



public interface CabService {
    List<Cab> createBooking(CabBookingRequest bookingRequest);
}
