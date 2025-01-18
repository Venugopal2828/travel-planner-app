package com.example.service;

import com.example.entity.Payment;
import com.example.entity.BookingType;
import com.example.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    /**
     * Creates a payment intent for processing payments (simulated) and stores the payment details in the database.
     *
     * @param amount      The amount to charge in the smallest currency unit (e.g., cents for USD).
     * @param currency    The currency code (e.g., "usd").
     * @param bookingType The type of booking ("hotel", "flight", "train", "bus", "cab").
     * @return The payment status (simulated) - either "success" or "failed".
     */
    public String createPaymentIntent(Long amount, String currency, String bookingType) {

        // Ensure the booking type is valid and convert it to the BookingType enum
        BookingType type;
        try {
            type = BookingType.valueOf(bookingType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return "failed"; // Invalid booking type
        }

        // Simulate payment processing (randomly decide success or failure)
        Random rand = new Random();
        boolean isSuccess = rand.nextBoolean();  // Random success/failure (true or false)
        String paymentStatus = isSuccess ? "success" : "failed";

        // Generate a simulated payment ID (in real systems, use the payment gateway's ID)
        String paymentId = "PAY-" + rand.nextInt(1000000);

        // Save the payment record in the database
        Payment payment = new Payment(
            paymentId,
            amount,
            currency,
            paymentStatus,
            type
        );

        // Save payment details to the database
        paymentRepository.save(payment);

        // Return the payment status
        return paymentStatus;
    }
}
