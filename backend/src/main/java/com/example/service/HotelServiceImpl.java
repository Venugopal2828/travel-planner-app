package com.example.service;

import com.example.dto.HotelBookingRequest;
import com.example.entity.Hotel;
import com.example.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Hotel> createBooking(HotelBookingRequest request) {
        List<Hotel> bookedHotels = new ArrayList<>();
        int numberOfPersons = request.getGuests();
        double basePrice = request.getPrice();

        Hotel hotel = new Hotel();
        hotel.setHotelName(request.getHotelName());
        hotel.setLocation(request.getLocation());
        hotel.setCheckInDate(request.getCheckInDate().toString());
        hotel.setCheckOutDate(request.getCheckOutDate().toString());
        hotel.setGuests(request.getGuests());
        hotel.setPrice(request.getPrice());
        hotel.setPaymentStatus(paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "hotels"));


        bookedHotels.add(hotelRepository.save(hotel));
        return bookedHotels;
    }

    @Override
    public Hotel updateHotel(Long hotelId, HotelBookingRequest hotelBookingRequest) {
        return hotelRepository.findById(hotelId).map(hotel -> {
            hotel.setHotelName(hotelBookingRequest.getHotelName());
            hotel.setLocation(hotelBookingRequest.getLocation());
            hotel.setCheckInDate(hotelBookingRequest.getCheckInDate().toString());
            hotel.setCheckOutDate(hotelBookingRequest.getCheckOutDate().toString());
            hotel.setGuests(hotelBookingRequest.getGuests());
            hotel.setPrice(hotelBookingRequest.getPrice());
            return hotelRepository.save(hotel);
        }).orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
    }
}
