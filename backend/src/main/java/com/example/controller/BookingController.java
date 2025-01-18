package com.example.controller;

import com.example.dto.*;
import com.example.entity.Booking;
import com.example.entity.User;
import com.example.service.BookingService;
import com.example.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    @PostMapping("/bus")
    public ResponseEntity<Booking> createBusBooking(@RequestBody BusBookingRequest request, @RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId); // Fetch user by userId
        if (user.isPresent()) {
            Booking booking = bookingService.createBusBooking(request, user.get());
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cab")
    public ResponseEntity<Booking> createCabBooking(@RequestBody CabBookingRequest request, @RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId); // Fetch user by userId
        if (user.isPresent()) {
            Booking booking = bookingService.createCabBooking(request, user.get());
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/train")
    public ResponseEntity<Booking> createTrainBooking(@RequestBody TrainBookingRequest request, @RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId); // Fetch user by userId
        if (user.isPresent()) {
            Booking booking = bookingService.createTrainBooking(request, user.get());
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/flight")
    public ResponseEntity<Booking> createFlightBooking(@RequestBody FlightBookingRequest request, @RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId); // Fetch user by userId
        if (user.isPresent()) {
            Booking booking = bookingService.createFlightBooking(request, user.get());
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/hotel")
    public ResponseEntity<Booking> createHotelBooking(@RequestBody HotelBookingRequest request, @RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId); // Fetch user by userId
        if (user.isPresent()) {
            Booking booking = bookingService.createHotelBooking(request, user.get());
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        if (bookings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bookings);
    }

}
