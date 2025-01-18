package com.example.controller;

import com.example.dto.HotelBookingRequest;
import com.example.entity.Hotel;
import com.example.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels/bookings")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the URL for frontend if necessary
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // Create a new hotel booking
    @PostMapping("/create")
    public ResponseEntity<List<Hotel>> createHotelBooking(@RequestBody HotelBookingRequest hotelBookingRequest) {
        try {
            // Call the service layer to handle the booking logic
            List<Hotel> createdHotels = hotelService.createBooking(hotelBookingRequest);
            
            // Return the created hotel object with a success status
            return ResponseEntity.ok(createdHotels);
        } catch (IllegalArgumentException e) {
            // Handling any specific validation errors
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            // Catch any generic exceptions and return an internal server error status
            return ResponseEntity.status(500).body(null);
        }
    }
}
