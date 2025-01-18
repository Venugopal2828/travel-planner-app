package com.example.service;


import com.example.entity.Cab;
import com.example.repository.CabRepository;
import com.example.dto.CabBookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CabServiceImpl implements CabService {

    @Autowired
    private CabRepository cabRepository;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Cab> createBooking(CabBookingRequest bookingRequest) {
        List<Cab> bookedCabs = new ArrayList<>();
        int numberOfPersons = bookingRequest.getNumberOfPersons();
        double basePrice = 200.0; // Base price logic

        // Departure flight
        Cab departureCab = new Cab();
        departureCab.setFromCity(bookingRequest.getFromCity());
        departureCab.setToCity(bookingRequest.getToCity());
        departureCab.setTripType(bookingRequest.getTripType());
        departureCab.setDepartureDate(bookingRequest.getDepartureDate());
        departureCab.setNumberOfPersons(numberOfPersons);
        departureCab.setCabName(bookingRequest.getCabName());
        departureCab.setPrice(basePrice * numberOfPersons);
        departureCab.setPaymentStatus(paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "flight"));

        bookedCabs.add(cabRepository.save(departureCab));

        // Handle return flight for round trips
        if ("round".equalsIgnoreCase(bookingRequest.getTripType())) {
            System.out.println("Return Date: " + bookingRequest.getReturnDate()); // Debugging return date

            if (bookingRequest.getReturnDate() != null && !bookingRequest.getReturnDate().isEmpty()) {
                Cab returnCab = new Cab();
                returnCab.setFromCity(bookingRequest.getToCity());
                returnCab.setToCity(bookingRequest.getFromCity());
                returnCab.setTripType(bookingRequest.getTripType());
                returnCab.setDepartureDate(bookingRequest.getReturnDate());
                returnCab.setReturnDate(bookingRequest.getReturnDate()); // Set the return date
                returnCab.setNumberOfPersons(numberOfPersons);
                returnCab.setCabName(bookingRequest.getCabName());
                returnCab.setPrice(basePrice * numberOfPersons);

                String returnPaymentStatus = paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "inr", "cab");

                if ("success".equalsIgnoreCase(returnPaymentStatus)) {
                    returnCab.setPaymentStatus("success");
                } else {
                    returnCab.setPaymentStatus("failed");
                }

                bookedCabs.add(cabRepository.save(returnCab));
            }
        }

        return bookedCabs;
    }
}
