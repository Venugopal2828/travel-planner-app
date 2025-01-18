package com.example.controller;

import com.example.dto.FlightBookingRequest;
import com.example.entity.Flight;
import com.example.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights/bookings")
@CrossOrigin(origins = "http://localhost:3000") // Adjust URL for frontend
public class FlightController {

    @Autowired
    private FlightService flightService;

    @PostMapping("/create")
    public ResponseEntity<Object> createBooking(@RequestBody FlightBookingRequest bookingRequest) {
        try {
            // Validate trip type and return date
            if ("round".equalsIgnoreCase(bookingRequest.getTripType())) {
                if (bookingRequest.getReturnDate() == null || bookingRequest.getReturnDate().isEmpty()) {
                    return ResponseEntity.badRequest().body("Return date must be provided for round trip.");
                }
            } else if ("one-way".equalsIgnoreCase(bookingRequest.getTripType()) && bookingRequest.getReturnDate() != null) {
                return ResponseEntity.badRequest().body("Return date should not be provided for one-way trips.");
            }

            // Create booking and return the list of booked flights
            List<Flight> bookings = flightService.createBooking(bookingRequest);
            if (bookings.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An error occurred while processing your booking.");
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(bookings);
        } catch (Exception e) {
            // Log the exception for debugging purposes (optional)
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred. Please try again later.");
        }
    }
}
