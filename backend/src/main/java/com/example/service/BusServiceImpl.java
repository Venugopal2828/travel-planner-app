package com.example.service;

import com.example.dto.BusBookingRequest;
import com.example.entity.Bus;
import com.example.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusServiceImpl implements BusService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Bus> createBooking(BusBookingRequest bookingRequest) {
        List<Bus> bookedBuses = new ArrayList<>();
        int numberOfPersons = bookingRequest.getNumberOfPersons();
        double basePrice = 200.0; // Base price logic

        // Departure flight
        Bus departureBus = new Bus();
        departureBus.setFromCity(bookingRequest.getFromCity());
        departureBus.setToCity(bookingRequest.getToCity());
        departureBus.setTripType(bookingRequest.getTripType());
        departureBus.setDepartureDate(bookingRequest.getDepartureDate());
        departureBus.setNumberOfPersons(numberOfPersons);
        departureBus.setBusName(bookingRequest.getBusName());
        departureBus.setPrice(basePrice * numberOfPersons);
        departureBus.setPaymentStatus(paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "flight"));

        bookedBuses.add(busRepository.save(departureBus));

        // Handle return flight for round trips
        if ("round".equalsIgnoreCase(bookingRequest.getTripType())) {
            System.out.println("Return Date: " + bookingRequest.getReturnDate()); // Debugging return date

            if (bookingRequest.getReturnDate() != null && !bookingRequest.getReturnDate().isEmpty()) {
                Bus returnBus = new Bus();
                returnBus.setFromCity(bookingRequest.getToCity());
                returnBus.setToCity(bookingRequest.getFromCity());
                returnBus.setTripType(bookingRequest.getTripType());
                returnBus.setDepartureDate(bookingRequest.getReturnDate());
                returnBus.setReturnDate(bookingRequest.getReturnDate()); // Set the return date
                returnBus.setNumberOfPersons(numberOfPersons);
                returnBus.setBusName(bookingRequest.getBusName());
                returnBus.setPrice(basePrice * numberOfPersons);

                String returnPaymentStatus = paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "buses");

                if ("success".equalsIgnoreCase(returnPaymentStatus)) {
                    returnBus.setPaymentStatus("success");
                } else {
                    returnBus.setPaymentStatus("failed");
                }

                bookedBuses.add(busRepository.save(returnBus));
            }
        }

        return bookedBuses;
    }
}