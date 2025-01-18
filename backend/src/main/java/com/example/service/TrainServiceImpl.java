package com.example.service;

import com.example.dto.TrainBookingRequest;
import com.example.entity.Train;
import com.example.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainServiceImpl implements TrainService {

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Train> createBooking(TrainBookingRequest bookingRequest) {
        List<Train> bookedTrains = new ArrayList<>();
        int numberOfPersons = bookingRequest.getNumberOfPersons();
        double basePrice = 200.0; // Base price logic

        // Departure flight
        Train departureTrain = new Train();
        departureTrain.setFromCity(bookingRequest.getFromCity());
        departureTrain.setToCity(bookingRequest.getToCity());
        departureTrain.setTripType(bookingRequest.getTripType());
        departureTrain.setDepartureDate(bookingRequest.getDepartureDate());
        departureTrain.setNumberOfPersons(numberOfPersons);
        departureTrain.setTrainName(bookingRequest.getTrainName());
        departureTrain.setPrice(basePrice * numberOfPersons);
        departureTrain.setPaymentStatus(paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "flight"));

        bookedTrains.add(trainRepository.save(departureTrain));

        // Handle return flight for round trips
        if ("round".equalsIgnoreCase(bookingRequest.getTripType())) {
            System.out.println("Return Date: " + bookingRequest.getReturnDate()); // Debugging return date

            if (bookingRequest.getReturnDate() != null && !bookingRequest.getReturnDate().isEmpty()) {
                Train returnTrain = new Train();
                returnTrain.setFromCity(bookingRequest.getToCity());
                returnTrain.setToCity(bookingRequest.getFromCity());
                returnTrain.setTripType(bookingRequest.getTripType());
                returnTrain.setDepartureDate(bookingRequest.getReturnDate());
                returnTrain.setReturnDate(bookingRequest.getReturnDate()); // Set the return date
                returnTrain.setNumberOfPersons(numberOfPersons);
                returnTrain.setTrainName(bookingRequest.getTrainName());
                returnTrain.setPrice(basePrice * numberOfPersons);

                String returnPaymentStatus = paymentService.createPaymentIntent((long) (basePrice * numberOfPersons * 100), "usd", "buses");

                if ("success".equalsIgnoreCase(returnPaymentStatus)) {
                    returnTrain.setPaymentStatus("success");
                } else {
                    returnTrain.setPaymentStatus("failed");
                }

                bookedTrains.add(trainRepository.save(returnTrain));
            }
        }

        return bookedTrains;
    }
}