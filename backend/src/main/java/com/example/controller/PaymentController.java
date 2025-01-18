package com.example.controller;

import com.example.dto.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    public PaymentController() {
    	System.out.println("payment controller initialized");       // Set your Stripe Secret Key here
        Stripe.apiKey = "sk_test_51QXeFTFDMIdA4FuzkKFLXJ1D6HYFRQgISxXq7Ms2moKdRTnxEuc9l6ECI2TTD1BrFp67ibJncutHTOytWFZOoMOf003DEceUuQ";
    }
    
//    @Autowired
//    private CartService cartService;
//
//    @PostMapping("/save-cart")
//    public ResponseEntity<?> saveCartDetails(@RequestBody CartDetailsRequest request) {
//        try {
//            cartService.saveCartDetails(request);
//            return ResponseEntity.ok("Cart details saved successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to save cart details: " + e.getMessage());
//        }
//    }

    
//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody PaymentRequest paymentRequest) {
        System.out.println("Create Checkout Session Request Received: " + paymentRequest);
    	try {
            double amount = paymentRequest.getAmount(); // Get the amount from the request
            System.out.println("Amount to be paid: " + amount);
            // Create a Stripe Session
            SessionCreateParams params =
                SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:3000/success") // Redirect URL after successful payment
                    .setCancelUrl("http://localhost:3000/cancel") // Redirect URL after cancellation
                    .addLineItem(
                        SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("inr")
                                    .setUnitAmount((long) (amount * 100)) // Convert to smallest unit
                                    .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Cart Purchase")
                                            .build())
                                    .build())
                            .build())
                    .build();

            Session session = Session.create(params);

            // Return the session ID
            Map<String, String> response = new HashMap<>();
            response.put("id", session.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error creating Stripe session: " + e.getMessage()));
        }
    }
}