package com.example.service;


import java.util.List;

import com.example.dto.TrainBookingRequest;


import com.example.entity.Train;



public interface TrainService {
    List<Train> createBooking(TrainBookingRequest bookingRequest);
}
