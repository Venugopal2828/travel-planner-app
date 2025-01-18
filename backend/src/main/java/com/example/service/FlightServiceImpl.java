package com.example.service;

import com.example.dto.FlightBookingRequest;
import com.example.entity.Flight;
import com.example.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Flight> createBooking(FlightBookingRequest bookingRequest) {
        List<Flight> bookedFlights = new ArrayList<>();
        int numberOfPersons = bookingRequest.getNumberOfPersons();
        double basePrice = bookingRequest.getPrice(); // Base price logic

        // Departure flight
        Flight departureFlight = new Flight();
        departureFlight.setFromCity(bookingRequest.getFromCity());
        departureFlight.setToCity(bookingRequest.getToCity());
        departureFlight.setTripType(bookingRequest.getTripType());
        departureFlight.setDepartureDate(bookingRequest.getDepartureDate());
        departureFlight.setNumberOfPersons(numberOfPersons);
        departureFlight.setFlightName(bookingRequest.getFlightName());
        departureFlight.setPrice(bookingRequest.getPrice());
        departureFlight.setPaymentStatus(paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "flight"));

        bookedFlights.add(flightRepository.save(departureFlight));

        // Handle return flight for round trips
        if ("round".equalsIgnoreCase(bookingRequest.getTripType())) {
            System.out.println("Return Date: " + bookingRequest.getReturnDate()); // Debugging return date

            if (bookingRequest.getReturnDate() != null && !bookingRequest.getReturnDate().isEmpty()) {
                Flight returnFlight = new Flight();
                returnFlight.setFromCity(bookingRequest.getToCity());
                returnFlight.setToCity(bookingRequest.getFromCity());
                returnFlight.setTripType(bookingRequest.getTripType());
                returnFlight.setDepartureDate(bookingRequest.getReturnDate());
                returnFlight.setReturnDate(bookingRequest.getReturnDate()); // Set the return date
                returnFlight.setNumberOfPersons(numberOfPersons);
                returnFlight.setFlightName(bookingRequest.getFlightName());
                returnFlight.setPrice(basePrice * numberOfPersons);

                String returnPaymentStatus = paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "flight");

                if ("success".equalsIgnoreCase(returnPaymentStatus)) {
                    returnFlight.setPaymentStatus("success");
                } else {
                    returnFlight.setPaymentStatus("failed");
                }

                bookedFlights.add(flightRepository.save(returnFlight));
            }
        }

        return bookedFlights;
    }
}