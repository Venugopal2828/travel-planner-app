package com.example.service;

import com.example.dto.HotelBookingRequest;
import com.example.entity.Hotel;
import java.util.List;

public interface HotelService {
    List<Hotel> createBooking(HotelBookingRequest bookingrequest);
    Hotel updateHotel(Long hotelId, HotelBookingRequest hotelBookingRequest);
}
